import React from "react";
import { Announcements } from "../interfaces";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Props {
  buttonName: string;
  data: Announcements;
  setData: React.Dispatch<React.SetStateAction<Announcements>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const AnnouncementsForm = ({
  buttonName,
  data,
  setData,
  handleSubmit,
}: Props) => {
  //handles input
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-md mx-auto bg-secondary p-5">
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col w-full max-w-md gap-5"
      >
        {/* section name */}
        <div className="flex flex-col w-full max-w-md gap-1.5">
          <Label htmlFor="title">Announcement title</Label>
          <Input
            name="title"
            value={data?.title}
            onChange={handleChange}
            type="name"
            id="name"
            placeholder="Title"
          />
        </div>

        {/* section id */}
        <div className="flex flex-col w-full max-w-md gap-1.5">
          <Label htmlFor="name">Announcement description</Label>
          <Textarea
            name="description"
            value={data?.description}
            onChange={handleChange}
            id="id"
            typeof="text"
            placeholder="desctription"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <h1>Student</h1>
          <Switch
            checked={data.for === "TEACHER"}
            onClick={() =>{
              console.log(data.for)
              setData((prev) => ({
                ...prev,
                for: prev.for === "STUDENT" ? "TEACHER" : "STUDENT",
              }))}
            }
          />
          <h1>Teacher</h1>
        </div>

        <Button variant={"outline"}>{buttonName}</Button>
      </form>
    </div>
  );
};

export default AnnouncementsForm;
