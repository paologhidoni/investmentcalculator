import React from "react";

interface Props {
  id: string;
  children: React.ReactNode;
}

const Heading: React.FC<Props> = ({ id, children }) => {
  return (
    <h2
      id={id}
      className="uppercase tracking-wide text-xl md:text-3xl text-center p-2 border-5 border-b-0 border-(--secondary-color) rounded-t-lg"
    >
      {/* for non screen reader users */}
      <span
        aria-hidden="true"
        className=" bg-gradient-to-r from-black to-purple-600 bg-clip-text text-transparent "
      >
        {children}
      </span>

      {/* for screen reader users. This way, the gradient text above is styled, but this one remains readable for assistive tech. */}
      <span className="sr-only">{children}</span>
    </h2>
  );
};

export default Heading;
