import React from 'react';
import { Card } from 'react-bootstrap';
import { format } from 'date-fns';
import connect from '../connect';

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
      <Card className="mb-2">
        <Card.Body>
          {channelMessages.map(message => (
            <div key={message.id}>{`[${format(message.date, 'DD-MM-YYYY HH:mm')}] ${message.name}: ${message.text}`}</div>
          ))}
        </Card.Body>
      </Card>
    );
  }
}

export default MessageList;
