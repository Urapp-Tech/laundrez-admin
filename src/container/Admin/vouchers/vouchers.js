
import React, { useState, useEffect, useCallback } from 'react';
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
    UncontrolledTooltip,
} from 'reactstrap';
// core components
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';
import { VoucherActions } from '../../../store/actions/VoucherActions';
import DeleteModal from '../../../components/Modals/DeleteModal';



function Vouchers({ history }) {


    // const [search, setSearch] = useState('');
    const openDeleteModal = useSelector(store => store?.voucher?.openDelModal);
    const isProgress = useSelector(store => store?.voucher?.isProgressList);
    const voucher = useSelector(store => store?.voucher?.voucher);
    const vouchers = useSelector(store => store?.voucher?.vouchers);
    const paging = useSelector(store => store?.voucher?.paging);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(VoucherActions.getVouchers());
    }, [dispatch]);


    const onTableChange = useCallback((type, newState) => {
        if (type === 'pagination')
            dispatch(VoucherActions.getVouchers(newState?.page));
    }, [dispatch]);

    // const onSearch = useCallback((e) => {
    //     e.preventDefault();
    //     dispatch(VoucherActions.getVouchers(undefined, undefined, search));
    // }, [dispatch, search]);


    const remote = {
        filter: false,
        pagination: false,
        sort: false,
        cellEdit: false
    };
    const columns = [
        // {
        //     dataField: 'id',
        //     text: '#'
        // },
        {
            dataField: 'code',
            text: 'Coupon Code'
        },
        {
            dataField: 'validFrom',
            text: 'Valid From',
            // eslint-disable-next-line react/display-name
            formatter: (cell, ) => {
                return (<span>{new Date(cell).toLocaleDateString()}</span>);
            }
        },
        {
            dataField: 'validTo',
            text: 'Valid Till',
            // eslint-disable-next-line react/display-name
            formatter: (cell, ) => {
                return (<span>{new Date(cell).toLocaleDateString()}</span>);
            }
        },
        {
            dataField: 'offerValue',
            text: 'Offer Value'
        },
        {
            dataField: 'minProduct',
            text: 'Min Products'
        },
        {
            dataField: 'minAmount',
            text: 'Min Amount'
        },
        {
            dataField: 'couponType',
            text: 'Coupon Type'
        },
        {
            dataField: 'offerType',
            text: 'Offer Type'
        },
        {
            dataField: 'isActive',
            text: 'Status',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row, rowIndex) => {
                return (
                    <FormGroup className="" key={rowIndex} >

                        <Input type="select" name="select" value={cell} id="exampleSelect">
                            <option value={true} >Active</option>
                            <option value={false} >InActive</option>
                        </Input>
                    </FormGroup>
                );
            }
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
                            // onClick={() => history.push({
                            //     pathname: '/admin/services/update',
                            //     state: {
                            //         service: services[rowIndex]
                            //     }
                            // })}
                        >
                            <i className=" fas fa-edit"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={5}
                            target={`edit-order-${rowIndex}`}
                        >
                            Edit
              </UncontrolledTooltip>
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`del-${rowIndex}`}
                            type="button"
                            // onClick={() => dispatch(ServiceActions.toggleDelServiceModal(rowIndex))}
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
                            {isProgress ?
                                <div className='spinner-lg' ></div>
                                : <ToolkitProvider
                                    keyField='id'
                                    data={vouchers}
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
            {openDeleteModal && <DeleteModal isOpen={openDeleteModal} toggle={() => dispatch(VoucherActions.toggleDelVoucherModal())} isProgress={isProgress} delFunc={() => dispatch(VoucherActions.delService(voucher?.id))} />}

        </>
    );
}
Vouchers.propTypes = {
    baseProps: PropTypes.object,
    history: PropTypes.object
};

export default Vouchers;
