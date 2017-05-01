import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Need from './NeedDisplay.jsx';


const NeedsList = ({needs, onClick, clickable, icon, confirmPrompt}) => (
        <div className="needs-list">
            <Table
                height="60vh"
                width="90vw"
            >
                <TableBody
                    deselectOnClickaway={true}
                    showRowHover={true}
                    stripedRows={true}
                    displayRowCheckbox={false}
                >
                    {needs.map( (need) => (
                        <TableRow key={need._id}>
                            <TableRowColumn key={need._id}>
                                <Need onClick={onClick} need={need} clickable={clickable} icon={icon} confirmPrompt={confirmPrompt}/>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

export default NeedsList;
