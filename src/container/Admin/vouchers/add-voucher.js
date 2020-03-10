
import React from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Form,
    FormGroup
} from 'reactstrap';


function AddVoucher({ history }) {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Add Service</CardTitle>
                            <form className="col-md-8 align-self-center " >
                                <InputGroup className=" no-border">
                                    <Input className="" placeholder="Search..." />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                            <i className="now-ui-icons ui-1_zoom-bold" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </form>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label> Coupon Code </label>
                                            <Input autoFocus placeholder="Title" type="name" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label> Valid From </label>
                                            <Input placeholder="Valid From" type="date" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label> Valid Till </label>
                                            <Input placeholder="Valid Till" type="date" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label> Offer Amount </label>
                                            <Input placeholder="Offer Amount" type="number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label> Max Redeem </label>
                                            <Input placeholder="Max Redeem" type="number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label> Redeemed </label>
                                            <Input placeholder="Redeemed" type="number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label> Min Products </label>
                                            <Input placeholder="Min Products" type="number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <label> Min Amount </label>
                                            <Input placeholder="Min Amount" type="number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup className=""  >
                                            <label> Status </label>
                                            <Input type="select" name="select" id="exampleSelect">
                                                <option>Active</option>
                                                <option>InActive</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <Button className="btn-round btn-primary btn-add-modal" >Add Voucher</Button>
                                        <Button className="btn-round btn-default btn-add-modal" onClick={() => history.goBack()}  >Cancel</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

AddVoucher.propTypes = {
    history: PropTypes.object
};
export default AddVoucher;
