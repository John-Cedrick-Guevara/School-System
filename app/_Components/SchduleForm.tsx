import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@radix-ui/react-label";
import React from "react";

// data interfaces
interface Schedule {
  scheduleId?: string;
  teacherId?: string;
  subjectId: string;
  sectionId: string;
  startTime: string;
  day: string;
  endTime: string;
}
interface Subject {
  name: string;
  id: string;
  newId?: string;
}

interface Section {
  name: string;
  id: string;
  newId?: string;
}

interface TimeStamp {
  timeStamp: string;
  id: number;
}

interface Props {
  buttonName: string;
  timeStamps: TimeStamp[];
  subject: Subject[];
  section: Section[];
  days: string[];
  data: Schedule;
  setData: React.Dispatch<React.SetStateAction<Schedule>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const SchduleForm = ({
  section,
  days,
  subject,
  timeStamps,
  buttonName,
  data,
  setData,
  handleSubmit,
}: Props) => {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="space-y-5 flex flex-col "
      >
        {/* teacher id */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="id">Teacher ID:</Label>
          <Input
            value={data.teacherId}
            onChange={handleChange}
            name="id"
            type="id"
            id="id"
            placeholder="Enter your ID."
          />
        </div>

        {/* section and subject container */}
        <div className="flex items-center gap-4">
          {/* section to teach */}
          <div className="flex flex-col w-full max-w-sm gap-1.5">
            <Label>Section:</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {!data.sectionId ? "Select section:" : data.sectionId}{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sections</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={data.sectionId}
                  onValueChange={(value) =>
                    setData((prev) => ({ ...prev, sectionId: value }))
                  }
                >
                  {section?.map((item) => {
                    return (
                      <DropdownMenuRadioItem value={item.name} key={item.id}>
                        {item.name}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* subject */}
          <div className="flex flex-col w-full max-w-sm gap-1.5">
            <Label>Subjects:</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {!data.subjectId ? "Select subject:" : data.subjectId}{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sections</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={data.subjectId}
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      subjectId: value,
                    }))
                  }
                >
                  {subject?.map((item) => {
                    return (
                      <DropdownMenuRadioItem value={item.name} key={item.id}>
                        {item.name}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* start and end time container */}
        <div className="flex items-center gap-4">
          {/* start time */}
          <div className="flex flex-col w-full max-w-sm gap-1.5">
            <Label>Start time:</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {!data.startTime ? "Select time:" : data.startTime}{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Time Stamps</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={data.startTime}
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      startTime: value,
                    }))
                  }
                >
                  {timeStamps?.map((item) => {
                    return (
                      <DropdownMenuRadioItem
                        value={item.timeStamp}
                        key={item.id}
                      >
                        {item.timeStamp}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* end time */}
          <div className="flex flex-col w-full max-w-sm gap-1.5">
            <Label>End time:</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {!data.endTime ? "Select time:" : data.endTime}{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Time Stamps</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={data.endTime}
                  onValueChange={(value) =>
                    setData((prev) => ({ ...prev, endTime: value }))
                  }
                >
                  {timeStamps
                    ?.filter((item) => {
                      if (data.startTime) {
                        return (
                          parseInt(item.timeStamp.slice(0, 2)) >
                          parseInt(data.startTime.slice(0, 2))
                        );
                      }
                      return true;
                    })
                    .map((item) => {
                      return (
                        <DropdownMenuRadioItem
                          value={item.timeStamp}
                          key={item.id}
                        >
                          {item.timeStamp}
                        </DropdownMenuRadioItem>
                      );
                    })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* day */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label>Day:</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {!data.day ? "Select day:" : data.day}{" "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Days</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={data.day}
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, day: value }))
                }
              >
                {days?.map((item) => {
                  return (
                    <DropdownMenuRadioItem value={item} key={item}>
                      {item}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button variant={"outline"}>{buttonName}</Button>
      </form>
    </div>
  );
};

export default SchduleForm;
