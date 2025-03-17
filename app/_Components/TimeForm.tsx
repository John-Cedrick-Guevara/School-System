import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface Section {
  timeStamp: string;
  id: string;
}

interface Props {
  buttonName: string;
  data: Section;
  setData: React.Dispatch<React.SetStateAction<Section>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const TimeForm = ({ buttonName, data, setData, handleSubmit }: Props) => {
  //handle input
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      newId: e.target.name === "name" ? e.target.value : prev.id,
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
          <Label htmlFor="time">Time</Label>
          <Input
            name="timeStamp"
            value={data?.timeStamp}
            onChange={handleChange}
            type="text"
            id="time"
            placeholder="ex. 7:00am"
          />
        </div>

        <Button variant={"outline"}>{buttonName}</Button>
      </form>
    </div>
  );
};

export default TimeForm;
