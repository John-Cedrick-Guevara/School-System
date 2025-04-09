import React from "react";

const Features = () => {
  // features of the cite
  const features = [
    {
      title: "Scheduling",
      description:
        "Teachers can efficiently create, update, and manage class schedules with automated conflict detection. Students can view their assigned class schedules in real time, ensuring they stay organized. The system also allows for schedule adjustments while keeping all stakeholders informed of any changes.",
    },
    {
      title: "Viewing of grades",
      description:
        "Users can log in and quickly navigate the system without hassle. The intuitive interface ensures that all essential features are easily reachable. With a single account, students and teachers can securely access their schedules, grades, and other relevant information.",
    },
    {
      title: "Easy access",
      description:
        "Students can check their grades instantly through a clear and organized dashboard. The system updates grades in real-time, ensuring transparency and accuracy. Historical grade records are also available, allowing students to track their academic progress over time.",
    },
  ];

  return (
    <section id="features" className="py-10 px-8 scroll-mt-20" >
      <h1 className="text-4xl font-bold my-10">Features</h1>

      <div className="flex flex-wrap justify-center w-fit mx-auto max-md:flex-col gap-10  ">
        {features.map((item, key) => {
          return (
            <div
              style={{ marginBottom: `${key * -20}px`, marginTop: `${key * 20}px` }}
              key={key}
              className="rounded-lg  max-w-md shadow-lg transition-all hover:scale-[103%] "
            >
              <h1 className="bg-blue-700 text-white text-xl font-semibold px-5 py-2 rounded-t-lg">
                {item.title}
              </h1>
              <p className="p-6 text-slate-500">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
