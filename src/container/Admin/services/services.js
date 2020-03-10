
import React, { useEffect } from 'react';
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

import { useDispatch, useSelector } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


function Services({ history }) {

    const dispatch = useDispatch();
    const users = useSelector(store => store?.sampleReducer.posts);
    useEffect(() => {
        // dispatch(SampleActions.sampleReq());
    }, [dispatch]);


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
            text: 'Image'
        },
        {
            dataField: 'title',
            text: 'Description'
        },
        {
            dataField: 'email',
            text: 'Min QTY'
        },
        {
            dataField: 'action',
            text: 'Action',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row, rowIndex) => {
                return (
                    <div>
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
                            color="danger"
                            id="tooltip923217206"
                            type="button"
                        >
                            <i className="now-ui-icons ui-1_simple-remove" />
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip923217206"
                        >
                            Remove
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
                            <CardTitle tag="h4">Services
                                <Button
                                    className="btn-primary btn-add ml-2"
                                    onClick={() => { history.push('/admin/services/add'); }} >
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
                                data={users}
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

Services.propTypes = {
    baseProps: PropTypes.object,
    history: PropTypes.object
};
export default Services;
