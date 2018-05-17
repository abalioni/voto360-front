import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

export default class TablePolitician extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: false,
            stripedRows: true,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px',
        };
    }
    

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({ height: event.target.value });
    };

    render() {
        return (
            <div>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{ textAlign: 'center' }}>
                                Acir x Ana
              </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="The ID">Nome</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Acir</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">Ana</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {/* {tableData.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{index}</TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.status}</TableRowColumn>
                            </TableRow>
                        ))} */}
                        <TableRow>
                            <TableRowColumn>Sexo</TableRowColumn>
                            <TableRowColumn>Masculino</TableRowColumn>
                            <TableRowColumn>Feminino</TableRowColumn>
                        </TableRow>
                    </TableBody>
                    
                </Table>

            
            </div>
        );
    }
}