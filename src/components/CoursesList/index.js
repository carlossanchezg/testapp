import React, { useEffect, useState, useContext } from "react";

import RealmContext from "../../contexts/RealmContext";

import { isLoggedIn } from "../../services/realm";

import { ObjectId } from "bson";

// import { DropdownMenu, MenuItem } from "react-bootstrap-dropdown-menu";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import AddItemContainer from "../AddItemContainer";
import CustomModal from "../Modal";
import TitleAndIconClose from "../Modal/titleAndIconClose";
import TextAndComponentContainer from "../Modal/textAndComponentContainer";
import Input from "../Input";
import SubmitBottomButtons from "../Modal/submitBottomButtons";
import SwitchSelector from "../SwitchSelector";
import TextLink from "../TextLink";
import MenuIcon from "../MenuIcon";
import Spinner from "../Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { courseColors, icons } from "../../utils";

import { Link } from "react-router-dom";

import styles from "./CoursesList.module.css";

const CoursesList = ({ goPage }) => {
  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [openModal, setOpenModal] = useState(false);
  const [editCourse, setEditCourse] = useState(false);

  const [courseToEditId, setCourseToEditId] = useState("");

  const [courseName, setCourseName] = useState("");
  const [courseColorPosition, setCourseColorPosition] = useState(0);
  const [courseIcon, setCourseIcon] = useState("atom");

  const [userCourses, setUserCourses] = useState([]);

  const refreshCourses = async () => {
    if (realm && isLoggedIn(realmApp)) {
      const courses = realm.objects("Course");

      setUserCourses(courses);

      console.log('courses', courses.map((item) => item));
    }
  };

  useEffect(() => {
    refreshCourses();
  }, [realm]);

  const handleCreateCourse = async (e, name, color, icon) => {
    e.preventDefault();

    const data = {
      _id: ObjectId(),
      userID: realmApp.currentUser ? realmApp.currentUser.id : "unknownUser",
      name: name,
      color: String(color),
      icon: icon,
    };

    try {
      /* Save course */
      if (realm && isLoggedIn(realmApp)) {
        realm.write(() => {
          realm.create("Course", data);
        });
        refreshCourses();
      }
      setOpenModal(false);
    } catch (error) {
      console.log("ERR IN CREATE NEW COURSE", error);
    }
  };

  const handleEditCourse = async (courseId) => {
    try {
      realm.write(() => {
        const foundCourse = realm.objectForPrimaryKey("Course", courseId);

        foundCourse.name = courseName;
        foundCourse.color = String(courseColorPosition);
        foundCourse.icon = courseIcon;
      });
      setOpenModal(false);
    } catch (error) {
      console.log("ERR IN EDIT COURSE", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      if (realm && isLoggedIn(realmApp)) {
        realm.write(() => {
          const foundCourse = realm.objectForPrimaryKey("Course", courseId);

          realm.delete(foundCourse);
        });
      }
    } catch (error) {
      console.log("ERR TO DELETE COURSE", error);
    }
    setUserCourses(realm.objects("Course"));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // backgroundColor: 'red',
        margin: "25px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          // backgroundColor: 'gray',
        }}
      >
        <AddItemContainer
          itemAreaText="Courses"
          onPressFunction={() => {
            setOpenModal(true);
            setEditCourse(false);
            setCourseToEditId("");
            setCourseName("");
            setCourseColorPosition(0);
            setCourseIcon("atom");
          }}
          buttonText="New Course"
        />
        <CustomModal
          open={openModal}
          customHeight="300px"
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
                modalTitle="Create New Course"
                closeModal={(value) => setOpenModal(value)}
              />
              <div style={{ paddingLeft: 25, paddingRight: 25 }}>
                <TextAndComponentContainer>
                  <text>Name</text>
                  <Input
                    inputValue={courseName}
                    examplePlaceHolder="Ex; Math"
                    inputValueFunction={(e) => setCourseName(e.target.value)}
                    inputType="email"
                  />
                </TextAndComponentContainer>

                <TextAndComponentContainer>
                  <text>Color</text>
                  <SwitchSelector
                    customBorder="8px"
                    scroll={true}
                    content={courseColors.map((item) =>
                      item.position === courseColorPosition ? (
                        <div
                          onClick={() => setCourseColorPosition(item.position)}
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
                          onClick={() => setCourseColorPosition(item.position)}
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
                      item.iconCode === courseIcon ? (
                        <div
                          onClick={() => setCourseIcon(item.iconCode)}
                          style={{
                            backgroundColor: "green",
                            marginLeft: "2px",
                            marginRight: "2px",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            borderRadius: "50px",
                          }}
                        >
                          <FontAwesomeIcon size="lg" icon={item.iconCode} />
                        </div>
                      ) : (
                        <div
                          onClick={() => setCourseIcon(item.iconCode)}
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
                          <FontAwesomeIcon size="lg" icon={item.iconCode} />
                        </div>
                      )
                    )}
                  />
                </TextAndComponentContainer>

                <SubmitBottomButtons
                  cancelFunction={() => setOpenModal(false)}
                  submitFunction={(e) =>
                    editCourse
                      ? handleEditCourse(courseToEditId)
                      : handleCreateCourse(
                          e,
                          courseName,
                          courseColorPosition,
                          courseIcon
                        )
                  }
                  submitButtonText={editCourse ? "Editar" : "Crear"}
                  submitBg="lightblue"
                />
              </div>
            </div>
          }
        />
      </div>
      {userCourses.length > 0 ? <div className={styles.courses_container}>
        {userCourses.map((item) => (
          <div
            className={styles.course_module}
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${
                courseColors[item.color].color1
              }, ${courseColors[item.color].color2} 70%)`,
            }}
          >
            <MenuIcon
              elementName="Course"
              iconColor="white"
              onClickDelete={() => handleDeleteCourse(item._id)}
              onClickEdit={() => {
                setOpenModal(true);
                setEditCourse(true);
                setCourseToEditId(item._id);

                setCourseName(item.name);
                setCourseColorPosition(Number(item.color));
                setCourseIcon(item.icon);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0px 20px",
                cursor: "pointer",
                height: "30px",
              }}
            >
              {/* <FontAwesomeIcon
                onClick={() => alert('menu')}
                icon="ellipsis-v"
                color="white"
              /> */}
            </div>
            {/* <Link to={`/study/${goPage}/${item.name}/${item._id}`}>
              <div className={styles.course_name_and_icon_course_container}>
                <FontAwesomeIcon
                  icon={item.icon}
                  color="white"
                  style={{ marginBottom: '5px' }}
                />
                <div>{item.name}</div>
              </div>
            </Link> */}
            <TextLink
              goPage={`/${goPage}/${item.name}/${item._id}`}
              content={
                <div className={styles.course_name_and_icon_course_container}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    color="white"
                    style={{ marginBottom: "5px" }}
                  />
                  <div>{item.name}</div>
                </div>
              }
            />
          </div>
        ))}
      </div> : <Spinner enable={userCourses.length === 0 ? true : false} />}
    </div>
  );
};

export default CoursesList;
