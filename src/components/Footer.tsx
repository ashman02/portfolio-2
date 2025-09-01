import React from "react";

const Footer = () => {
  return (
    <footer className="bg-foreground relative -z-10 -mt-2 flex flex-col items-center justify-center gap-4 px-2 pb-4 pt-6 md:flex-row md:justify-between md:px-4 md:pb-12 md:pt-14 lg:px-16">
      <div className="flex flex-col items-center gap-1 md:items-start">
        <h3 className="para-text text-gray-400">Email</h3>
        <p className="para-text text-background">sidhuashman02@gmail.com</p>
      </div>
      <div className="flex flex-col items-center gap-1 md:items-start">
        <h3 className="para-text text-gray-400">Socials</h3>
        <div className="flex items-center gap-3">
          {["Instagram", "Linkedin", "Github", "X"].map((social) => (
            <p key={social} className="para-text text-background">
              {social}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
