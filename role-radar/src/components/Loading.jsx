import { Component } from 'react';

export default class Loading extends Component {
  static defaultProps = { mensagem: 'Carregando...' };

  render() {
    return (
      <div className="loading">
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }} />
        <p>{this.props.mensagem}</p>
      </div>
    );
  }
}
