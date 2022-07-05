import * as React from 'react';
import { ITableNewRowState } from './ITableNewRowState';
import { ITableNewRowProps } from './ITableNewRowProps';
import TableCell from '@material-ui/core/TableCell';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import TableRow from '@material-ui/core/TableRow';
import EditRow from './AddRow/AddRow';


export default class TableNewRow extends React.Component<ITableNewRowProps, ITableNewRowState> {
    constructor(props) {
        super(props);
        this.state = {
            identyfier: '',
            amount: 0,
            pricePerUnit: 0,
            cost: 0,
            description: '',
            date: ''
        };
    }

    public render(): React.ReactElement<ITableNewRowState> {
        return (
            <TableRow key={this.props.row.identyfier}>

                <TableCell align="left">{this.props.row.identyfier}</TableCell>
                <TableCell align="left">{this.props.row.amount}</TableCell>
                <TableCell align="left">{this.props.row.pricePerUnit}</TableCell>
                <TableCell align="left">{this.props.row.cost}</TableCell>
                <TableCell align="left">{this.props.row.description}</TableCell>
                <TableCell align="left">{this.props.row.date}</TableCell>
                <TableCell align="left">
                    <EditIcon />
                    <DeleteForeverIcon onClick={() => this.props.deleteItem(this.props.row)} />
                </TableCell>
            </TableRow>
        );
    }
}