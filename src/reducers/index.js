import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.updateMessages](state, { payload }) {
    return [...payload];
  },
  [actions.newMessage](state, { payload }) {
    const { data: { attributes } } = payload;
    return [...state, attributes];
  },
}, []);


const channelsUIState = handleActions({
  [actions.changeChannel](state, { payload }) {
    return { ...state, currentChannelId: payload };
  },
}, {});

const channels = handleActions({
  [actions.updateChannels](state, { payload }) {
    return [...payload];
  },
}, []);

const chatUIState = handleActions({
  [actions.chatConnected](state) {
    return { ...state, connected: true };
  },
}, { connected: false });

export default combineReducers({
  channels,
  messages,
  channelsUIState,
  chatUIState,
  form: formReducer,
});
