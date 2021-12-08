import React, { useState, useEffect, useContext } from "react";

import RealmContext from "../../../contexts/RealmContext";

import { isLoggedIn, getRealm } from "../../../services/realm";

import { ObjectId } from "bson";

import { v4 as uuidv4 } from "uuid";

import Container from "../../../components/Container";
import AddItemContainer from "../../../components/AddItemContainer";
import Dropdown from "../../../components/DropDown";
import CustomModal from "../../../components/Modal";
import TitleAndIconClose from "../../../components/Modal/titleAndIconClose";
import TextAndComponentContainer from "../../../components/Modal/textAndComponentContainer";
import Input from "../../../components/Input";
import SubmitBottomButtons from "../../../components/Modal/submitBottomButtons";
import MenuIcon from "../../../components/MenuIcon";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Switch from "react-switch";

import { courseColors } from "../../../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { handleReadableDate } from "../../../utils";

import styles from "./Notifications.module.css";

import { useParams, useLocation } from "react-router-dom";

const Notifications = () => {
  let { courseName, courseId } = useParams();

  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [startDate, setStartDate] = useState(new Date());

  const [notifications, setNotifications] = useState([]);

  const [courseNotifications, setCourseNotifications] = useState(false);

  const [courseColor, setCourseColor] = useState(0);

  const [editNotification, setEditNotification] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [notificationToEditId, setNotificationToEditId] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationBody, setNotificationBody] = useState("");
  const [notificationRepetitionInt, setNotificationRepetitionInt] = useState(1);

  //helper para hacer funcional el arrtimestructure, manejandolo con las posiciones de un arr 0, 1, 2, .....
  const [currentDateTimePickerPosition, setCurrentDateTimePickerPosition] =
    useState(0);

  const [notificationRepetitionsTimeArr, setNotificationRepetitionsTimeArr] =
    useState([]);

  const [deletedNotification, setDeletedNotification] = useState(false);

  const handleCreateAndSeveNewNotification = async function (
    e,
    notificationtitle,
    body,
    switchValue,
    repeating
  ) {
    e.preventDefault();
    const realm = await getRealm();

    try {
      realm.write(() => {
        const courseToAddNotification = realm.objectForPrimaryKey(
          "Course",
          ObjectId(courseId)
        );
        courseToAddNotification.notificationsStudy.push({
          id: `notification-${uuidv4()}`,
          title: notificationtitle,
          body: body,
          active: switchValue,
          repeat: repeating,
          repetition_time: notificationRepetitionsTimeArr,
        });
      });
      setCourseNotifications(!courseNotifications);
      setOpenModal(false);
    } catch (error) {
      console.log("ERR ON CREATE NOTIFICATION", error);
    }
  };

  const handleDeleteNotification = async (notiId) => {
    setDeletedNotification(true);
    const realm = await getRealm();

    try {
      realm.write(() => {
        const coursefound = realm.objectForPrimaryKey(
          "Course",
          ObjectId(courseId)
        );
        console.log(
          "removed",
          coursefound.notificationsStudy.filter((item) => item.id !== notiId)
        );

        let removedNotification = [];
        removedNotification = coursefound.notificationsStudy.filter(
          (item) => item.id !== notiId
        );

        // coursefound.notificationsStudy = [];

        console.log("REMOVEDNotification", removedNotification);

        let removedNotification_helper = [];

        removedNotification.map((item) =>
          removedNotification_helper.push({
            id: item.id,
            title: item.title,
            body: item.body,
            active: item.active,
            repeat: item.repeat,
            repetition_time: item.repetition_time.map((item) => ({
              id: item.id,
              date: item.date,
            })),
          })
        );

        console.log("removedNotification_helper", removedNotification_helper);

        coursefound.notificationsStudy = removedNotification_helper;
      });
    } catch (error) {
      console.log("ERR", error);
    }
    setCourseNotifications(!courseNotifications);
  };

  const handleUpdateAndSaveNotification = async function (notificationId) {
    const realm = await getRealm();

    const foundNotification = notifications.find(
      (item) => item.id === notificationId
    );

    try {
      realm.write(() => {
        foundNotification.title = notificationTitle;
        foundNotification.body = notificationBody;
        foundNotification.repeat = notificationRepetitionInt;
        foundNotification.repetition_time = notificationRepetitionsTimeArr;
      });
      setCourseNotifications(!courseNotifications);
    } catch (error) {
      console.log("ERR", error);
    }
    setOpenModal(false)
  };

  const notificationTimeStructure = (dateTime) => {
    class repetitionTimeStructure {
      constructor(id, date) {
        this.id = id;
        this.date = date;
      }
    }

    setNotificationRepetitionsTimeArr(
      notificationRepetitionsTimeArr.concat(
        new repetitionTimeStructure(`notification-${uuidv4()}`, dateTime)
      )
    );
  };

  if (!deletedNotification) {
    // LAS REPS EN UN DIA SON MENORES QUE EL ARR QUE CONTIENE EL HORARIO ? ENTONCES QUE VAS A HACER
    if (notificationRepetitionsTimeArr.length > notificationRepetitionInt) {
      // VER EN QUE ULTIMA POS DTP ESTABA, DARLE A ESA POS EN VALOR DEL ULTIMO ITEM DEL ARR Y LUEGO BORRAR EL ULTIMO ITEM
      notificationRepetitionsTimeArr[currentDateTimePickerPosition] =
        notificationRepetitionsTimeArr[
          notificationRepetitionsTimeArr.length - 1
        ];

      console.log("time arr mayor que int");

      console.log(
        "el ultimo itemm del arr",
        notificationRepetitionsTimeArr[
          notificationRepetitionsTimeArr.length - 1
        ].id
      );

      let helper_array_removed_last_item = [];

      helper_array_removed_last_item = notificationRepetitionsTimeArr;

      console.log(
        "filter index",
        notificationRepetitionsTimeArr.map((item, index) => item)
      );

      helper_array_removed_last_item.splice(-1, 1);

      console.log("EL HELPER_REMOVED", helper_array_removed_last_item);

      setNotificationRepetitionsTimeArr(helper_array_removed_last_item);
    }
  } else {
    console.log("deleted");
  }

  const renderNotificationsOptionsUI = () => {
    console.log(
      "noti.lenght entro de opui",
      notificationRepetitionsTimeArr.length
    );
    let rows = [];
    for (let i = 0; i < notificationRepetitionInt; i++) {
      rows.push(
        <TextAndComponentContainer>
          <text>Notification {i + 1}</text>
          <div>
            <DatePicker
              selected={
                notificationRepetitionsTimeArr.length === 0
                  ? new Date()
                  : notificationRepetitionsTimeArr[i] !== undefined
                  ? notificationRepetitionsTimeArr[i].date
                  : notificationRepetitionsTimeArr[i]
              }
              onChange={(date) => {
                console.log("ultima pos", i);
                setCurrentDateTimePickerPosition(i);
                console.log(date);
                notificationTimeStructure(date);
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
        </TextAndComponentContainer>
      );
    }
    return rows;
  };

  const refreshNotifications = async (_) => {
    const realm = await getRealm();
    try {
      realm.write(() => {
        const coursefound = realm.objectForPrimaryKey(
          "Course",
          ObjectId(courseId)
        );

        setNotifications(coursefound.notificationsStudy);
      });
    } catch (error) {
      console.log("ERR", error);
    }
  };

  useEffect(() => {
    refreshNotifications();
    console.log("REFRESH NOTIS");
  }, [courseNotifications]);

  return (
    <Container
      navTitle={`Study - notifications - ${courseName}`}
      returnScreen="/notifications-study"
    >
      <div className={styles.container}>
        <AddItemContainer
          itemAreaText="Notifications"
          onPressFunction={() => {
            setOpenModal(true);
            setDeletedNotification(false);
            setEditNotification(false);
            setNotificationToEditId("");
            setNotificationTitle("");
            setNotificationBody("");
            setNotificationRepetitionInt(1);
            setNotificationRepetitionsTimeArr([]);
          }}
          buttonText="New Notification"
        />
        <CustomModal
          open={openModal}
          customHeight={
            notificationRepetitionInt === 1
              ? "57%"
              : notificationRepetitionInt === 2
              ? "67%"
              : "77%"
          }
          customTop={
            notificationRepetitionInt === 1
              ? "13%"
              : notificationRepetitionInt === 2
              ? "11%"
              : "7%"
          }
          overlayClick={(value) => setOpenModal(value)}
          content={
            <div
              style={{
                // backgroundColor: 'steelblue',
                height: "100%",
              }}
            >
              <TitleAndIconClose
                modalTitle="Create New Notification"
                closeModal={(value) => setOpenModal(value)}
              />
              <div style={{ paddingLeft: 25, paddingRight: 25 }}>
                <TextAndComponentContainer>
                  <text>Name</text>
                  <Input
                    inputValue={notificationTitle}
                    examplePlaceHolder="Ej. Segunda Guerra mundiañ"
                    inputValueFunction={(e) =>
                      setNotificationTitle(e.target.value)
                    }
                    inputType="text"
                  />
                </TextAndComponentContainer>

                <TextAndComponentContainer>
                  <text>Body</text>
                  <Input
                    inputValue={notificationBody}
                    customHeight="50px"
                    examplePlaceHolder="Ej. informacion de la Segunda Guerra mundiañ"
                    inputValueFunction={(e) =>
                      setNotificationBody(e.target.value)
                    }
                    inputType="text"
                  />
                </TextAndComponentContainer>

                <TextAndComponentContainer>
                  <text>Repeats</text>
                  <Dropdown
                    oneDropLine={true}
                    dropOptions={[
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                    ]}
                    dropValue={(value) =>
                      setNotificationRepetitionInt(value.value)
                    }
                    dropPlace={
                      notificationTitle.length > 0
                        ? notificationRepetitionInt.toString()
                        : "Repeats"
                    }
                  />
                </TextAndComponentContainer>

                {renderNotificationsOptionsUI().map((item) => item)}

                <SubmitBottomButtons
                  cancelFunction={() => setOpenModal(false)}
                  submitFunction={(e) =>
                    editNotification
                      ? handleUpdateAndSaveNotification(notificationToEditId)
                      : handleCreateAndSeveNewNotification(
                          e,
                          notificationTitle,
                          notificationBody,
                          true,
                          notificationRepetitionInt
                        )
                  }
                  submitButtonText={editNotification ? "Editar" : "Crear"}
                  submitBg="lightblue"
                />
              </div>
            </div>
          }
        />
        <div className={styles.notifications_container}>
          {notifications?.map((item) => (
            <div
              className={
                item.active ? styles.notification : styles.notification_off
              }
            >
              <div
                style={{
                  backgroundColor: "red",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0px 10px",
                }}
              >
                <div
                  style={{
                    backgroundImage: item.active
                      ? `linear-gradient(to bottom right, ${courseColors[courseColor].color1}, ${courseColors[courseColor].color2} 70%)`
                      : null,
                    backgroundColor: item.active ? null : "#EDEBEA",
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    color: "white",
                  }}
                >
                  <div>{courseName}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: 25,
                  }}
                >
                  {/* <DropdownMenu
              triggerType="icon"
              trigger="glyphicon glyphicon-option-vertical"
              iconColor="white"
              position="left"
            >
              <MenuItem text="Delete Course" onClick={(e) => handleDeleteCourse(e, item._id)} />
            </DropdownMenu> */}
                  <MenuIcon
                    elementName="Notification"
                    iconColor="black"
                    onClickMenuIcon={() => {
                      setNotificationTitle(item.title);
                      setNotificationBody(item.body);
                      setNotificationRepetitionInt(item.repeat);
                    }}
                    onClickDelete={() => handleDeleteNotification(item.id)}
                    onClickEdit={() => {
                      setOpenModal(true);
                      setNotificationToEditId(item.id);
                      setEditNotification(true);
                      // handleUpdateAndSaveNotification(item.id);
                      setNotificationTitle(item.title);
                      setNotificationBody(item.body);
                      setNotificationRepetitionInt(item.repeat);
                      console.log(item.repetition_time.map((item) => item));
                      setNotificationRepetitionsTimeArr(item.repetition_time);
                    }}
                  />
                  {/* <Menu
                    menuButton={
                      <MenuButton>
                        <FontAwesomeIcon
                          icon="ellipsis-v"
                          color="white"
                          size="lg"
                          onClick={() => {
                            setNotificationTitle(item.title);
                            setNotificationBody(item.body);
                            setNotificationRepetitionInt(item.repeat);
                          }}
                        />
                      </MenuButton>
                    }
                    transition
                  >
                    <MenuItem onClick={() => handleDeleteNotification(item.id)}>
                      Delete Notification
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setOpenModal(true);
                        setNotificationToEditId(item.id);
                        setEditNotification(true);
                        // handleUpdateAndSaveNotification(item.id);
                        setNotificationTitle(item.title);
                        setNotificationBody(item.body);
                        setNotificationRepetitionInt(item.repeat);
                        console.log(item.repetition_time.map((item) => item))
                        setNotificationRepetitionsTimeArr(item.repetition_time);
                      }}
                    >
                      Edit Notification
                    </MenuItem>
                  </Menu> */}
                </div>
                {/* <DropdownMenu
                  triggerType="icon"
                  trigger="glyphicon glyphicon-option-horizontal"
                  iconColor={item.active ? "black" : "f7f8fc"}
                  position="center"
                >
                  <MenuItem text="Delete" onClick={(e) => {}} />
                  <MenuItem
                    text="Edit"
                    onClick={() => {
                      setNotificationToEditId(item._id);
                      setOpenModal(true);
                      setNotificationTitle(item.title);
                      setNotificationBody(item.body);
                      setNotificationRepetitionInt(item.date);
                    }}
                  />
                </DropdownMenu> */}
              </div>
              <div>
                <h5>{item.title}</h5>
                <p>{item.body}</p>
              </div>
              <div
                style={{
                  // backgroundColor: 'lemonchiffon',
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    // backgroundColor: 'lightpink',
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon icon="redo" style={{ marginRight: "5px" }} />
                  <div>{item.repeat}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    // backgroundColor: 'red',
                    width: item.repeat === 3 ? "70%" : "40%",
                    justifyContent: "space-around",
                  }}
                >
                  {item.repetition_time.map((item) => (
                    <div
                      style={{
                        // backgroundColor: 'lightskyblue',
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesomeIcon
                        icon="bell"
                        style={{ marginRight: "4px" }}
                      />
                      <div>
                        {handleReadableDate(
                          item.date.getHours(),
                          item.date.getMinutes()
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Switch
                onChange={(xwey, e) => {}}
                checked={item.active}
                offColor="#EDEBEA"
              />
              {/* <button
                style={{ backgroundColor: item.active ? 'blue' : 'gray' }}
                onClick={(e) =>
                  handleOnOffNotification(e, item._id, item.active)
                }
              >
                activar
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Notifications;
