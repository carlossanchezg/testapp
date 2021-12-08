export const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'objectId?',
    alarmNotifIds: 'int[]',
    color: 'string?',
    done: 'bool?',
    filter: 'FilterTask',
    icon: 'string?',
    id: 'string?',
    mode: 'int?',
    name: 'string?',
    pomodoro: 'PomodoroTask',
    soundDay: 'int?',
    soundHour: 'int?',
    soundMinute: 'int?',
    soundMonth: 'int?',
    soundYear: 'int?',
    subtasks: 'Subtask[]',
    userID: 'string?',
  },
  primaryKey: '_id',
};

export const FilterTaskSchema = {
  name: 'FilterTask',
  embedded: true,
  properties: {
    _id: 'objectId?',
    name: 'string?',
    icon: 'string?',
  },
};

export const PomodoroTaskSchema = {
  name: 'PomodoroTask',
  embedded: true,
  properties: {
    _id: 'objectId?',
    name: 'string?',
  },
};

export const SubtaskSchema = {
  name: 'Subtask',
  embedded: true,
  properties: {
    done: 'string?',
    id: 'string?',
    name: 'string?',
  },
};
