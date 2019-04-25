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
class ModalAddChannel extends React.Component {
  handleCloseModal = () => {
    const { closeChannelModal } = this.props;
    closeChannelModal();
  };

  handleChannelNameChange = (e) => {
    const { newChannelNameChange } = this.props;
    newChannelNameChange(e.target.value);
  }

  handleConfirmAdd = () => {
    const {
      addChannel,
      newChannelName,
      closeChannelModal,
    } = this.props;

    closeChannelModal();
    addChannel(newChannelName);
  };


  render() {
    const {
      isModalOpened,
      newChannelName,
    } = this.props;

    return (
      <Modal show={isModalOpened} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control" value={newChannelName} onChange={this.handleChannelNameChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleConfirmAdd}>
           Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalAddChannel;
