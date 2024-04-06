const Conversation = require("../ models/Conversation");
const Message = require("../ models/Message");
const { getReceiverSocketId } = require("../socket/socket");
module.exports.getMessages = async (req, res) => {
  const userId = req.params.userId;
  try {
    const conversations = await Conversation.find({
      participants: userId,
    }).populate("messages");
    if (conversations) {
      return res
        .status(200)
        .json({ success: true, messages: conversations.messages });
    } else {
      return res.status(200).json([]);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching messages",
    });
  }
};
module.exports.sendMessage = async (req, res) => {
  const { message, senderId, receiverId } = req.body;
  try {
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
      const recieverSocketId = getReceiverSocketId(receiverId);
      if (recieverSocketId) {
        io.to(recieverSocketId).emit("newMessage", newMessage);
      }
      return res.status(200).json({
        success: true,
        message: "Message sent successfully",
        newMessage,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while sending a message",
    });
  }
};
