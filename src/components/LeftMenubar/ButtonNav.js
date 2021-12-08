import React from 'react';

import Button from '../Button';
import TextLink from '../TextLink';

import { Link } from 'react-router-dom';

const ButtonNav = ({ textButton, goScreen, active }) => {
  return (
    <Button
      content={
        <TextLink
          goPage={`/${goScreen}`}
          content={
            <div
              style={{
                color: active ? 'black' : 'gray',
                display: 'flex',
                textAlign: 'start',
                paddingLeft: 14,
                paddingTop: 9,
                paddingBottom: 9,
              }}
            >
              <text style={{ fontSize: 14 }}>{textButton}</text>
            </div>
          }
        />
        // <Link
        //   style={{
        //     color: active ? 'black' : 'gray',
        //     display: 'flex',
        //     textAlign: 'start',
        //     paddingLeft: 14,
        //     paddingTop: 9,
        //     paddingBottom: 9,
        //   }}
        //   to={`/${goScreen}`}
        // >
        //   {textButton}
        // </Link>
      }
      styleBtn={{
        backgroundColor: active ? 'white' : '#F7F8FC',
        width: 170,
        borderRadius: 6,
        marginBottom: 10,
      }}
    />
  );
};

export default ButtonNav;
