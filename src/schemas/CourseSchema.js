const CourseSchema = {
  name: 'Course',
  properties: {
    _id: 'objectId?',
    userID: 'string?',
    name: 'string?',
    color: 'string?',
    icon: 'string?',
    flashCards: 'FlashCardCourse[]',
    notificationsStudy: 'NotificationsStudyCourse[]',
  },
  primaryKey: '_id',

};

const FlashCardSchema = {
  name: 'FlashCardCourse',
  embedded: true,
  properties: {
    id: 'string?',
    name: 'string?',
    front: 'string?',
    frontImg: 'string?',
    back: 'string?',
    backImg: 'string?',
  },
};

const NotificationStudySchema = {
  name: 'NotificationsStudyCourse',
  embedded: true,
  properties: {
    id: 'string?',
    title: 'string?',
    body: 'string?',
    active: 'bool?',
    repeat: 'int?',
    randomNotificationTime: 'bool?',
    repetition_time: 'RepetitionTime[]',
  },
  
};
const RepetitionTimeSchema = {
  name: 'RepetitionTime',
  embedded: true,
  properties: {
    id: 'string?',
    date: 'date?',
  },
};

export {
  CourseSchema,
  FlashCardSchema,
  NotificationStudySchema,
  RepetitionTimeSchema,
};
