import React, { useEffect, useState } from 'react';

import LeftMenuBar from '../LeftMenubar';
import Navbar from '../Navbar';

const Container = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  //   const updateDimensions = () => {
  //     setWidth(window.innerWidth);
  //     setHeight(window.innerHeight);
  //   };
  // //   useEffect(() => {
  // //     window.addEventListener('resize', updateDimensions);
  // //     return () => window.removeEventListener('resize', updateDimensions);
  // //   }, []);

  return (
    <div
      style={{
        // backgroundColor: 'lightblue',
        display: 'flex',
        flexDirection: 'row',
        height: window.innerHeight,
        width: window.innerWidth,
      }}
    >
      <LeftMenuBar />
      <div
        style={
          {
            // backgroundColor: 'mediumturquoise',
          }
        }
      >
        <Navbar screenTitle={props.navTitle} toScreen={props.returnScreen} />
        <div
          style={{
            // backgroundColor: 'lightcyan',
            padding: props.padding ? 15 : null,
            // paddingTop: 15,
            // paddingBottom: 15,
            // paddingLeft: 15,
            // paddingRight: 15,
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Container;
