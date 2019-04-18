import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';
import reducers from '../reducers';
import {
  chatConnected,
  updateMessages,
  updateChannels,
  changeChannel,
  newMessage,
  newChannel,
  renameChannel,
  removeChannel,
} from '../actions';
import UserNameContext from '../context';
import StatusBar from './StatusBar';


const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose,
  ),
);

const getUserName = () => {
  const userName = Cookies.get('slackUserName');
  if (userName) {
    return userName;
  }

  const newUserName = faker.name.findName();
  Cookies.set('slackUserName', newUserName);
  return newUserName;
};

const initializeSocket = () => {
  const socket = io();

  socket.on('connect', () => {
    store.dispatch(chatConnected());
  });

  socket.on('newMessage', (data) => {
    store.dispatch(newMessage(data));
  });

  socket.on('newChannel', (data) => {
    store.dispatch(newChannel(data));
  });

  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });

  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannel(data));
  });
};


const app = ({ channels, messages, currentChannelId }) => {
  initializeSocket();

  store.dispatch(updateChannels(channels));
  store.dispatch(updateMessages(messages));
  store.dispatch(changeChannel(currentChannelId));

  const userName = getUserName();

  render((
    <Provider store={store}>
      <UserNameContext.Provider value={userName}>
        <div className="row mb-3">
          <div className="col-md-12">
            {`Logged as: ${userName}`}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <ChannelList />
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-12">
                <StatusBar />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <MessageList />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <NewMessageForm />
              </div>
            </div>
          </div>
        </div>
      </UserNameContext.Provider>
    </Provider>
  ),
  document.getElementById('chat-wrapper'));
};

export default app;
