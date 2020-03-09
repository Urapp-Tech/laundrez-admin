import React, { memo } from 'react';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const DleteModal = memo(({ isOpen, toggle }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} >
            <ModalHeader >Do you really want to delete?</ModalHeader>
            <ModalFooter>
                <Button color="danger" className="btn-round btn-add-modal" onClick={toggle}>Yes</Button>{' '}
                <Button color="secondary" className="btn-round btn-cancel-modal" onClick={toggle}>No</Button>
            </ModalFooter>
        </Modal>
    );

});
DleteModal.displayName = 'DleteModal';
DleteModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
};
export default DleteModal;