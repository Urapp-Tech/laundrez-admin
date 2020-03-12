
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
    Input
} from 'reactstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// core components
import PanelHeader from '../../../components/PanelHeader/PanelHeader';


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


function Customers() {

    // const dispatch = useDispatch();
    // const users = useSelector(store => store?.sampleReducer.posts);
    // useEffect(() => {
    //     // dispatch(SampleActions.sampleReq());
    // }, [dispatch]);


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
            text: 'Username'
        },
        {
            dataField: 'title',
            text: 'Contact'
        },
        {
            dataField: 'title',
            text: 'Email'
        },

        // {
        //     dataField: 'email',
        //     text: 'Email'
        // },
        // {
        //     dataField: 'website',
        //     text: 'Website',
        // sort: true,
        // sortValue: (cell, row) => {
        //     return cell
        // },
        // formatter: (cell, row) => {
        //     return cell
        // },
        // },

    ];
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader className="d-flex justify-content-between" >
                                <CardTitle tag="h4">Customers
                                <Button
                                        className="btn-primary btn-add ml-2"
                                        onClick={e => e.preventDefault()} >
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
                                    data={[]}
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
            </div>
        </>
    );
}

Customers.propTypes = {
    baseProps: PropTypes.object
};

export default Customers;
