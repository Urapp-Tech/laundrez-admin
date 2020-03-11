
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
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    UncontrolledTooltip
} from 'reactstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// core components

import { driversData } from '../../../variables/general';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddDriverModal from '../../../components/Modals/AddDriverModal';
import EditDriverModal from '../../../components/Modals/EditDriverModal';
import DleteModal from '../../../components/Modals/DeleteModal';


function Drivers({ history }) {
    const [openAddDriverModal, toggleAddDriverModal] = useState(false);
    const [openEditDriverModal, toggleEditDriverModal] = useState(false);
    const [openDeleteModal, toggleDeleteModal] = useState(false);

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
            dataField: 'name',
            text: 'Name'
        },
        {
            dataField: 'salesmanId',
            text: 'SalesMan ID'
        },
        {
            dataField: 'contactNum',
            text: 'Contact#',
        },
        {
            dataField: 'orders',
            text: 'Orders For Today'
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
                            onClick={() => toggleEditDriverModal(!openEditDriverModal)}
                        >
                            <i className=" fas fa-edit"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`edit-order-${rowIndex}`}
                        >
                            Edit
                         </UncontrolledTooltip>

                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`location-${rowIndex}`}
                            type="button"
                        >
                            <i className="fas fa-map-marker-alt"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`location-${rowIndex}`}
                        >
                            Location
                        </UncontrolledTooltip>

                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`history-${rowIndex}`}
                            type="button"
                            onClick={() => history.push(`/admin/drivers/history/${13}`)}

                        >
                            <i className="fas fa-eye"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`history-${rowIndex}`}
                        >
                            View History
                        </UncontrolledTooltip>

                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`delete-${rowIndex}`}
                            type="button"
                            onClick={() => toggleDeleteModal(!openDeleteModal)}
                        >
                            <i className="fas fa-trash-alt" aria-hidden="true"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`delete-${rowIndex}`}
                        >
                            Delete
                        </UncontrolledTooltip>
                    </div>
                );
            }
        }
    ];
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Drivers
                                <Button
                                    className="btn-primary btn-add ml-2"
                                    onClick={(e) => { e.preventDefault(); toggleAddDriverModal(!openAddDriverModal); }} >
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
            <DleteModal isOpen={openDeleteModal} toggle={() => toggleDeleteModal(!openDeleteModal)} />

        </>
    );
}

Drivers.propTypes = {
    baseProps: PropTypes.object,
    history: PropTypes.object
};
export default Drivers;
