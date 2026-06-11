// funcoes pra salvar e buscar os produtos cadastrados pelo usuario
// usamos o localStorage pros dados nao sumirem quando fecha o navegador

const CHAVE = 'produtosCadastrados'

export function buscarProdutosLocais() {
  const dados = localStorage.getItem(CHAVE)
  if (dados) {
    return JSON.parse(dados)
  }
  return []
}

export function salvarProdutoLocal(produto) {
  const produtos = buscarProdutosLocais()
  // gera um id proprio pra nao conflitar com os ids da api (que vao de 1 a 20)
  produto.id = 'local-' + Date.now()
  produto.local = true
  produtos.push(produto)
  localStorage.setItem(CHAVE, JSON.stringify(produtos))
  return produto
}

export function removerProdutoLocal(id) {
  const produtos = buscarProdutosLocais()
  const filtrados = produtos.filter((p) => p.id !== id)
  localStorage.setItem(CHAVE, JSON.stringify(filtrados))
}
