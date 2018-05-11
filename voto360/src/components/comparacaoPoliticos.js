import React from 'react';
import axios from 'axios';

import AutoComplete from 'material-ui/AutoComplete';
import { gray900 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List'
import Proposicoes from './dropdown/proposicoes'
import echarts from 'echarts';

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
            }
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
                this.setState({ response: res.data.ListaParlamentarEmExercicio,
                                politicians: res.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar })
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
      || ((this.state.selectedPoliticianFirst.CodigoParlamentar === prevState.selectedPoliticianFirst.CodigoParlamentar && this.state.selectedPoliticianSecond.CodigoParlamentar === prevState.selectedPoliticianSecond.CodigoParlamentar))){
         return;
       }


      console.log("componentDidUpdate");
      console.log(JSON.stringify(this.state.selectedPoliticianFirst));
      console.log(JSON.stringify(this.state.selectedPoliticianSecond));

      axios({
          method: 'get',
          url: 'http://legis.senado.leg.br/dadosabertos/senador/'+ this.state.selectedPoliticianFirst.CodigoParlamentar +'/comissoes',
          "headers": {
              "accept": "application/json"
          }
      }).then((res) => {
        const currentState = Object.assign({}, this.state)
        currentState.selectedPoliticianFirst.autorias = res.data.MembroComissaoParlamentar.Parlamentar.MembroComissoes.Comissao.length
        this.setState(currentState)


      })
      .catch((error) => {
        console.error(error);
        return error;
      });
      axios({
          method: 'get',
          url: 'http://legis.senado.leg.br/dadosabertos/senador/'+this.state.selectedPoliticianSecond.CodigoParlamentar+'/comissoes',
          "headers": {
              "accept": "application/json"
          }
      }).then((res) => {
        const currentState = Object.assign({}, this.state)
        currentState.selectedPoliticianSecond.autorias = res.data.MembroComissaoParlamentar.Parlamentar.MembroComissoes.Comissao.length
        this.setState(currentState)
        this.componentDidUpdate(this.props, this.state)
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
      axios({
          method: 'get',
          url: 'http://legis.senado.leg.br/dadosabertos/senador/'+this.state.selectedPoliticianFirst.CodigoParlamentar+'/votacoes',
          "headers": {
              "accept": "application/json"
          }
      }).then((res) => {
        const currentState = Object.assign({}, this.state)
        currentState.selectedPoliticianFirst.votacoes = res.data.VotacaoParlamentar.Parlamentar.Votacoes.Votacao.length
        this.setState(currentState)
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
      axios({
          method: 'get',
          url: 'http://legis.senado.leg.br/dadosabertos/senador/'+this.state.selectedPoliticianSecond.CodigoParlamentar+'/votacoes',
          "headers": {
              "accept": "application/json"
          }
      }).then((res) => {
        const currentState = Object.assign({}, this.state)
        currentState.selectedPoliticianSecond.votacoes = res.data.VotacaoParlamentar.Parlamentar.Votacoes.Votacao.length
        this.setState(currentState)
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
      axios({
          method: 'get',
          url: 'http://legis.senado.leg.br/dadosabertos/senador/'+this.state.selectedPoliticianFirst.CodigoParlamentar+'/mandatos',
          "headers": {
              "accept": "application/json"
          }
      }).then((res) => {
        const currentState = Object.assign({}, this.state)
        currentState.selectedPoliticianFirst.mandatos = res.data.MandatoParlamentar.Parlamentar.Mandatos.Mandato.length
        this.setState(currentState)
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
      axios({
          method: 'get',
          url: 'http://legis.senado.leg.br/dadosabertos/senador/'+this.state.selectedPoliticianSecond.CodigoParlamentar+'/mandatos',
          "headers": {
              "accept": "application/json"
          }
      }).then((res) => {
        const currentState = Object.assign({}, this.state)
        currentState.selectedPoliticianSecond.mandatos = res.data.MandatoParlamentar.Parlamentar.Mandatos.Mandato.length
        this.setState(currentState)
      })
      .catch((error) => {
        console.log(error);
        return error;
      });




      var app = {};

      var domAutoria = document.getElementById("graphAutoria");
      var chartAutoria = echarts.init(domAutoria);
      var optionsAutorias = null;
      optionsAutorias = {
        title: {
          text: 'Comparativo de Número de Autorias de Projetos'
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
                {value: this.state.selectedPoliticianFirst.autorias,
                  itemStyle: {color: 'rgb(178, 223, 219)'}},
                {value: this.state.selectedPoliticianSecond.autorias,
                  itemStyle: {color: 'rgb(0, 105, 92)'}}],
              type: 'bar'
          }]
      };
      if (optionsAutorias && typeof optionsAutorias === "object") {
          chartAutoria.setOption(optionsAutorias, true);
      }



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
                {value: this.state.selectedPoliticianFirst.votacoes,
                  itemStyle: {color: 'rgb(178, 223, 219)'}},
                {value: this.state.selectedPoliticianSecond.votacoes,
                  itemStyle: {color: 'rgb(0, 105, 92)'}}],
              type: 'bar'
          }]
      };
      if (optionsVotacoes && typeof optionsVotacoes === "object") {
          chartVotacoes.setOption(optionsVotacoes, true);
      }





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
                {value: this.state.selectedPoliticianFirst.mandatos,
                  itemStyle: {color: 'rgb(178, 223, 219)'}},
                {value: this.state.selectedPoliticianSecond.mandatos,
                  itemStyle: {color: 'rgb(0, 105, 92)'}}],
              type: 'bar'
          }]
      };
      if (optionsMandatos && typeof optionsMandatos === "object") {
          chartMandato.setOption(optionsMandatos, true);
      }

    }



    render() {
        return (
            <main className="main-container">
                <div className="content-container">
                    <section className="politician-search-container">
                        <div className="politician-search">
                            <h4>Selecione o Político</h4>
                            <AutoComplete
                                filter={AutoComplete.fuzzyFilter}
                                dataSource={this.state.politiciansNames}
                                maxSearchResults={5}
                                floatingLabelText="Pesquise o político por nome"
                                floatingLabelStyle={styles.floatingLabelStyle}
                                underlineStyle={styles.underlineStyle}
                                onNewRequest={(text, index) => {
                                    this.setState(prevState => ({
                                        selectedPoliticianFirst: {
                                            ...prevState.selectedPoliticianFirst,
                                            NomeParlamentar: text
                                        }
                                    }))
                                    this.displayFirstPolitician()

                                }}
                            />
                        </div>
                        <Divider />
                        <br/>
                        {this.state.selectedPoliticianFirst && this.state.selectedPoliticianFirst.NomeParlamentar ? (<div className="politician-search-results">
                            <Avatar
                                src={this.state.selectedPoliticianFirst.UrlFotoParlamentar}
                                size={100}
                                 />
                            {/* <img
                                src={this.state.selectedPoliticianFirst.UrlFotoParlamentar}s
                            /> */}
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
                            {this.state.selectedPoliticianFirst.CodigoParlamentar ? <Proposicoes id={this.state.selectedPoliticianFirst.CodigoParlamentar}/> : null}

                        </div>)
                            : undefined
                        }

                    </section>
                    <section className="politician-search-container">
                        <div className="politician-search">
                            <h4>Selecione o Político</h4>
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
                                            ...prevState.selectedPoliticianSecond,
                                            NomeParlamentar: text
                                        }
                                    }))
                                    this.displaySecondPolitician()

                                }}
                            />
                        </div>
                        <Divider />
                        <br />
                        {this.state.selectedPoliticianSecond && this.state.selectedPoliticianSecond.NomeParlamentar ? (<div className="politician-search-results">
                            <p> {this.state.selectedPoliticianSecond ? this.state.selectedPoliticianSecond.NomeCompletoParlamentar : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianSecond ? this.state.selectedPoliticianSecond.SexoParlamentar : undefined}</p>
                            <Divider />
                            <p>{this.state.selectedPoliticianSecond ? this.state.selectedPoliticianSecond.FormaTratamento : undefined}</p>
                            <p>{this.state.selectedPoliticianSecond ? this.state.selectedPoliticianSecond.EmailParlamentar : undefined}</p>
                            <p>{this.state.selectedPoliticianSecond ? this.state.selectedPoliticianSecond.SiglaPartidoParlamentar : undefined}</p>
                            <p>{this.state.selectedPoliticianSecond ? this.state.selectedPoliticianSecond.NomeCompletoParlamentar : undefined}</p>
                            <p>{this.state.selectedPoliticianSecond ? this.state.selectedPoliticianSecond.NomeCompletoParlamentar : undefined}</p>

                        </div>)
                            : undefined
                        }


                    </section>
                </div>
                <div id="graphAutoria" className="graph"></div>
                <div id="graphMandato" className="graph"></div>
                <div id="graphVotacoes" className="graph"></div>
            </main>

        )
    }

    displayFirstPolitician = () => {
        this.state.politicians.forEach((politician, index) => {
            if (politician.IdentificacaoParlamentar.NomeParlamentar === this.state.selectedPoliticianFirst.NomeParlamentar) {
                this.setState(prevState => ({
                    selectedPoliticianFirst:
                        politician.IdentificacaoParlamentar

                }))
                return
            }
        })
    }

    displaySecondPolitician = () => {
        this.state.politicians.forEach((politician, index) => {
            if (politician.IdentificacaoParlamentar.NomeParlamentar === this.state.selectedPoliticianSecond.NomeParlamentar) {
                this.setState(prevState => ({
                    selectedPoliticianSecond:
                        politician.IdentificacaoParlamentar

                }))
                return
            }
        })
    }
}
