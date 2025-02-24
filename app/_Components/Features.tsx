import React from "react";

const Features = () => {
  const features = [
    {
      title: "Scheduling",
      description:
        "Teachers can choose their schedule depending on the availability of the section they'll be teaching. Schedules are dynamically viewed, once teacher choose their schedule it will reflect on the end of other teachers to avoid conflicts.",
    },
    {
      title: "Viewing of grades",
      description:
        "Students can view their grades through the portal. Teachers can encode grades of their students.",
    },
    {
      title: "Easy access",
      description:
        "Students and teachers can access the website through their browsers. Schedules and grades are one tap away from viewing it.",
    },
  ];

  return (
    <section className="my-20 px-8">
      <h1 className="text-3xl font-bold my-10">How it works</h1>

      <div className="flex flex-col gap-10 ">
        {features.map((item, key) => {
          return (
            <div key={key} className="rounded-lg bg-secondary shadow-lg transition-all hover:scale-105" >
              <h1 className="bg-blue-700 text-white text-xl font-semibold px-5 py-2 rounded-t-lg">{item.title}</h1>
              <p className="p-4 text-l">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
