import Cartao from './Cartao';

export function formatarDistancia(distancia) {
  return distancia < 1000
    ? `a ${Math.round(distancia)} m`
    : `a ${(distancia / 1000).toFixed(1).replace('.', ',')} km`;
}

export default function Lugar({ numero, nome, endereco, distancia }) {
  const estiloNumero = { backgroundColor: '#5546dc' };
  return (
    <Cartao cabecalho={formatarDistancia(distancia)}>
      <div className="lugar">
        <span
          className="numero"
          style={estiloNumero}
        >
          {numero}
        </span>
        <div>
          <strong>{nome || 'Sem nome'}</strong>
          <p>{endereco}</p>
        </div>
      </div>
    </Cartao>
  );
}
