import Cartao from './Cartao';
import Creditos from './Creditos';

const estiloSubtitulo = {
  color: '#626a78',
  textAlign: 'center',
};

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