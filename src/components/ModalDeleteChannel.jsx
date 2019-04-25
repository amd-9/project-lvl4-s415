import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../connect';


const mapStateToProps = (state) => {
  const { channelsUIState: { isModalOpened, selectedChannelId } } = state;
  return { isModalOpened, selectedChannelId };
};


@connect(mapStateToProps)
class ModalDeleteChannel extends React.Component {
  handleCloseModal = () => {
    const { closeChannelModal } = this.props;
    closeChannelModal();
  };

  handleConfirmDelete = channelId => () => {
    const { deleteChannel, closeChannelModal } = this.props;
    closeChannelModal();
    deleteChannel(channelId);
  };


  render() {
    const { isModalOpened, selectedChannelId } = this.props;

    return (
      <Modal show={isModalOpened} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleConfirmDelete(selectedChannelId)}>
           Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalDeleteChannel;
