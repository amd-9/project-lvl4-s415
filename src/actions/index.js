import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');


export const addMessage = (channelId, text) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = routes.channelMessagesPath(channelId);
    const response = await axios.post(url, {
      data: {
        type: 'messages',
        attributes: {
          text,
        },
      },
    });
    dispatch(addMessageSuccess({ data: response.data }));
  } catch (e) {
    dispatch(addMessageFailure({ text }));
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
