
import React from 'react';

const CloseButton = ({ onClick }) => {
  return (
    <button
      className="absolute top-2 right-2 text-2xl text-#FF7464 cursor-pointer"
      onClick={onClick}
    >
      &times;
    </button>
  );
};

export default CloseButton;
