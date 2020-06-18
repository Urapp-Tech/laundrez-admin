import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Button,
    Input,
    // Form,
    FormGroup,
    Label,
    Table
} from 'reactstrap';
import Pin from '../../../assets/img/pin.svg';
import Plus from '../../../assets/img/plus.svg';
import Minus from '../../../assets/img/minus.svg';
export default function CreateCustomerOrder() {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Create Order</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md={7} className="border-right" >
                                    <Row>
                                        <Col sm="5">
                                            <FormGroup>
                                                <Label for="exampleSelect"><span className="text-danger" >*</span> Categories</Label>
                                                <Input type="select"
                                                    name="select"
                                                    id="exampleSelect"
                                                // value={formValues.categoryId}
                                                // onChange={(e) => setFormValues({ ...formValues, categoryId: Number(e.target.value) })}

                                                >
                                                    <option value={''} >Select Category</option>
                                                    {/* {
                                                    categories.map((v, i) => {
                                                        return (<option key={i} value={v.id} >{v.title}</option>);

                                                    })
                                                } */}

                                                </Input>
                                                {/* {notValid.error && notValid.type === 'categoryId' &&
                                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                                            } */}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="5">
                                            <FormGroup>
                                                <Label for="exampleSelect"><span className="text-danger" >*</span> Services</Label>
                                                <Input type="select"
                                                    name="select"
                                                    id="exampleSelect"
                                                // value={formValues.categoryId}
                                                // onChange={(e) => setFormValues({ ...formValues, categoryId: Number(e.target.value) })}

                                                >
                                                    <option value={''} >Select Service</option>
                                                    {/* {
                                                    categories.map((v, i) => {
                                                        return (<option key={i} value={v.id} >{v.title}</option>);

                                                    })
                                                } */}

                                                </Input>
                                                {/* {notValid.error && notValid.type === 'categoryId' &&
                                                <label className=" ml-3 text-danger" >{notValid.message}</label>
                                            } */}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="2">
                                            <FormGroup className="mt-2" >
                                                <Button color="primary" type={'button'} className="btn-round btn-add mt-3"><i className="fas fa-plus"></i></Button>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{ height: '10rem', overflowY: 'auto' }} >
                                        <Col md={12} >
                                            <Table  >
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Products</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>SubTotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h6  ><i className="font-weight-bold fa fa-times" aria-hidden="true"></i></h6>
                                                        </td>
                                                        <td>Mark</td>
                                                        <td>$10</td>
                                                        <td>
                                                            <div className=" quantity d-flex  align-items-center" >

                                                                <img className="mr-3 cursor-pointer " alt="img" /* onClick={incrementQty}  */ src={Plus} />

                                                                <span className="">{1}</span>

                                                                <img className="ml-3 cursor-pointer " alt="img" /* onClick={decrementQty} */ src={Minus} />

                                                            </div></td>
                                                        <td>$10</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6  ><i className="font-weight-bold fa fa-times" aria-hidden="true"></i></h6>
                                                        </td>
                                                        <td>Mark</td>
                                                        <td>$10</td>
                                                        <td>
                                                            <div className=" quantity d-flex  align-items-center" >

                                                                <img className="mr-3 cursor-pointer " alt="img" /* onClick={incrementQty}  */ src={Plus} />

                                                                <span className="">{1}</span>

                                                                <img className="ml-3 cursor-pointer " alt="img" /* onClick={decrementQty} */ src={Minus} />

                                                            </div></td>
                                                        <td>$10</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6  ><i className="font-weight-bold fa fa-times" aria-hidden="true"></i></h6>
                                                        </td>
                                                        <td>Mark</td>
                                                        <td>$10</td>
                                                        <td>
                                                            <div className=" quantity d-flex  align-items-center" >

                                                                <img className="mr-3 cursor-pointer " alt="img" /* onClick={incrementQty}  */ src={Plus} />

                                                                <span className="">{1}</span>

                                                                <img className="ml-3 cursor-pointer " alt="img" /* onClick={decrementQty} */ src={Minus} />

                                                            </div></td>
                                                        <td>$10</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6  ><i className="font-weight-bold fa fa-times" aria-hidden="true"></i></h6>
                                                        </td>
                                                        <td>Mark</td>
                                                        <td>$10</td>
                                                        <td>
                                                            <div className=" quantity d-flex  align-items-center" >

                                                                <img className="mr-3 cursor-pointer " alt="img" /* onClick={incrementQty}  */ src={Plus} />

                                                                <span className="">{1}</span>

                                                                <img className="ml-3 cursor-pointer " alt="img" /* onClick={decrementQty} */ src={Minus} />

                                                            </div></td>
                                                        <td>$10</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6  ><i className="font-weight-bold fa fa-times" aria-hidden="true"></i></h6>
                                                        </td>
                                                        <td>Mark</td>
                                                        <td>$10</td>
                                                        <td>
                                                            <div className=" quantity d-flex  align-items-center" >

                                                                <img className="mr-3 cursor-pointer " alt="img" /* onClick={incrementQty}  */ src={Plus} />

                                                                <span className="">{1}</span>

                                                                <img className="ml-3 cursor-pointer " alt="img" /* onClick={decrementQty} */ src={Minus} />

                                                            </div></td>
                                                        <td>$10</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6  ><i className="font-weight-bold fa fa-times" aria-hidden="true"></i></h6>
                                                        </td>
                                                        <td>Mark</td>
                                                        <td>$10</td>
                                                        <td>
                                                            <div className=" quantity d-flex  align-items-center" >

                                                                <img className="mr-3 cursor-pointer " alt="img" /* onClick={incrementQty}  */ src={Plus} />

                                                                <span className="">{1}</span>

                                                                <img className="ml-3 cursor-pointer " alt="img" /* onClick={decrementQty} */ src={Minus} />

                                                            </div></td>
                                                        <td>$10</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h6  ><i className="font-weight-bold fa fa-times" aria-hidden="true"></i></h6>
                                                        </td>
                                                        <td>Mark</td>
                                                        <td>$10</td>
                                                        <td>
                                                            <div className=" quantity d-flex  align-items-center" >

                                                                <img className="mr-3 cursor-pointer " alt="img" /* onClick={incrementQty}  */ src={Plus} />

                                                                <span className="">{1}</span>

                                                                <img className="ml-3 cursor-pointer " alt="img" /* onClick={decrementQty} */ src={Minus} />

                                                            </div></td>
                                                        <td>$10</td>
                                                    </tr>

                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    <div className="d-flex align-items-center w-100 ">
                                        <span className="d-flex font-weight-bold justify-content-end mr-5 w-75" >Total</span>
                                        <span className="font-weight-bold ml-5 w-25" >$10</span>

                                    </div>
                                    <div className="d-flex align-items-center  w-100">
                                        <span className="d-flex font-weight-bold justify-content-end mr-5 w-75" >HST</span>
                                        <span className="font-weight-bold ml-5 w-25" >13%</span>

                                    </div>
                                    <div className="d-flex align-items-center  w-100">
                                        <span className="d-flex font-weight-bold justify-content-end mr-5 w-75" >Grand Total</span>
                                        <span className="font-weight-bold ml-5 w-25" >$11.3</span>

                                    </div>
                                </Col>
                                <Col md={5}>
                                    <Row>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label for="exampleEmail"><span className="text-danger" >* </span>Pickup Date</Label>
                                                <Input type={'date'} placeholder="with a placeholder" />
                                            </FormGroup>

                                        </Col>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label for="exampleSelect"><span className="text-danger" >* </span>Pickup Time</Label>
                                                <Input type="select" name="select" id="exampleSelect">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Input>
                                            </FormGroup>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label for="exampleEmail"><span className="text-danger" >* </span>Dropff Date</Label>
                                                <Input type={'date'} placeholder="with a placeholder" />
                                            </FormGroup>

                                        </Col>
                                        <Col md={6}>

                                            <FormGroup>
                                                <Label for="exampleSelect"><span className="text-danger" >* </span>Dropff Time</Label>
                                                <Input type="select" name="select" id="exampleSelect">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Input>
                                            </FormGroup>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} >
                                            <FormGroup tag="fieldset">
                                                <legend><span className="text-danger" >* </span>Addresses</legend>
                                                <FormGroup className="pl-0" check>
                                                    <Label check>
                                                        <Input type="radio" name="radio1" />{' '}
                                                        <img alt={'img'} className="icon-pin" src={Pin} /> 74800 | P.E.C.H.S
          </Label>
                                                </FormGroup>
                                                <FormGroup className="pl-0" check>
                                                    <Label check>
                                                        <Input type="radio" name="radio1" />{' '}
                                                        <img alt={'img'} className="icon-pin" src={Pin} /> 74800 | P.E.C.H.S
          </Label>
                                                </FormGroup>
                                                <FormGroup className="pl-0" check>
                                                    <Label check>
                                                        <Input type="radio" name="radio1" />{' '}
                                                        <img alt={'img'} className="icon-pin" src={Pin} /> 74800 | P.E.C.H.S
          </Label>
                                                </FormGroup>
                                                <FormGroup className="pl-0" check>
                                                    <Label check>
                                                        <Input type="radio" name="radio1" />{' '}
                                                        <img alt={'img'} className="icon-pin" src={Pin} /> 74800 | P.E.C.H.S
          </Label>
                                                </FormGroup>
                                                <FormGroup className="pl-0" check>
                                                    <Label check>
                                                        <Input type="radio" name="radio1" />{' '}
                                                        <img alt={'img'} className="icon-pin" src={Pin} /> 74800 | P.E.C.H.S
          </Label>
                                                </FormGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>


                            <Row  >
                                <Col sm="6" >
                                    <span className="text-danger" >*</span><span> Required fields</span>
                                </Col>
                            </Row>
                            <Row className=" " >
                                <Col sm="12" className=" " >
                                    <Button type={'submit'} /* disabled={isProgress} */ className="btn-round btn-primary btn-add-modal" >
                                        {
                                            // isProgress
                                            //     ?
                                            //     <div className="spinner" ></div>
                                            //     :
                                            ' Place Order'
                                        }
                                    </Button>
                                    <Button className="btn-round btn-default btn-add-modal" /* onClick={() => history.goBack()} */  >Cancel</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}