import { userAtom } from "@/lib/store/store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useAtomValue } from "jotai";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { DatePicker } from "./DatePicker";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { MultiSelect } from "react-multi-select-component";
import { Button } from "../ui/button";

const options = [
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

const UpdateDetails = () => {
  const [selected, setSelected] = useState([]);
  const [date, setDate] = useState();
  const { register } = useForm();
  const user = useAtomValue(userAtom);
  console.log(user);
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
      <form className="space-y-3 mt-5">
        <div className="space-y-1">
          <Label>Name</Label>
          <Input value={user?.fullName} className="cursor-not-allowed" />
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input value={user?.email} className="cursor-not-allowed" />
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
            className="grid grid-cols-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-1">
          <Label>City</Label>
          <Input defaultValue={user?.location?.city} placeholder="City" />
        </div>
        <div className="space-y-1">
          <Label>State</Label>
          <Input defaultValue={user?.location?.state} placeholder="State" />
        </div>
        <div className="space-y-1">
          <Label>Country</Label>
          <Input defaultValue={user?.location?.country} placeholder="Country" />
        </div>
        <div className="space-y-1">
          <Label>Favourite Genres</Label>
          <MultiSelect
            className="bg-background dark:bg-black text-black"
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
        </div>
        <div className="space-y-1">
          <Label>Preferred Languages</Label>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          ></MultiSelect>
        </div>
        <div className="flex justify-end py-3">
          <Button>Submit</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default UpdateDetails;
