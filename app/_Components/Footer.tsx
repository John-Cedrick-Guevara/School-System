import React from "react";

const Footer = () => {
  // icons
  const socials = [
    "icon-facebook.svg",
    "icon-instagram.svg",
    "icon-pinterest.svg",
    "icon-twitter.svg",
  ];
  
  return (
    <footer id="socials" className="bg-blue-700 p-8 scroll-smooth">
      <h1 className="text-3xl font-bold text-white text-center">Get in touch with us:</h1>

      <div className="flex items-center justify-evenly w-56 mx-auto my-10">
        {socials.map((item, key) => {
          return <img className="cursor-pointer" key={key} src={`${item}`} alt="" />;
        })}
      </div>
    </footer>
  );
};

export default Footer;
