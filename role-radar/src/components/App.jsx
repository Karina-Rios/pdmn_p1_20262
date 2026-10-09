import { Component } from 'react';
import Cartao from './Cartao';
import Creditos from './Creditos';
import Loading from './Loading';
import MeuPonto from './MeuPonto';
import Busca from './Busca';
import ListaLugares from './ListaLugares';
import MapaRadar from './MapaRadar';
import geoapifyClient from '../utils/geoapifyClient';

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

    navigator.geolocation.getCurrentPosition(
      (posicao) =>
        this.setState({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          horarioLocalizacao: Date.now(),
          mensagemDeErro: null,
        }),
      (erro) => {
        console.log(`Erro: ${erro}`);
        this.setState({
          mensagemDeErro:
            'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.',
        });
      },
    );
  };

  onBuscaRealizada = async (categoria, raio) => {
    const { longitude, latitude } = this.state;
    this.setState({
      buscando: true,
      erroBusca: null,
      raioBuscado: raio,
    });

    try {
      const resposta = await geoapifyClient.get('/places', {
        params: {
          categories: categoria,
          filter: `circle:${longitude},${latitude},${raio}`,
          bias: `proximity:${longitude},${latitude}`,
          limit: 20,
        },
      });
      this.setState({
        lugares: resposta.data.features,
        buscando: false,
      });
    } catch (erro) {
      console.error(erro);
      this.setState({
        buscando: false,
        erroBusca: 'Não foi possível consultar os lugares. Tente novamente.',
      });
    }
  };

  render() {
    const {
      latitude,
      longitude,
      horarioLocalizacao,
      mensagemDeErro,
      lugares,
      buscando,
      erroBusca,
      raioBuscado,
    } = this.state;
    const estiloSubtitulo = {
      color: '#626a78',
      textAlign: 'center',
    };
    const obterAno = () => new Date().getFullYear();

    return (
      <main className="pagina">
        <header>
          <h1 className="titulo">
            <i className="pi pi-map-marker" /> RolêRadar
          </h1>
          <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
          <Creditos />
        </header>

        {mensagemDeErro ? (
          <p className="erro">{mensagemDeErro}</p>
        ) : latitude === null ? (
          <Loading mensagem="Aguardando permissão de localização..." />
        ) : (
          <div className="grid">
            <div className="col-12 md:col-6">
              <Cartao cabecalho="Você está aqui">
                <MeuPonto
                  latitude={latitude}
                  longitude={longitude}
                  horarioLocalizacao={horarioLocalizacao}
                  onAtualizar={this.obterLocalizacao}
                />
              </Cartao>
              <Cartao cabecalho="O que você procura?">
                <Busca onBuscaRealizada={this.onBuscaRealizada} />
              </Cartao>
            </div>

            <div className="col-12 md:col-6">
              {buscando ? (
                <Loading mensagem="Procurando lugares..." />
              ) : erroBusca ? (
                <p className="erro">{erroBusca}</p>
              ) : lugares === null ? null : lugares.length === 0 ? (
                <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
              ) : (
                <>
                  <strong>
                    {lugares.length}{' '}
                    {lugares.length === 1
                      ? 'lugar encontrado'
                      : 'lugares encontrados'}{' '}
                    em até {raioBuscado} m
                  </strong>
                  <Cartao cabecalho="Radar">
                    <MapaRadar
                      latitude={latitude}
                      longitude={longitude}
                      lugares={lugares}
                    />
                  </Cartao>
                  <ListaLugares lugares={lugares} />
                </>
              )}
            </div>
          </div>
        )}

        <footer>RolêRadar © {obterAno()}</footer>
      </main>
    );
  }
}
