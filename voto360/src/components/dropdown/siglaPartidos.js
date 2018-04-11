import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import '../../dist/css/siglaPartido.css'
import axios from 'axios'

const items = [];

export default class SiglaPartido extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        response: {},
        value: "Sigla do partido"
    };
  }

  componentDidMount() {
      axios.get(`https://dadosabertos.camara.leg.br/api/v2/partidos?ordenarPor=sigla`)
          .then((res) => {
              this.setState({ response: res.data.dados })
              for (let i = 0; i < this.state.response.length; i++) {
                items.push(<MenuItem key={i} primaryText={this.state.response[i].sigla + " - " + this.state.response[i].nome} className="dropdown-menu-item"/>);
                }
              return res;
          })
          .catch((error) => {
              console.log(error);
              return error;
          })
        
        
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
      
    return (
        <DropDownMenu maxHeight={300} autoWidth={false} value={this.state.value} onChange={this.handleChange} className="dropdown-menu">
        {items}
      </DropDownMenu>
    );
  }
}