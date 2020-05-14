import React, { memo } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Container, Card, CardHeader, CardBody, Input} from 'reactstrap';
import propTypes from 'prop-types';

const EditOrderDetailModal = memo(({ isOpen , toggle }) => {

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    return (
        <Modal isOpen={isOpen} centered={true} toggle={toggle} size={'lg'}>
            <ModalHeader toggle={toggle} close={closeBtn}>Order Detail</ModalHeader>
            <ModalBody>
                <Container>
                    <Row className="mb-4">
                        <Col md={6}>
                            <Row className="mb-4">
                                <Col md={12}>
                                    <div className="d-flex flex-column">
                                        <span className="font-weight-bold">Customer Details:</span>
                                        <span>Tayub Bilwani</span>
                                        <span>tayubbilwani@gmail.com</span>
                                        <span>+11234567890</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col md={12}>
                                    <div className="d-flex flex-column">
                                        <span className="font-weight-bold">Status:</span>
                                        <span>Pickup</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col md={12}>
                                    <div className="d-flex flex-column">
                                        <span className="font-weight-bold">Address:</span>
                                        <span>750 Bay Street, 2003, Toronto, Ontario</span>
                                        <span>Instruction: 2020</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row className="mb-4">
                                <Col md={12}>
                                    <div className="d-flex flex-column align-items-end">
                                        <span className="font-weight-bold">Order Ref:</span>
                                        <span>EZ-217515</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col md={12}>
                                    <div className="d-flex flex-column align-items-end">
                                        <span className="font-weight-bold">Order Date:</span>
                                        <span>2019-11-12 13:25:23</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col md={12}>
                                    <div className="d-flex flex-column align-items-end">
                                        <span className="font-weight-bold">Pickup:</span>
                                        <span>9:00 - 10:00AM, Wed, 13 Nov 2019</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col md={12}>
                                    <div className="d-flex flex-column align-items-end">
                                    <span className="font-weight-bold">Drop Off:</span>
                                        <span>9:00 - 10:00AM, Fri, 15 Nov 2019</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Card>
                            <CardHeader  className="d-flex flex-column bg-light">
                                <h6>Detail</h6>
                            </CardHeader>
                            <CardBody>
                                <Row className="d-flex font-weight-bold border-order-modal-light">
                                    <Col md={3}>
                                        Service
                                    </Col>
                                    <Col md={3}>
                                        QTY
                                    </Col>
                                    <Col md={3}>
                                        Unit Price
                                    </Col>
                                    <Col md={3} className="text-right">
                                        Totals
                                    </Col>
                                </Row>
                                <Row className="d-flex py-2 border-order-modal-solid">
                                    <Col md={3}>
                                        Shirt
                                    </Col>
                                    <Col md={3}>
                                        <Input value={2} type="number" onChange={()=>{}}/>
                                    </Col>
                                    <Col md={3}>
                                        <Input value={3} type="number" onChange={()=>{}}/>
                                    </Col>
                                    <Col md={3} className="text-right">
                                        $6.78
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-end py-2">
                                    <Col md={2} className="font-weight-bold">
                                        Total:
                                    </Col>
                                    <Col md={2} className="text-right">
                                        $6.78
                                    </Col>
                                </Row>
                                <Row className="d-flex my-4">
                                    <Col md={2}>
                                        Discount
                                    </Col>
                                    <Col md={2}>
                                        <Input value={0.00} type="float" onChange={()=>{}}/>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
});
EditOrderDetailModal.displayName= 'EditOrderDetailmodal';
EditOrderDetailModal.propTypes = {
    isOpen: propTypes.bool,
    toggle: propTypes.func
};
export default EditOrderDetailModal;