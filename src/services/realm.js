import Realm from 'realm';
import {SubtaskSchema, TaskSchema, FilterTaskSchema, PomodoroTaskSchema} from '../schemas/TaskSchema';
import {
  RoutineSchema,
  RoutineCreatorSchema,
  RoutineTaskSchema,
  RoutineTaskSubtaskSchema,
} from '../schemas/RoutineSchema';
import {
  CourseSchema,
  FlashCardSchema,
  NotificationStudySchema,
  RepetitionTimeSchema,
} from '../schemas/CourseSchema';

import {PomodoroSchema} from '../schemas/PomodoroSchema';

import {ExamsSchema, NotificationsExamsSchema} from '../schemas/ExamSchema';

import {FilterSchema} from '../schemas/FilterSchema';

import {ClassScheduleSchema, ClassSchema} from '../schemas/ClassScheduleSchema';

import {isNetworkAvailable} from '../utils';

export const isLoggedIn = realmApp => {
  return realmApp && realmApp.currentUser && realmApp.currentUser.isLoggedIn;
};

export const getRealmApp = () => {
  const appId = 'skoolrealmdb-lvuzo';
  const appConfig = {
    id: appId,
    timeout: 10000,
    app: {
      name: 'default',
      version: '0',
    },
  };
  return new Realm.App(appConfig);
};

export const getRealm = async () => {
  const schemas = [
    FilterSchema,
    SubtaskSchema,
    RoutineTaskSchema,
    RoutineCreatorSchema,
    RoutineTaskSubtaskSchema,
    TaskSchema,
    FilterTaskSchema,
    PomodoroTaskSchema,
    RoutineSchema,
    CourseSchema,
    FlashCardSchema,
    NotificationStudySchema,
    RepetitionTimeSchema,
    PomodoroSchema,
    ExamsSchema,
    NotificationsExamsSchema,
    ClassScheduleSchema,
    ClassSchema,
  ];

  const realmApp = getRealmApp();
  const isConnected = isNetworkAvailable();
  console.log('isNetworkAvailable ->', isConnected);
  const config = isLoggedIn(realmApp)
    ? {
        schema: schemas,
        schemaVersion: 1,
        sync: {
          user: realmApp.currentUser,
          partitionValue: realmApp.currentUser.id,
        },
      }
    : {
        schema: schemas,
        schemaVersion: 1,
      };

  if (isConnected) {
    return await Realm.open(config);
  } else {
    return new Realm(config);
  }
};
