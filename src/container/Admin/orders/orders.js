import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
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
    UncontrolledTooltip,
    FormGroup,
    Label
} from 'reactstrap';
import ToolkitProvider, { /* Search  */ } from 'react-bootstrap-table2-toolkit';
import PanelHeader from '../../../components/PanelHeader/PanelHeader';

import { useDispatch, /* useSelector  */ } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


import { ordersData } from '../../../variables/general';
import AssignModal from '../../../components/Modals/AssignModal';

function Orders() {

    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    // const users = useSelector(store => store?.sampleReducer.posts);
    useEffect(() => {
        // dispatch(SampleActions.sampleReq());
    }, [dispatch]);

    const toggleAssignModal = useCallback(() => {
        setOpenModal(!openModal);
    }, [openModal]);
    const remote = {
        filter: false,
        pagination: false,
        sort: false,
        cellEdit: false
    };
    const columns = [
        {
            dataField: 'id',
            text: '#'
        },
        {
            dataField: 'userId',
            text: 'Ref'
        },
        {
            dataField: 'orderPickupTime',
            text: 'Pickup Time'
        },
        {
            dataField: 'OrderDropoffTime',
            text: 'Drop off Time'
        },
        {
            dataField: 'customer',
            text: 'Customer'
        },
        {
            dataField: 'phone',
            text: 'Phone'
        },
        {
            dataField: 'amount',
            text: 'Amount'
        },
        {
            dataField: 'status',
            text: 'Status',
            // eslint-disable-next-line react/display-name
            formatter: (cell) => {
                return (
                    <div>
                        {cell === 'placed' && <span className={'text-order-placed-color mt-1'}>Placed</span>}
                        {cell === 'picked' && <Button size="sm" className={'btn-outline-order-picked btn-round mt-1 '} onClick={toggleAssignModal} >Picked</Button>}
                        {cell === 'out' && <span className={'text-order-out-for-delivery-color mt-1 '}>Out For Delivery</span>}

                    </div>

                );
            }
        },
        {
            dataField: 'action',
            text: 'Action',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row, rowIndex) => {
                return (
                    <div className="d-flex" >
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`edit-order-${rowIndex}`}
                            type="button"
                        >
                            <i className=" far fa-edit"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`edit-order-${rowIndex}`}
                        >
                            Edit Task
                  </UncontrolledTooltip>
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`pdf-order-${rowIndex}`}
                            type="button"
                        >
                            {/* <img className="now-ui-icons pdf-icon" alt={'pdf-icon'} src={pdf} /> */}
                            <i className=" fas fa-file-pdf"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`pdf-order-${rowIndex}`}
                        >
                            Download PDF
                  </UncontrolledTooltip>
                    </div>
                );
            }
        }
    ];
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card className="" >
                            <CardHeader className="" >
                                <Row>
                                    <Col lg="2" >
                                        <CardTitle tag="h4">Orders</CardTitle>
                                    </Col>
                                    <Col lg="2" >
                                        <FormGroup className="col-md-12" >
                                            <Label for="exampleSelect">Status</Label>
                                            <Input type="select" name="select" id="exampleSelect">
                                                <option>All</option>
                                                <option>Ordered</option>
                                                <option>Pickedup</option>
                                                <option>InProgress</option>
                                                <option>DropOffs</option>
                                                <option>Delivered</option>
                                                <option>Cancelled</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2" >
                                        <FormGroup className="col-md-12" >
                                            <Label for="exampleSelect">Time</Label>
                                            <Input type="select" name="select" id="exampleSelect">
                                                <option>All</option>
                                                <option>Today</option>
                                                <option>Tomorrow</option>
                                                <option>This Week</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>

                                    <Col lg="4" className="mt-auto"  >
                                        <FormGroup className=" col-md-12" >
                                            <InputGroup className=" no-border">
                                                <Input className="" placeholder="Search..." />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>
                                                        <i className="now-ui-icons ui-1_zoom-bold" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2" className="d-flex justify-content-center align-items-end" >
                                        <Button size={'md'} className=" btn-primary btn-round" >Export to CSV</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <ToolkitProvider
                                    keyField='id'
                                    data={ordersData}
                                    columns={columns}
                                    bootstrap4={true}
                                    responsive

                                >{
                                        props => (
                                            <div>
                                                {/* <SearchBar className={"float-right col-md-4 p-3"} {...props.searchProps} /> */}
                                                <BootstrapTable
                                                    remote={remote}
                                                    wrapperClasses={'table-responsive'}
                                                    classes=""
                                                    headerWrapperClasses="text-primary text-left"
                                                    bordered={false}
                                                    headerClasses=""
                                                    bodyClasses="text-left"
                                                    {...props.baseProps}
                                                    // keyField='name'
                                                    // data={products}
                                                    // columns={columns}
                                                    pagination={paginationFactory({
                                                        page: 1,
                                                        sizePerPage: 10,
                                                        hideSizePerPage: true
                                                    })}
                                                />
                                            </div>
                                        )

                                    }
                                </ToolkitProvider>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <AssignModal isOpen={openModal} toggle={toggleAssignModal} />
            </div>
        </>
    );
}
Orders.propTypes = {
    baseProps: PropTypes.object
};

export default Orders;
