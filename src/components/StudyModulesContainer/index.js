import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';

import styles from './StudyModulesContainer.module.css';

const StudyModulesContainer = ({
  color1,
  color2,
  backgroundFigures,
  leftContentTitle,
  leftContentDescription,
  rightContentTop,
  toRoute,
  fixed,
}) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${color1}, ${color2} 70%)`,
        padding: '25px',
        // backgroundColor: 'yellow',
        // padding: '25px',
        // display: 'flex',
        // justifyContent: 'center',
        // height: '350px',
        // margin: '45px',
        // borderRadius: '25px',
        overflow: 'hidden',
        position: 'relative',
      }}
      className={
        fixed
          ? styles.study_module_container_header
          : styles.study_module_container
      }
    >
      {backgroundFigures}
      <div style={{ width: '70%', backgroundColor: null }}>
        <h2 style={{ color: 'white', position: 'absolute' }}>
          {leftContentTitle}
        </h2>
        <text
          style={{
            color: 'white',
            position: 'absolute',
            top: 100,
            width: fixed ? '75%' : 300,
            backgroundColor: 'pink',
          }}
        >
          {leftContentDescription}
        </text>
      </div>
      <div
        style={{
          width: '30%',
          // backgroundColor: 'orange',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '25px 0px 25px 0px',
          alignItems: 'center',
        }}
      >
        <div>{rightContentTop}</div>
        {fixed ? null : (
          <Link to={toRoute}>
            <FontAwesomeIcon
              color="white"
              icon="long-arrow-alt-right"
              size="lg"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default StudyModulesContainer;
