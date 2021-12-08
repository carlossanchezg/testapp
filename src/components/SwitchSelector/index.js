import React from 'react';

const SwitchSelector = ({ scroll, content, customBorder }) => {
  return (
    <div
      style={{
        backgroundColor: '#e8e8e8',
        display: 'flex',
        alignItems: 'center',
        overflow: scroll ? 'scroll' : null,
        justifyContent: scroll ? null : 'space-around',
        width: 337,
        height: '35px',
        borderRadius: customBorder ? customBorder : '50px',
      }}
    >
      {content}
    </div>
  );
};

export default SwitchSelector;
