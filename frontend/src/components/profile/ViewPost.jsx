import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa6";
import { useSetAtom } from "jotai";
// import { toast } from "react-hot-toast";
import { userAtom } from "@/lib/store/store";
import { useToast } from "../ui/use-toast";
import { imageDelete } from "../../actions/fileUploadActions";
export const ViewPost = ({ togglePopup, imageLink, postId, userId }) => {
  const { toast } = useToast();
  const setUser = useSetAtom(userAtom);
  const deleteImageHandler = async () => {
    // toast("Deleting your post...", {
    //   icon: "⏳",
    //   style: {
    //     fontWeight: "bold",
    //   },
    // });
    toast({
      title: "⏳",
      description: "Deleting your post...",
    });
    console.log("Delete Request Sent...");
    const response = await imageDelete(postId, imageLink, userId, setUser);

    if (response.data.success) {
      // toast.success("Post deleted successfully!", {
      //   style: {
      //     fontWeight: "bold",
      //   },
      // });
      toast({
        title: "🗑",
        description: "Post deleted successfully!",
        variant: "destructive",
      });
      console.log("Post deleted successfully");
    } else {
      // toast.error("We couldn't delete your post", {
      //   style: {
      //     fontWeight: "bold",
      //   },
      // });
      toast({
        title: "🤦🏻‍♂️",
        description: "We couldn't delete your post",
        variant: "destructive",
      });
      console.log("Error deleting post");
    }
  };
  return (
    <div
      onClick={togglePopup}
      className="fixed z-[1005] cursor-pointer size-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="fixed z-[52] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src={imageLink}
          className="max-h-[90vh] max-w-[90vw] aspect-auto object-contain"
          alt="post"
          onClick={(e) => e.stopPropagation()}
        />
        <i
          onClick={deleteImageHandler}
          className="absolute text-white top-4 size-8 right-4 bg-white/20 hover:bg-white/50 rounded-lg transition-colors flex items-center justify-center hover:text-red-600"
        >
          <FaTrash />
        </i>
      </div>
    </div>
  );
};

ViewPost.propTypes = {
  togglePopup: PropTypes.func,
  imageLink: PropTypes.string,
  postId: PropTypes.string,
};
