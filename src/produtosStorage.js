// funções para salvar e buscar os produtos cadastrados pelo usuário
// usamos o LocalStorage para que os dados não se percam ao fechar o navegador

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
  // gera um id próprio pra não conflitar com os ids da API (1 a 20)
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
