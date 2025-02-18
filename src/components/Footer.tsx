import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <p className="text-white text-center pb-4">
        &copy; &nbsp;
        <a
          href="https://paologhidoni.github.io/portfolio/"
          className="underline underline-offset-5"
        >
          Paolo Ghidoni
        </a>
        &nbsp;
        {new Date().getUTCFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
