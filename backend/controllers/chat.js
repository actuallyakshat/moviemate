const Conversation = require("../ models/Conversation");
const Message = require("../ models/Message");
const { getReceiverSocketId } = require("../socket/socket");

module.exports.getMessages = async (req, res) => {
  const { userId, receiverId } = req.body;
  try {
    // Find the conversation where both userId and receiverId are participants
    const conversation = await Conversation.findOne({
      participants: { $all: [receiverId, userId] },
    }).populate("messages");

    if (conversation) {
      return res
        .status(200)
        .json({ success: true, messages: conversation.messages });
    } else {
      return res.status(200).json({ success: true, messages: [] }); // Return an empty array if no conversation found
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
      participants: { $all: [senderId, receiverId] },
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
