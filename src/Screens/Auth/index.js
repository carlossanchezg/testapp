import React, { useEffect, useState } from 'react';
import styles from './Auth.module.css';

import Container from '../../components/Container';
import Calendar from '../../components/Calendar';
import Task from '../../components/Task';
import TasksFilters from '../../components/TasksFilters';
import AuthModal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';

const Auth = () => {
  const [openModal, setOpenModal] = useState(true);

  const [haveAccount, setHaveAccount] = useState(true);

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container navTitle="Tasks" padding={true}>
      <AuthModal
        open={openModal}
        customHeight={haveAccount ? '45%' : '60%'}
        customWidth="30%"
        customLeft="32%"
        customTop={haveAccount ? '23%' : '18%'}
        overlayClick={(value) => setOpenModal(true)}
        content={
          haveAccount ? (
            <div
              style={{
                backgroundColor: 'lightcoral',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-around',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'lightcyan',
                }}
              >
                <FontAwesomeIcon
                  size="lg"
                  icon="graduation-cap"
                  color="black"
                />
                <text className={styles.skool}>Skool</text>
              </div>
              <div
                style={{
                  backgroundColor: 'lightpink',
                  height: '46%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <div>
                  <Input
                    inputValue={email}
                    examplePlaceHolder="Email"
                    inputValueFunction={(e) => setEmail(e.target.value)}
                    inputType="email"
                    customHeight="33px"
                    customWidth="350px"
                    customBorderRadius="100px"
                    customPaddingLeft="30px"
                  />
                </div>
                <div>
                  <Input
                    inputValue={password}
                    examplePlaceHolder="Password"
                    inputValueFunction={(e) => setPassword(e.target.value)}
                    inputType="password"
                    customHeight="33px"
                    customWidth="350px"
                    customBorderRadius="100px"
                    customPaddingLeft="30px"
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Link onClick={() => setHaveAccount(false)}>
                      Don’t have Account ? Signin
                    </Link>

                    <Link>Forget Password ?</Link>
                  </div>
                </div>
              </div>
              <Link to="/tasks">
                <Button
                  styleBtn={{
                    width: 150,
                    height: 50,
                    borderRadius: 100,
                  }}
                  content={<div>Login</div>}
                />
              </Link>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: 'lightcoral',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-around',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'lightcyan',
                }}
              >
                <FontAwesomeIcon
                  size="lg"
                  icon="graduation-cap"
                  color="black"
                />
                <text className={styles.skool}>Skool</text>
              </div>
              <div
                style={{
                  backgroundColor: 'lightpink',
                  height: haveAccount ? '46%' : '65%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <div>
                  <Input
                    inputValue={name}
                    examplePlaceHolder="Name"
                    inputValueFunction={(e) => setName(e.target.value)}
                    inputType="email"
                    customHeight="33px"
                    customWidth="350px"
                    customBorderRadius="100px"
                    customPaddingLeft="30px"
                  />
                </div>
                <div>
                  <Input
                    inputValue={userName}
                    examplePlaceHolder="Username"
                    inputValueFunction={(e) => setUserName(e.target.value)}
                    inputType="email"
                    customHeight="33px"
                    customWidth="350px"
                    customBorderRadius="100px"
                    customPaddingLeft="30px"
                  />
                </div>
                <div>
                  <Input
                    inputValue={email}
                    examplePlaceHolder="Email"
                    inputValueFunction={(e) => setEmail(e.target.value)}
                    inputType="email"
                    customHeight="33px"
                    customWidth="350px"
                    customBorderRadius="100px"
                    customPaddingLeft="30px"
                  />
                </div>
                <div>
                  <Input
                    inputValue={password}
                    examplePlaceHolder="Password"
                    inputValueFunction={(e) => setPassword(e.target.value)}
                    inputType="password"
                    customHeight="33px"
                    customWidth="350px"
                    customBorderRadius="100px"
                    customPaddingLeft="30px"
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Link onClick={() => setHaveAccount(true)}>
                      Have Account ? Login
                    </Link>

                    <Link>Forget Password ?</Link>
                  </div>
                </div>
              </div>
              <Link to="/tasks">
                <Button
                  styleBtn={{
                    width: 150,
                    height: 50,
                    borderRadius: 100,
                  }}
                  content={<div>Signin</div>}
                />
              </Link>
            </div>
          )
        }
      />
      <div
        style={{
          // backgroundColor: 'lightsteelblue',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ backgroundColor: null }}>
          <Calendar />
          <div style={{ backgroundColor: null, marginTop: 20 }}>
            <TasksFilters />
          </div>
        </div>
        <Task />
      </div>
    </Container>
  );
};

export default Auth;
{
  /* <div className={styles.test}>
<div className={styles.container_login}>
  <div>
    <FontAwesomeIcon icon="graduation-cap" color="black" />
    <text className={styles.skool}>Skool</text>
    <Link style={{ color: 'red' }} to={`/tasks`}>
      TASKS SCREEN
    </Link>
  </div>
</div>
</div> */
}
