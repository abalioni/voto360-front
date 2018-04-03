import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import '../../dist/css/siglaPartido.css'

const items = [];


export default class Estados extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        response: {},
        states: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
      for (let i = 0; i < this.state.states.length; i++) {
          items.push(<MenuItem value={i} key={this.state.states[i]} primaryText={this.state.states[i]} />);
      }
    return (
        <DropDownMenu maxHeight={300} autoWidth={false} value="Sigla do Partido" onChange={this.handleChange} className="dropdown-menu">
            {items}
      </DropDownMenu>
    );
  }
}