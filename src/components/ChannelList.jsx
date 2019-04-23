import React from 'react';
import _ from 'lodash';
import {
  Button,
  Card,
  ListGroup,
  Row,
  Col,
} from 'react-bootstrap';
import connect from '../connect';
import ModalDeleteChannel from './ModalDeleteChannel';
import ModalEditChannel from './ModalEditChannel';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds }, channelsUIState } = state;
  return { channels: allIds.map(id => byId[id]), channelsUIState };
};

@connect(mapStateToProps)
class ChannelList extends React.Component {
  handleOpenDeleteModal = channelId => (e) => {
    e.preventDefault();
    const { openChannelModal } = this.props;
    const modalParameters = {
      openedModalType: 'delete',
      selectedChannelId: channelId,
    };
    openChannelModal(modalParameters);
  };

  handleOpenEditModal = (openedModalType, selectedChannelId, newChannelName = '') => (e) => {
    e.preventDefault();
    const { openChannelModal } = this.props;
    const modalParameters = {
      openedModalType,
      selectedChannelId,
      newChannelName,
    };
    openChannelModal(modalParameters);
  };

  handleChannelChange = channelId => (e) => {
    e.preventDefault();
    const { changeChannel } = this.props;
    changeChannel(channelId);
  };

  render() {
    const { channels, channelsUIState: { currentChannelId } } = this.props;

    return (
      <>
        <Card>
          <ListGroup variant="flush">
            {channels.map(({ id, name, removable }) => (
              <ListGroup.Item key={_.uniqueId()}>
                <Row>
                  <Col md={12}>
                    <Button variant={currentChannelId === id ? 'primary' : 'light'} onClick={this.handleChannelChange(id)}>{name}</Button>
                    { removable && (
                      <Row className="mt-2">
                        <Col md={12}>
                          <Button variant="light" className="ml-2" onClick={this.handleOpenEditModal('edit', id, name)}>
                            <span>Edit</span>
                          </Button>
                          <Button variant="light" className="ml-2" onClick={this.handleOpenDeleteModal(id)}>
                            <span>&times;</span>
                          </Button>
                        </Col>
                      </Row>)
                   }
                  </Col>
                </Row>
              </ListGroup.Item>))}
          </ListGroup>
          <Card.Body>
            <Button variant="primary" onClick={this.handleOpenEditModal('add')}>Add</Button>
          </Card.Body>
        </Card>
        <ModalDeleteChannel />
        <ModalEditChannel />

       </>
    );
  }
}

export default ChannelList;
