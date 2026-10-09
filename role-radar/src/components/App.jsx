import Cartao from './Cartao';
import Creditos from './Creditos';
import Loading from './Loading';
import MeuPonto from './MeuPonto';

export default class MeuPonto extends Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null,
    lugares: null,
    buscando: false,
    erroBusca: null,
    raioBuscado: null,
  };

  componentDidMount() {
    this.timer = setInterval(
      () => this.setState({ agora: Date.now() }),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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


function obterAno() {
  return new Date().getFullYear();
}

function Cabecalho() {
  return (
    <header>
      <h1 className="titulo">
        <i className="pi pi-map-marker" /> RolêRadar
      </h1>
      <p style={estiloSubtitulo}>
        Descubra o que existe perto de você
      </p>
      <Creditos />
    </header>
  );
}

function Rodape() {
  return <footer>RolêRadar © {obterAno()}</footer>;
}


export default function App() {
  return (
    <>
      <Cabecalho />
      <main>
        <p>Descubra os rolês perto de você.</p>
      </main>
      
      <Rodape />
      <Cartao />
    </>
  );
}