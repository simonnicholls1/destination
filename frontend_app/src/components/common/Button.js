import React from 'react';

const Button = ({ text, onClick }) => {
  const buttonStyles = {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: 'white',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  const hoverStyles = {
    backgroundColor: 'rgba(52, 152, 219, 0.7)',
  };

  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...buttonStyles, ...(hovered ? hoverStyles : {}) }}
    >
      {text}
    </button>
  );
};

export default Button;
