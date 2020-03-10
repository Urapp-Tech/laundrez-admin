import React, { memo } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const EditCategoryModal = memo(({ isOpen, toggle }) => {
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal autoFocus={false} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Edit Category</ModalHeader>
            <ModalBody>
                <Form>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Title </label>
                                <Input autoFocus placeholder="Title" type="name" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Image </label>
                                <Input placeholder="Image" type="file" />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className="btn-round btn-add-modal" onClick={toggle}>Edit</Button>{' '}
                <Button color="secondary" className="btn-round btn-cancel-modal " onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );

});
EditCategoryModal.displayName = 'EditCategoryModal';
EditCategoryModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
};
export default EditCategoryModal;