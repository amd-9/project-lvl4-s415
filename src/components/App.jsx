import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ChannelList from './ChannelList';
import NewMessageForm from './NewMessageForm';
import reducers from '../reducers';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
  ),
);

const app = ({ channels, currentChannelId }) => {
  render((
    <Provider store={store}>
      <div className="row">
        <div className="col-md-2">
          <ChannelList channels={channels} currentChannelId={currentChannelId} />
        </div>
        <div className="col-md-10">
          <div className="row">
            Hello chat messages!
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
