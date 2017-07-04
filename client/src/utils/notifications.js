import {
  createNotification,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_WARNING,
} from 'react-redux-notify';

const MESSAGE_TIME = 2000;

/**
 * Provide notification system for ui
 * @example
 *         dispatch(showError(message))
 *         dispatch(showSuccess(message))
 *         dispatch(showWarning(message))
 * **/

const showError = message =>
  createNotification({
    message: message,
    type: NOTIFICATION_TYPE_ERROR,
    duration: MESSAGE_TIME,
  });

const showSuccess = message =>
  createNotification({
    message: message,
    type: NOTIFICATION_TYPE_SUCCESS,
    duration: MESSAGE_TIME,
  });

const showWarning = message =>
  createNotification({
    message: message,
    type: NOTIFICATION_TYPE_WARNING,
    duration: MESSAGE_TIME,
  });

export { showError, showSuccess, showWarning };