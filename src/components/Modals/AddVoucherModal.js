import React, { memo } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const AddVoucherModal = memo(({ isOpen, toggle }) => {
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal autoFocus={false} isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>Add Voucher</ModalHeader>
            <ModalBody>
                <Form>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Coupon Code </label>
                                <Input autoFocus placeholder="Title" type="name" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Valid From </label>
                                <Input placeholder="Valid From" type="date" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Valid Till </label>
                                <Input placeholder="Valid Till" type="date" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Offer Amount </label>
                                <Input placeholder="Offer Amount" type="number" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Max Redeem </label>
                                <Input placeholder="Max Redeem" type="number" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Redeemed </label>
                                <Input placeholder="Redeemed" type="number" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Min Products </label>
                                <Input placeholder="Min Products" type="number" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup>
                                <label> Min Amount </label>
                                <Input placeholder="Min Amount" type="number" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-center" >
                        <Col sm="12">
                            <FormGroup className=""  >
                                <label> Status </label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Active</option>
                                    <option>InActive</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className="btn-round btn-add-modal" onClick={toggle}>Add</Button>{' '}
                <Button color="secondary" className="btn-round btn-cancel-modal " onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );

});
AddVoucherModal.displayName = 'AddVoucherModal';
AddVoucherModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
};
export default AddVoucherModal;