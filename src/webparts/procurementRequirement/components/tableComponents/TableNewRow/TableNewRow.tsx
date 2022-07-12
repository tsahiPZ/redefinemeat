import * as React from 'react';
import { ITableNewRowState } from './ITableNewRowState';
import { ITableNewRowProps } from './ITableNewRowProps';
import TableCell from '@material-ui/core/TableCell';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import TableRow from '@material-ui/core/TableRow';
import EditRow from './EditRow/EditRow';


export default class TableNewRow extends React.Component<ITableNewRowProps, ITableNewRowState> {
    constructor(props) {
        super(props);
        this.state = {
            identyfier: this.props.row.identyfier ? this.props.row.identyfier:  '',
            amount:this.props.row.amount ? this.props.row.amount :0 ,
            pricePerUnit:this.props.row.pricePerUnit? this.props.row.pricePerUnit :0,
            cost: this.props.row.cost ? this.props.row.cost : 0,
            description: this.props.row.description? this.props.row.description : '',
            date: '',
            editVisability: false
        };
    }
    openEditModal=() => {
        console.log("here open");
        console.log(this.state);
        
        this.setState({
            editVisability:true
        })
        
    }
    closeEditModal=() => {
        console.log("here close");
        console.log(this.state);

        this.setState({
            editVisability:false
        })
    }
    public render(): React.ReactElement<ITableNewRowState> {
        return (

                <TableRow key={this.props.row.SubjectID}>
                    <TableCell align="left">{this.props.row.identyfier}</TableCell>
                    <TableCell align="left">{this.props.row.amount}</TableCell>
                    <TableCell align="left">{this.props.row.pricePerUnit}</TableCell>
                    <TableCell align="left">{this.props.row.cost}</TableCell>
                    <TableCell align="left">{this.props.row.description}</TableCell>
                    <TableCell align="left">{this.props.row.date}</TableCell>
                    <TableCell align="left">

                        <EditIcon style={{cursor:'pointer'}} onClick={() => this.openEditModal()} color={'primary'} />
                        <DeleteForeverIcon style={{cursor:'pointer',float:'left'}} color={'primary'}  onClick={() => this.props.deleteItem(this.props.row)} />
                        
                        <EditRow OnEditItem={this.props.OnEditItem} editVisability={this.state.editVisability} SubjectID={this.props.row.rowID} identyfier={this.props.row.identyfier}
                    amount={this.props.row.amount} pricePerUnit={this.props.row.pricePerUnit} cost={this.props.row.cost} description={this.props.row.description}
                    date={this.props.row.date} closeModal={()=>this.closeEditModal()} />
                    </TableCell>
                </TableRow>
        );
    }
}