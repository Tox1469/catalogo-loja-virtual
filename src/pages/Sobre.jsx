import styled from 'styled-components'
import tema from '../tema.js'

const Conteudo = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`

const Painel = styled.section`
  background-color: #fff;
  border: 1px solid ${tema.cores.borda};
  border-radius: 12px;
  padding: 32px;

  h2 {
    color: ${tema.cores.primaria};
    margin-bottom: 16px;
  }

  p {
    color: #555;
    margin-bottom: 12px;
  }

  ul {
    margin: 12px 0 12px 24px;
    color: #555;
  }

  li {
    margin-bottom: 6px;
  }
`

const Integrantes = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
`

const CartaoIntegrante = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: ${tema.cores.fundoClaro};
  border-radius: 10px;
  padding: 20px;
  text-align: center;

  h3 {
    color: ${tema.cores.primaria};
    font-size: 1.05rem;
  }

  p {
    color: #666;
    font-size: 0.85rem;
    margin: 0;
  }
`

// pagina sobre o projeto e os integrantes do grupo
function Sobre() {
  return (
    <Conteudo>
      <Painel>
        <h2>Sobre o projeto</h2>
        <p>
          A MixStore é um catálogo de produtos para uma loja virtual de
          variedades,
          desenvolvido como atividade avaliativa final da disciplina de
          Front-End.
        </p>
        <p>O sistema permite:</p>
        <ul>
          <li>Consultar produtos vindos de uma API externa (Fake Store API)</li>
          <li>Buscar produtos pelo nome e filtrar por categoria</li>
          <li>Cadastrar novos produtos com validação de formulário</li>
          <li>Salvar os produtos cadastrados no LocalStorage do navegador</li>
          <li>Ver os detalhes de cada produto em uma página própria</li>
        </ul>
        <p>
          Tecnologias utilizadas: React, React Router, Styled Components,
          Fetch API e LocalStorage.
        </p>

        <Integrantes>
          <CartaoIntegrante>
            <h3>Luis Boratto</h3>
            <p>Desenvolvimento</p>
          </CartaoIntegrante>
          <CartaoIntegrante>
            <h3>Igor Pallisser</h3>
            <p>Desenvolvimento</p>
          </CartaoIntegrante>
          <CartaoIntegrante>
            <h3>Luiz Henrique de Morais Franco</h3>
            <p>Desenvolvimento</p>
          </CartaoIntegrante>
        </Integrantes>
      </Painel>
    </Conteudo>
  )
}

export default Sobre
