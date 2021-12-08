export const RoutineSchema = {
  name: 'Routine',
  properties: {
    _id: 'objectId?',
    colorPosition: 'int?',
    description: 'string?',
    name: 'string?',
    private: 'bool?',
    tasks: 'RoutineTask[]',
    userID: 'string?',
    creator: 'RoutineCreator',
  },
  primaryKey: '_id',
};

export const RoutineCreatorSchema = {
  name: 'RoutineCreator',
  embedded: true,
  properties: {
    id: 'string?',
    name: 'string?',
    img: 'string?',
  },
};

export const RoutineTaskSchema = {
  name: 'RoutineTask',
  embedded: true,
  properties: {
    alarmNotifIds: 'int[]',
    color: 'string?',
    done: 'bool?',
    filter: 'string?',
    icon: 'string?',
    id: 'string?',
    mode: 'int?',
    name: 'string?',
    pomodoro: 'string?',
    soundDay: 'int?',
    soundHour: 'int?',
    soundMinute: 'int?',
    soundMonth: 'int?',
    soundYear: 'int?',
    subtasks: 'RoutineTaskSubtask[]',
    userID: 'string?',
  },
};

// export const RoutineTaskFilterSchema = {
//   name: 'RoutineTaskFilter',
//   embedded: true,
//   properties: {
//     id: 'string?',
//     name: 'string?',
//   },
// };

export const RoutineTaskSubtaskSchema = {
  name: 'RoutineTaskSubtask',
  embedded: true,
  properties: {
    done: 'string?',
    id: 'string?',
    name: 'string?',
  },
};
