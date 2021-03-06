import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = (state) => {
  const {
    channelsUIState: {
      isModalOpened,
      newChannelName,
      selectedChannelId,
    },
  } = state;
  return {
    isModalOpened,
    newChannelName,
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
      editChannel,
      newChannelName,
      closeChannelModal,
    } = this.props;

    closeChannelModal();
    editChannel(channelId, newChannelName);
  };


  render() {
    const {
      isModalOpened,
      newChannelName,
      selectedChannelId,
    } = this.props;

    return (
      <Modal show={isModalOpened} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit channel</Modal.Title>
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
