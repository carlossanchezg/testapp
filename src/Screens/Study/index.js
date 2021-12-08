import React, { useEffect, useState } from 'react';

import TextLink from '../../components/TextLink';

import Container from '../../components/Container';
import StudyModule from '../../components/StudyModulesContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';

import styles from './Study.module.css';

const Study = () => {
  return (
    <Container navTitle="Study">
      <div className={styles.container}>
        <StudyModule
          color1="#E8207A"
          color2="#F05468"
          backgroundFigures={
            <>
              <div
                style={{
                  position: 'absolute',
                  width: '150px',
                  height: '300px',
                  backgroundImage:
                    'linear-gradient(to bottom right, #F05468, #E8207A 70%)',
                  borderRadius: '20px',
                  top: '60px',
                  left: '370px',
                  transform: 'rotate(-40deg)',
                }}
                className={styles.backgroundFigure}
              />
            </>
          }
          leftContentTitle="Notifications"
          leftContentDescription="Estudia lo que quieras via notificacines con el metodo de repeticion
          constante, Estudia lo que quieras via notificacines con el metodo de repeticion
          constante, Estudia lo que quieras via notificacines con el metodo de repeticion
          constante, Estudia lo que quieras via notificacines con el metodo de repeticion
          constante"
          rightContentTop={
            <>
              <FontAwesomeIcon
                color="white"
                icon="bell"
                size="2x"
                style={{
                  transform: 'rotate(-20deg)',
                  position: 'absolute',
                  top: '50px',
                  left: '390px',
                }}
              />
              <FontAwesomeIcon
                color="white"
                icon="redo"
                size="2x"
                style={{
                  transform: 'rotate(20deg)',
                  position: 'absolute',
                  top: '90px',
                  left: '360px',
                }}
              />
            </>
          }
          toRoute={`/notifications-study`}
        />
        <StudyModule
          color1="#02BAEF"
          color2="#006EE5"
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
                  top: '40px',
                  left: '410px',
                  transform: 'rotate(-80deg)',
                }}
                className={styles.backgroundFigure}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '110px',
                  height: '110px',
                  backgroundImage:
                    'linear-gradient(to bottom right, #006EE5, #02BAEF 60%)',
                  borderRadius: '1000px',
                  top: '200px',
                  left: '-40px',
                  transform: 'rotate(50deg)',
                }}
                className={styles.backgroundFigure}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '110px',
                  height: '110px',
                  backgroundImage:
                    'linear-gradient(to bottom right, #006EE5, #02BAEF 60%)',
                  borderRadius: '1000px',
                  top: '290px',
                  left: '300px',
                  transform: 'rotate(0deg)',
                }}
                className={styles.backgroundFigure}
              />
            </>
          }
          rightContentTop={
            <>
              <FontAwesomeIcon
                color="white"
                icon="bell"
                size="2x"
                style={{
                  transform: 'rotate(-20deg)',
                  position: 'absolute',
                  top: '50px',
                  left: '390px',
                }}
              />
              <FontAwesomeIcon
                color="white"
                icon="redo"
                size="2x"
                style={{
                  transform: 'rotate(20deg)',
                  position: 'absolute',
                  top: '90px',
                  left: '360px',
                }}
              />
            </>
          }
          leftContentTitle="Flash Cards"
          leftContentDescription="Estudia con tarjetas"
          toRoute={`/flash-cards`}
        />
        <StudyModule
          color1="#169587"
          color2="#A6CA63"
          backgroundFigures={
            <>
              <div
                style={{
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  backgroundImage:
                    'linear-gradient(to bottom right, #A6CA63, #169587 70%)',
                  borderRadius: '1000px',
                  top: '60px',
                  left: '-40px',
                  transform: 'rotate(20deg)',
                }}
                className={styles.backgroundFigure}
              />
            </>
          }
          leftContentTitle="Pomodoro"
          leftContentDescription="Intervalos de estudio para qur"
          rightContentTop={
            <>
              <FontAwesomeIcon
                color="white"
                icon="bell"
                size="2x"
                style={{
                  transform: 'rotate(-20deg)',
                  position: 'absolute',
                  top: '50px',
                  left: '390px',
                }}
              />
              <FontAwesomeIcon
                color="white"
                icon="redo"
                size="2x"
                style={{
                  transform: 'rotate(20deg)',
                  position: 'absolute',
                  top: '90px',
                  left: '360px',
                }}
              />
            </>
          }
          toRoute={`/pomodoros`}
        />
        <StudyModule
          color1="#791BF4"
          color2="#3880EC"
          backgroundFigures={
            <>
              <div
                style={{
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  backgroundImage:
                    'linear-gradient(to bottom right, #3880EC, #791BF4 70%)',
                  borderRadius: '0px',
                  top: '230px',
                  left: '-130px',
                  transform: 'rotate(70deg)',
                }}
                className={styles.backgroundFigure}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  backgroundImage:
                    'linear-gradient(to bottom right, #3880EC, #791BF4 70%)',
                  borderRadius: '0px',
                  top: '-120px',
                  left: '290px',
                  transform: 'rotate(-60deg)',
                }}
                className={styles.backgroundFigure}
              />
            </>
          }
          rightContentTop={
            <>
              <FontAwesomeIcon
                color="white"
                icon="bell"
                size="2x"
                style={{
                  transform: 'rotate(-20deg)',
                  position: 'absolute',
                  top: '50px',
                  left: '390px',
                }}
              />
              <FontAwesomeIcon
                color="white"
                icon="redo"
                size="2x"
                style={{
                  transform: 'rotate(20deg)',
                  position: 'absolute',
                  top: '90px',
                  left: '360px',
                }}
              />
            </>
          }
          leftContentTitle="Exams"
          leftContentDescription="Esta al tanto de todos los examanes que tengas y estudia para ellos"
          toRoute={`/exams`}
        />
      </div>
    </Container>
  );
};

export default Study;
