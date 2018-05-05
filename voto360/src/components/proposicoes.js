import React from 'react';
import axios from 'axios';

import DropDownMenu from 'material-ui/DropDownMenu';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import '../dist/css/siglaPartido.css'

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
        console.log("props", this.props.id)
        if(this.props.id !== nextProps.id) {
            var candidato = nextProps.id;
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
    }


    render() {
        var materias = this.state.response;
        return (
                this.state.response ? (materias.map((item, i) => {
                    return (<Card>
                        <CardHeader
                            title={item.IdentificacaoMateria.DescricaoSubtipoMateria}
                            subtitle={item.IdentificacaoMateria.NomeCasaIdentificacaoMateria}
                        />
                        <CardText>
                            {item.EmentaMateria}
                        </CardText>
                        </Card>)
                })) : undefined
        )
    }
}