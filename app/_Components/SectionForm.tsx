import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Section } from "../interfaces";


interface Props {
  buttonName: string;
  data: Section;
  setData: React.Dispatch<React.SetStateAction<Section>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const SectionForm = ({ buttonName, data, setData, handleSubmit }: Props) => {

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
          <Label htmlFor="name">Section Name</Label>
          <Input
            name="name"
            value={data?.name}
            onChange={handleChange}
            type="name"
            id="name"
            placeholder="Section Name"
          />
        </div>

        {/* section id */}
        <div className="flex flex-col w-full max-w-md gap-1.5">
          <Label htmlFor="name">Section ID</Label>
          <Input
            name="newId"
            value={data?.name}
            onChange={handleChange}
            type="text"
            id="id"
            placeholder="Section ID"
          />
        </div>

        <Button variant={"outline"}>{buttonName}</Button>
      </form>
    </div>
  );
};

export default SectionForm;
