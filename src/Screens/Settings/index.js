import React, { useState, useContext } from "react";

import RealmContext from "../../contexts/RealmContext";
import { getRealm, getRealmApp, isLoggedIn } from "../../services/realm";

import SettingsOptionsContext from "../../contexts/SettingsOptionsContext";

import Container from "../../components/Container";
import SettingsContainer from "../../components/SettingsContainer";
import Dropdown from "../../components/DropDown";
import Input from "../../components/Input";

import { hourOptions } from "../../utils";

import { useTranslation } from "react-i18next";

const Settings = () => {
  const [t, i18n] = useTranslation("global");

  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [userName, setUserName] = useState(
    isLoggedIn(realmApp)
      ? realmApp.currentUser.customData
        ? realmApp.currentUser.customData.name
        : ""
      : ""
  );
  const [email, setEmail] = useState(
    isLoggedIn(realmApp)
      ? realmApp.currentUser.customData
        ? realmApp.currentUser.customData.email
        : ""
      : ""
  );

  const { deleteExpired, setDeleteExpired } = useContext(
    SettingsOptionsContext
  );

  const [deleteExpiredTasks, setDeleteExpiredTasks] = useState(true);
  const [soundOnDoneTask, setSoundOnDoneTask] = useState(true);
  const [soundOnDeleteTask, setSoundOnDeleteTask] = useState(true);
  const [animationOnDoneTask, setAnimationOnDoneTask] = useState(true);

  const [selectedHour, setSelectedHour] = useState(0);

  console.log("exired cintext", deleteExpired);
  console.log("exired solo", deleteExpiredTasks);

  const [authLoading, setAuthLoading] = useState(false);

  const handleOut = () => {
    if (isLoggedIn(realmApp)) {
      setAuthLoading(true);
      realmApp.currentUser
        .logOut()
        .then(async (_) => {
          if (!isLoggedIn(realmApp)) {
            setRealmApp(getRealmApp());
            setRealm(await getRealm());
            // navigation.navigate('Settings');
          }
          setAuthLoading(false);
        })
        .catch((err) => console.error(err));
    }
  };

  const languageOptions = [
    {
      label: "Español",
      value: "es",
    },
    {
      label: "Ingles",
      value: "en",
    },
    {
      label: "Portuges",
      value: "po",
    },
    {
      label: "Franses",
      value: "fr",
    },
  ];

  return (
    <Container navTitle="Settings" padding={true}>
      <div
        style={{
          // backgroundColor: 'lightgrey',
          padding: 25,
          overflow: "scroll",
          height: 605,
        }}
      >
        <div>
          <h2>{t("settings.languaje")}</h2>
          <SettingsContainer
            settingTitle="Change Languaje"
            settingsDescription="Selecciona tu idioma preferido"
            settingSwitch={false}
            noSwitchRightContent={
              <Dropdown
                customDisable={false}
                dropOptions={languageOptions}
                dropValue={(value) => i18n.changeLanguage(value.value)}
                dropPlace="Languaje"
              />
            }
          />
        </div>
        <div>
          <h2>Account</h2>
          <Input
            inputValue={userName}
            examplePlaceHolder="Ex; Math"
            inputValueFunction={(e) => {}}
            inputType="email"
          />
          <Input
            inputValue={email}
            examplePlaceHolder="Ex; Math"
            inputValueFunction={(e) => {}}
            inputType="email"
          />
          <h3
            onClick={handleOut}
            style={{ color: "lightblue", cursor: "pointer" }}
          >
            Logout
          </h3>
        </div>
        <div>
          <h2>Tasks</h2>
          <SettingsContainer
            settingTitle="Delete Expired Tasks"
            settingsDescription="se eliminaran todas las tareas vencidas"
            settingSwitch={true}
            switchValue={deleteExpiredTasks}
            swithOnChange={(xwey, e) =>
              setDeleteExpiredTasks(!deleteExpiredTasks)
            }
          />
          <SettingsContainer
            settingTitle="Sound on done Task"
            settingsDescription="Reproducir sonido al terminar una tarea"
            settingSwitch={true}
            switchValue={soundOnDoneTask}
            swithOnChange={(xwey, e) => setSoundOnDoneTask(!soundOnDoneTask)}
          />
          <SettingsContainer
            settingTitle="Done Task Sound"
            settingsDescription="Escoge el sonido que quieres escuchar el terminar una tarea"
            settingSwitch={false}
            noSwitchRightContent={
              <Dropdown
                customDisable={soundOnDoneTask ? false : true}
                dropOptions={hourOptions}
                dropValue={(value) => setSelectedHour(value.value)}
                dropPlace="Sound"
              />
            }
          />
          <SettingsContainer
            settingTitle="Sound on Delete Task"
            settingsDescription="Reproducir sonido al eliminar una tarea"
            settingSwitch={true}
            switchValue={soundOnDeleteTask}
            swithOnChange={(xwey, e) =>
              setSoundOnDeleteTask(!soundOnDeleteTask)
            }
          />
          <SettingsContainer
            settingTitle="Animation on done Task"
            settingsDescription="Reproducir Animacion al terminar una tarea"
            settingSwitch={true}
            switchValue={animationOnDoneTask}
            swithOnChange={(xwey, e) =>
              setAnimationOnDoneTask(!animationOnDoneTask)
            }
          />
        </div>
      </div>
    </Container>
  );
};

export default Settings;
