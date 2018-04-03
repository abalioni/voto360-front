import React from 'react';
import axios from 'axios';

export default class PesquisaPoliticoItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            response: undefined
        }
    }


    componentWillMount() {
        var id = this.props.id;
        console.log(this.props)
        console.log(id)
        axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?id=${id}`)
            .then((res) => {
                console.log(res);
                this.setState({ response: res.data.dados[0] })
                return res;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    }

    render() {
        console.log(this.state.response)
        
        // this.state.response = 
        //
        //  "id": 178864,
        //  "uri": "https://dadosabertos.camara.leg.br/api/v2/deputados/178864", 
        //  "nome": "ADAIL CARNEIRO", 
        //  "siglaPartido": "PP", 
        //  "uriPartido": "https://dadosabertos.camara.leg.br/api/v2/partidos/36809", 
        //  "siglaUf": "CE", 
        //  "idLegislatura": 55, 
        //  "urlFoto": "http://www.camara.leg.br/internet/deputado/bandep/178864.jpg" 
        
        return (
            <div>
                <label htmlFor="radioButton">{this.state.response && this.state.response.nome}</label>
                <input type="radio" id="UKE" />
            </div>
        )
    }
}