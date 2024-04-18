import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
// import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
// import { deleteUser } from "@/actions/userActions";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { deleteUser } from "@/actions/userActions";
import { userAtom } from "@/lib/store/store";
import { useClerk } from "@clerk/clerk-react";
import LoadingSpinner from "../Loading/LoadingSpinner";

export const DeleteAccount = () => {
  const [user, setUser] = useAtom(userAtom);
  const { signOut } = useClerk();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const deleteAccountHandler = async () => {
    setLoading(true);
    const response = await deleteUser(user._id, setUser);
    setLoading(false);
    if (response.success) {
      toast("We are sorry to see you go!");
      signOut();
      navigate("/");
    } else {
      console.error("Error deleting account");
    }
  };
  //   const deleteAccountHandler = async () => {
  //     setLoading(true);
  //     const response = await deleteUser(setUser);
  //     if (response.data.success) {
  //       localStorage.removeItem("user");
  //       localStorage.removeItem("token");
  //       toast(response.data.message, {
  //         style: {
  //           fontWeight: "bold",
  //         },
  //         icon: "😔",
  //       });
  //       navigate("/signup");
  //     } else {
  //       toast.error("Something went wrong", {
  //         style: {
  //           fontWeight: "bold",
  //         },
  //       });
  //     }
  //     setLoading(false);
  //   };
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 1, x: -40 },
        visible: { opacity: 1, scale: 1, x: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: 0.15 }}
      className="px-5 pt-8 flex flex-col select-none gap-6 transition-colors duration-300"
    >
      <div>
        <h1 className="mb-4 font-bold text-3xl">Delete Account</h1>
        <p className="max-w-[55ch]">
          Warning: Proceeding with account deletion will result in permanent
          loss of all associated data from our database. Take caution as this
          action cannot be undone.
        </p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variants="destructive"
            className="flex gap-3 items-center bg-destructive hover:bg-destructive/90"
          >
            Delete my account <FaTrash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account and remove all your
              valuable connections with your mates.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            {!loading ? (
              <>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive hover:bg-destructive/90"
                  onClick={deleteAccountHandler}
                >
                  Continue
                </AlertDialogAction>
              </>
            ) : (
              <LoadingSpinner />
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};
