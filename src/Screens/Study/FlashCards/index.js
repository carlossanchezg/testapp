import React from 'react';

import Container from '../../../components/Container';
import StudyModule from '../../../components/StudyModulesContainer';
import CoursesList from '../../../components/CoursesList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './FlashCardsCourses.module.css';

const FlashCards = () => {
  return (
    <Container navTitle="Study - Flash Cards" returnScreen="/study">
      <div className={styles.container}>
        <StudyModule
          color1="#02BAEF"
          color2="#006EE5"
          fixed={true}
          backgroundFigures={
            <>
              <div
                style={{
                  position: 'absolute',
                  width: '110px',
                  height: '110px',
                  backgroundImage:
                    'linear-gradient(to bottom right, #006EE5, #02BAEF 70%)',
                  borderRadius: '1000px',
                  top: '-20px',
                  left: '1020px',
                  transform: 'rotate(-80deg)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '110px',
                  height: '110px',
                  backgroundImage:
                    'linear-gradient(to bottom right, #006EE5, #02BAEF 60%)',
                  borderRadius: '1000px',
                  top: '100px',
                  left: '-40px',
                  transform: 'rotate(50deg)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '110px',
                  height: '110px',
                  backgroundImage:
                    'linear-gradient(to bottom right, #006EE5, #02BAEF 60%)',
                  borderRadius: '1000px',
                  top: '180px',
                  left: '800px',
                  transform: 'rotate(0deg)',
                }}
              />
            </>
          }
          leftContentTitle="Flash Cards"
          leftContentDescription="Estudia con tarjetas"
          rightContentTop={
            <>
              <FontAwesomeIcon
                color="white"
                icon="bell"
                size="3x"
                style={{
                  transform: 'rotate(-20deg)',
                  position: 'absolute',
                  top: '50px',
                  left: '960px',
                }}
              />
              <FontAwesomeIcon
                color="white"
                icon="redo"
                size="3x"
                style={{
                  transform: 'rotate(20deg)',
                  position: 'absolute',
                  top: '110px',
                  left: '920px',
                }}
              />
            </>
          }
        />
        <CoursesList goPage="flash-cards-course" />
      </div>
    </Container>
  );
};

export default FlashCards;
