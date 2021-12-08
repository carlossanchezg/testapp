import React, { useEffect, useState, useContext } from "react";

import RealmContext from "../../contexts/RealmContext";

import { isLoggedIn, getRealm } from "../../services/realm";

import { ObjectId } from "bson";

import Container from "../../components/Container";
import Button from "../../components/Button";
import AddItemContainer from "../../components/AddItemContainer";
import CustomModal from "../../components/Modal";
import TitleAndIconClose from "../../components/Modal/titleAndIconClose";
import TextAndComponentContainer from "../../components/Modal/textAndComponentContainer";
import Input from "../../components/Input";
import SubmitBottomButtons from "../../components/Modal/submitBottomButtons";
import SwitchSelector from "../../components/SwitchSelector";
import TextLink from "../../components/TextLink";
import MenuIcon from "../../components/MenuIcon";
import Spinner from "../../components/Spinner";

import Switch from "react-switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { courseColors, icons, routinesColors } from "../../utils";

import styles from "./Routines.module.css";

const Routines = () => {
  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [openModal, setOpenModal] = useState(false);

  const [userRoutines, setUserRoutines] = useState([]);

  const [routineNameInput, setRoutineNameInput] = useState("");
  const [routineDescriptionInput, setRoutineDescriptionInput] = useState("");
  const [routineSelectedColorPosition, setRoutineSelectedColorPosition] =
    useState(0);
  const [privateRoutineSwitch, setPrivateRoutineSwitch] = useState(false);

  const refreshRoutines = async () => {
    if (realm && isLoggedIn(realmApp)) {
      const routines = realm.objects("Routine");

      setUserRoutines(routines);

      console.log(routines.map((item) => item));
    }
  };

  useEffect(() => {
    refreshRoutines();
  }, [realm]);

  const handleCreateRoutine = async (e) => {
    // e.preventDefault();

    console.log("1");

    const data = {
      _id: ObjectId(),
      userID: realmApp.currentUser ? realmApp.currentUser.id : "unknownUser",
      colorPosition: routineSelectedColorPosition,
      description: routineDescriptionInput,
      name: routineNameInput,
      public: privateRoutineSwitch,
      tasks: [],
      creator: {
        id: realmApp.currentUser ? realmApp.currentUser.id : "unknownUser",
        name: realmApp.currentUser
          ? realmApp.currentUser.customData.name
          : "unknownUser",
        img: realmApp.currentUser
          ? realmApp.currentUser.customData.userProfileImg
          : "unknownUser",
      },
    };

    console.log("2");
    try {
      console.log("3");
      /* Save course */
      if (realm && isLoggedIn(realmApp)) {
        console.log("4");
        realm.write(() => {
          realm.create("Routine", data);
        });
        refreshRoutines();
        console.log("5");
      }
      setOpenModal(false);
      console.log("6");
    } catch (error) {
      console.log("ERR IN CREATE NEW ROUTINE", error);
    }
  };

  const handleDeleteRoutine = async (e, courseId) => {};

  return (
    <Container navTitle="Routines">
      <div
        style={{
          backgroundColor: "lightyellow",
        }}
      >
        <TextLink
          goPage="/community"
          content={
            <Button
              content={
                <div>
                  <text>
                    Discover and use the routines of students around the world
                  </text>
                </div>
              }
              styleBtn={{
                // backgroundImage: `url("../../assets/images/skbg.jpg")`,
                height: 80,
                marginTop: 30,
                width: "100%",
              }}
              customClassName={styles.bg}
            />
          }
        />

        <AddItemContainer
          itemAreaText="Your Routines"
          onPressFunction={() => {
            setOpenModal(true);
          }}
          buttonText="New Routine"
        />
        <CustomModal
          open={openModal}
          customHeight="375px"
          customTop="18%"
          overlayClick={(value) => setOpenModal(value)}
          content={
            <div
              style={{
                // backgroundColor: 'steelblue',
                height: "100%",
              }}
            >
              <TitleAndIconClose
                modalTitle="Create New Routine"
                closeModal={(value) => setOpenModal(value)}
              />
              <div style={{ paddingLeft: 25, paddingRight: 25 }}>
                <TextAndComponentContainer>
                  <text>Name</text>
                  <Input
                    inputValue={routineNameInput}
                    examplePlaceHolder="Ex; Weekends"
                    inputValueFunction={(e) =>
                      setRoutineNameInput(e.target.value)
                    }
                    inputType="email"
                  />
                </TextAndComponentContainer>

                <TextAndComponentContainer>
                  <text>Description</text>
                  <Input
                    inputValue={routineDescriptionInput}
                    customHeight="45px"
                    examplePlaceHolder="Ex; This Routine is for the best weekends..."
                    inputValueFunction={(e) =>
                      setRoutineDescriptionInput(e.target.value)
                    }
                    inputType="email"
                  />
                </TextAndComponentContainer>

                <TextAndComponentContainer>
                  <text>Color</text>
                  <SwitchSelector
                    customBorder="8px"
                    scroll={true}
                    content={courseColors.map((item) =>
                      item.position === routineSelectedColorPosition ? (
                        <div
                          onClick={() =>
                            setRoutineSelectedColorPosition(item.position)
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
                            setRoutineSelectedColorPosition(item.position)
                          }
                          style={{
                            backgroundImage: `linear-gradient(to bottom right, ${
                              routinesColors[item.position].color1
                            }, ${routinesColors[item.position].color2} 70%)`,
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

                <TextAndComponentContainer>
                  <text>Private Routine</text>
                  <Switch
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={(xwey, e) =>
                      setPrivateRoutineSwitch(!privateRoutineSwitch)
                    }
                    checked={privateRoutineSwitch}
                    offColor="#EDEBEA"
                  />
                </TextAndComponentContainer>

                <SubmitBottomButtons
                  cancelFunction={() => setOpenModal(false)}
                  submitFunction={(e) => handleCreateRoutine(e)}
                  submitButtonText="Crear"
                  submitBg="lightblue"
                />
              </div>
            </div>
          }
        />
        <div className={styles.routines_container}>
          {userRoutines.map((item) => (
            <div
              style={{
                background: `linear-gradient(${
                  routinesColors[item.colorPosition].color1
                }, ${routinesColors[item.colorPosition].color2})`,
                height: 220,
                width: 315,
                marginLeft: 10,
                marginTop: 50,
                borderRadius: 30,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              className={styles.routine}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: 305,
                      justifyContent: "space-between",
                    }}
                  >
                    <text className={styles.routine_titles}>{item.name}</text>
                    <MenuIcon elementName="Routine" iconColor="white" />
                  </div>

                  <text className={styles.routine_subtitles}>
                    {item.description}
                  </text>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <text className={styles.routine_properties}>Start</text>
                  <text className={styles.routine_properties}>5:00 AM</text>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <text className={styles.routine_properties}>18</text>
                  <text className={styles.routine_properties}>Tasks</text>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <text className={styles.routine_properties}>Finish</text>
                  <text className={styles.routine_properties}>19:45 PM</text>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* {userRoutines.length > 0 ? (
          <div>
            {userRoutines.map((item) => (
              <div>{item.name}</div>
            ))}
          </div>
        ) : (
          <Spinner enable={userRoutines.length === 0 ? true : false} />
        )} */}
      </div>
    </Container>
  );
};

export default Routines;
