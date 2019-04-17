import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages } = state;
  return { messages };
};

const MessageList = (props) => {
  const { messages } = props;

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>{message.text}</div>
      ))}
    </div>
  );
};


export default connect(mapStateToProps, null)(MessageList);
