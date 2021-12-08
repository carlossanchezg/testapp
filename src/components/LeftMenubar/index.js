import React, { useEffect, useState } from "react";

import ButtonNav from "./ButtonNav";
import Button from "../Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocation, useParams, Link } from "react-router-dom";

import { Colors } from "../../styles";

const LeftMenuBar = () => {
  let location = useLocation();
  let { courseName, courseId } = useParams();

  const [tasksScreenActive, setTasksScreenActive] = useState(false);
  const [routinesScreenActive, setRoutinesScreenActive] = useState(false);
  const [studyScreenActive, setStudyScreenActive] = useState(false);

  useEffect(() => {
    location.pathname === "/"
      ? setTasksScreenActive(true)
      : setTasksScreenActive(false);

    location.pathname === "/routines" || location.pathname === "/community"
      ? setRoutinesScreenActive(true)
      : setRoutinesScreenActive(false);

    location.pathname === "/study" ||
    location.pathname === "/notifications-study" ||
    location.pathname === `/notifications-study-course/${courseName}/${courseId}` ||
    location.pathname === "/flash-cards" ||
    location.pathname === `/flash-cards-course/${courseName}/${courseId}` ||
    location.pathname === "/pomodoros" ||
    location.pathname === "/exams"
      ? setStudyScreenActive(true)
      : setStudyScreenActive(false);

    // location.pathname === '/study/notifications-study'
    //   ? setStudyScreenActive(true)
    //   : setStudyScreenActive(false);
    console.log("URLLLL:", location.pathname);
  }, [location, courseName, courseId]);

  return (
    <div
      style={{
        backgroundColor: Colors.SecondaryBackground,
        width: 180,
        paddingTop: 40,
        paddingBottom: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          // backgroundColor: 'lightgray',
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon
          icon="graduation-cap"
          color="black"
          style={{ marginBottom: 30 }}
        />
        <div
          style={{
            // backgroundColor: 'red',
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ButtonNav
            textButton="Tasks"
            goScreen=""
            styleBtn={{
              backgroundColor: tasksScreenActive ? "red" : "gray",
            }}
            active={tasksScreenActive}
          />
          <ButtonNav
            textButton="Routines"
            goScreen="routines"
            styleBtn={{
              backgroundColor: routinesScreenActive ? "red" : "gray",
            }}
            active={routinesScreenActive}
          />
          <ButtonNav
            textButton="Study"
            goScreen="study"
            styleBtn={{
              backgroundColor: studyScreenActive ? "red" : "gray",
            }}
            active={studyScreenActive}
          />
        </div>
      </div>
      <Button
        content={
          <Link to="/settings">
            <FontAwesomeIcon icon="cog" color="black" size="2x" />
          </Link>
        }
      />
    </div>
  );
};

export default LeftMenuBar;
