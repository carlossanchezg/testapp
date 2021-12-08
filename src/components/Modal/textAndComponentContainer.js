import React from 'react';

const TextAndComponentContainer = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25,
      }}
    >
      {props.children}
    </div>
  );
};

export default TextAndComponentContainer;
