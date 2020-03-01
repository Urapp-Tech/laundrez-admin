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
import React from "react";

// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Row,
    Col,
    Button
} from "reactstrap";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// core components
import PanelHeader from "components/PanelHeader/PanelHeader";

import { thead, tbody, dataBootstrapTable } from "../../../variables/general";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
const { SearchBar } = Search;

function Orders() {
    const remote = {
        filter: false,
        pagination: false,
        sort: false,
        cellEdit: false
    }
    const columns = [{
        dataField: 'name',
        text: 'Name'
    },
    {
        dataField: 'country',
        text: 'Country'
    },
    {
        dataField: 'city',
        text: 'City'
    },
    {
        dataField: 'salary',
        text: 'Salary',
        sort: true,
        sortValue: (cell, row) => {
            return cell
        },
        formatter: (cell, row) => {
            return cell
        },
    },
    {
        dataField: 'action',
        text: 'Action',
        formatter: () => {
            return (
                <Button
                    className="btn-primary btn-round"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                >
                    Login
            </Button>
            )
        }
    }
    ];
    const products = [...dataBootstrapTable];
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Simple Table</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <ToolkitProvider
                                    keyField='name'
                                    data={products}
                                    columns={columns}
                                    bootstrap4
                                    search
                                >{
                                        props => (
                                            <div>
                                                <SearchBar className={"  col-md-4 p-2"} {...props.searchProps} />
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
                                                    pagination={paginationFactory()}
                                                />
                                            </div>
                                        )

                                    }
                                </ToolkitProvider>
                                {/* <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            {thead.map((prop, key) => {
                                                if (key === thead.length - 1)
                                                    return (
                                                        <th key={key} className="text-right">
                                                            {prop}
                                                        </th>
                                                    );
                                                return <th key={key}>{prop}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tbody.map((prop, key) => {
                                            return (
                                                <tr key={key}>
                                                    {prop.data.map((prop, key) => {
                                                        if (key === thead.length - 1)
                                                            return (
                                                                <td key={key} className="text-right">
                                                                    {prop}
                                                                </td>
                                                            );
                                                        return <td key={key}>{prop}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table> */}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}


export default Orders;
