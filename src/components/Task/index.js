import React, { useEffect, useState, useContext } from 'react';

import SettingsOptionsContext from '../../contexts/SettingsOptionsContext';
import RealmContext from '../../contexts/RealmContext';

import AddItemContainer from '../AddItemContainer';
import AddButton from '../AddButton';
import Button from '../Button';
import CustomModal from '../Modal';
import TitleAndIconClose from '../Modal/titleAndIconClose';
import TextAndComponentContainer from '../Modal/textAndComponentContainer';
import Input from '../Input';
import SubmitBottomButtons from '../Modal/submitBottomButtons';
import SwitchSelector from '../SwitchSelector';
import Dropdown from '../DropDown';

import {
  handleReadableDate,
  icons,
  colorOptions,
  hourOptions,
  minuteOptions,
  modeOptions,
  isEmpty,
  isAlarmInPresent,
} from '../../utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Task.module.css';

import axios from 'axios';

import Modal from 'react-modal';
import {isLoggedIn} from '../../services/realm';
import {v4 as uuidv4} from 'uuid';
import {ObjectId} from "bson";
import { ipcRenderer } from 'electron';


Modal.setAppElement('#root');
const Task = (props) => {
  const { deleteExpired } = useContext(SettingsOptionsContext);
  const {realmApp, setRealmApp, realm, setRealm} = useContext(RealmContext);

  const [openModal, setOpenModal] = useState(false);
  const [undoModal, setUndoModal] = useState(false);

  const [userTasks, setUserTasks] = useState([]);
  const [showUserTasks, setShowUserTasks] = useState([]);

  const [taskName, setTaskName] = useState('');
  const [colorOption, setColorOption] = useState('#14D378');
  const [modeOption, setModeOption] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinutes, setSelectedMinutes] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState('anchor');

  const refreshTasks = _ => {
    if (realm && isLoggedIn(realmApp)){
      const data = realm.objects('Task');
      setUserTasks(
        data ? data.filtered(
            `soundDay == ${props.getPressDay} AND soundMonth == ${props.getMonth} AND soundYear == ${props.getYear}`,
          ) : []
      );
    }
  }
  
  useEffect(() => {
    refreshTasks();
    console.log('DELETE EXPIDER CONTEX EN TASK', deleteExpired);
  }, [deleteExpired, realm]);

  useEffect(() => {
    setShowUserTasks(userTasks);
  }, [userTasks, props.getPressDay, props.getMonth, props.getYear]);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (isEmpty(taskName)){
      alert('Name is required');
      return;
    }
    
    if (selectedHour === null || selectedMinutes === null){
      alert('Time must not be empty');
      return;
    }

    const newTaskData = {
      _id: ObjectId(),
      id: uuidv4(),
      alarmNotifIds: [],
      name: taskName,
      color: colorOption,
      mode: modeOption,
      done: false,
      icon: selectedIcon,
      soundYear: props.getYear,
      soundMonth: props.getMonth,
      soundDay: props.getPressDay,
      soundHour: selectedHour,  
      soundMinute: selectedMinutes,
    };

    const newAlarm = {
      id: newTaskData.id,
      hour: newTaskData.soundHour,
      minute: newTaskData.soundMinute,
      year: newTaskData.soundYear,
      month: newTaskData.soundMonth,
      day: newTaskData.soundDay,
      title: newTaskData.mode === 1 ? 'Task Alarm' : 'Task Notification',
      body: newTaskData.name,
      type: newTaskData.mode === 1 ? 'alarm' : 'notification'
    };

    if (!isAlarmInPresent(newAlarm)){
      alert('Time cannot be in the past');
      return;
    }

    try {
      /* Save task */
      if (realm && isLoggedIn(realmApp)){
        ipcRenderer.send('set-alarm', newAlarm);
        realm.write(() => {
          realm.create('Task', newTaskData);
        });
        refreshTasks();
      }
      setOpenModal(false);
    } catch (error) {
      console.log('ERR IN CREATE NEW TASK', error);
    }
  };

  const handleDeleteTask = async (e, id) => {
    e.preventDefault();
    try {
      if (realm && isLoggedIn(realmApp)){
        realm.write(() => {
          const d = realm.objects('Task')
          const foundTasks = d ? d.filtered(`id == "${id}"`) : [];
          if (foundTasks.length < 1) return;
          const foundTask = foundTasks[0];
          realm.delete(foundTask);
          refreshTasks();
        });
      }
    } catch (error) {
      console.log('ERR TO DELETE TASK', error);
    }
  };

  const handleDoneTask = async (e, id, name, color, done, icon) => {
    console.info('HANDLE_DONE_TASK');
    e && e.preventDefault();
    try {
      if (realm && isLoggedIn(realmApp)){
        realm.write(() => {
          const d = realm.objects('Task')
          const foundTasks = d ? d.filtered(`id == "${id}"`).snapshot() : [];
          if (foundTasks.length < 1) return;
          const foundTask = foundTasks[0];
          foundTask.done = true;
          refreshTasks();
        });
      }
    } catch (error) {
      console.log('ERR TO UPDATE TASK', error);
    }

    // const DONE_TASK_URI = `http://localhost:3500/mydomain/users/60fb478bee70afa9fe3d485d/tasks/${id}`;
    // const jsonSend = {
    //   name: name,
    //   color: color,
    //   done: !done,
    //   icon: icon,
    // };
    // setUndoModal(true);
    // try {
    //   const dondeTaskRes = await axios.patch(DONE_TASK_URI, jsonSend);
    //   setUserTasks(dondeTaskRes.data.updated.userTasks);
    //   console.log(dondeTaskRes.data);
    //   setTimeout(() => {
    //     setUndoModal(false);
    //     handleDeleteTask(e, id);
    //   }, 5000);
    // } catch (error) {
    //   console.log('ERR TO UPDATE TASK', error);
    // }
  };

  const CreateTaskView = () => {
    const currentDate = new Date();
    return (
      <div
        style={{
          // backgroundColor: 'orange',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {(props.getPressDay < currentDate.getDate() &&
          props.getMonth === currentDate.getMonth()) ||
        props.getMonth < currentDate.getMonth() ||
        props.getYear < currentDate.getFullYear() ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'red',
              width: '100%',
            }}
          >
            <text>Aun no es posible viajar en el tiempo</text>
          </div>
        ) : (
          <AddItemContainer
            noItems={true}
            itemAreaText={
              props.getPressDay === currentDate.getDate() &&
              props.getMonth === currentDate.getMonth()
                ? 'Not tasks for today, add one'
                : props.getPressDay === currentDate.getDate() + 1
                ? 'Not tasks for tomoorrow, add one'
                : `No tasks for ${props.getPressDay} ${props.getMonth} ${props.getYear} add one`
            }
            onPressFunction={() => {
              setOpenModal(true);
              setTaskName('');
              setColorOption('#14D378');
              setSelectedIcon('anchor');
            }}
            buttonText="New Task"
          />
        )}
      </div>
    );
  };

  const CustomModalView = () => {
    return (
      <CustomModal
        open={openModal}
        overlayClick={(value) => setOpenModal(value)}
        content={
          <div
            style={{
              // backgroundColor: 'steelblue',
              height: '100%',
            }}
          >
            <TitleAndIconClose
              modalTitle="Create New Task"
              closeModal={(value) => setOpenModal(value)}
            />
            <div style={{ paddingLeft: 25, paddingRight: 25 }}>
              <TextAndComponentContainer>
                <text>Name</text>
                <Input
                  inputValue={taskName}
                  examplePlaceHolder="Work with Sara"
                  inputValueFunction={(e) => setTaskName(e.target.value)}
                  inputType="email"
                />
              </TextAndComponentContainer>

              <TextAndComponentContainer>
                <text>Color</text>
                <SwitchSelector
                  scroll={false}
                  content={colorOptions.map((item) =>
                    item.color === colorOption ? (
                      <div
                        onClick={() => setColorOption(item.color)}
                        style={{
                          backgroundColor: colorOption,
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '39px',
                          paddingRight: '39px',
                          paddingTop: '7px',
                          paddingBottom: '6px',
                          borderRadius: '50px',
                        }}
                      >
                        <text style={{ color: 'white' }}>{item.label}</text>
                      </div>
                    ) : (
                      <div
                        onClick={() => setColorOption(item.color)}
                        style={{
                          backgroundColor: '#e8e8e8 ',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '39px',
                          paddingRight: '39px',
                          paddingTop: '7px',
                          paddingBottom: '6px',
                          borderRadius: '50px',
                        }}
                      >
                        <text style={{ color: 'black' }}>{item.label}</text>
                      </div>
                    )
                  )}
                />
              </TextAndComponentContainer>

              <TextAndComponentContainer>
                <text>Mode</text>
                <SwitchSelector
                  scroll={false}
                  content={modeOptions.map((item) =>
                    item.value === modeOption ? (
                      <div
                        onClick={() => setModeOption(item.value)}
                        style={{
                          backgroundColor: 'black',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '53px',
                          paddingRight: '53px',
                          paddingTop: '7px',
                          paddingBottom: '6px',
                          borderRadius: '50px',
                          color: 'white',
                        }}
                      >
                        {item.label}
                      </div>
                    ) : (
                      <div
                        onClick={() => setModeOption(item.value)}
                        style={{
                          backgroundColor: '#e8e8e8 ',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '53px',
                          paddingRight: '53px',
                          paddingTop: '7px',
                          paddingBottom: '6px',
                          borderRadius: '50px',
                        }}
                      >
                        {item.label}
                      </div>
                    )
                  )}
                />
              </TextAndComponentContainer>

              <TextAndComponentContainer>
                <text>Time</text>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: 'red',
                    width: '75%',
                  }}
                >
                  <Dropdown
                    dropOptions={hourOptions}
                    dropValue={(value) => setSelectedHour(value.value)}
                    dropPlace="Hour"
                  />
                  <Dropdown
                    dropOptions={minuteOptions}
                    dropValue={(value) => setSelectedMinutes(value.value)}
                    dropPlace="Minute"
                  />
                </div>
              </TextAndComponentContainer>

              <TextAndComponentContainer>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <text>Sound</text>
                  <text style={{ fontSize: 8 }}>automatico</text>
                </div>
                <SwitchSelector
                  scroll={false}
                  content={colorOptions.map((item) =>
                    item.color === colorOption ? (
                      <div
                        onClick={() => alert(item.label)}
                        style={{
                          backgroundColor: colorOption,
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '39px',
                          paddingRight: '39px',
                          paddingTop: '7px',
                          paddingBottom: '6px',
                          borderRadius: '50px',
                        }}
                      >
                        <text style={{ color: 'white' }}>{item.label}</text>
                      </div>
                    ) : (
                      <div
                        onClick={() => alert(item.label)}
                        style={{
                          backgroundColor: '#e8e8e8 ',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '39px',
                          paddingRight: '39px',
                          paddingTop: '7px',
                          paddingBottom: '6px',
                          borderRadius: '50px',
                        }}
                      >
                        {item.label}
                      </div>
                    )
                  )}
                />
              </TextAndComponentContainer>

              <TextAndComponentContainer>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <text>Icon</text>
                  <text style={{ fontSize: 8 }}>optional</text>
                </div>
                <SwitchSelector
                  scroll={true}
                  content={icons.map((item) =>
                    item.iconCode === selectedIcon ? (
                      <div
                        onClick={() => setSelectedIcon(item.iconCode)}
                        style={{
                          backgroundColor: 'black',
                          marginLeft: '2px',
                          marginRight: '2px',
                          paddingLeft: '15px',
                          paddingRight: '15px',
                          paddingTop: '5px',
                          paddingBottom: '5px',
                          borderRadius: '50px',
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
                        onClick={() => setSelectedIcon(item.iconCode)}
                        style={{
                          backgroundColor: 'transparent',
                          marginLeft: '2px',
                          marginRight: '2px',
                          paddingLeft: '15px',
                          paddingRight: '15px',
                          paddingTop: '5px',
                          paddingBottom: '5px',
                          borderRadius: '50px',
                        }}
                      >
                        <FontAwesomeIcon size="sm" icon={item.iconCode} />
                      </div>
                    )
                  )}
                />
              </TextAndComponentContainer>

              <TextAndComponentContainer>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <text>Pomodoro</text>
                  <text style={{ fontSize: 8 }}>optional</text>
                </div>

                <Button
                  styleBtn={{
                    width: 335,
                    height: 35,
                    borderRadius: 10,
                    paddingLeft: 20,
                  }}
                  content={
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <text style={{ marginRight: 8 }}>Add Pomodoro</text>
                      <FontAwesomeIcon size="xs" icon="clock" />
                    </div>
                  }
                />
              </TextAndComponentContainer>

              <TextAndComponentContainer>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <text>Filter</text>
                  <text style={{ fontSize: 8 }}>optional</text>
                </div>

                <Button
                  styleBtn={{
                    width: 335,
                    height: 35,
                    borderRadius: 10,
                    paddingLeft: 20,
                  }}
                  content={
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <text style={{ marginRight: 8 }}>Add Filter</text>
                      <FontAwesomeIcon size="xs" icon="filter" />
                    </div>
                  }
                />
              </TextAndComponentContainer>

              <TextAndComponentContainer>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <text>SubTask</text>
                  <text style={{ fontSize: 8 }}>optional</text>
                </div>

                <Button
                  styleBtn={{
                    width: 335,
                    height: 35,
                    borderRadius: 10,
                    paddingLeft: 20,
                  }}
                  content={
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <text style={{ marginRight: 8 }}>Add SubTask</text>
                      <FontAwesomeIcon size="xs" icon="code-branch" />
                    </div>
                  }
                />
              </TextAndComponentContainer>

              <SubmitBottomButtons
                cancelFunction={() => setOpenModal(false)}
                submitFunction={(e) => handleCreateTask(e)}
                submitButtonText="Crear"
                submitBg="lightblue"
              />
            </div>
          </div>
        }
      />
    );
  };

  const ShowTasksView = () => {
    return (
      <>
        <div
          style={{
            // backgroundColor: 'orange',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <AddItemContainer
            itemAreaText={`Today Tasks ${showUserTasks.length}`}
            onPressFunction={() => {
              setOpenModal(true);
              setTaskName('');
              setColorOption('#14D378');
              setSelectedIcon('anchor');
            }}
            buttonText="New Task"
          />
        </div>
        <div
          style={{
            // backgroundColor: 'greenyellow',
            paddingTop: 25,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 25,
            // display: 'flex',
            // flexDirection: 'column',
            overflowY: 'scroll',
            height: 525,
          }}
        >
          {showUserTasks.map((item) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginBottom: 25,
              }}
            >
              <Button
                onPress={(e) =>
                  handleDoneTask(
                    e,
                    item.id,
                    item.name,
                    item.color,
                    item.done,
                    item.icon
                  )
                }
                content={
                  <div>
                    <FontAwesomeIcon size="lg" icon="check" color="white" />
                  </div>
                }
                styleBtn={{
                  backgroundColor: '#D3E7F6',
                  paddingLeft: 14,
                  paddingRight: 14,
                  borderRadius: 10,
                  height: 44,
                }}
              />
              <Button
                content={
                  <div
                    style={{
                      backgroundColor: item.color,
                      width: 340,
                      height: 50,
                      borderRadius: 100,
                      paddingTop: 10,
                      paddingRight: 25,
                      paddingBottom: 10,
                      paddingLeft: 25,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <FontAwesomeIcon
                        color="white"
                        size="2x"
                        icon={item.icon}
                      />
                      <div style={{ marginLeft: 16 }}>
                        <div style={{ color: 'white', fontSize: 23 }}>
                          {item.name}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <FontAwesomeIcon
                            color="white"
                            size="xs"
                            icon="clock"
                          />
                          <text
                            style={{
                              color: 'white',
                              fontSize: 13,
                              marginLeft: 3,
                            }}
                          >
                            {handleReadableDate(
                              item.soundHour,
                              item.soundMinute
                            )}
                          </text>
                        </div>
                      </div>
                    </div>
                    <div>filter</div>
                  </div>
                }
                styleBtn={{ padding: 0, borderRadius: 100 }}
              />
              <Button
                onPress={(e) => handleDeleteTask(e, item.id)}
                content={
                  <div style={{}}>
                    <FontAwesomeIcon size="lg" icon="trash" color="white" />
                  </div>
                }
                styleBtn={{
                  backgroundColor: '#FADADA',
                  paddingLeft: 15,
                  paddingRight: 15,
                  borderRadius: 10,
                  height: 43,
                }}
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div style={{ backgroundColor: null, width: 570 }}>
      { openModal ? CustomModalView() : null }
      { showUserTasks.length > 0 ? ShowTasksView() : CreateTaskView() }
    </div>
  );
};

export default Task;
