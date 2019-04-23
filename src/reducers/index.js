import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import update from 'immutability-helper';
import _ from 'lodash';
import * as actions from '../actions';

const messages = handleActions({
  [actions.updateMessages](state, { payload }) {
    return [...payload];
  },
  [actions.newMessage](state, { payload }) {
    const { data: { attributes } } = payload;
    return [...state, attributes];
  },
  [actions.removeChannel](state, { payload }) {
    const { data: { id } } = payload;
    return state.filter(message => message.channelId !== id);
  },
}, []);


const channelsUIState = handleActions({
  [actions.changeChannel](state, { payload }) {
    return { ...state, currentChannelId: payload };
  },
  [actions.openChannelModal](state, { payload }) {
    const {
      openedModalType,
      selectedChannelId,
      newChannelName,
    } = payload;

    const newState = { ...state, openedModalType, isModalOpened: true };

    switch (openedModalType) {
      case 'add':
        return { ...newState, newChannelName };
      case 'edit':
        return { ...newState, selectedChannelId, newChannelName };
      case 'delete':
        return { ...newState, selectedChannelId };
      default:
        return state;
    }
  },
  [actions.closeChannelModal](state) {
    return { ...state, isModalOpened: false };
  },
  [actions.addChannelRequest](state) {
    return { ...state, isModalOpened: false };
  },
  [actions.deleteChannelRequest](state) {
    return { ...state, isModalOpened: false };
  },
  [actions.editChannelRequest](state) {
    return { ...state, isModalOpened: false };
  },
  [actions.newChannelNameChange](state, { payload }) {
    return { ...state, newChannelName: payload };
  },
}, { isDeleteModalOpen: false, isEditModalOpen: false, newChannelName: '' });

const channels = handleActions({
  [actions.updateChannels](state, { payload }) {
    const allIds = payload.map(channel => channel.id);
    const byId = payload.reduce((acc, element) => ({ [element.id]: element, ...acc }), {});
    return { byId, allIds };
  },
  [actions.removeChannel](state, { payload }) {
    const { data: { id } } = payload;
    const { byId, allIds } = state;
    return { byId: _.omit(byId, id), allIds: _.without(allIds, id) };
  },
  [actions.newChannel](state, { payload }) {
    const { data: { attributes } } = payload;
    const { byId, allIds } = state;
    return { byId: { [attributes.id]: attributes, ...byId }, allIds: [...allIds, attributes.id] };
  },
  [actions.renameChannel](state, { payload }) {
    const { data: { attributes } } = payload;
    const newState = update(state, { byId: { [attributes.id]: { $set: attributes } } });
    return newState;
  },
}, { byId: {}, allIds: [] });

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
