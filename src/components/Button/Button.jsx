import React from 'react';
import './Button.css';

//we are passing props that we will be using in other components and also "...otherButtonAttributes" to pass other attributes later like 'onClick' etc.

function Button({ text, className, type = 'button', ...otherButtonAttributes }) {
  return (
    <button className={`btn ${className}`} type={type} {...otherButtonAttributes}>
      {text}
    </button>
  );
}

export default Button;
