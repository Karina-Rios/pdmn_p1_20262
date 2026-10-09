import Cartao from './Cartao';
import Creditos from './Creditos';
import Loading from './Loading';

export default class App extends Component {
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
        console.log('componentDidMount')
        this.obterLocalizacao();
    }

    obterLocalizacao = () => {
        if (!navigator.geolocation) {
        return this.setState({
            mensagemDeErro:
            'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.',
        });
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