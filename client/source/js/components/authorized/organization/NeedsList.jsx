import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';

const NeedsList = ({needs}) => (
        <div className="needs-list">
            <Table
                height="60vh"
            >
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The Description">Description</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The Expiry Date">Expires</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    deselectOnClickaway={true}
                    showRowHover={true}
                    stripedRows={true}
                    displayRowCheckbox={false}
                >
                    {needs.map( (row) => (
                        <TableRow key={row._id}>
                            <TableRowColumn>{row.title}</TableRowColumn>
                            <TableRowColumn>{row.description}</TableRowColumn>
                            <TableRowColumn>{row.expiryDate}</TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

export default NeedsList;
