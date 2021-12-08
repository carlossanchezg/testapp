import React, {useContext, useState} from 'react';

import Button from '../Button';
import styles from '../../Screens/Auth/Auth.module.css';
import AuthModal from '../Modal';
import Input from '../Input';
import { Link } from 'react-router-dom';
import Realm from 'realm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RealmContext from '../../contexts/RealmContext';

import { isLoggedIn, getRealmApp, getRealm } from '../../services/realm';
import { isEmpty } from '../../utils';

const AddButton = ({ onPress, text }) => {
  const {realmApp, setRealmApp, realm, setRealm} = useContext(RealmContext);

  const [openModal, setOpenModal] = useState(false);

  const [haveAccount, setHaveAccount] = useState(true);

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleLogin = async (emaill, passwordd) => {
    if (isEmpty(emaill)){
      alert('Email is required');
      return;
    }
    if (isEmpty(passwordd)){
      alert('Password is required');
      return;
    }
    setAuthLoading(true);
    try {
      const credentials = Realm.Credentials.emailPassword(emaill.toLowerCase(), passwordd);
      const user = await realmApp.logIn(credentials);
      if (user && user.isLoggedIn) {
        setRealmApp(getRealmApp());
        setRealm(await getRealm());
        setOpenModal(false);
      } else alert('Login failed');
    } catch (err) {
      alert(err.message);
      console.error('Failed to log in', err);
    }
    setAuthLoading(false);
  };

  const handleAuth = () => {
    return (<AuthModal
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

          <Button
            styleBtn={{
              width: 150,
              height: 50,
              borderRadius: 100,
            }}
            content={ !authLoading ? <div>Login</div> : <div>Loading...</div>}
            onPress={_ => handleLogin(email, password)}
          />

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
          <Link to="/">
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
    />);
  }
  return (
    <>
    {handleAuth()}
      <Button
        onPress={ isLoggedIn(realmApp) ? onPress : _ => setOpenModal(true)}
        content={
          <div
          // style={{
          //   display: 'flex',
          //   alignItems: 'center',
          // }}
          >
            <text style={{ color: 'white', marginRight: 5 }}>{text}</text>
            <FontAwesomeIcon size="sm" icon="plus" color="white" />
          </div>
        }
        styleBtn={{
          borderRadius: 100,
          height: 40,
          paddingLeft: 33,
          paddingRight: 33,
          backgroundColor: '#0B6DF6',
        }}
      />
    </>
  );
};

export default AddButton;

