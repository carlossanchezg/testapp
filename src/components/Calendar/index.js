import React, { useEffect, useState } from 'react';

import Button from '../Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Colors } from '../../styles';

import axios from 'axios';

import styles from './Calendar.module.css';

const Calendar = ({ passYear, passMonth, passDay, passMonthName }) => {
  const [modifiableCurrentYearNumber, setModifiableCurrentYearNumber] =
    useState(0);
  const [modifiableCurrentMonthNumber, setModifiableCurrentMonthNumber] =
    useState(0);
  const [modifiableCurrentDayNumber, setModifiableCurrentDayNumber] =
    useState(0);

  const [currentYear, setCurrentYear] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const [monthName, setMonthName] = useState('');
  const [days, setDays] = useState([]);

  const [pressDay, setPressDay] = useState(false);

  const [dayTasks, setDayTasks] = useState([]);

  useEffect(() => {
    const date = new Date();
    setModifiableCurrentYearNumber(date.getFullYear());
    setModifiableCurrentMonthNumber(date.getMonth());
    setModifiableCurrentDayNumber(date.getDate());
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth());
    setCurrentDay(date.getDate());
    // handleShowTasks();
  }, []);

  useEffect(() => {
    const handleGetUserTasks = async () => {
      const GET_USER_TASKS_URI = `http://localhost:3500/mydomain/users/60fb478bee70afa9fe3d485d/tasks/`;
      try {
        const userRes = await axios.get(GET_USER_TASKS_URI);
        setDayTasks(userRes.data);
        console.log('llamada a tasks!!!!!!!!');
        return userRes;
      } catch (error) {
        console.log('ERR GET USER TASKS', error);
      }
    };
    handleGetUserTasks();
  }, []);

  useEffect(() => {
    switch (modifiableCurrentMonthNumber) {
      case 0:
        setMonthName('Enero');
        break;
      case 1:
        setMonthName('Feb');
        break;
      case 2:
        setMonthName('Mar');
        break;
      case 3:
        setMonthName('Ab');
        break;
      case 4:
        setMonthName('May');
        break;
      case 5:
        setMonthName('Jun');
        break;
      case 6:
        setMonthName('Jul');
        break;
      case 7:
        setMonthName('Ago');
        break;
      case 8:
        setMonthName('Sep');
        break;
      case 9:
        setMonthName('Oct');
        break;
      case 10:
        setMonthName('Nov');
        break;
      case 11:
        setMonthName('Dic');
        break;
      default:
        setMonthName('0000');
        break;
    }

    const handleLeapYear = () => {
      return (
        (modifiableCurrentYearNumber % 100 !== 0 &&
          modifiableCurrentYearNumber % 4 === 0) ||
        modifiableCurrentYearNumber % 400 === 0
      );
    };

    const handleMonthDays = () => {
      if (
        modifiableCurrentMonthNumber === 0 ||
        modifiableCurrentMonthNumber === 2 ||
        modifiableCurrentMonthNumber === 4 ||
        modifiableCurrentMonthNumber === 6 ||
        modifiableCurrentMonthNumber === 7 ||
        modifiableCurrentMonthNumber === 9 ||
        modifiableCurrentMonthNumber === 11
      ) {
        return 31;
      } else if (
        modifiableCurrentMonthNumber === 3 ||
        modifiableCurrentMonthNumber === 5 ||
        modifiableCurrentMonthNumber === 8 ||
        modifiableCurrentMonthNumber === 10
      ) {
        return 30;
      } else {
        return handleLeapYear() ? 29 : 28;
      }
    };

    class dayobj {
      constructor(day, month, year, id, otherdaysmonth, dayWithTasks) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.id = id;
        this.otherdaysmonth = otherdaysmonth;
        this.dayWithTasks = dayWithTasks;
      }
    }

    const handleWriteMonth = () => {
      const prevLastDay = new Date(
        modifiableCurrentYearNumber,
        modifiableCurrentMonthNumber,
        0
      ).getDate();

      const handleStartDayWeek = new Date(
        modifiableCurrentYearNumber,
        modifiableCurrentMonthNumber,
        1
      ).getDay();

      const lastDayIndex = new Date(
        modifiableCurrentYearNumber,
        modifiableCurrentMonthNumber + 1,
        0
      ).getDay();

      const nextDays = 7 - lastDayIndex - 1;

      const totaldays = [];
      for (let i = handleStartDayWeek; i > 0; i--) {
        totaldays.push(
          new dayobj(
            prevLastDay - i + 1,
            modifiableCurrentMonthNumber - 1,
            modifiableCurrentYearNumber,
            prevLastDay - i + 1,
            true,
            false
          )
        );
      }

      for (let i = 1; i <= handleMonthDays(); i++) {
        totaldays.push(
          new dayobj(
            i,
            modifiableCurrentMonthNumber,
            modifiableCurrentYearNumber,
            i,
            false,
            dayTasks.find(
              (day) =>
                day.soundDay === i &&
                day.soundMonth === modifiableCurrentMonthNumber &&
                day.soundYear === currentYear
            ) === undefined
              ? false
              : true
          )
        );
      }

      for (let i = 1; i <= nextDays; i++) {
        totaldays.push(
          new dayobj(
            i,
            modifiableCurrentMonthNumber + 1,
            modifiableCurrentYearNumber,
            i,
            true,
            false
          )
        );
      }
      setDays(totaldays);
    };
    handleWriteMonth();
    // navigation.setOptions({
    //   title: `${monthName} ${modifiableCurrentYearNumber}`,
    // });
  }, [
    modifiableCurrentMonthNumber,
    modifiableCurrentYearNumber,
    dayTasks,
    currentYear,
    currentMonth,
    monthName,
    passYear,
    passMonth,
    passDay,
    passMonthName,
    modifiableCurrentDayNumber,
  ]);

  const handleLastMonth = () => {
    if (modifiableCurrentMonthNumber !== 0) {
      setModifiableCurrentMonthNumber(modifiableCurrentMonthNumber - 1);
    } else {
      setModifiableCurrentMonthNumber(11);
      setModifiableCurrentYearNumber(modifiableCurrentYearNumber - 1);
    }
  };

  const handleNextMonth = () => {
    if (modifiableCurrentMonthNumber !== 11) {
      setModifiableCurrentMonthNumber(modifiableCurrentMonthNumber + 1);
    } else {
      setModifiableCurrentMonthNumber(0);
      setModifiableCurrentYearNumber(modifiableCurrentYearNumber + 1);
    }
  };

  const daysWeek = [
    { day: 'D', id: 1 },
    { day: 'L', id: 2 },
    { day: 'M', id: 3 },
    { day: 'MI', id: 4 },
    { day: 'J', id: 5 },
    { day: 'V', id: 6 },
    { day: 'S', id: 7 },
  ];

  console.log(days);

  //   const {deleteExpired} = useContext(SettingsOptionsContext);

  //   const handleShowTasks = async () => {
  //     const realm = await getRealm();
  //     const data = realm.objects('Task');

  //     setDayTasks(data);
  //   };

  const handlePressDay = (day, month, year) => {
    setPressDay(true);
    setModifiableCurrentDayNumber(day);
    passDay(day);
    passMonth(modifiableCurrentMonthNumber);
    passYear(modifiableCurrentYearNumber);
    console.log('dayyy', day);
    console.log('monthhh', month);
    console.log('yeaarrrr', year);
    //   handleShowTasks();
  };

  //   useEffect(() => {
  //     deleteExpired ? handleShowTasks() : null;
  //     console.log(deleteExpired);
  //   }, [deleteExpired]);
  //   console.log('el expired en calendar', deleteExpired);
  return (
    <div
      style={{
        backgroundColor: Colors.SecondaryBackground,
        width: 420,
        height: days.length > 35 ? 415 : 320,
        padding: 25,
        borderRadius: 20,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ backgroundColor: null }}>
        <div
          style={{
            // backgroundColor: 'linen',
            display: 'flex',
            paddingLeft: 16,
            paddingRight: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
            alignItems: 'center',
          }}
        >
          <Button
            onPress={handleLastMonth}
            content={<FontAwesomeIcon icon="chevron-left" color="black" />}
          />
          <div
            style={{
              // backgroundColor: 'gray',
              display: 'flex',
              flexDirection: 'row',
              width: 70,
              justifyContent: 'space-between',
            }}
          >
            <text>{monthName}</text>
            <text>{modifiableCurrentYearNumber}</text>
          </div>
          <Button
            onPress={handleNextMonth}
            content={<FontAwesomeIcon icon="chevron-right" color="black" />}
          />
        </div>
        <div className={styles.calendar_week}>
          {daysWeek.map((item) => (
            <div style={{ textAlign: 'center', marginBottom: 15 }}>
              {item.day}
            </div>
          ))}
        </div>
      </div>
      <div
        className={styles.calendar_month_days}
        style={{ backgroundColor: Colors.SecondaryBackground }}
      >
        {days.map((item) =>
          item.otherdaysmonth === true ? (
            <Button
              customDisable={true}
              content={
                <div
                  style={{
                    textAlign: 'center',
                    height: 47,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                  }}
                >
                  <text style={{ color: '#C0C0C0' }}>{item.day}</text>
                </div>
              }
              styleBtn={{
                backgroundColor: Colors.SecondaryBackground,
                height: 53,
                borderRadius: 100,
              }}
            />
          ) : item.day === currentDay &&
            item.month === currentMonth &&
            item.year === currentYear &&
            item.otherdaysmonth === false ? (
            <Button
              onPress={() => handlePressDay(item.day, item.month, item.year)}
              content={
                <div
                  style={{
                    textAlign: 'center',
                    color: Colors.background,
                    backgroundColor: 'blue',
                    height: 47,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                  }}
                >
                  <text>{item.day}</text>
                </div>
              }
              styleBtn={{
                // backgroundColor: 'blue',
                backgroundColor: Colors.SecondaryBackground,

                height: 53,
                borderRadius: 100,
              }}
            />
          ) : pressDay &&
            item.day === modifiableCurrentDayNumber &&
            modifiableCurrentDayNumber !== currentDay &&
            item.otherdaysmonth === false ? (
            <Button
              onPress={() => handlePressDay(item.day, item.month, item.year)}
              content={
                <div
                  style={{
                    textAlign: 'center',
                    color: Colors.background,
                    backgroundColor: 'rgb(225, 225, 225, 1)',
                    height: 47,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                  }}
                >
                  <text>{item.day}</text>
                </div>
              }
              styleBtn={{
                backgroundColor: Colors.SecondaryBackground,
                height: 53,
                borderRadius: 100,
              }}
            />
          ) : item.dayWithTasks ? (
            <Button
              onPress={() => handlePressDay(item.day, item.month, item.year)}
              content={
                <div
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    height: 47,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    flexDirection: 'column',
                    // backgroundColor: 'blue',
                  }}
                >
                  <text style={{ marginTop: 4 }}>{item.day}</text>
                  <div
                    style={{
                      backgroundColor: 'red',
                      height: 5,
                      borderRadius: 100,
                      width: 5,
                      // marginTop: 4,
                    }}
                  />
                </div>
              }
              styleBtn={{
                backgroundColor: Colors.SecondaryBackground,
                height: 53,
                borderRadius: 100,
              }}
            />
          ) : (
            <Button
              onPress={() => handlePressDay(item.day, item.month, item.year)}
              content={
                <div
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    height: 47,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                  }}
                >
                  <text>{item.day}</text>
                </div>
              }
              styleBtn={{
                backgroundColor: Colors.SecondaryBackground,
                height: 53,
                borderRadius: 100,
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
