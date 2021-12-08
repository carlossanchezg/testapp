import React from 'react';

import styles from './Button.module.css';

const Button = ({
  content,
  styleBtn,
  containerStyle,
  onPress,
  customDisable,
  customClassName,
}) => {
  return (
    <button
      disabled={customDisable}
      onClick={onPress}
      style={styleBtn}
      type="button"
      className={`${styles.button} ${customClassName ? customClassName : null}`}
    >
      {content}
    </button>
  );
};

export default Button;
