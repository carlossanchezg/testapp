export const ClassScheduleSchema = {
  name: 'ClassSchedule',
  properties: {
    _id: 'objectId?',
    userID: 'string?',
    name: 'string?',
    academicStage: 'string?',
    private: 'bool?',
    lessons: 'Class[]',
  },
  primaryKey: '_id',
};

export const ClassSchema = {
  name: 'Class',
  embedded: true,
  properties: {
    id: 'string?',
    name: 'string?',
    color: 'string?',
    info: 'string?',
    day: 'int?',
    startTime: 'date?',
    finishTime: 'date?',
  },
};
