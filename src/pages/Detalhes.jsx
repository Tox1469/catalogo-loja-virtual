import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import tema from '../tema.js'
import { buscarProdutosLocais, removerProdutoLocal } from '../produtosStorage.js'

const Conteudo = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`

const Voltar = styled(Link)`
  display: inline-block;
  color: ${tema.cores.primaria};
  font-size: 0.9rem;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }
`

const Painel = styled.section`
  background-color: #fff;
  border: 1px solid ${tema.cores.borda};
  border-radius: 12px;
  padding: 32px;
  display: flex;
  gap: 40px;

  /* no celular vira coluna, imagem em cima e texto embaixo */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`

const Imagem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 320px;
    object-fit: contain;
  }
`

const Info = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Categoria = styled.span`
  align-self: flex-start;
  background-color: ${tema.cores.fundoClaro};
  color: ${tema.cores.primaria};
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 20px;
  text-transform: capitalize;
`

const Nome = styled.h2`
  color: ${tema.cores.primaria};
  font-size: 1.5rem;
`

const Preco = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${tema.cores.verde};
`

const Descricao = styled.p`
  color: #555;
  font-size: 0.95rem;
`

const Avaliacao = styled.p`
  color: ${tema.cores.destaque};
  font-weight: 600;
  font-size: 0.9rem;
`

const BotaoRemover = styled.button`
  align-self: flex-start;
  background-color: #fff;
  color: ${tema.cores.erro};
  border: 1px solid ${tema.cores.erro};
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 8px;

  &:hover {
    background-color: ${tema.cores.erro};
    color: #fff;
  }
`

const Aviso = styled.p`
  text-align: center;
  padding: 60px 0;
  color: #777;
`

// pagina de detalhes: pega o produto pelo id que vem na url
// se for produto local busca no localStorage, senao busca na api
function Detalhes() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregarProduto() {
      // produtos cadastrados pela gente tem id comecando com "local-"
      if (id.startsWith('local-')) {
        const locais = buscarProdutosLocais()
        const encontrado = locais.find((p) => p.id === id)
        setProduto(encontrado || null)
        setCarregando(false)
        return
      }

      try {
        const resposta = await fetch(`https://fakestoreapi.com/products/${id}`)
        const dados = await resposta.json()
        setProduto(dados)
      } catch (e) {
        console.error('Erro ao buscar produto:', e)
        setProduto(null)
      } finally {
        setCarregando(false)
      }
    }

    carregarProduto()
  }, [id]) // roda de novo se o id da url mudar

  function aoRemover() {
    const confirmar = window.confirm('Tem certeza que deseja remover este produto?')
    if (confirmar) {
      removerProdutoLocal(id)
      navigate('/')
    }
  }

  if (carregando) {
    return (
      <Conteudo>
        <Aviso>Carregando produto...</Aviso>
      </Conteudo>
    )
  }

  if (!produto) {
    return (
      <Conteudo>
        <Aviso>Produto não encontrado.</Aviso>
        <Voltar to="/">Voltar para o catálogo</Voltar>
      </Conteudo>
    )
  }

  return (
    <Conteudo>
      <Voltar to="/">← Voltar para o catálogo</Voltar>
      <Painel>
        <Imagem>
          <img src={produto.image} alt={produto.title} />
        </Imagem>
        <Info>
          <Categoria>{produto.category}</Categoria>
          <Nome>{produto.title}</Nome>
          {/* so produtos da api tem avaliacao, os locais nao */}
          {produto.rating && (
            <Avaliacao>
              Avaliação: {produto.rating.rate} / 5 ({produto.rating.count}{' '}
              avaliações)
            </Avaliacao>
          )}
          <Preco>
            {Number(produto.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Preco>
          <Descricao>{produto.description}</Descricao>
          {produto.local && (
            <BotaoRemover onClick={aoRemover}>Remover produto</BotaoRemover>
          )}
        </Info>
      </Painel>
    </Conteudo>
  )
}

export default Detalhes
