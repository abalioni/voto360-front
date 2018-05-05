import React from 'react'

import { Card, CardActions, CardTitle } from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { gray900 } from 'material-ui/styles/colors';
import '../../dist/css/cadastroPolitico.css';
import SiglaPartido from '../dropdown/siglaPartidos';
import Estados from '../dropdown/estados';
import NiveisDeEscolaridade from '../dropdown/nivelDeEscolaridade';
import InputCNPJ from '../inputs/InputCNPJ';
import SimpleDialog from '../dialogs/SimpleDialog'

import { cookie } from 'cookie_js';
import axios from 'axios';
import { CNPJ } from 'cpf_cnpj';

const styles = {
    errorStyle: {
        color: gray900,
    },
    underlineStyle: {
        borderColor: gray900,
    },
    floatingLabelStyle: {
        color: gray900,
    },
    floatingLabelFocusStyle: {
        color: gray900,
    },
};

export default class AlteraCadastroPolitico extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            biografia: '',

            success: false,
            open: false

        }

    }

    componentWillMount() {
        const cookieUser = cookie.get('user');
        let user;
        if (cookieUser) {
            user = JSON.parse(cookieUser);
            console.log(user)
            this.setState({
                user: user,
                email: user.email,
            })
        }
        var id = user._id;
        axios.get(`http://localhost:8081/api/pessoa/${id}/politico`)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                alert(error);
            });

    }

    changeInfo = () => {

        var request = {};

        if (this.state.biografia) {
            request.biografia = this.state.biografia
        }


        // axios.post(`http://localhost:8081/api/pessoa/:id_pessoa/politico`, request)
        //     .then((response) => {
        //         this.handleSuccess(response)
        //         this.setState({ success: true, open: true })
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         this.handleFailure()
        //     })
    }

    handleSuccess = (response) => {
        console.log("sucess email", response)
        var request = {
            email: this.state.email,
            subject: 'Alteração feita com sucesso!',
            html: `<p>Você será notificado por email quando seu perfil for analisado pela nossa equipe.</p><p>Obrigada por se cadastrar!</p><p>Equipe VOTO360</p>`
        };

        axios.post('http://localhost:8081/sendCommonEmail', request).then((response) => console.log(response)).catch(function (error) {
            alert(error);
        });
    }

    handleFailure = (err) => {
        this.setState({ success: false, open: true })
        console.log(err)
    }

    handleChange = (event, index, value) => {
        this.setState({ partido: value })
    }

    handleEstadoChange = (event, index, value) => {
        this.setState({ estado: value })
    }

    handleEscolaridadeChange = (event, index, value) => {
        this.setState({ nivelescolaridade: value })
    }

    render() {
        return (<div className="card-div">
            <Card className="user-card-container">
                <CardTitle title="Alterar Cadastro Político" className="card-title" />
                <div className="user-card-info">

                    <TextField
                        hintText="Biografia"
                        floatingLabelText="Biografia"
                        multiLine={true}
                        rows={2}
                        rowsMax={50}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onChange={(event, text) => {
                            this.setState({ biografia: text })
                        }}
                    />
                </div>
                <div className="buttons">
                    <CardActions className="card-actions">
                        <RaisedButton label="Alterar Informações" primary={true} fullWidth={true} onClick={this.changeInfo} />
                    </CardActions>
                </div>
            </Card>
            <SimpleDialog
                open={this.state.open}
                title={this.state.success ? 'Solicitação criada' : 'Algo deu errado'}
                message={this.state.success ? 'Sua solicitação foi encaminhada para nossa equipe e em breve você terá um retorno.' : 'Algo deu errado, verifique as informações e tente novamente.'}
                onRequestClose={() => {
                    this.setState({
                        open: false,
                    })
                }}
            />
        </div>)
    }
}