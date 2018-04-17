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
        return (
            <div>
                <img src={this.state.response && this.state.response.urlFoto} alt="foto do politico" />
                <label htmlFor="radioButton">{this.state.response && this.state.response.nome}</label>
                <input name="politicos" type="radio" id="UKE" />
            </div>
            
        )
    }
}