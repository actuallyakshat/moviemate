import { useState } from "react";
import PropTypes from "prop-types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { userAtom } from "@/lib/store/store";
import { useAtom, useAtomValue } from "jotai";
import { MdEdit } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import { imageUpload } from "../../actions/fileUploadActions";
import { updateUserDetails } from "../../actions/userActions";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

export const UpdationModal = ({ headerUrl, profileUrl }) => {
  const { toast } = useToast();
  const [user, setUser] = useAtom(userAtom);
  const { register, handleSubmit, reset } = useForm();
  const [newHeader, setNewHeader] = useState(null);
  const [newProfile, setNewProfile] = useState(null);

  const uploadImages = async (imageData) => {
    try {
      console.log(imageData);
      const responses = await Promise.all(
        Object.entries(imageData).map(async ([tag, file]) => {
          try {
            const response = await imageUpload(user?._id, tag, file, setUser);
            return response;
          } catch (error) {
            console.error(
              `Error occurred while uploading ${tag} image:`,
              error
            );
            return {
              success: false,
              message: `Error occurred while uploading ${tag} image: ${error.message}`,
            };
          }
        })
      );

      return responses;
    } catch (error) {
      console.error("Error occurred while uploading images:", error);
      return [
        {
          success: false,
          message: `Error occurred while uploading images: ${error.message}`,
        },
      ];
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    const imageData = {};

    // Check and assign header image
    if (data?.header?.[0]) {
      imageData.header = data.header[0];
    }
    // setNewProfile(null);

    // Check and assign profile image
    if (data?.profile?.[0]) {
      imageData.profile = data.profile[0];
    }
    // setNewProfile(null);

    if (Object.keys(imageData).length !== 0) {
      // toast("Uploading your images...", {
      //   icon: "⏳",
      //   style: {
      //     fontWeight: "bold",
      //   },
      // });
      toast({
        title: "⏳",
        description: "Uploading your images...",
      });
      console.log("Uploading your images...");
      const imageResponse = await uploadImages(imageData);
      imageResponse.forEach((imageResponse) => {
        if (imageResponse.data.success) {
          // toast.success("Image uploaded successfully!", {
          //   style: {
          //     fontWeight: "bold",
          //   },
          // });
          toast({
            title: "🎉",
            description: "Image uploaded successfully!",
          });
          console.log("Image uploaded successfully");
        } else {
          // toast.error("There was an error while uploading your images", {
          //   style: {
          //     fontWeight: "bold",
          //   },
          // });
          toast({
            title: "🤦🏻‍♂️",
            description: "There was an error while uploading your images",
            variant: "destructive",
          });
          console.log("Error uploading image");
        }
      });
      reset();
      console.log(imageData);
    }

    if (false && data.bio != user.bio) {
      const bioObject = {};
      if ("bio" in data) {
        bioObject.bio = data.bio ? data.bio : "";
      }
      // toast("Upadting your bio...", {
      //   icon: "⏳",
      //   style: {
      //     fontWeight: "bold",
      //   },
      // });
      console.log("Updating your bio...");
      const bioResponse = await updateUserDetails(
        user?._id,
        bioObject,
        setUser
      );
      if (bioResponse.success) {
        // toast.success("Bio updated successfully!", {
        //   style: {
        //     fontWeight: "bold",
        //   },
        // });
        console.log("Bio updated successfully");
      } else {
        // toast.error("There was an error while updating your bio", {
        //   style: {
        //     fontWeight: "bold",
        //   },
        // });
        console.log("Error updating bio");
      }
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Edit Profile</Button>
        </AlertDialogTrigger>
        <AlertDialogContent
          className={`gap-0 font-Poppins border-gray-400/30 `}
        >
          <AlertDialogHeader className="p-0 mb-1 gap-0">
            <AlertDialogTitle className="font-bold text-xl text-left">
              Edit Profile
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="text-sm">
            <p className="opactiy-60">Make changes to your profile.</p>
            <div className="w-full mt-2 mb-4 relative">
              <div className="w-full">
                <img
                  src={newHeader ? URL.createObjectURL(newHeader) : headerUrl}
                  alt="header"
                  className="h-[150px] object-cover w-full relative"
                />
                <div className="h-full w-full cursor-pointer transition-colors hover:text-gray-300 hover:bg-black/60 bg-black/40 text-white absolute flex items-center justify-center top-0 left-0">
                  <MdEdit size={28} />
                  <input
                    type="file"
                    {...register("header")}
                    accept=".png, .jpg, .jpeg, .heic"
                    onChange={(event) => setNewHeader(event.target.files[0])}
                    className="w-full cursor-pointer h-full opacity-0 absolute"
                  />
                </div>
              </div>
              <div className="w-[25%] aspect-square h-auto max-w-48 rounded-full left-4 bottom-0 translate-y-1/2 absolute outline outline-white outline-2">
                <img
                  src={
                    newProfile ? URL.createObjectURL(newProfile) : profileUrl
                  }
                  content="center"
                  className="bg-gray-500 rounded-full object-cover aspect-square outline-gray-100 relative"
                />
                <div className="h-full w-full cursor-pointer rounded-full transition-colors hover:text-gray-300 hover:bg-black/60 bg-black/40 text-white absolute flex items-center justify-center top-0 left-0">
                  <MdEdit size={28} />
                  <input
                    type="file"
                    alt="profile"
                    accept=".png, .jpg, .jpeg, .heic"
                    {...register("profile")}
                    onChange={(event) => setNewProfile(event.target.files[0])}
                    className="w-full cursor-pointer h-full opacity-0 rounded-full absolute"
                  />
                </div>
              </div>
            </div>
            <form className="mt-20" onSubmit={handleSubmit(onSubmit)}>
              <TextareaAutosize
                type="text"
                maxLength={300}
                placeholder="Bio"
                defaultValue={user?.bio}
                {...register("bio")}
                className={` w-full resize-none min-h-[2.5rem] h-auto text-wrap mb-6 py-3 px-3 text-black border border-gray-400/60 rounded-lg`}
              />
              <div className="flex h-fit items-baseline gap-2 w-full justify-end">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-primary hover:bg-primary/80"
                  type="submit"
                >
                  Continue
                </AlertDialogAction>
              </div>
            </form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
UpdationModal.propTypes = {
  headerUrl: PropTypes.string,
  profileUrl: PropTypes.string,
};
