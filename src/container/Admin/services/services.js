
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


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ServiceActions } from '../../../store/actions/ServiceActions';
import { useSelector, useDispatch } from 'react-redux';


function Services({ history }) {

    // const openDeleteModal = useSelector(store => store?.category?.openDelModal);
    const isProgress = useSelector(store => store?.service?.isProgress);
    // const service = useSelector(store => store?.service?.service);
    const services = useSelector(store => store?.service?.services);
    const paging = useSelector(store => store?.service?.paging);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ServiceActions.getServices());
    }, [dispatch]);


    const onTableChange = (type, newState) => {
        if (type === 'pagination')
            dispatch(ServiceActions.getServices(newState?.page));
    };


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
            dataField: 'image',
            text: 'Image'
        },
        {
            dataField: 'title',
            text: 'Title'
        },
        {
            dataField: 'description',
            text: 'Description'
        },
        {
            dataField: 'minQty',
            text: 'Min QTY'
        },
        {
            dataField: 'price',
            text: 'Price'
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
                            onClick={() => history.push({
                                pathname: '/admin/services/update',
                                state: {
                                    service: services[rowIndex]
                                }
                            })}
                        >
                            <i className=" fas fa-edit"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={5}
                            target={`edit-order-${rowIndex}`}
                        >
                            Edit Category
              </UncontrolledTooltip>
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`del-${rowIndex}`}
                            type="button"
                        // onClick={() => dispatch(CategoryActions.toggleDelCategoryModal(rowIndex))}
                        >
                            <i className="fas fa-trash-alt" />
                        </Button>
                        <UncontrolledTooltip
                            delay={5}
                            target={`del-${rowIndex}`}
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
                            {isProgress ?
                                <div className='spinner-lg' ></div>
                                :
                                <ToolkitProvider
                                    keyField='id'
                                    data={services}
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
                                                    onTableChange={onTableChange}
                                                    // keyField='name'
                                                    // data={products}
                                                    // columns={columns}
                                                    pagination={paginationFactory({
                                                        page: paging.pageNumber,
                                                        sizePerPage: 10,
                                                        totalSize: paging.totalCount,
                                                        hideSizePerPage: true,
                                                    })}
                                                />
                                            </div>
                                        )

                                    }
                                </ToolkitProvider>}
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
