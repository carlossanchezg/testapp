import React, { useEffect, useState, useContext } from "react";

import RealmContext from "../../../contexts/RealmContext";

import { isLoggedIn, getRealm } from "../../../services/realm";

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
import TextLink from "../../../components/TextLink";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";

import { courseColors, icons } from "../../../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Exams.module.css";

const Exams = () => {
  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [openModal, setOpenModal] = useState(false);

  const [userExams, setUserExams] = useState([]);

  const [examId, setExamId] = useState("");
  const [examName, setExamName] = useState("");
  const [examTopic, setExamTopic] = useState("");
  const [examDate, setexamDate] = useState(new Date());
  const [examTime, setexamTime] = useState(0);
  const [icon, setIcon] = useState("anchor");
  const [examNotifications, setExamNotifications] = useState([]);
  const [pomodoroColorPosition, setPomodoroColorPosition] = useState(0);

  const handleCreateAndSaveNewExam = async () => {
    // const realm = await getRealm();

    //in examNotifications array is when the user wants to be notified prior to his exam, eg 1 month, the user must be notified one month before the date he has established for his exam, If the exam is deleted before triggering the notifications, the saved notifications should also be cleared

    const data = {
      _id: ObjectId(),
      userID: realmApp.currentUser ? realmApp.currentUser.id : "unknownUser",
      courseName: examName,
      courseTopic: examTopic,
      date: examDate,
      time: examTime,
      icon: icon,
      notifications: examNotifications,
    };

    try {
      /* Save course */
      if (realm && isLoggedIn(realmApp)) {
        realm.write(() => {
          realm.create("Exams", data);
        });
        // refreshCourses();
      }
      setOpenModal(false);
    } catch (error) {
      console.log("ERR IN CREATE NEW EXAM", error);
    }

    // setUserExams(realm.objects("Exams"));
  };

  const HowMuchTimeIsLeftForTheExamInSeconds = (date, time) => {
    const currentDate = new Date(Date.now());

    var date1 = new Date(Date.now());

    // MONTHS 0 TO 11
    let date_month_0_11 = date.getMonth() + 1;
    var date2 = new Date(
      `${date.getFullYear()}/${
        date_month_0_11.length === 1 ? "0" + date_month_0_11 : date_month_0_11
      }/${date.getDate()} ${
        time.length === 1 ? "0" + time.getHours() : time.getHours()
      }:${time.length === 1 ? "0" + time.getMinutes() : time.getMinutes()}:00`
    ); //less than 1

    // var date2 = new Date(`${date.getFullYear()}/${date.length === 1 ? '0'+date.getMonth() : date.getMonth()}/${date.length === 1 ?  '0' + date.getDate() : date.getDate()} ${time.length === 1 ? '0'+time.getHours() : time.getHours()}:${time.length === 1 ? '0'+time.getMinutes() : time.getMinutes()}:00`); //less than 1
    var start = date1.getTime() / (3600 * 24 * 1000); //days as integer from..
    var end = date2.getTime() / (3600 * 24 * 1000); //days as integer from..
    var leftSeconds = (end - start) * 86400; // exact dates
    // console.log('in sec', leftSeconds);
    // console.log('in days', leftSeconds / 86400);

    return leftSeconds;
  };

  const NotificationsExamOptions = () => {
    const options = [
      { label: "1 Day before", value: 1 },
      { label: "1 week before", value: 7 },
      { label: "2 week before", value: 14 },
      { label: "1 month before", value: 30 },
      { label: "3 month before", value: 90 },
      { label: "5 month before", value: 150 },
    ];
    const available_notifications_options =
      examDate !== 0 && examTime !== 0
        ? options.filter(
            (item) =>
              item.value <
              HowMuchTimeIsLeftForTheExamInSeconds(examDate, examTime) / 86400
          )
        : [];

    console.log("available", available_notifications_options);

    return options;
  };

  return (
    <Container navTitle="Study - Pomodoro" returnScreen="/study">
      <div className={styles.container}>
        <StudyModule
          color1="#791BF4"
          color2="#3880EC"
          fixed={true}
          backgroundFigures={
            <>
              <div
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "300px",
                  backgroundImage:
                    "linear-gradient(to bottom right, #3880EC, #791BF4 70%)",
                  borderRadius: "0px",
                  top: "230px",
                  left: "-130px",
                  transform: "rotate(70deg)",
                }}
                className={styles.backgroundFigure}
              />
              <div
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "300px",
                  backgroundImage:
                    "linear-gradient(to bottom right, #3880EC, #791BF4 70%)",
                  borderRadius: "0px",
                  top: "-120px",
                  left: "290px",
                  transform: "rotate(-60deg)",
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
            itemAreaText="Exams"
            onPressFunction={() => setOpenModal(true)}
            buttonText="New Exam"
          />
          <CustomModal
            open={openModal}
            customHeight="500px"
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
                  modalTitle="Create New Exam"
                  closeModal={(value) => setOpenModal(value)}
                />
                <div style={{ paddingLeft: 25, paddingRight: 25 }}>
                  <TextAndComponentContainer>
                    <text>Name</text>
                    <Input
                      inputValue={examName}
                      examplePlaceHolder="Ex; Math"
                      inputValueFunction={(e) => setExamName(e.target.value)}
                      inputType="email"
                    />
                  </TextAndComponentContainer>

                  <TextAndComponentContainer>
                    <text>Topic</text>
                    <Input
                      inputValue={examTopic}
                      examplePlaceHolder="Ex; Geometria"
                      inputValueFunction={(e) => setExamTopic(e.target.value)}
                      inputType="email"
                    />
                  </TextAndComponentContainer>

                  <TextAndComponentContainer>
                    <text>Date</text>
                    <div>
                      <DatePicker
                        selected={examDate}
                        onChange={(date) => setexamDate(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </TextAndComponentContainer>

                  <TextAndComponentContainer>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <text>Icon</text>
                      <text style={{ fontSize: 8 }}>optional</text>
                    </div>
                    <SwitchSelector
                      scroll={true}
                      content={icons.map((item) =>
                        item.iconCode === icon ? (
                          <div
                            onClick={() => setIcon(item.iconCode)}
                            style={{
                              backgroundColor: "black",
                              marginLeft: "2px",
                              marginRight: "2px",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderRadius: "50px",
                            }}
                          >
                            <FontAwesomeIcon
                              size="sm"
                              icon={item.iconCode}
                              color="white"
                            />
                          </div>
                        ) : (
                          <div
                            onClick={() => setIcon(item.iconCode)}
                            style={{
                              backgroundColor: "transparent",
                              marginLeft: "2px",
                              marginRight: "2px",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderRadius: "50px",
                            }}
                          >
                            <FontAwesomeIcon size="sm" icon={item.iconCode} />
                          </div>
                        )
                      )}
                    />
                  </TextAndComponentContainer>

                  <TextAndComponentContainer>
                    <text>Time</text>
                    <div>
                      <DatePicker
                        selected={examTime}
                        onChange={(date) => setexamTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={5}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                      />
                    </div>
                  </TextAndComponentContainer>

                  <TextAndComponentContainer>
                    <text>Notifications</text>
                    <div>
                      <MultiSelect
                        options={NotificationsExamOptions()}
                        value={examNotifications}
                        onChange={(value) => setExamNotifications(value)}
                        // labelledBy="Select"
                        disableSearch
                      />
                    </div>
                  </TextAndComponentContainer>

                  <SubmitBottomButtons
                    cancelFunction={() => setOpenModal(false)}
                    submitFunction={(e) => handleCreateAndSaveNewExam()}
                    submitButtonText="Crear"
                    submitBg="lightblue"
                  />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </Container>
  );
};

export default Exams;
