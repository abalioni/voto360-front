import React, { Component } from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline'
import FontIcon from 'material-ui/FontIcon';

export default class TimelineComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  
    render() {
        return (
            <Timeline>
            <TimelineEvent title="Nascimento"
                    createdAt={(this.props.data.DadosBasicosParlamentar.DataNascimento).split('-').reverse().join('/')}
                    icon={<i className="material-icons">child_friendly</i>}
            >
            </TimelineEvent>
            <TimelineEvent
                    title="Filiação partidária"
                    createdAt={(this.props.data.FiliacaoAtual.DataFiliacao).split('-').reverse().join('/')}
                    icon={<i className="material-icons">group</i>}
            > Filiou-se ao: {this.props.data.FiliacaoAtual.Partido.NomePartido} - {this.props.data.FiliacaoAtual.Partido.SiglaPartido}
            </TimelineEvent>
            <TimelineEvent
                    title="Início do Mandato"
                    createdAt={(this.props.data.MandatoAtual.PrimeiraLegislaturaDoMandato.DataInicio).split('-').reverse().join('/')}
                    icon={<i className="material-icons">event</i>}
            >
            </TimelineEvent>
                <TimelineEvent
                    title="Fim do Mandato"
                    createdAt={(this.props.data.MandatoAtual.PrimeiraLegislaturaDoMandato.DataFim).split('-').reverse().join('/')}
                    icon={<i className="material-icons">highlight_off</i>}
                >
                </TimelineEvent>
            </Timeline>
        );
    }
}
