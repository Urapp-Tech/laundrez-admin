import React, { memo } from 'react';
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

const StatusChangeConfModal = memo(({ isOpen, toggle, updateStatus, isProgress, newStatus, prevStatus }) => {
    return (
        <Modal centered={true} isOpen={isOpen} toggle={toggle} >
            <ModalHeader >Status Update</ModalHeader>
            <ModalBody>{'Do you really want to change the order status from '}
                <b>{prevStatus}</b> to <b>{newStatus}</b></ModalBody>
            <ModalFooter className="p-0 pr-2"  >
                <Button color="danger" className="btn-round btn-add-modal" onClick={updateStatus}>
                    {
                        isProgress ?
                            <div className="spinner spinner-danger" ></div>
                            :
                            <span> Yes </span>
                    }
                </Button>
                <Button color="secondary" className="btn-round btn-cancel-modal" onClick={toggle}>No</Button>
            </ModalFooter>
        </Modal>
    );

});
StatusChangeConfModal.displayName = 'StatusChangeConfModal';
StatusChangeConfModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    updateStatus: PropTypes.func,
    isProgress: PropTypes.bool,
    newStatus: PropTypes.string,
    prevStatus: PropTypes.string,

};
export default StatusChangeConfModal;