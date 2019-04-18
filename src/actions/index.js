import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const chatConnected = createAction('CHAT_CONNECTED');
export const clearAlert = createAction('ALERT_CLEAR');

export const newMessage = createAction('MESSAGE_NEW');
export const newChannel = createAction('CHANNEL_NEW');
export const renameChannel = createAction('CHANNEL_RENAME');
export const removeChannel = createAction('CHANNEL_REMOVE');

export const updateMessages = createAction('MESSAGES_UPDATE');
export const updateChannels = createAction('CHANNELS_UPDATE');
export const changeChannel = createAction('CHANGE_CHANNEL');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addMessage = (channelId, message) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = routes.channelMessagesPath(channelId);
    const response = await axios.post(url, {
      data: {
        type: 'messages',
        attributes: message,
      },
    });
    dispatch(addMessageSuccess({ data: response.data }));
  } catch (e) {
    dispatch(addMessageFailure({ message }));
  }
};

export const addChannel = name => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const url = routes.channelsPath();
    const response = await axios.post(url, {
      data: {
        type: 'channels',
        attributes: {
          name,
        },
      },
    });
    dispatch(addChannelSuccess({ data: response.data }));
  } catch (e) {
    dispatch(addMessageFailure({ name }));
  }
};
