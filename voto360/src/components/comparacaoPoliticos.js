import React from 'react';
import axios from 'axios';

import AutoComplete from 'material-ui/AutoComplete';
import { gray900 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { List, ListItem, RaisedButton } from 'material-ui';
import Proposicoes from './proposicoes'
import PoliticianInfoDropdown from './dropdown/politicianInfoDropdown'
import SimpleDialog from './dialogs/SimpleDialog'

import '../dist/css/comparacaopoliticos.css'

const styles = {
    floatingLabelStyle: {
        color: gray900,
    },
    underlineStyle: {
        borderColor: gray900,
    }
};

export default class ComparacaoPoliticos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            response: {},
            politicians: [],
            politiciansNames: [],
            selectedFirstNomeParlamentar: '',
            selectedPoliticianFirst: {
                CodigoParlamentar: undefined,
                idLegislatura: undefined,
                NomeParlamentar: "",
                NomeCompletoParlamentar: "",
                SexoParlamentar: "",
                FormaTratamento: "",
                UrlFotoParlamentar: "",
                UrlPaginaParlamentar: "",
                EmailParlamentar: "",
                SiglaPartidoParlamentar: "",
                UfParlamentar: ""
            },
            notFoundFirstPolitician: false,
            openFirstPoliticianModal: false,
            selectedSecondNomeParlamentar: '',
            selectedPoliticianSecond: {
                CodigoParlamentar: undefined,
                idLegislatura: undefined,
                NomeParlamentar: "",
                NomeCompletoParlamentar: "",
                SexoParlamentar: "",
                FormaTratamento: "",
                UrlFotoParlamentar: "",
                UrlPaginaParlamentar: "",
                EmailParlamentar: "",
                SiglaPartidoParlamentar: "",
                UfParlamentar: ""
            },
            notFoundSecondPolitician: false,
            openSecondPoliticianModal: false
        }
    }


    componentWillMount() {
        axios({
            method: 'get',
            url: 'http://legis.senado.leg.br/dadosabertos/senador/lista/atual',
            "headers": {
                "accept": "application/json"
            }
        })
            .then((res) => {
                this.setState({
                    response: res.data.ListaParlamentarEmExercicio,
                    politicians: res.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar
                })
                var names = []
                res.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.forEach((politicianInfo, index) => {

                    names.push(politicianInfo.IdentificacaoParlamentar.NomeParlamentar)
                })
                this.setState({ politiciansNames: names })
                return res;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    }


    render() {
        return (
            <main className="main-container">
                <div className="content-container">
                    <section className="politician-search-container">
                        <div className="politician-search">
                            <h4>Selecione o Político</h4>
                            <div>
                                <AutoComplete
                                    filter={AutoComplete.fuzzyFilter}
                                    dataSource={this.state.politiciansNames}
                                    maxSearchResults={5}
                                    floatingLabelText="Pesquise o político por nome"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    onNewRequest={(text, index) => {
                                        this.setState({
                                            selectedFirstNomeParlamentar: text,
                                            notFoundFirstPolitician: false,
                                            openFirstPoliticianModal: false
                                        })
                                    }}
                                    onUpdateInput={(text) => {
                                        if (text.length >= 3) {
                                            this.setState({
                                                selectedFirstNomeParlamentar: text,
                                                notFoundFirstPolitician: false,
                                                openFirstPoliticianModal: false
                                            })
                                        }
                                    }}
                                />
                                <RaisedButton label="Pesquisar" backgroundColor='#BDBDBD' onClick={this.displayFirstPolitician} />
                            </div>
                        </div>
                        <Divider />
                        <br />
                        {this.state.selectedPoliticianFirst && this.state.selectedPoliticianFirst.NomeParlamentar ? (<div className="politician-search-results">
                            <Avatar
                                src={this.state.selectedPoliticianFirst.UrlFotoParlamentar}
                                size={100}
                            />
                            <p> {this.state.selectedPoliticianFirst ? (<span>Nome: {this.state.selectedPoliticianFirst.NomeCompletoParlamentar}</span>) : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianFirst ? (<span>Sexo: {this.state.selectedPoliticianFirst.SexoParlamentar}</span>) : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianFirst ? (<span>Cargo: {this.state.selectedPoliticianFirst.FormaTratamento}</span>) : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianFirst ? (<span>Sigla do Partido: {this.state.selectedPoliticianFirst.SiglaPartidoParlamentar}</span>) : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianFirst ? (<span>Estado: {this.state.selectedPoliticianFirst.UfParlamentar}</span>) : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianFirst ? (<span>Página: <a href={this.state.selectedPoliticianFirst.UrlPaginaParlamentar}>Ir para a página</a> </span>) : undefined}</p>
                            <Divider />
                            <PoliticianInfoDropdown title="Proposições">
                                <Proposicoes id={this.state.selectedPoliticianFirst.CodigoParlamentar} />
                            </PoliticianInfoDropdown>

                        </div>)
                            : undefined
                        }

                    </section>
                    <section className="politician-search-container">
                        <div className="politician-search">
                            <h4>Selecione o Político</h4>
                            <div>
                                <AutoComplete
                                    filter={AutoComplete.fuzzyFilter}
                                    dataSource={this.state.politiciansNames}
                                    maxSearchResults={5}
                                    floatingLabelText="Pesquise o político por nome"
                                    floatingLabelStyle={styles.floatingLabelStyle}
                                    underlineStyle={styles.underlineStyle}
                                    onNewRequest={(text, index) => {
                                        this.setState(prevState => ({
                                            selectedPoliticianSecond: {
                                                selectedSecondNomeParlamentar: text,
                                                notFoundSecondPolitician: false,
                                                openSecondPoliticianModal: false
                                            }
                                        }))
                                    }}
                                    onUpdateInput={(text) => {
                                        if (text.length >= 3) {
                                            this.setState({
                                                selectedSecondNomeParlamentar: text,
                                                notFoundSecondPolitician: false,
                                                openSecondPoliticianModal: false
                                            })
                                        }
                                    }}
                                />
                                <RaisedButton label="Pesquisar" backgroundColor='#BDBDBD' onClick={this.displaySecondPolitician} />
                            </div>
                        </div>
                        <Divider />
                        <br />
                        {this.state.selectedPoliticianSecond && this.state.selectedPoliticianSecond.NomeParlamentar ? (<div className="politician-search-results">
                            <Avatar
                                src={this.state.selectedPoliticianSecond.UrlFotoParlamentar}
                                size={100}
                            />
                            <p> {this.state.selectedPoliticianSecond ? (<span>Nome: {this.state.selectedPoliticianSecond.NomeCompletoParlamentar}</span>) : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianSecond ? (<span>Sexo: {this.state.selectedPoliticianSecond.SexoParlamentar}</span>) : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianSecond ? (<span>Cargo: {this.state.selectedPoliticianSecond.FormaTratamento}</span>) : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianSecond ? (<span>Sigla do Partido: {this.state.selectedPoliticianSecond.SiglaPartidoParlamentar}</span>) : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianSecond ? (<span>Estado: {this.state.selectedPoliticianSecond.UfParlamentar}</span>) : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianSecond ? (<span>Página: <a href={this.state.selectedPoliticianSecond.UrlPaginaParlamentar}>Ir para a página</a> </span>) : undefined}</p>
                            <Divider />
                            <PoliticianInfoDropdown title="Proposições">
                                <Proposicoes id={this.state.selectedPoliticianSecond.CodigoParlamentar} />
                            </PoliticianInfoDropdown>

                        </div>)
                            : undefined
                        }


                    </section>
                </div>
                <SimpleDialog
                    open={this.state.openFirstPoliticianModal}
                    title={this.state.notFoundFirstPolitician ? 'Político não encontrado' : null}
                    message={this.state.notFoundFirstPolitician ? 'Algo deu errado, verifique as informações e tente novamente.' : null}
                    onRequestClose={() => {
                        this.setState({
                            openFirstPoliticianModal: false,
                            notFoundFirstPolitician: false
                        })
                    }}
                />
                <SimpleDialog
                    open={this.state.openSecondPoliticianModal}
                    title={this.state.notFoundSecondPolitician ? 'Político não encontrado' : null}
                    message={this.state.notFoundSecondPolitician ? 'Algo deu errado, verifique as informações e tente novamente.' : null}
                    onRequestClose={() => {
                        this.setState({
                            openSecondPoliticianModal: false,
                            notFoundSecondPolitician: false
                        })
                    }}
                />
            </main>

        )
    }

    findFirstPolitician = (element) => {
        return element.IdentificacaoParlamentar.NomeParlamentar === this.state.selectedFirstNomeParlamentar
    }

    findSecondPolitician = (element) => {
        return element.IdentificacaoParlamentar.NomeParlamentar === this.state.selectedSecondNomeParlamentar
    }

    displayFirstPolitician = () => {

        var foundFirstPolitician = this.state.politicians.find((element) => this.findFirstPolitician(element))

        if (foundFirstPolitician) {
                this.setState(prevState => ({
                    selectedPoliticianFirst:
                        foundFirstPolitician.IdentificacaoParlamentar
                }))
            } else {
                this.setState({
                    notFoundFirstPolitician: true,
                    openFirstPoliticianModal: true
                })
            }
            return
    }

    displaySecondPolitician = () => {
        var foundSecondPolitician = this.state.politicians.find((element) => this.findSecondPolitician(element))

        if (foundSecondPolitician) {
            this.setState(prevState => ({
                selectedPoliticianSecond:
                    foundSecondPolitician.IdentificacaoParlamentar
            }))
        } else {
            this.setState({
                notFoundSecondPolitician: true,
                openSecondPoliticianModal: true
            })
        }
        return
    }
}