import React from "react";

const About = () => {
  return (
    <section id="about" className=" py-10 px-8 scroll-mt-20 ">
      {/* headings */}
      <h1 className="text-4xl font-bold mb-10">About</h1> 

      {/* lorem description */}
      <div className="flex items-start gap-10 md:max-w-6xl mx-auto my-10" >
        <img className="w-96 scale-105 object-fill rounded-md max-lg:hidden" src="/main.jpg" alt="" />
        <p className="text-slate-500 font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          labore neque magni necessitatibus similique ab quo amet, beatae unde
          commodi est repudiandae quod exercitationem! Aut quaerat harum nihil
          quisquam quo nemo beatae ipsa mollitia tenetur amet? Eaque voluptate
          nemo animi, hic est recusandae consequatur aspernatur sed molestias
          voluptatem perferendis blanditiis omnis et, facere impedit consectetur
          necessitatibus illum quis reiciendis, nam accusantium quas
          perspiciatis autem! Officiis velit rem facere? Neque suscipit,
          aspernatur magnam rerum iure aliquid earum. Suscipit ipsum
          perspiciatis possimus illo! Qui commodi, nihil adipisci ab nisi
          architecto maiores saepe harum ducimus fugit rerum. Provident non
          laboriosam quaerat tenetur ducimus itaque perferendis nihil voluptatem
          eaque ut quisquam necessitatibus, placeat fugiat.
        </p>
      </div>
    </section>
  );
};

export default About;
