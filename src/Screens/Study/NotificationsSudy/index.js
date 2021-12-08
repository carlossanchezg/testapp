import React from 'react';

import Container from '../../../components/Container';
import StudyModule from '../../../components/StudyModulesContainer';
import CoursesList from '../../../components/CoursesList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './NotificationsStudy.module.css';

const NotificationsSudy = () => {
  return (
    <Container navTitle="Study - notifications" returnScreen="/study">
      <div className={styles.container}>
        <StudyModule
          color1="#E8207A"
          color2="#F05468"
          fixed={true}
          backgroundFigures={
            <>
              <div
                style={{
                  position: 'absolute',
                  width: '180px',
                  height: '330px',
                  backgroundImage:
                    'linear-gradient(to bottom right, #F05468, #E8207A 70%)',
                  borderRadius: '10px',
                  top: '60px',
                  left: '970px',
                  transform: 'rotate(-40deg)',
                }}
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
        <CoursesList goPage="notifications-study-course" />
      </div>
    </Container>
  );
};

export default NotificationsSudy;
