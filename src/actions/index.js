import axios from 'axios';
import { createAction } from 'redux-actions';
import { SubmissionError } from 'redux-form';
import routes from '../routes';

export const chatConnected = createAction('CHAT_CONNECTED');
export const clearAlert = createAction('ALERT_CLEAR');
export const newChannelNameChange = createAction('NEW_CHANNEL_NAME_CHANGE');

export const openChannelDeleteModal = createAction('CHANNEL_DETELE_MODEL_OPEN');
export const closeChannelDeleteModal = createAction('CHANNEL_DETELE_MODEL_CLOSE');

export const openChannelEditModal = createAction('CHANNEL_EDIT_MODEL_OPEN');
export const closeChannelEditModal = createAction('CHANNEL_EDIT_MODEL_CLOSE');

export const openChannelModal = createAction('CHANNEL_MODAL_OPEN');
export const closeChannelModal = createAction('CHANNEL_MODAL_CLOSE');

export const newMessage = createAction('MESSAGE_NEW');
export const newChannel = createAction('CHANNEL_NEW');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const renameChannel = createAction('CHANNEL_RENAME');

export const updateMessages = createAction('MESSAGES_UPDATE');
export const updateChannels = createAction('CHANNELS_UPDATE');
export const changeChannel = createAction('CHANGE_CHANNEL');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const editChannelRequest = createAction('CHANNEL_EDIT_REQUEST');
export const editChannelSuccess = createAction('CHANNEL_EDIT_SUCCESS');
export const editChannelFailure = createAction('CHANNEL_EDIT_FAILURE');

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
    dispatch(addMessageFailure());
    throw new SubmissionError({ _error: e.message });
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
    dispatch(addMessageFailure());
    throw e;
  }
};

export const deleteChannel = channelId => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    const url = routes.channelPath(channelId);
    const response = await axios.delete(url);
    dispatch(deleteChannelSuccess({ data: response.data }));
  } catch (e) {
    dispatch(deleteChannelFailure());
    throw e;
  }
};

export const editChannel = (channelId, name) => async (dispatch) => {
  dispatch(editChannelRequest());
  try {
    const url = routes.channelPath(channelId);
    const response = await axios.patch(url, {
      data: {
        type: 'channels',
        attributes: {
          name,
        },
      },
    });
    dispatch(editChannelSuccess({ data: response.data }));
  } catch (e) {
    dispatch(editChannelFailure());
    throw e;
  }
};
