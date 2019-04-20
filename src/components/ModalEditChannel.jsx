import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = (state) => {
  const {
    channelsUIState: {
      isEditModalOpen,
      newChannelName,
      editActionType,
      editedChannelId,
    },
  } = state;
  return {
    isEditModalOpen,
    newChannelName,
    editActionType,
    editedChannelId,
  };
};

@connect(mapStateToProps)
class ModalEditChannel extends React.Component {
  handleCloseModal = () => {
    const { closeChannelEditModal } = this.props;
    closeChannelEditModal();
  };

  handleChannelNameChange = (e) => {
    const { newChannelNameChange } = this.props;
    newChannelNameChange(e.target.value);
  }

  handleConfirmEdit = channelId => () => {
    const {
      addChannel,
      editChannel,
      newChannelName,
      editActionType,
    } = this.props;

    if (editActionType === 'add') {
      addChannel(newChannelName);
    } else {
      editChannel(channelId, newChannelName);
    }
  };


  render() {
    const {
      isEditModalOpen,
      newChannelName,
      editActionType,
      editedChannelId,
    } = this.props;

    return (
      <Modal show={isEditModalOpen} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{ editActionType === 'add' ? 'Add channel' : 'Edit channel' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control" value={newChannelName} onChange={this.handleChannelNameChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleConfirmEdit(editedChannelId)}>
           Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalEditChannel;
