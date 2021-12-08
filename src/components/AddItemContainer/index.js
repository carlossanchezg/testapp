import React from 'react';

import Button from '../Button';
import AddButton from '../AddButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddItemContainer = ({
  itemAreaText,
  onPressFunction,
  buttonText,
  customIcon,
  noItems,
}) => {
  return (
    <div
      style={{
        // backgroundColor: 'lightsteelblue',
        display: 'flex',
        flexDirection: noItems ? 'column' : 'row',
        justifyContent: noItems ? 'center' : 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <FontAwesomeIcon color="black" size="lg" icon={customIcon} />
        <text style={{ fontSize: 25, marginLeft: 5 }}>{itemAreaText}</text>
      </div>
      <AddButton onPress={onPressFunction} text={buttonText} />
    </div>
  );
};

export default AddItemContainer;
