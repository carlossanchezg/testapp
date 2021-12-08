import React from 'react';
import Modal from 'react-modal';

// import styles from '../../Views/Tasks/Tasks.module.css';

Modal.setAppElement('#root');
const CustomModal = ({
  open,
  content,
  left,
  top,
  borderRadius,
  width,
  overlayClick,
  contentStyle,
  customHeight,
  customWidth,
  customLeft,
  customTop,
}) => {
  return (
    <Modal
      isOpen={open}
      shouldCloseOnEsc={true}
      onRequestClose={() => overlayClick(false)}
      // className={styles.modal_task_content}
      style={{
        overlay: {
          zIndex: 1002,
          backgroundColor: 'rgba(120, 120, 120, 0.7)',
        },
        content: {
          width: customWidth ? customWidth : 500,
          height: customHeight ? customHeight : '93%',
          left: customLeft ? customLeft : '29%',
          top: customTop ? customTop : '0%',
          bottom: '0%',
          borderRadius: 35,
          borderWidth: '0px',
          padding: '25px',
        },
      }}
    >
      {content}
    </Modal>
  );
};

export default CustomModal;
