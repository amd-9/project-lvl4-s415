import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';
import StatusBar from './StatusBar';
import UserNameContext from '../context';


export default class Chat extends React.Component {
  static contextType = UserNameContext;

  render() {
    return (
      <>
        <Row className="mb-3">
          <Col md={12}>
            {`Logged as: ${this.context}`}
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <ChannelList />
          </Col>
          <Col md={10}>
            <Row>
              <Col md={12}>
                <StatusBar />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <MessageList />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <NewMessageForm />
              </Col>
            </Row>
          </Col>
        </Row>
  </>
    );
  }
}
