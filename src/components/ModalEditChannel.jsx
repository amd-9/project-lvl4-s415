import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = (state) => {
  const {
    channelsUIState: {
      isModalOpened,
      newChannelName,
      openedModalType,
      selectedChannelId,
    },
  } = state;
  return {
    isEditModalOpen: isModalOpened && openedModalType !== 'delete',
    newChannelName,
    openedModalType,
    selectedChannelId,
  };
};

@connect(mapStateToProps)
class ModalEditChannel extends React.Component {
  handleCloseModal = () => {
    const { closeChannelModal } = this.props;
    closeChannelModal();
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
      openedModalType,
    } = this.props;

    if (openedModalType === 'add') {
      addChannel(newChannelName);
    } else {
      editChannel(channelId, newChannelName);
    }
  };


  render() {
    const {
      isEditModalOpen,
      newChannelName,
      openedModalType,
      selectedChannelId,
    } = this.props;

    return (
      <Modal show={isEditModalOpen} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{ openedModalType === 'add' ? 'Add channel' : 'Edit channel' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control" value={newChannelName} onChange={this.handleChannelNameChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleConfirmEdit(selectedChannelId)}>
           Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalEditChannel;
