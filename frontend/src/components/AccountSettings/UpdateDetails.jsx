import { userAtom } from "@/lib/store/store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useAtom } from "jotai";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { MultiSelect } from "react-multi-select-component";
import { Button } from "../ui/button";
import { updateUserDetails } from "@/actions/userActions";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useToast } from "../ui/use-toast";

const optionsGenre = [
  { label: "Action", value: "Action" },
  { label: "Adventure", value: "Adventure" },
  { label: "Animation", value: "Animation" },
  { label: "Comedy", value: "Comedy" },
  { label: "Crime", value: "Crime" },
  { label: "Documentary", value: "Documentary" },
  { label: "Drama", value: "Drama" },
  { label: "Family", value: "Family" },
  { label: "Fantasy", value: "Fantasy" },
  { label: "History", value: "History" },
  { label: "Horror", value: "Horror" },
  { label: "Music", value: "Music" },
  { label: "Mystery", value: "Mystery" },
  { label: "Romance", value: "Romance" },
  { label: "Science Fiction", value: "Science Fiction" },
  { label: "TV Movie", value: "TV Movie" },
  { label: "Thriller", value: "Thriller" },
  { label: "War", value: "War" },
  { label: "Western", value: "Western" },
];

const optionsLang = [
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Gujrati", value: "Gujrati" },
  { label: "Tamil", value: "Tamil" },
  { label: "Telegu", value: "Telegu" },
  { label: "Malyalam", value: "Malyalam" },
];

const UpdateDetails = () => {
  const [user, setUser] = useAtom(userAtom);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedLang, setSelectedLang] = useState([]);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit } = useForm();
  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  const getAge = (DOB) => {
    const birthDate = new Date(DOB);
    const currentDate = new Date();
    const timeDifference = currentDate - birthDate;
    const ageInMilliseconds = new Date(timeDifference);
    const age = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);

    if (age) {
      return age;
    }
    return null;
  };

  function filterEmptyObjects(data) {
    const filteredData = {};
    for (const key in data) {
      if (data[key] !== null && data[key] !== "") {
        if (typeof data[key] === "object" && !Array.isArray(data[key])) {
          if (!isEmptyObject(data[key])) {
            filteredData[key] = filterEmptyObjects(data[key]);
          }
        } else {
          filteredData[key] = data[key];
        }
      }
    }
    return filteredData;
  }

  // useEffect(() => {
  //   if (user && Object.keys(user).length > 0) {
  //     setfavoriteGenres(user.favoriteGenres);
  //     setLanguagePreferences(user.languagePreferences);
  //   }
  // }, [user]);

  const onSubmit = async (data) => {
    setLoading(true);
    const DOB = data.dateOfBirth;
    if (DOB) data.age = getAge(DOB);

    // Extract value properties from selectedGenre array
    const favoriteGenres = selectedGenre.map((genre) => genre.value);
    data.favoriteGenres = favoriteGenres;

    // Extract value properties from selectedLang array
    const languagePreferences = selectedLang.map((lang) => lang.value);
    data.languagePreferences = languagePreferences;

    // Ensure location is an object
    if (!data.location || typeof data.location !== "object") {
      data.location = {};
    }

    const filteredData = filterEmptyObjects(data);

    try {
      const response = await updateUserDetails(
        user?._id,
        filteredData,
        setUser
      );
      if (response.success) {
        toast({ title: "✅ Profile updated successfully!" });
        setUser({ ...user, onboardingCompleted: true });
        setLoading(false);
        console.log(response.message); // Handle success message
      } else {
        console.error(response.message); // Handle error message
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      setLoading(false);
      // Handle error
    }
  };

  return (
    <motion.div
      className="max-w-xl pt-5 mx-auto"
      variants={{
        hidden: { opacity: 0, scale: 1, x: -40 },
        visible: { opacity: 1, scale: 1, x: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <h1 className="text-3xl mt-2 font-bold">Complete Your Profile</h1>
      <form className="space-y-3 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Label>Name</Label>
          <Input
            {...register}
            value={user?.fullName}
            className="cursor-not-allowed"
          />
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            {...register}
            value={user?.email}
            className="cursor-not-allowed"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="DOB" className="">
            Date of Birth
          </Label>
          <input
            className="block border w-full p-1 px-3 rounded-lg"
            {...register("dateOfBirth")}
            id="DOB"
            type="date"
            required
            defaultValue={
              user?.dateOfBirth ? user?.dateOfBirth.split("T")[0] : ""
            }
          />
        </div>
        <div>
          <Label>Gender</Label>
          <RadioGroup
            defaultValue={user?.gender}
            {...register("gender")}
            className="grid grid-cols-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="Male" />
              <Label htmlFor="Male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="Female" />
              <Label htmlFor="Female">Female</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-1">
          <Label>City</Label>
          <Input
            {...register("location.city")}
            defaultValue={user?.location?.city}
            placeholder="City"
          />
        </div>
        <div className="space-y-1">
          <Label>State</Label>
          <Input
            {...register("location.state")}
            defaultValue={user?.location?.state}
            placeholder="State"
          />
        </div>
        <div className="space-y-1">
          <Label>Country</Label>
          <Input
            {...register("location.country")}
            defaultValue={user?.location?.country}
            placeholder="Country"
          />
        </div>
        <div className="space-y-1">
          <Label>Favourite Genres</Label>
          <MultiSelect
            className="bg-background dark:bg-black text-black"
            options={optionsGenre}
            value={selectedGenre}
            onChange={setSelectedGenre}
            labelledBy="Select"
          />
        </div>
        <div className="space-y-1">
          <Label>Preferred Languages</Label>
          <MultiSelect
            options={optionsLang}
            value={selectedLang}
            onChange={setSelectedLang}
            labelledBy="Select"
          ></MultiSelect>
        </div>
        <div className="flex justify-end py-3">
          {loading ? (
            <div>
              <LoadingSpinner />
            </div>
          ) : (
            <Button>Submit</Button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default UpdateDetails;
