import React from "react";

import { SpinnerCircular } from "spinners-react";
import { Colors } from '../../styles';

const Spinner = ({enable}) => {
  return (
      <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 300
      }}>
          <SpinnerCircular enabled={enable} size={100} color="gray" secondaryColor={Colors.SecondaryBackground} />
      </div>
  )
};

export default Spinner;
