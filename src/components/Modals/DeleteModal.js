import React, { memo } from 'react';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const DleteModal = memo(({ isOpen, toggle, delFunc, isProgress }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} >
            <ModalHeader >Do you really want to delete?</ModalHeader>
            <ModalFooter>
                <Button color="danger" className="btn-round btn-add-modal" onClick={delFunc}>
                    {
                        isProgress ?
                            <div className="loader loader-danger" ></div>
                            :
                            <span> Yes </span>
                    }
                </Button>
                <Button color="secondary" className="btn-round btn-cancel-modal" onClick={toggle}>No</Button>
            </ModalFooter>
        </Modal>
    );

});
DleteModal.displayName = 'DleteModal';
DleteModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func,
    delFunc: PropTypes.func,
    isProgress: PropTypes.bool
};
export default DleteModal;