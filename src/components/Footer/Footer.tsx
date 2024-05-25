import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 text-sm text-center text-secondary-foreground">
      &copy; {new Date().getFullYear()} Shoots. All rights reserved.
    </footer>
  );
};

export default Footer;
