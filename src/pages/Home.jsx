import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProdutoCard from '../components/ProdutoCard.jsx'
import { buscarProdutosLocais } from '../produtosStorage.js'

const Conteudo = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`

const Banner = styled.section`
  background: linear-gradient(120deg, #1e2a4a, #3b5089);
  color: #fff;
  border-radius: 12px;
  padding: 40px 32px;
  margin-bottom: 28px;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }

  p {
    color: #cfd6e4;
    max-width: 520px;
  }
`

const Filtros = styled.section`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  input,
  select {
    padding: 10px 14px;
    border: 1px solid #ccd2dd;
    border-radius: 8px;
    font-size: 0.95rem;
    background-color: #fff;
  }

  input {
    flex: 1;
    min-width: 220px;
  }

  /* no celular os filtros ficam empilhados */
  @media (max-width: 600px) {
    flex-direction: column;

    input {
      min-width: 100%;
    }
  }
`

const Grade = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  /* grid responsivo: menos colunas conforme a tela diminui */
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Aviso = styled.p`
  text-align: center;
  padding: 60px 0;
  color: #777;
  font-size: 1.05rem;
`

// página principal: lista os produtos vindos da API + os cadastrados no LocalStorage
function Home() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('todas')

  // useEffect roda quando o componente é montado na tela
  useEffect(() => {
    async function carregarProdutos() {
      try {
        // requisição externa com a Fetch API
        const resposta = await fetch('https://fakestoreapi.com/products')
        if (!resposta.ok) {
          throw new Error('Erro na resposta da API')
        }
        const dados = await resposta.json()
        // junta os produtos da API com os que foram cadastrados localmente
        const locais = buscarProdutosLocais()
        setProdutos([...locais, ...dados])
      } catch (e) {
        console.error('Falha ao buscar produtos:', e)
        // se a API falhar, mostra pelo menos os produtos locais
        setProdutos(buscarProdutosLocais())
        setErro(true)
      } finally {
        setCarregando(false)
      }
    }

    carregarProdutos()
  }, [])

  // monta a lista de categorias a partir dos próprios produtos (sem repetir)
  const categorias = [...new Set(produtos.map((p) => p.category))]

  // aplica a busca por nome e o filtro de categoria
  const produtosFiltrados = produtos.filter((p) => {
    const combinaBusca = p.title.toLowerCase().includes(busca.toLowerCase())
    const combinaCategoria = categoria === 'todas' || p.category === categoria
    return combinaBusca && combinaCategoria
  })

  return (
    <Conteudo>
      <Banner>
        <h2>Bem-vindo à MixStore</h2>
        <p>
          De eletrônicos a roupas, aqui tem de tudo um pouco. Use a busca e o
          filtro de categorias para encontrar o que procura.
        </p>
      </Banner>

      <Filtros>
        <input
          type="text"
          placeholder="Buscar produto pelo nome..."
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />
        <select
          value={categoria}
          onChange={(evento) => setCategoria(evento.target.value)}
        >
          <option value="todas">Todas as categorias</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </Filtros>

      {carregando && <Aviso>Carregando produtos...</Aviso>}

      {erro && !carregando && (
        <Aviso>
          Não foi possível carregar os produtos da API. Verifique sua conexão.
        </Aviso>
      )}

      {!carregando && produtosFiltrados.length === 0 && !erro && (
        <Aviso>Nenhum produto encontrado com esses filtros.</Aviso>
      )}

      <Grade>
        {produtosFiltrados.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </Grade>
    </Conteudo>
  )
}

export default Home
