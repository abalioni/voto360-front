import React, { Component } from 'react'
import { BrowserRouter as Link } from 'react-router-dom'

import { FlatButton, Card, CardActions, CardHeader, CardText} from 'material-ui';

import '../dist/css/materiasCard.css'

import { cookie } from 'cookie_js'
const user = cookie.get('user');

class MateriasCards extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: cookie.get('user')
        }
    }

    
    render() {
        console.log(this.props)
        return (
            <Card >
                <CardHeader
                    title={this.props.item.IdentificacaoMateria.DescricaoSubtipoMateria}
                    subtitle={`Código da Matéria: ${this.props.item.IdentificacaoMateria.CodigoMateria}`}
                    className="card-materia"
                />
                <CardText>
                    {this.props.item.EmentaMateria}
                </CardText>
            </Card>
        )
    }
}

export default MateriasCards;
