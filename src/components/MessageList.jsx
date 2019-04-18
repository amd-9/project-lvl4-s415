import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages, channelsUIState: { currentChannelId } } = state;
  const channelMessages = messages.filter(message => message.channelId === currentChannelId);

  return { channelMessages, currentChannelId };
};

@connect(mapStateToProps)
class MessageList extends React.Component {
  render() {
    const { channelMessages } = this.props;

    return (
      <div className="card mb-2">
        <div className="card-body">
          {channelMessages.map(message => (
            <div key={message.id}>{`[${message.date}] ${message.name}: ${message.text}`}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default MessageList;
