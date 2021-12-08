import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import Container from "../../components/Container";
import CustomModal from "../../components/Modal";
import Spinner from "../../components/Spinner";

import axios from "axios";

import { routinesColors } from "../../utils";

import styles from "./Community.module.css";

const Community = () => {
  const [openModal, setOpenModal] = useState(false);

  const [USERSTEST, setUSERSTEST] = useState([]);
  const [USEROVERGETTEST, setUSEROVERGETTEST] = useState(false);

  useEffect(() => {
    const getUsersTEST = async () => {
      const GETUSERSTEST_URI = "https://randomuser.me/api/?results=80";
      try {
        const userRes = await axios.get(GETUSERSTEST_URI);
        setUSERSTEST(userRes.data.results);
        console.log("simon");
        console.log(userRes.data.results);
        return userRes;
      } catch (error) {
        console.log("ERR GET USER", error);
      }
    };
    getUsersTEST();
  }, [USEROVERGETTEST]);

  const arrTEST = [];

  USERSTEST.map((item) =>
    arrTEST.push({ id: item.login.uuid, name: item.login.username })
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
      {USERSTEST.length > 0 ? (
        <div
          style={
            {
              // backgroundColor: "beige",
            }
          }
          className={styles.routines_container}
        >
          {USERSTEST.map((item) => (
            <div
              style={{
                background: `linear-gradient(${
                  routinesColors[Number(String(item.dob.age).charAt(0))].color1
                }, ${
                  routinesColors[Number(String(item.dob.age).charAt(0))].color2
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
                <img
                  src={item.picture.medium}
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                  }}
                />
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
                      {item.name.first}
                    </text>
                    <text className={styles.routine_titles}>
                      {item.name.last}
                    </text>
                  </div>

                  <text className={styles.routine_subtitles}>
                    @{item.login.username}
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
        <Spinner enable={USERSTEST.length === 0 ? true : false} />
      )}
    </Container>
  );
};

export default Community;
