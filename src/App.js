import React, { Fragment, useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Realm from "realm";

import TasksScreen from "./Screens/Tasks";

import RoutinesScreen from "./Screens/Routines";
import Community from "./Screens/Routines/Community";

import StudyScreen from "./Screens/Study";
import NotificationsSudyCourses from "./Screens/Study/NotificationsSudy";
import NotificationsSudy from "./Screens/Study/NotificationsSudy/Notifications";
import FlashCardsCourses from "./Screens/Study/FlashCards";
import FlashCards from "./Screens/Study/FlashCards/FlashCards";
import Pomodoros from "./Screens/Study/Pomodoros";
import Exams from "./Screens/Study/Exams";
import Settings from "./Screens/Settings";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faTimes,
  faAnchor,
  faAmbulance,
  faAngleDoubleDown,
  faAllergies,
  faBabyCarriage,
  faAtom,
  faBan,
  faRunning,
  faUtensils,
  faTrashAlt,
  faCheckCircle,
  faFilter,
  faBell,
  faRedo,
  faLongArrowAltRight,
  faSquareRootAlt,
  faDivide,
  faLanguage,
  faFlask,
  faEllipsisV,
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
  faGraduationCap,
  faMinusCircle,
  faClock,
  faCog,
  faCodeBranch,
  faPlus,
  faCheck,
  faTrash,
  faStopwatch,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import { getRealmApp, getRealm } from "./services/realm";
import RealmContext from "./contexts/RealmContext";
library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faTimes,
  faAnchor,
  faAmbulance,
  faAngleDoubleDown,
  faAllergies,
  faBabyCarriage,
  faAtom,
  faBan,
  faRunning,
  faUtensils,
  faTrashAlt,
  faCheckCircle,
  faFilter,
  faBell,
  faRedo,
  faLongArrowAltRight,
  faSquareRootAlt,
  faDivide,
  faLanguage,
  faFlask,
  faEllipsisV,
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
  faGraduationCap,
  faMinusCircle,
  faClock,
  faCog,
  faCodeBranch,
  faPlus,
  faCheck,
  faTrash,
  faStopwatch,
  faBrain
);

function App() {
  const [realmApp, setRealmApp] = useState(getRealmApp());
  const [realm, setRealm] = useState(null);

  useEffect(async () => {
    try {
      setRealm(await getRealm());
    } catch (error) {
      console.log('ERR: ', error.message);
    }
  }, []);
  
  return (
    <RealmContext.Provider value={{realmApp, setRealmApp, realm, setRealm}}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={TasksScreen} />
            <Route path="/routines" component={RoutinesScreen} />
            <Route path="/community" component={Community} />
            <Route path="/study" component={StudyScreen} />
            <Route
              path="/notifications-study"
              component={NotificationsSudyCourses}
            />
            <Route
              path="/notifications-study-course/:courseName/:courseId"
              component={NotificationsSudy}
            />
            <Route path="/flash-cards" component={FlashCardsCourses} />
            <Route
              path="/flash-cards-course/:courseName/:courseId"
              component={FlashCards}
            />
            <Route path="/pomodoros" component={Pomodoros} />
            <Route path="/exams" component={Exams} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </Router>
    </RealmContext.Provider>
  );
}

export default App;
