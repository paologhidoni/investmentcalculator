import React from "react";

const ScrollToTopBtn: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 text-xl right-4 p-3 bg-(--secondary-color) text-white cursor-pointer border-3 border-white rounded-full shadow-lg hover:p-4 focus:outline-none transition-all duration-300 ease-in-out"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTopBtn;
