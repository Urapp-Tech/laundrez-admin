
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
    FormGroup,
    Label
} from 'reactstrap';


function EditSerivce({ history }) {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Update Service</CardTitle>
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
                                            <Label> Name </Label>
                                            <Input autoFocus placeholder="Name" type="name" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label for="exampleSelect">Categories</Label>
                                            <Input type="select" name="select" id="exampleSelect">
                                                <option>Commercial</option>
                                                <option>Dry Cleaning</option>
                                                <option>Home</option>
                                                <option>Outdoor Wear</option>
                                                <option>Wash and Fold</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label> Description </Label>
                                            <Input placeholder="Service Description" type="text" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label> Short Description <b><i> Write 10-15 Characters</i> </b> </Label>
                                            <Input placeholder="Service Description ( Write 10-15 Characters ) " type="text" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label> Min Order Qty </Label>
                                            <Input placeholder="Minimum QTY for order " type="number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label> Price </Label>
                                            <Input placeholder="0.00" type="number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label htmlFor="service-image" >Service Image (400 X 400)</Label>
                                            <Input type="file" name="file" id="service-image" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <Button className="btn-round btn-primary btn-add-modal" >Update Service</Button>
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

EditSerivce.propTypes = {
    history: PropTypes.object
};
export default EditSerivce;
