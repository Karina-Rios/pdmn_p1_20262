import { Component } from 'react';
import { Button } from '@primereact/ui/button';
import { GEOAPIFY_KEY } from '../utils/chaves';

export default class MeuPonto extends Component {
  state = { agora: Date.now() };

  componentDidMount() {
    this.timer = setInterval(
      () => this.setState({ agora: Date.now() }),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('MeuPonto removido');
  }

  render() {
    const { latitude, longitude, horarioLocalizacao, onAtualizar } =
      this.props;
    const segundos = Math.max(
      0,
      Math.floor((this.state.agora - horarioLocalizacao) / 1000),
    );
    const marcador = `lonlat:${longitude},${latitude};color:%23d32f2f;size:48`;
    const url = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${longitude},${latitude}&zoom=16&marker=${marcador}&apiKey=${GEOAPIFY_KEY}`;

    return (
      <>
        <img className="mapa" src={url} alt="Mapa da sua localização" />
        <p>
          Latitude: {latitude.toFixed(4)} | Longitude: {longitude.toFixed(4)}
        </p>
        <p>Hemisfério {latitude < 0 ? 'Sul' : 'Norte'}</p>
        <p>Localização obtida há {segundos} s</p>
        <Button
          className="botao-atualizar"
          variant="outlined"
          onClick={onAtualizar}
        >
          <i className="pi pi-refresh" />
          Atualizar localização
        </Button>
      </>
    );
  }
}
