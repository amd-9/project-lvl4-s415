import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';
import reducers from '../reducers';
import { updateMessages } from '../actions';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
  ),
);

const app = ({ channels, messages, currentChannelId }) => {
  console.log('State state is');
  console.log(store.getState());

  store.dispatch(updateMessages(messages));

  render((
    <Provider store={store}>
      <div className="row">
        <div className="col-md-2">
          <ChannelList channels={channels} currentChannelId={currentChannelId} />
        </div>
        <div className="col-md-10">
          <div className="row">
            <MessageList />
          </div>
          <div className="row">
            <NewMessageForm />
          </div>
        </div>
      </div>
    </Provider>
  ),
  document.getElementById('chat-wrapper'));
};

export default app;
