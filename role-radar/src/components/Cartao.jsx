export default function Cartao({ cabecalho, children }) {
  return (
    <section className="cartao border-round">
      <div className="cartao-cabecalho">{cabecalho}</div>
      <div className="cartao-conteudo">{children}</div>
    </section>
  );
}
