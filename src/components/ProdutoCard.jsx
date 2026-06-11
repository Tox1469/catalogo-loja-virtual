import { Link } from 'react-router-dom'
import styled from 'styled-components'
import tema from '../tema.js'

const Card = styled.article`
  background-color: #fff;
  border: 1px solid ${tema.cores.borda};
  border-radius: 10px;
  padding: 16px; /* box model: espacamento interno do card */
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(49, 46, 129, 0.16);
  }
`

const Imagem = styled.div`
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  img {
    max-height: 100%;
    object-fit: contain;
  }
`

const Categoria = styled.span`
  align-self: flex-start;
  background-color: ${tema.cores.fundoClaro};
  color: ${tema.cores.primaria};
  font-size: 0.75rem;
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: capitalize;
`

const Nome = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  /* limita o titulo em 2 linhas se nao alguns cards ficavam gigantes */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.4em;
`

const Preco = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${tema.cores.verde};
  margin-top: auto;
`

const BotaoVer = styled(Link)`
  display: block;
  text-align: center;
  background-color: ${tema.cores.primaria};
  color: #fff;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;

  &:hover {
    background-color: ${tema.cores.primariaHover};
  }
`

const Selo = styled.span`
  align-self: flex-start;
  background-color: ${tema.cores.destaque};
  color: ${tema.cores.primaria};
  font-size: 0.7rem;
  font-weight: bold;
  padding: 3px 10px;
  border-radius: 20px;
`

// card de produto da listagem, recebe os dados via props da Home
function ProdutoCard({ produto }) {
  return (
    <Card>
      {produto.local && <Selo>CADASTRADO POR NÓS</Selo>}
      <Imagem>
        <img src={produto.image} alt={produto.title} />
      </Imagem>
      <Categoria>{produto.category}</Categoria>
      <Nome>{produto.title}</Nome>
      <Preco>
        {Number(produto.price).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Preco>
      <BotaoVer to={`/produto/${produto.id}`}>Ver detalhes</BotaoVer>
    </Card>
  )
}

export default ProdutoCard
