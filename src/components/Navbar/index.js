import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Colors } from '../../styles';

import { Link } from 'react-router-dom';

const Navbar = ({ screenTitle, toScreen }) => {
  console.log({ screenTitle, toScreen });
  return (
    <div
      style={{
        width: window.innerWidth - 180,
      }}
    >
      <nav
        style={{
          backgroundColor: Colors.SecondaryBackground,
          paddingLeft: 25,
          height: 35,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {toScreen ? (
          <Link to={toScreen}>
            <FontAwesomeIcon
              color="black"
              icon="chevron-left"
              size="lg"
              style={{ marginRight: 15 }}
            />
          </Link>
        ) : null}
        <text style={{ fontSize: 20 }}>{screenTitle}</text>
      </nav>
    </div>
  );
};

export default Navbar;
