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
    Label,
    Badge
} from 'reactstrap';
import ToolkitProvider, { /* Search  */ } from 'react-bootstrap-table2-toolkit';
import PanelHeader from '../../../components/PanelHeader/PanelHeader';

import { useDispatch, useSelector, /* useSelector  */ } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';



import AssignModal from '../../../components/Modals/AssignModal';
import EditOrderModal from '../../../components/Modals/EditOrderDetailModal';
import OrderPdfModal from '../../../components/Modals/OrderPdfModal';
import { OrderActions } from '../../../store/actions/OrderActions';
import {  OrderStatusArray } from '../../../store/constants/OrderConstants';
import moment from 'moment';
import StatusChangeConfModal from '../../../components/Modals/StatusChangeConfModal';

function Orders() {

    const [openAssignModal, setOpenAssignModal] = useState(false);
    const [openEditOrderModal, setOpenEditOrderModal] = useState(false);
    const [openOrderPdfModal, setOpenOrderPdfModal] = useState(false);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [statusObj, setStatusObj] = useState({ newStatus: '', prevStatus: '' });

    const isProgress = useSelector(store => store?.order?.isProgressList);
    const orders = useSelector(store => store?.order?.orders);
    const paging = useSelector(store => store?.order?.paging);
    const openStatusModal = useSelector(store => store?.order?.openStatusModal);
    const dispatch = useDispatch();
    // const users = useSelector(store => store?.sampleReducer.posts);
    useEffect(() => {
        dispatch(OrderActions.getOrders());
    }, [dispatch]);

    const toggleAssignModal = useCallback(() => {
        setOpenAssignModal(!openAssignModal);
    }, [openAssignModal]);

    const toggleEditOrderModal = useCallback(() => {
        setOpenEditOrderModal(!openEditOrderModal);
    }, [openEditOrderModal]);

    const toggleOrderPdfModal = useCallback(() => {
        setOpenOrderPdfModal(!openOrderPdfModal);
    }, [openOrderPdfModal]);


    const onTableChange = useCallback((type, newState) => {
        if (type === 'pagination')
            dispatch(OrderActions.getOrders(newState?.page));
    }, [dispatch]);


    const onSearch = useCallback((e) => {
        e.preventDefault();
        if (search) {
            setIsSearch(true);
            dispatch(OrderActions.getOrders(undefined, undefined, search));
        }
    }, [dispatch, search]);


    useEffect(() => {
        if (isSearch && search === '') {
            setIsSearch(false);
            dispatch(OrderActions.getOrders(undefined, undefined, search));
        }
    }, [search, onSearch, isSearch, dispatch]);

    const remote = {
        filter: false,
        pagination: true,
        sort: false,
        cellEdit: false
    };
    const columns = [
        {
            dataField: 'orderNumber',
            text: '#'
        },
        {
            dataField: 'pickupTime',
            text: 'Pickup Time',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row) => {
                return (
                    <div className="d-flex flex-column" >
                        <span> {cell}</span>
                        <span> {row?.pickupDate && moment(row.pickupDate).format('DD-MM-YYYY')}</span>
                    </div>
                );
            }
        },
        {
            dataField: 'dropoffTime',
            text: 'Dropoff Time',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row) => {
                return (
                    <div className="d-flex flex-column" >
                        <span> {cell}</span>
                        <span> {row?.dropoffDate && moment(row.dropoffDate).format('DD-MM-YYYY')}</span>
                    </div>
                );
            }
        },
        {
            dataField: 'customer',
            text: 'Customer'
        },
        {
            dataField: 'totalAmount',
            text: 'Amount'
        },
        {
            dataField: 'status',
            text: 'Status',
            // eslint-disable-next-line react/display-name
            formatter: (cell) => {
                let statusIndex = OrderStatusArray.indexOf(cell);
                let array = statusIndex > 0 ? OrderStatusArray.slice(statusIndex) : OrderStatusArray;
                return (
                    <div>
                        <FormGroup>
                            <Input type="select" value={cell} onChange={(e) => {
                                setStatusObj({
                                    newStatus: e.target.value,
                                    prevStatus: cell
                                });
                                dispatch(OrderActions.toggleStatusModal());

                            }} name="select">
                                {
                                    array.map((v, i) => {
                                        return (<option key={i} value={v} >{v}</option>);
                                    })
                                }
                            </Input>
                        </FormGroup>

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
                            onClick={toggleEditOrderModal}
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
                            onClick={toggleOrderPdfModal}
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
                                        <form onSubmit={onSearch} className=" col-md-12" >
                                            <InputGroup className=" no-border">
                                                <Input value={search}
                                                    onChange={e => setSearch(e.target.value)}
                                                    className=""
                                                    placeholder="Search..." />
                                                <InputGroupAddon addonType="append" onClick={onSearch}>
                                                    <InputGroupText>
                                                        <i className="now-ui-icons ui-1_zoom-bold" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </form>
                                    </Col>
                                    <Col lg="2" className="d-flex justify-content-center align-items-end" >
                                        <Button size={'md'} className=" btn-primary btn-round" >Export to CSV</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {isProgress ?
                                    <div className='spinner-lg' ></div>
                                    :
                                    <>
                                        <Badge color="primary">{paging.totalCount} Orders</Badge>
                                        <ToolkitProvider
                                            keyField='id'
                                            data={orders}
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
                                                            onTableChange={onTableChange}
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
                                        </ToolkitProvider>
                                    </>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <AssignModal isOpen={openAssignModal} toggle={toggleAssignModal} />
                <EditOrderModal isOpen={openEditOrderModal} toggle={toggleEditOrderModal} />
                <OrderPdfModal isOpen={openOrderPdfModal} toggle={toggleOrderPdfModal} style={{ maxWidth: '1600px', width: '80%' }} />



                <StatusChangeConfModal
                    isOpen={openStatusModal}
                    toggle={() => dispatch(OrderActions.toggleStatusModal())}
                    updateStatus={() => { }}
                    isProgress={false}
                    newStatus={statusObj.newStatus}
                    prevStatus={statusObj.prevStatus}
                />
            </div>
        </>
    );
}
Orders.propTypes = {
    baseProps: PropTypes.object
};

export default Orders;
