import React from "react";

interface Props {
  children: React.ReactNode;
}

const Heading: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="uppercase tracking-wide bg-gradient-to-r from-black to-purple-600 bg-clip-text text-transparent text-4xl text-center p-2 border-5 border-b-0 border-(--secondary-color) rounded-t-full">
      {children}
    </h2>
  );
};

export default Heading;
