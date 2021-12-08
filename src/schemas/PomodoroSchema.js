export const PomodoroSchema = {
    name: 'Pomodoro',
    properties: {
      _id: 'objectId?',
      userID: 'string?',
      name: 'string?',
      concentrationTime: 'int?',
      breakTime: 'int?',
      sessions: 'int?',
      autoRepeatSession: 'bool?',
      colorPosition: 'int?',
    },
    primaryKey: '_id',
  };