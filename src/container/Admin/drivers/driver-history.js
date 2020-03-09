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
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input
} from 'reactstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// core components

import { driversData } from '../../../variables/general';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddDriverModal from '../../../components/Modals/AddDriverModal';
import EditDriverModal from '../../../components/Modals/EditDriverModal';


function DriverHistory() {
    const [openAddDriverModal, toggleAddDriverModal] = useState(false);
    const [openEditDriverModal, toggleEditDriverModal] = useState(false);


    const remote = {
        filter: false,
        pagination: false,
        sort: false,
        cellEdit: false
    };
    const columns = [
        {
            dataField: 'id',
            text: 'Order Number'
        },
        {
            dataField: 'name',
            text: 'Pickup Date'
        },
        {
            dataField: 'salesmanId',
            text: 'Pickup Time'
        },
        {
            dataField: 'contactNum',
            text: 'Dropoff Date',
        },
        {
            dataField: 'orders',
            text: 'Dropoff Time'
        },
        {
            dataField: 'orders',
            text: 'Delivery Address'
        },
        {
            dataField: '',
            text: 'Total'
        }
    ];
    return (
        <>

            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Driver History</CardTitle>
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
                                data={driversData}
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
            <AddDriverModal isOpen={openAddDriverModal} toggle={() => toggleAddDriverModal(!openAddDriverModal)} />
            <EditDriverModal isOpen={openEditDriverModal} toggle={() => toggleEditDriverModal(!openEditDriverModal)} />
        </>
    );
}

DriverHistory.propTypes = {
    baseProps: PropTypes.object
};
export default DriverHistory;
