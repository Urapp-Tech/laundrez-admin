/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState, useCallback } from "react";

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
    UncontrolledTooltip,
    FormGroup,
    Label,
    Badge
} from "reactstrap";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// core components
import PanelHeader from "../../../components/PanelHeader/PanelHeader";

import { useDispatch, useSelector } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { SampleActions } from "../../../store/actions/SampleActions";

import { dataBootstrapTable } from "../../../variables/general";
import AssignModal from "../../../components/Modals/AssignModal";
const { SearchBar } = Search;

function Orders() {

    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const users = useSelector(store => store?.sampleReducer.posts)
    useEffect(() => {
        // dispatch(SampleActions.sampleReq());
    }, [dispatch])

    const toggleAssignModal = useCallback(() => {
        setOpenModal(!openModal);
    }, [openModal]);
    const remote = {
        filter: false,
        pagination: false,
        sort: false,
        cellEdit: false
    }
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
            dataField: 'title',
            text: 'Pickup Time'
        },
        {
            dataField: 'title',
            text: 'Drop off Time'
        },
        {
            dataField: 'title',
            text: 'Customer'
        },
        {
            dataField: 'title',
            text: 'Rating'
        },
        {
            dataField: 'title',
            text: 'Rating Message'
        },
        {
            dataField: 'title',
            text: 'Phone'
        },
        {
            dataField: 'title',
            text: 'Amount'
        },
        {
            dataField: 'title',
            text: 'Status',
            formatter: (cell, row, rowIndex) => {
                return (
                    <div className="text-center" >
                        <Badge className="bg-primary " >Pickup</Badge>
                        <Button size="sm" className="btn-outline-info btn-round mt-1 " onClick={toggleAssignModal} > Assign </Button>
                    </div>

                )
            }
        },
        {
            dataField: 'action',
            text: 'Action',
            formatter: (cell, row, rowIndex) => {
                return (
                    <div className="d-flex" >
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`edit-order-${rowIndex}`}
                            type="button"
                        >
                            <i className="now-ui-icons ui-2_settings-90" />
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`edit-order-${rowIndex}`}
                        >
                            Edit Task
                  </UncontrolledTooltip>
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="default"
                            id={`print-order-${rowIndex}`}
                            type="button"
                        >
                            {/* <i className="now-ui-icons ui-1_simple-remove" /> */}
                            <i class=" fas fa-print"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`print-order-${rowIndex}`}
                        >
                            Print
                  </UncontrolledTooltip>
                    </div>
                )
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
                                    <Col lg="2" className="d-flex justify-content-center align-items-end" >
                                        <Button size={"md"} className=" btn-primary btn-round" >Export to CSV</Button>
                                    </Col>

                                    <Col lg="4" className="d-flex justify-content-end align-items-end"  >
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
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <ToolkitProvider
                                    keyField='id'
                                    data={dataBootstrapTable}
                                    columns={columns}
                                    bootstrap4={true}
                                    responsive

                                >{
                                        props => (
                                            <div>
                                                {/* <SearchBar className={"float-right col-md-4 p-3"} {...props.searchProps} /> */}
                                                <BootstrapTable
                                                    remote={remote}
                                                    wrapperClasses={"table-responsive"}
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


export default Orders;
