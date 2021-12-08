import React from 'react';

import Button from '../Button';

const SubmitBottomButtons = ({
  leftButtonText,
  submitButtonText,
  cancelFunction,
  submitFunction,
  submitBg,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        justifyContent: 'space-evenly',
        marginTop: 25,
      }}
    >
      <Button
        styleBtn={{
          // backgroundColor: null,
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 100,
          width: 143,
          height: 49,
        }}
        onPress={cancelFunction}
        content={<text>{leftButtonText ? leftButtonText : 'Cancel'}</text>}
      />
      <Button
        styleBtn={{
          backgroundColor: submitBg,
          borderRadius: 100,
          width: 143,
          height: 49,
        }}
        onPress={submitFunction}
        content={<text>{submitButtonText}</text>}
      />
    </div>
  );
};

export default SubmitBottomButtons;
