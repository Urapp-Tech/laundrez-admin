
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
    FormGroup,
} from 'reactstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// core components

import { couponsData } from '../../../variables/general';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';



function Vouchers({ history }) {

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
            dataField: 'code',
            text: 'Coupon Code'
        },
        {
            dataField: 'from',
            text: 'Valid From'
        },
        {
            dataField: 'till',
            text: 'Valid Till'
        },
        {
            dataField: 'amount',
            text: 'Offer Amount'
        },
        {
            dataField: 'products',
            text: 'Min Products'
        },
        {
            dataField: 'minAmount',
            text: 'Min Amount'
        },
        {
            dataField: 'title',
            text: 'Status',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row, rowIndex) => {
                return (
                    <FormGroup className="" key={rowIndex} >

                        <Input type="select" name="select" id="exampleSelect">
                            <option>Active</option>
                            <option>InActive</option>
                        </Input>
                    </FormGroup>
                );
            }
        },
        {
            dataField: 'addedOn',
            text: 'Added On'
        }

    ];
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Vouchers
                                <Button
                                    className="btn-primary btn-add ml-2"
                                    onClick={() => history.push('/admin/vouchers/add')} >
                                    <i className="fas fa-plus"></i>
                                </Button>
                            </CardTitle>
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
                            <ToolkitProvider
                                keyField='id'
                                data={couponsData}
                                columns={columns}
                                bootstrap4

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
        </>
    );
}
Vouchers.propTypes = {
    baseProps: PropTypes.object,
    history: PropTypes.object
};

export default Vouchers;
