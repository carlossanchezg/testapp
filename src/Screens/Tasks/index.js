import React, { useState } from "react";

import Container from "../../components/Container";
import Calendar from "../../components/Calendar";
import Task from "../../components/Task";
import TasksFilters from "../../components/TasksFilters";
import { useLocation, useParams, Link } from "react-router-dom";

const Tasks = () => {
  const [day, setDay] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  return (
    <Container navTitle="Tasks" padding={true}>
      <div
        style={{
          // backgroundColor: 'lightsteelblue',
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ backgroundColor: null }}>
          <Calendar
            passDay={(d) => setDay(d)}
            passMonth={(m) => {
              setMonth(m);
              console.log("m", m);
            }}
            passYear={(y) => {
              setYear(y);
              console.log("y", y);
            }}
          />
          <div style={{ backgroundColor: null, marginTop: 20 }}>
            <TasksFilters />
          </div>
        </div>
        <Task getPressDay={day} getMonth={month} getYear={year} />
      </div>
    </Container>
  );
};

export default Tasks;
