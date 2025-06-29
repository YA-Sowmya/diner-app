import React, { useState } from 'react';

function Button({ onClick, className = '', children }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    setClicked(true);
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setClicked(false)}
      className={`
        bg-accent text-primary 
        border-2 border-accent 
        rounded-lg 
        focus:outline-none 
        focus-visible:ring-2 focus-visible:ring-accent 
        transition-colors duration-200 
        ${!clicked ? 'md:hover:bg-highlight md:hover:text-accent' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
