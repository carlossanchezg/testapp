export const ExamsSchema = {
  name: 'Exams',
  properties: {
    _id: 'objectId?',
    courseName: 'string?',
    courseTopic: 'string?',
    date: 'date?',
    icon: 'string?',
    notifFireDateTimeInMillis: 'int?',
    notificationId: 'string?',
    notifications: 'NotificationsExams[]',
    time: 'date?',
    userID: 'string?',
  },
  primaryKey: '_id',
};


export const NotificationsExamsSchema = {
  name: 'NotificationsExams',
  embedded: true,
  properties: {
    id: 'string?',
    date: 'date?',
  },
};
