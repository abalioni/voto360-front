import React from 'react';
import axios from 'axios';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import '../../dist/css/siglaPartido.css'

const items = [];


export default class Proposicoes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: [],
            politician: {},
            value: "",
            id: undefined,
            MateriasDeAutoriaTramitando: {}
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            id: nextProps.id
        })
        
    }

    componentDidMount() {
        console.log(this.props.id)
        var candidato = this.props.id;
        axios({
            method: 'get',
            url: `http://legis.senado.leg.br/dadosabertos/senador/${candidato}`,
            "headers": {
                "accept": "application/json"
            }
        })
            .then((res) => {
                this.setState({
                    response: res.data.DetalheParlamentar.Parlamentar.MateriasDeAutoriaTramitando.Materia
                })
                console.log(this.state.response)
                
                return res;
            })
            .catch((error) => {
                console.log(error);
                return error;
            }) 
    }

    render() {
        var materias = this.state.response;
        console.log(materias)
        return (
                this.state.response ? (materias.map((item, i) => {
                    return (<p>{item.EmentaMateria}</p>)
                })) : undefined
        )
    }
}