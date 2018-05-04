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
            user: '',
            nome: '',
            emaileleitoral: '',
            email: '',
            nomeeleitoral: '',
            partido: '',
            cpf: '',
            cnpj: '',
            datanascimento: '',
            nivelescolaridade: '',
            biografia: '',

            errorCNPJ: false,
            errorSenha: false,
            errorSenhaAtual: false,
            errorEmail: false,
            errorCPF: false,
            errorNome: false,
            maxDate: undefined,
            success: false,
            open: false

        }

    }

    componentWillMount() {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
        const cookieUser = cookie.get('user');
        let user;
        if (cookieUser) {
            user = JSON.parse(cookieUser);
            console.log(user)
            this.setState({
                user: user,
                email: user.email,
                maxDate
            })
        }
    }

    validarCNPJ = () => {
        if (!CNPJ.isValid(this.state.cnpj)) {
            this.setState({ errorCNPJ: true })
            return true
        }
        return false
    }

    validarErroEmail = () => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.state.emaileleitoral)) {
            this.setState({ errorEmail: true })
            return true
        }
        return false
    }

    validarErroNome = () => {
        if (this.state.nome === '') {
            this.setState({ errorNome: true })
            return true
        }
        return false
    }

    changeInfo = () => {

        //Valida Email
        if (this.validarErroEmail()) {
            return;
        }

        //Valida cpf
        if (this.validarCNPJ()) {
            return;
        }

        if (this.validarErroNome()) {
            return;
        }


        var request = {};

        if (this.state.user._id) {
            request.id = this.state.user._id
        }

        if (this.state.nome) {
            request.nome_eleitoral = this.state.nome
        }

        if (this.state.cpf) {
            request.cpf = this.state.cpf
        }

        if (this.state.emaileleitoral) {
            request.email_eleitoral = this.state.emaileleitoral
        }

        if (this.state.nivelescolaridade) {
            request.escolaridade = this.state.nivelescolaridade
        }

        if (this.state.partido) {
            request.partido = this.state.partido
        }

        if (this.state.estado) {
            request.estado = this.state.estado
        }

        if (this.state.datanascimento) {
            request.datanascimento = this.state.datanascimento
        }

        if (this.state.cnpj) {
            request.cnpj = "80228817000150"
        }

        if (this.state.biografia) {
            request.biografia = this.state.biografia
        }

        request.perfil_aprovado = 'pending'

        axios.post(`http://localhost:8081/politico`, request)
            .then((response) => {
                this.handleSuccess(response)
                this.setState({ success: true, open: true })
                console.log(response);
            })
            .catch((error) => {
                this.handleFailure()
            })
    }

    handleSuccess = (response) => {
        console.log("sucess email", response)
        var request = {
            email: this.state.email,
            subject: 'Solicitação de Perfil Politico Criada',
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