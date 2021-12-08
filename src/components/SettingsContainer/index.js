import React from 'react';

import Switch from 'react-switch';

const SettingsContainer = ({
  settingTitle,
  settingsDescription,
  settingSwitch,
  noSwitchRightContent,
  switchValue,
  swithOnChange,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'lightblue',
        marginBottom: 25,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          //   backgroundColor: 'lightgreen',
        }}
      >
        <text>{settingTitle}</text>
        <text
          style={{
            color: 'gray',
          }}
        >
          {settingsDescription}
        </text>
      </div>
      <div>
        {settingSwitch ? (
          <Switch
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={swithOnChange}
            checked={switchValue}
            offColor="#EDEBEA"
          />
        ) : (
          noSwitchRightContent
        )}
      </div>
    </div>
  );
};

export default SettingsContainer;
