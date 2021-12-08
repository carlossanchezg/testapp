const electron = require("electron");
const Store = require('electron-store');
const path = require('path');
const { createNewWindow, getWindow } = require('./window');
const Audio = require('sound-play');
require('update-electron-app')()

const { app, BrowserWindow, globalShortcut, Notification, ipcMain } = electron;

const store = new Store();
const savedAlarms = store.get('alarms');
let ACTIVE_ALARMS = savedAlarms ? [...savedAlarms] : [];
const ALARM_NOTIFACTIONS_COUNT = 5;
let STOP_ALARM_SOUND = false;

const isAlarmInPresent = alarm => {
  const dateTime = new Date();
  const tMinute = dateTime.getMinutes();
  const tHour = dateTime.getHours();
  const tDay = dateTime.getDate();
  const tMonth = dateTime.getMonth();
  const tYear = dateTime.getFullYear();

  if (alarm.year > tYear) return true;
  if (alarm.year === tYear && alarm.month > tMonth) return true;
  if (alarm.year === tYear && alarm.month === tMonth && alarm.day > tDay) return true;
  if (
    alarm.year === tYear && alarm.month === tMonth &&
    alarm.day === tDay && alarm.hour > tHour
  ) return true;
  
  if (
    alarm.year === tYear && alarm.month === tMonth &&
    alarm.day === tDay && alarm.hour === tHour && alarm.minute > tMinute
  ) return true;

  return false;
}

const isAlarmTimeUp = alarm => {
  const dateTime = new Date();
  return alarm.minute === dateTime.getMinutes() &&
   alarm.hour === dateTime.getHours() &&
   alarm.year === dateTime.getFullYear() &&
   alarm.month === dateTime.getMonth() && 
   alarm.day === dateTime.getDate()
}

const persistAlarms = _ => {
  if (ACTIVE_ALARMS) store.set('alarms', ACTIVE_ALARMS);
}

const clearFiredAlarms = _ => {
  ACTIVE_ALARMS = ACTIVE_ALARMS.filter(alarm => isAlarmInPresent(alarm));
  persistAlarms();
}
clearFiredAlarms();

const addAlarm = alarm => {
  ACTIVE_ALARMS.push(alarm);
  persistAlarms();
}

const updateAlarm = alarm => {
  if (alarm){
    alarm.fired = false;
    for(let i = 0, alarmsLength = ACTIVE_ALARMS.length; i < alarmsLength; i++){
      if (alarm.id === ACTIVE_ALARMS[i].id){
        ACTIVE_ALARMS[i] = alarm;
        persistAlarms();
        break;
      }
    }
  }
}

const deleteAlarm = alarmId => {
  ACTIVE_ALARMS = ACTIVE_ALARMS.filter(x => alarmId !== x.id);
  persistAlarms();
}


ipcMain.on('show-notification', (event, title, body) => {
  const notification = new Notification({title, body});
  notification.show();
});

ipcMain.on('stop-alarm-sound', (event) => STOP_ALARM_SOUND = true);

ipcMain.on('set-alarm', (event, alarm) => {
  if (alarm){
    STOP_ALARM_SOUND = false;
    alarm.fired = false;
    const matches = ACTIVE_ALARMS.filter(x => x.id === alarm.id);
    if (matches.length > 0) return;
    if (isAlarmInPresent(alarm)) addAlarm(alarm);
  }
});

const monitorAlarms = _ => {
  const monitorAlarmsInterval = setInterval(
    _ => {
      for(let i = 0, alarmsLength = ACTIVE_ALARMS.length; i < alarmsLength; i++){
        if (!ACTIVE_ALARMS[i].fired && isAlarmTimeUp(ACTIVE_ALARMS[i])){
          if (ACTIVE_ALARMS[i].type === 'alarm'){
            clearInterval(monitorAlarmsInterval);
            for(let j = 1; j <= ALARM_NOTIFACTIONS_COUNT; j++){
              setTimeout(_ => {
                if (!STOP_ALARM_SOUND){
                  const notification = new Notification({
                    title: ACTIVE_ALARMS[i].title,
                    body: ACTIVE_ALARMS[i].body,
                    silent: true,
                  });
                  notification.on('click', (event, arg) => {
                    STOP_ALARM_SOUND = true;
                    const mainWindow = getWindow('main');
                    if (mainWindow) mainWindow.show()
                  });
                  Audio.play(path.join(__dirname, '../src/assets/sounds/test_alarm_sound.mp3'));
                  notification.show();
                }
                if (j === ALARM_NOTIFACTIONS_COUNT){
                  STOP_ALARM_SOUND = false;
                  ACTIVE_ALARMS[i].fired = true;
                  deleteAlarm(ACTIVE_ALARMS[i].id);
                  monitorAlarms();
                }
              }, j * 7500);
            }
          } else {
            const notification = new Notification({
              title: ACTIVE_ALARMS[i].title,
              body: ACTIVE_ALARMS[i].body,
              silent: true,
            });
            Audio.play(path.join(__dirname, '../src/assets/sounds/test_alarm_sound.mp3'));
            notification.show();
            ACTIVE_ALARMS[i].fired = true;
            deleteAlarm(ACTIVE_ALARMS[i].id);
          }
          return;
        }
      }
    },
    2000 // Every 2 seconds
  )
}
monitorAlarms();

ipcMain.on('activate', () => {
  const mainWindow = getWindow('main');
  if (mainWindow) mainWindow.show()
})


app.on('ready', () => {
  let mainWindow = null;
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

  mainWindow = createNewWindow('main', {
    width: width,
    height: height,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
    show: false, 
    fullscreen: false,
  });

  // Press Ctrl+Shift+I to open developer tools
  globalShortcut.register('Ctrl+Shift+I', function() {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    if (focusedWindow) focusedWindow.webContents.openDevTools()
  });

  // F5 to reload
  globalShortcut.register('f5', function() {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    if (focusedWindow) focusedWindow.reload()
  });


  mainWindow.on('close', (event) => {
    if (app.quitting) {
      mainWindow = null
    } else {
      event.preventDefault()
      mainWindow.hide()
    }
  })

  // App quits when user presses Cmd+Q or selects quit from app menu, but not
  // when all windows are closed
  globalShortcut.register('Cmd+Q', _ => app.quit() );
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    persistAlarms();
    app.quit()
  }
});

app.on('activate', () => {
  const mainWindow = getWindow('main');
  if (mainWindow) mainWindow.show();
});

app.on('before-quit', () => app.quitting = true)
