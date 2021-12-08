import React, { useEffect, useState, useContext } from 'react';

import RealmContext from "../../contexts/RealmContext";

import { isLoggedIn } from "../../services/realm";

import AddButton from '../AddButton';
import Button from '../Button';

import AddItemContainer from '../AddItemContainer';

import CustomModal from '../Modal';
import TitleAndIconClose from '../Modal/titleAndIconClose';
import TextAndComponentContainer from '../Modal/textAndComponentContainer';
import Input from '../Input';
import SubmitBottomButtons from '../Modal/submitBottomButtons';

import Modal from 'react-modal';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Colors } from '../../styles';

Modal.setAppElement('#root');
const TasksFilters = () => {
  const { realmApp, setRealmApp, realm, setRealm } = useContext(RealmContext);

  const [openModal, setOpenModal] = useState(false);

  const [userFilters, setUserFilters] = useState([]);

  const [filterName, setFilterName] = useState('');

  const handleGetUserFilters = async () => {
    if (realm && isLoggedIn(realmApp)) {
      const filters = realm.objects("Filter");

      setUserFilters(filters);

      console.log(filters.map((item) => item));
    }
  };

  const handleCreateFilterTask = async (e) => {
    e.preventDefault();

    const jsonSend = {
      name: filterName,
    };
    const NEW_FILTERTASK_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/60fb478bee70afa9fe3d485d/tasks/filters/new/`;
    try {
      const newFilterTaskRes = await axios.post(NEW_FILTERTASK_URI, jsonSend);
      setUserFilters(newFilterTaskRes.data.new.userTaskFilters);
      console.log('new filter', newFilterTaskRes.data.new.userTaskFilters);
      setOpenModal(false);
    } catch (error) {
      console.log('ERR IN CREATE NEW FILTER TASK', error);
    }
  };

  const handleDeleteUserFilter = async (e, filterId) => {
    e.preventDefault();

    const DELETE_FILTER_URI = `http://localhost:3500/mydomain/users/60fb478bee70afa9fe3d485d/tasks/filters/${filterId}`;
    try {
      const deletedFilterRes = await axios.delete(DELETE_FILTER_URI);
      setUserFilters(deletedFilterRes.data.deleted);
      console.log('filter delete res', deletedFilterRes.data);
    } catch (error) {
      console.log('ERR TO DELETE FILTER', error);
    }
  };

  useEffect(() => {
    handleGetUserFilters();
  }, []);

  return (
    <div>
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
          itemAreaText="Filters"
          customIcon="filter"
          onPressFunction={() => {
            setOpenModal(true);
            setFilterName('');
          }}
          buttonText="New Filter"
        />

        <CustomModal
          open={openModal}
          customHeight="25%"
          customTop="30%"
          overlayClick={(value) => setOpenModal(value)}
          content={
            <div
              style={{
                // backgroundColor: 'steelblue',
                height: '100%',
              }}
            >
              <TitleAndIconClose
                modalTitle="Create New Filter"
                closeModal={(value) => setOpenModal(value)}
              />
              <div style={{ paddingLeft: 25, paddingRight: 25 }}>
                <TextAndComponentContainer>
                  <text>Name</text>
                  <Input
                    inputValue={filterName}
                    examplePlaceHolder="Workout"
                    inputValueFunction={(e) => setFilterName(e.target.value)}
                    inputType="email"
                  />
                </TextAndComponentContainer>

                <SubmitBottomButtons
                  cancelFunction={() => setOpenModal(false)}
                  submitFunction={(e) => handleCreateFilterTask(e)}
                  submitButtonText="Crear"
                  submitBg="lightblue"
                />
              </div>
            </div>
          }
        />
      </div>
      <div
        style={{
          // backgroundColor: 'lightsalmon',
          overflowY: 'scroll',
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          height: 191,
        }}
      >
        {userFilters.map((item) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // backgroundColor: 'linen',
              marginBottom: 15,
              borderTopStyle: 'solid',
              borderTopColor: Colors.SecondaryBackground,
              borderTopWidth: 1,
              borderRight: 'none',
              borderBottom: 'none',
              borderLeft: 'none',
            }}
          >
            <div>
              <FontAwesomeIcon color="black" size="sm" icon="filter" />
              <text style={{ fontSize: 17, marginLeft: 3 }}>{item.name}</text>
            </div>
            <Button
              onPress={(e) => handleDeleteUserFilter(e, item._id)}
              content={<FontAwesomeIcon color="red" icon="trash-alt" />}
              styleBtn={{ backgroundColor: 'transparent' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksFilters;
