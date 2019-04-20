import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../connect';


const mapStateToProps = (state) => {
  const { channelsUIState: { isDeleteModalOpen, channelIdToDelete } } = state;
  return { isDeleteModalOpen, channelIdToDelete };
};


@connect(mapStateToProps)
class ModalDeleteChannel extends React.Component {
  handleCloseModal = () => {
    const { closeChannelDeleteModal } = this.props;
    closeChannelDeleteModal();
  };

  handleConfirmDelete = channelId => () => {
    const { deleteChannel } = this.props;
    deleteChannel(channelId);
  };


  render() {
    const { isDeleteModalOpen, channelIdToDelete } = this.props;

    return (
      <Modal show={isDeleteModalOpen} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleConfirmDelete(channelIdToDelete)}>
           Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalDeleteChannel;
