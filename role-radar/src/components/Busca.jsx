import { Component } from 'react';
import { Button } from '@primereact/ui/button';
import { InputText } from '@primereact/ui/inputtext';

const categorias = [
  { rotulo: 'Cafés', chave: 'catering.cafe' },
  { rotulo: 'Restaurantes', chave: 'catering.restaurant' },
  { rotulo: 'Parques', chave: 'leisure.park' },
  { rotulo: 'Farmácias', chave: 'healthcare.pharmacy' },
  { rotulo: 'Supermercados', chave: 'commercial.supermarket' },
  { rotulo: 'Museus', chave: 'entertainment.museum' },
];

export default class Busca extends Component {
  static defaultProps = { dica: 'Raio em metros (100 a 5000)' };

  state = {
    categoria: null,
    raio: '1000',
    erro: null,
  };

  enviar = (evento) => {
    evento.preventDefault();
    const { categoria, raio } = this.state;

    if (!categoria) {
      this.props.setState({ erro: 'Escolha uma categoria.' });
    }

    const valor = Number(raio);
    if (
      !/^\d+$/.test(raio) ||
      !Number.isInteger(valor) ||
      valor < 100 ||
      valor > 5000
    ) {
      return this.setState({
        erro: 'Informe um raio inteiro entre 100 e 5000 metros.',
      });
    }

    this.setState({ erro: null });
    this.props.onBuscaRealizada(categoria, valor);
  };

  render() {
    const { categoria, raio, erro } = this.state;

    return (
      <form onSubmit={this.enviar}>
        <div className="categorias">
          {categorias.map((item) => (
            <Button
              key={item.chave}
              className={`botao-categoria ${
                categoria === item.chave ? 'selecionada' : ''
              }`}
              type="button"
              variant={categoria !== item.chave ? 'outlined' : undefined}
              onClick={() => this.setState({ categoria: item.chave })}
            >
              {item.rotulo}
            </Button>
          ))}
        </div>
        <InputText
          className="raio"
          value={raio}
          placeholder={this.props.dica}
          onChange={(evento) => this.setState({ raio: evento.target.value })}
        />
        <Button
          className="botao-buscar"
          type="submit"
        >
          <i className="pi pi-search" />
          Buscar
        </Button>
        {erro && <p className="erro">{erro}</p>}
      </form>
    );
  }
}
