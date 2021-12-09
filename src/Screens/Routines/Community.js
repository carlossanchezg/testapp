import React, { useState, useEffect, useContext } from "react";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

import RealmContext from "../../contexts/RealmContext";

import Container from "../../components/Container";
import CustomModal from "../../components/Modal";
import Spinner from "../../components/Spinner";

import axios from "axios";

import { routinesColors } from "../../utils";

import styles from "./Community.module.css";

const Community = () => {
  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [openModal, setOpenModal] = useState(false);

  const [USERSTEST, setUSERSTEST] = useState([]);
  const [USEROVERGETTEST, setUSEROVERGETTEST] = useState(false);

  const [allUsersPublicRoutines, setAllUsersPublicRoutines] = useState([]);
  const [usersName, setUsersName] = useState([]);

  useEffect(() => {
    const getUsersTEST = async () => {
      console.log('RELM QUERY');
      try {
        const allUsersPublicRoutines_Res =
          await realmApp.currentUser.functions.getUsersPublicRoutines();
          console.log('RUTINAS___', allUsersPublicRoutines_Res.filter((item) => item.creator.id === item.userID))

        setAllUsersPublicRoutines(allUsersPublicRoutines_Res.filter((item) => item.creator.id === item.userID));

        setUsersName(allUsersPublicRoutines_Res);
      } catch (error) {
        console.log('ERROR ON GET ALL ROUTINES ', error);
      }
    };
    getUsersTEST();
  }, [USEROVERGETTEST]);

  const arrTEST = [];

  allUsersPublicRoutines.map((item) =>
    arrTEST.push({ id: item.creator.id, name: item.creator.name })
  );

  console.log("arrTEST", arrTEST);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    console.log("items", item);
    return item;
    // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  };

  return (
    <Container navTitle="Routines - Community" returnScreen="/routines">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          // backgroundColor: "red",
        }}
      >
        <div style={{ width: "90%" }}>
          <ReactSearchAutocomplete
            items={arrTEST}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            formatResult={formatResult}
          />
        </div>
      </div>
      {allUsersPublicRoutines.length > 0 ? (
        <div
          style={
            {
              // backgroundColor: "beige",
            }
          }
          className={styles.routines_container}
        >
          {allUsersPublicRoutines.map((item) => (
            <div
              style={{
                background: `linear-gradient(${
                  routinesColors[item.colorPosition].color1
                }, ${
                  routinesColors[item.colorPosition].color2
                })`,
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
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    backgroundColor: item.creator.img,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'

                  }}>
                    <text style={{color: 'white'}}>{item.creator.name.charAt(0).toUpperCase()}</text>
                  </div>
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
                    }}
                  >
                    <text
                      className={styles.routine_titles}
                      style={{ marginRight: 5 }}
                    >
                      {item.creator.name}
                    </text>
                    <text className={styles.routine_titles}>
                      {item.creator.name}
                    </text>
                  </div>

                  <text className={styles.routine_subtitles}>
                    @{item.creator.name}
                  </text>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: -18,
                  marginLeft: 10,
                }}
              >
                <text
                  className={styles.routine_titles}
                  style={{ marginBottom: 3 }}
                >
                  Weekends
                </text>
                <text className={styles.routine_subtitles}>
                  Esta es una pequeña descripcion de la rutina, como la cree,
                  con que fin, que beneficos, como me a yudado etc
                </text>
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
      ) : (
        <Spinner enable={allUsersPublicRoutines.length === 0 ? true : false} />
      )}
    </Container>
  );
};

export default Community;
