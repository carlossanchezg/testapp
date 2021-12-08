import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import styles from './DropDown.module.css';

const DropDown = ({
  dropValue,
  dropOptions,
  dropPlace,
  oneDropLine,
  customDisable,
}) => {
  return (
    <Dropdown
      disabled={customDisable}
      options={dropOptions}
      onChange={(value) => dropValue(value)}
      value={dropPlace}
      placeholder="Select an option"
      className={oneDropLine ? styles.drop2 : styles.drop}
      arrowClassName={styles.arrow}
      controlClassName={styles.control}
      placeholderClassName={styles.placeHolder}
      menuClassName={styles.menu}
    />
  );
};

export default DropDown;
