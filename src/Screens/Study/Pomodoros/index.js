import React, { useEffect, useState, useContext } from "react";

import RealmContext from "../../../contexts/RealmContext";

import { isLoggedIn } from "../../../services/realm";

import { ObjectId } from "bson";

import Container from "../../../components/Container";
import StudyModule from "../../../components/StudyModulesContainer";
import AddItemContainer from "../../../components/AddItemContainer";
import CustomModal from "../../../components/Modal";
import TitleAndIconClose from "../../../components/Modal/titleAndIconClose";
import TextAndComponentContainer from "../../../components/Modal/textAndComponentContainer";
import Input from "../../../components/Input";
import SubmitBottomButtons from "../../../components/Modal/submitBottomButtons";
import SwitchSelector from "../../../components/SwitchSelector";
import Button from "../../../components/Button";
import DropDown from "../../../components/DropDown";
import MenuIcon from "../../../components/MenuIcon";
import Spinner from "../../../components/Spinner";

import TextLink from "../../../components/TextLink";

import { Colors } from "../../../styles";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { courseColors } from "../../../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Pomodoros.module.css";

const Pomodoro = () => {
  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [userPomodoros, setUserPomodoros] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openPomodoroModal, setOpenPomodoroModal] = useState(false);

  const [pomodoroName, setPomodoroName] = useState("");
  const [pomodoroColorPosition, setPomodoroColorPosition] = useState(0);
  const [pomodoroConcentrationTime, setPomodoroConcentrationTime] = useState(0);
  const [pomodoroBreatTime, setPomodoroBreatTime] = useState(0);
  const [pomodoroSessions, setPomodoroSessions] = useState(0);
  const [pomodoroAutoRepeatSessions, setPomodoroAutoRepeatSessions] =
    useState(false);

  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [pomodoroOver, setPomodoroOver] = useState(false);
  const [key, setKey] = useState(0);

  const pomodoroModalView = () => {
    const children = (remainingTime) => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      return `${minutes}:${seconds}`;
    };

    return (
      <CustomModal
        open={openPomodoroModal}
        customHeight="420px"
        customTop="20%"
        overlayClick={(value) => {}}
        content={
          <div
            style={{
              height: "100%",
              width: "100%",
              // backgroundColor: 'orange',
            }}
          >
            <TitleAndIconClose
              modalTitle={`Pomodoro ${pomodoroName}`}
              closeModal={(value) => setOpenPomodoroModal(value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                // backgroundColor: 'red',
                height: "75%",
              }}
            >
              <CountdownCircleTimer
                isPlaying={start ? (pause ? false : true) : false}
                size={270}
                key={key}
                onComplete={() => {
                  // do your stuff here
                  setPomodoroOver(true);
                  // handleAnimation();
                  // return [true, 1500]; // repeat animation in 1.5 seconds
                }}
                duration={pomodoroConcentrationTime}
                colors={[[courseColors[pomodoroColorPosition].color1], [courseColors[pomodoroColorPosition].color2]]}
              >
                {({ remainingTime, animatedColor }) => (
                  <text
                    style={{
                      fontSize: 40,
                      // fontFamily: Typography.RoutineProperties,
                      color: "black",
                    }}
                  >
                    {pomodoroOver ? "Finish" : children(remainingTime)}
                  </text>
                )}
              </CountdownCircleTimer>
            </div>
            <SubmitBottomButtons
              cancelFunction={() => {
                setStart(false);
                setPause(false);
                setPomodoroOver(false);
                setKey((prevKey) => prevKey + 1);
                // setPause(true);
              }}
              leftButtonText="Reiniciar"
              submitFunction={() => {
                start ? setPause(!pause) : setStart(true);
              }}
              submitButtonText={
                start ? (pause ? "Reanudar" : "Pausa") : "Start"
              }
              submitBg="lightblue"
            />
          </div>
        }
      />
    );
  };

  const concentrationTimeOptions = [
    { value: 300, label: "5 minutes" },
    { value: 600, label: "10 minutes" },
    { value: 900, label: "15 minutes" },
  ];
  const breakTimeOptions = [
    { value: 300, label: "5 minutes" },
    { value: 600, label: "10 minutes" },
    { value: 900, label: "15 minutes" },
  ];
  const sessionsOptions = [
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  const refreshPomdoros = async () => {
    if (realm && isLoggedIn(realmApp)) {
      const pomodoros = realm.objects("Pomodoro");

      setUserPomodoros(pomodoros);

      console.log(pomodoros.map((item) => item));
    }
  };

  useEffect(() => {
    refreshPomdoros();
  }, [realm]);

  const handleCreatePomodoro = async (e) => {
    e.preventDefault();

    const data = {
      _id: ObjectId(),
      userID: realmApp.currentUser ? realmApp.currentUser.id : "unknownUser",
      name: pomodoroName,
      concentrationTime: pomodoroConcentrationTime,
      breakTime: pomodoroBreatTime,
      sessions: pomodoroSessions,
      autoRepeatSession: pomodoroAutoRepeatSessions,
      colorPosition: pomodoroColorPosition,
    };

    try {
      /* Save course */
      if (realm && isLoggedIn(realmApp)) {
        realm.write(() => {
          realm.create("Pomodoro", data);
        });
        refreshPomdoros();
      }
      setOpenModal(false);
    } catch (error) {
      console.log("ERR IN CREATE NEW COURSE", error);
    }
  };

  return (
    <Container navTitle="Study - Pomodoro" returnScreen="/study">
      <div className={styles.container}>
        <StudyModule
          color1="#169587"
          color2="#A6CA63"
          fixed={true}
          backgroundFigures={
            <>
              <div
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "300px",
                  backgroundImage:
                    "linear-gradient(to bottom right, #A6CA63, #169587 70%)",
                  borderRadius: "1000px",
                  top: "60px",
                  left: "-40px",
                  transform: "rotate(20deg)",
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
                size="3x"
                style={{
                  transform: "rotate(-20deg)",
                  position: "absolute",
                  top: "50px",
                  left: "960px",
                }}
              />
              <FontAwesomeIcon
                color="white"
                icon="redo"
                size="3x"
                style={{
                  transform: "rotate(20deg)",
                  position: "absolute",
                  top: "110px",
                  left: "920px",
                }}
              />
            </>
          }
        />
        {/* <CoursesList goPage="notifications-study" /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // backgroundColor: 'red',
            margin: "25px",
          }}
        >
          <AddItemContainer
            itemAreaText="Pomodoros"
            onPressFunction={() => setOpenModal(true)}
            buttonText="New Pomodoro"
          />
          <CustomModal
            open={openModal}
            customHeight="420px"
            customTop="20%"
            overlayClick={(value) => setOpenModal(value)}
            content={
              <div
                style={{
                  // backgroundColor: 'steelblue',
                  height: "100%",
                }}
              >
                <TitleAndIconClose
                  modalTitle="Create New Pomodoro"
                  closeModal={(value) => setOpenModal(value)}
                />
                <div style={{ paddingLeft: 25, paddingRight: 25 }}>
                  <TextAndComponentContainer>
                    <text>Name</text>
                    <Input
                      inputValue={pomodoroName}
                      examplePlaceHolder="Ex; For Math"
                      inputValueFunction={(e) =>
                        setPomodoroName(e.target.value)
                      }
                      inputType="email"
                    />
                  </TextAndComponentContainer>

                  <TextAndComponentContainer>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <text>Concentration</text>
                      <text style={{ fontSize: 8 }}>min</text>
                    </div>

                    <DropDown
                      dropOptions={concentrationTimeOptions}
                      dropValue={(value) =>
                        setPomodoroConcentrationTime(value.value)
                      }
                      dropPlace="Concentration Time"
                    />
                  </TextAndComponentContainer>

                  <TextAndComponentContainer>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <text>Break</text>
                      <text style={{ fontSize: 8 }}>min</text>
                    </div>

                    <DropDown
                      dropOptions={breakTimeOptions}
                      dropValue={(value) => setPomodoroBreatTime(value.value)}
                      dropPlace="Break Time"
                    />
                  </TextAndComponentContainer>

                  <TextAndComponentContainer>
                    <text>Session</text>

                    <DropDown
                      dropOptions={sessionsOptions}
                      dropValue={(value) => setPomodoroSessions(value.value)}
                      dropPlace="Sessions"
                    />
                  </TextAndComponentContainer>

                  <TextAndComponentContainer>
                    <text>Color</text>
                    <SwitchSelector
                      customBorder="8px"
                      scroll={true}
                      content={courseColors.map((item) =>
                        item.position === pomodoroColorPosition ? (
                          <div
                            onClick={() =>
                              setPomodoroColorPosition(item.position)
                            }
                            style={{
                              backgroundImage: `linear-gradient(to bottom right, ${
                                courseColors[item.position].color1
                              }, ${courseColors[item.position].color2} 70%)`,
                              display: "flex",
                              alignItems: "center",
                              paddingLeft: "39px",
                              paddingRight: "39px",
                              marginLeft: 2,
                              marginRight: 2,
                              paddingTop: "13px",
                              paddingBottom: "14px",
                              borderRadius: "7px",
                              borderStyle: "solid",
                              borderWidth: 3,
                              borderColor: "black",
                            }}
                          />
                        ) : (
                          <div
                            onClick={() =>
                              setPomodoroColorPosition(item.position)
                            }
                            style={{
                              backgroundImage: `linear-gradient(to bottom right, ${
                                courseColors[item.position].color1
                              }, ${courseColors[item.position].color2} 70%)`,
                              display: "flex",
                              alignItems: "center",
                              paddingLeft: "39px",
                              paddingRight: "39px",
                              marginLeft: 2,
                              marginRight: 2,
                              paddingTop: "16px",
                              paddingBottom: "15px",
                              borderRadius: "7px",
                            }}
                          />
                        )
                      )}
                    />
                  </TextAndComponentContainer>

                  <SubmitBottomButtons
                    cancelFunction={() => setOpenModal(false)}
                    submitFunction={(e) => handleCreatePomodoro(e)}
                    submitButtonText="Crear"
                    submitBg="lightblue"
                  />
                </div>
              </div>
            }
          />
          {
            userPomodoros.length > 0 ? <div className={styles.pomdoros_container}>
            {userPomodoros.map((item) => (
              <div
                className={styles.pomodoro_module}
                style={{
                  backgroundColor: Colors.SecondaryBackground,
                }}
                onClick={() => {
                  setOpenPomodoroModal(true);
                  setStart(false);
                  setPause(false);
                  setPomodoroOver(false);

                  setPomodoroName(item.name)
                  setPomodoroConcentrationTime(item.concentrationTime);
                  setPomodoroColorPosition(item.colorPosition)
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon="stopwatch"
                    size="3x"
                    color={courseColors[item.colorPosition].color1}
                    style={{marginRight: 20}}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "red",
                      width: 150,
                    }}
                  >
                    <text>{item.name}</text>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <text>{item.concentrationTime / 60} M</text>
                        <FontAwesomeIcon icon="brain" color="black" size="sm" />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <text>{item.breakTime / 60} M</text>
                        <FontAwesomeIcon
                          icon="coffee"
                          color="black"
                          size="sm"
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <text>{item.sessions}</text>
                        <FontAwesomeIcon icon="redo" color="black" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
                <MenuIcon
                  noPaddingRight={true}
                  iconColor="black"
                  elementName="Pomodoro"
                />
              </div>
            ))}
          </div> : <Spinner enable={userPomodoros.length === 0 ? true : false} />
          }
          {pomodoroModalView()}
        </div>
      </div>
    </Container>
  );
};

export default Pomodoro;
