import React from "react";
import Image from "next/image";

const Hero = () => {
  const images = [
    "chappel.jpg",
    "front.jpg",
    "main.jpg",
    "pre school.jpg",
    "quad.jpg",
    "room1.jpg",
    "room2.jpg",
    "lab.jpg",
    "playground.jpg",
  ];
  return (
    <main id="home" className="py-20 px-8 flex max-lg:flex-col items-center justify-between flex-grow gap-10">
      {/* text part */}
      <div className="space-y-5 max-w-lg mx-auto">
        <h1 className="font-bold text-6xl leading-12">
          Welcome to <span className="text-blue-700 text-7xl">OLOPSC</span>{" "}
          school system
        </h1>
        <p className="text-muted-foreground">
          Good day Students and Teachers. Boost your productivity using our
          school system.{" "}
        </p>
      </div>

      {/* sliding images */}
      {/* main container */}
      <div className=" overflow-hidden md:scale-125 my-10 h-80 z-0 max-w-sm mx-auto">
        {/* sliding images container */}
        <div className=" w-full animate-move-up">
          {images.map((item, index) => (
            <img
              key={index}
              src={`/${item}`}
              width={170}
              height={0}
              className={`relative rounded-lg my-2 object-fit: cover h-25 inline-block  ${
                index % 2 === 1 ? "left-0" : ""
              }}`}
              style={{
                top: `${index % 2 === 1 && "50px"}`,
                left: `${index % 2 === 1 && "0.5rem"}`,
              }}
              alt="asd"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Hero;
