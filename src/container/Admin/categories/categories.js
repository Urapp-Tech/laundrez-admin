
import React, { useState, useEffect } from 'react';
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
import PanelHeader from '../../../components/PanelHeader/PanelHeader';
// import { categoryData } from '../../../variables/general';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddCategoryModal from '../../../components/Modals/AddCategoryModal';
import EditCategoryModal from '../../../components/Modals/EditCategoryModal';
import DleteModal from '../../../components/Modals/DeleteModal';
import { useSelector, useDispatch } from 'react-redux';
import { CategoryActions } from '../../../store/actions/CategoryActions';


function Categories() {

    const [openAddCategoryModal, toggleAddCategoryModal] = useState(false);
    const [openEditCategoryModal, toggleEditCategoryModal] = useState(false);
    const [openDeleteModal, toggleDeleteModal] = useState(false);
    const categories = useSelector(store => store?.category?.categories);
    const paging = useSelector(store => store?.category?.paging);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CategoryActions.getCategories());
    }, [dispatch]);


    const remote = {
        filter: false,
        pagination: true,
        sort: false,
        cellEdit: false
    };
    const onTableChange = (type, newState) => {
        if (type === 'pagination')
            dispatch(CategoryActions.getCategories(newState?.page));
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
            text: 'Title'
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
                            onClick={() => toggleEditCategoryModal(!openEditCategoryModal)}
                        >
                            <i className=" fas fa-edit"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`edit-order-${rowIndex}`}
                        >
                            Edit Category
                  </UncontrolledTooltip>
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip923217206"
                            type="button"
                            onClick={() => toggleDeleteModal(!openDeleteModal)}
                        >
                            <i className="fas fa-trash-alt" />
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
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader className="d-flex justify-content-between" >
                                <CardTitle tag="h4">Categories
                                <Button
                                        className="btn-primary btn-add ml-2"
                                        onClick={() => { toggleAddCategoryModal(!openAddCategoryModal); }} >
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
                                    keyField={'id'}
                                    data={categories}
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
                                </ToolkitProvider>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {openAddCategoryModal && <AddCategoryModal isOpen={openAddCategoryModal} toggle={() => toggleAddCategoryModal(!openAddCategoryModal)} />}
                <EditCategoryModal isOpen={openEditCategoryModal} toggle={() => toggleEditCategoryModal(!openEditCategoryModal)} />
                <DleteModal isOpen={openDeleteModal} toggle={() => toggleDeleteModal(!openDeleteModal)} />
            </div>

        </>
    );
}
Categories.propTypes = {
    baseProps: PropTypes.object
};

export default Categories;
