import React from 'react';
import axios from 'axios';

import AutoComplete from 'material-ui/AutoComplete';
import { gray900 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Proposicoes from './proposicoes'
import echarts from 'echarts';
import { List, ListItem, RaisedButton } from 'material-ui';
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
                UfParlamentar: "",
                votacoes: 0,
                mandatos: 0,
                autorias: 0
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
                UfParlamentar: "",
                votacoes: 0,
                mandatos: 0,
                autorias: 0
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

    componentDidUpdate(prevProps, prevState) {

        if ((this.state.selectedPoliticianFirst.CodigoParlamentar === undefined || this.state.selectedPoliticianSecond.CodigoParlamentar === undefined)
            || ((this.state.selectedPoliticianFirst.CodigoParlamentar === prevState.selectedPoliticianFirst.CodigoParlamentar && this.state.selectedPoliticianSecond.CodigoParlamentar === prevState.selectedPoliticianSecond.CodigoParlamentar))) {
            return;
        }


        axios({
            method: 'get',
            url: 'http://legis.senado.leg.br/dadosabertos/senador/' + this.state.selectedPoliticianFirst.CodigoParlamentar + '/votacoes',
            "headers": {
                "accept": "application/json"
            }
        }).then((res) => {
            console.log("votacoes")
            const currentState = Object.assign({}, this.state)
            currentState.selectedPoliticianFirst.votacoes = res.data.VotacaoParlamentar.Parlamentar.Votacoes.Votacao.length
            this.setState(currentState)

            var domVotacoes = document.getElementById("graphVotacoes");
            var chartVotacoes = echarts.init(domVotacoes);
            var optionsVotacoes = null;
            optionsVotacoes = {
                title: {
                    text: 'Comparativo de Número de Votações'
                },
                xAxis: {
                    type: 'category',
                    data: [
                        this.state.selectedPoliticianFirst.NomeParlamentar,
                        this.state.selectedPoliticianSecond.NomeParlamentar
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [
                        {
                            value: this.state.selectedPoliticianFirst.votacoes,
                            itemStyle: { color: 'rgb(178, 223, 219)' }
                        },
                        {
                            value: this.state.selectedPoliticianSecond.votacoes,
                            itemStyle: { color: 'rgb(0, 105, 92)' }
                        }],
                    type: 'bar'
                }]
            };
            if (optionsVotacoes && typeof optionsVotacoes === "object") {
                chartVotacoes.setOption(optionsVotacoes, true);
            }
        })
            .catch((error) => {
                console.log(error);
                return error;
            });


        axios({
            method: 'get',
            url: 'http://legis.senado.leg.br/dadosabertos/senador/' + this.state.selectedPoliticianSecond.CodigoParlamentar + '/votacoes',
            "headers": {
                "accept": "application/json"
            }
        }).then((res) => {
            console.log("votacoes")
            const currentState = Object.assign({}, this.state)
            currentState.selectedPoliticianSecond.votacoes = res.data.VotacaoParlamentar.Parlamentar.Votacoes.Votacao.length
            this.setState(currentState)

            var domVotacoes = document.getElementById("graphVotacoes");
            var chartVotacoes = echarts.init(domVotacoes);
            var optionsVotacoes = null;
            optionsVotacoes = {
                title: {
                    text: 'Comparativo de Número de Votações'
                },
                xAxis: {
                    type: 'category',
                    data: [
                        this.state.selectedPoliticianFirst.NomeParlamentar,
                        this.state.selectedPoliticianSecond.NomeParlamentar
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [
                        {
                            value: this.state.selectedPoliticianFirst.votacoes,
                            itemStyle: { color: 'rgb(178, 223, 219)' }
                        },
                        {
                            value: this.state.selectedPoliticianSecond.votacoes,
                            itemStyle: { color: 'rgb(0, 105, 92)' }
                        }],
                    type: 'bar'
                }]
            };
            if (optionsVotacoes && typeof optionsVotacoes === "object") {
                chartVotacoes.setOption(optionsVotacoes, true);
            }
        })
            .catch((error) => {
                console.log(error);
                return error;
            });

        axios({
            method: 'get',
            url: 'http://legis.senado.leg.br/dadosabertos/senador/' + this.state.selectedPoliticianFirst.CodigoParlamentar + '/mandatos',
            "headers": {
                "accept": "application/json"
            }
        }).then((res) => {
            console.log("mandatos")
            const currentState = Object.assign({}, this.state)
            currentState.selectedPoliticianFirst.mandatos = res.data.MandatoParlamentar.Parlamentar.Mandatos.Mandato.length
            this.setState(currentState)

            var domMandato = document.getElementById("graphMandato");
            var chartMandato = echarts.init(domMandato);
            var optionsMandatos = null;
            optionsMandatos = {
                title: {
                    text: 'Comparativo de Número de Mandatos'
                },
                xAxis: {
                    type: 'category',
                    data: [this.state.selectedPoliticianFirst.NomeParlamentar,
                    this.state.selectedPoliticianSecond.NomeParlamentar]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [
                        {
                            value: this.state.selectedPoliticianFirst.mandatos,
                            itemStyle: { color: 'rgb(178, 223, 219)' }
                        },
                        {
                            value: this.state.selectedPoliticianSecond.mandatos,
                            itemStyle: { color: 'rgb(0, 105, 92)' }
                        }],
                    type: 'bar'
                }]
            };
            if (optionsMandatos && typeof optionsMandatos === "object") {
                chartMandato.setOption(optionsMandatos, true);
            }
        })
            .catch((error) => {
                console.log(error);
                return error;
            });


        axios({
            method: 'get',
            url: 'http://legis.senado.leg.br/dadosabertos/senador/' + this.state.selectedPoliticianSecond.CodigoParlamentar + '/mandatos',
            "headers": {
                "accept": "application/json"
            }
        }).then((res) => {
            const currentState = Object.assign({}, this.state)
            currentState.selectedPoliticianSecond.mandatos = res.data.MandatoParlamentar.Parlamentar.Mandatos.Mandato.length
            this.setState(currentState)

            var domMandato = document.getElementById("graphMandato");
            var chartMandato = echarts.init(domMandato);
            var optionsMandatos = null;
            optionsMandatos = {
                title: {
                    text: 'Comparativo de Número de Mandatos'
                },
                xAxis: {
                    type: 'category',
                    data: [this.state.selectedPoliticianFirst.NomeParlamentar,
                    this.state.selectedPoliticianSecond.NomeParlamentar]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [
                        {
                            value: this.state.selectedPoliticianFirst.mandatos,
                            itemStyle: { color: 'rgb(178, 223, 219)' }
                        },
                        {
                            value: this.state.selectedPoliticianSecond.mandatos,
                            itemStyle: { color: 'rgb(0, 105, 92)' }
                        }],
                    type: 'bar'
                }]
            };
            if (optionsMandatos && typeof optionsMandatos === "object") {
                chartMandato.setOption(optionsMandatos, true);
            }
        })
            .catch((error) => {
                console.log(error);
                return error;
            });

    }

    render() {
        return (
            <main className="main-container">
                <h2>Comparação de Políticos</h2>
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
                                        if (text.length > 3) {
                                            this.setState({
                                                selectedFirstNomeParlamentar: text,
                                                notFoundFirstPolitician: false,
                                                openFirstPoliticianModal: false
                                            })
                                        }
                                    }
                                    }
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
                            : null
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
                            : null
                        }


                    </section>
                </div>

                <SimpleDialog
                    open={!!this.state.openFirstPoliticianModal}
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
                    open={!!this.state.openSecondPoliticianModal}
                    title={this.state.notFoundSecondPolitician ? 'Político não encontrado' : null}
                    message={this.state.notFoundSecondPolitician ? 'Algo deu errado, verifique as informações e tente novamente.' : null}
                    onRequestClose={() => {
                        this.setState({
                            openSecondPoliticianModal: false,
                            notFoundSecondPolitician: false
                        })
                    }}
                />
                <div id="graphMandato" className={`graph` + this.state.selectedPoliticianSecond.mandatos && this.state.selectedPoliticianFirst.mandatos ? null : "hidden"} ></div>
                <div id="graphVotacoes" className={`graph` + this.state.selectedPoliticianSecond.mandatos && this.state.selectedPoliticianFirst.mandatos ? null : "hidden"}></div>
                {/* {this.state.selectedPoliticianSecond.mandatos && this.state.selectedPoliticianFirst.mandatos ? (<div id="graphMandato" className="graph"></div>) : null} */}
                {/* {this.state.selectedPoliticianSecond.mandatos && this.state.selectedPoliticianFirst.mandatos ? (<div id="graphVotacoes" className="graph"></div>) : null} */}
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

        let foundFirstPolitician = this.state.politicians.find((element) => this.findFirstPolitician(element))

        if (foundFirstPolitician) {
            console.log(foundFirstPolitician)
            this.setState(prevState => ({
                selectedPoliticianFirst:
                    foundFirstPolitician.IdentificacaoParlamentar
            }))
        } else {
            console.log("else")
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
