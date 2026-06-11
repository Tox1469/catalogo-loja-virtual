# MixStore - Catálogo de Produtos para Loja Virtual

Trabalho da disciplina de Front-End (Atividade Avaliativa Final).

**Integrantes:**
- Luis Boratto
- Igor Pallisser

**Site no ar:** https://catalogo-loja-virtual.vercel.app

## Sobre o projeto

A MixStore é um sistema web de cadastro e consulta de produtos pra uma loja virtual de variedades. O catálogo carrega os produtos de uma API externa (Fake Store API) e tambem da pra cadastrar produtos novos, que ficam salvos no LocalStorage do navegador.

### Funcionalidades

- Listagem dos produtos em grid responsivo
- Busca por nome e filtro por categoria
- Cadastro de produto com validação de formulário em JavaScript puro
- Página de detalhes de cada produto
- Remoção dos produtos cadastrados localmente
- Layout responsivo (funciona no pc, tablet e celular)
- Botão de voltar ao topo da página

### Tecnologias usadas

- React 18 (componentes, props, useState, useEffect)
- React Router (navegação entre as páginas)
- Styled Components (estilização e componentização)
- Fetch API (requisições pra Fake Store API)
- LocalStorage (armazenamento dos produtos cadastrados)
- Vite (ferramenta de build)

## Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/Tox1469/catalogo-loja-virtual.git
cd catalogo-loja-virtual
```

2. Instale as dependências (precisa ter o Node.js instalado):

```bash
npm install
```

3. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra o navegador no endereço que aparecer no terminal (normalmente `http://localhost:5173`).

## Estrutura do projeto

```
src/
  components/      componentes reutilizaveis (Header, Footer, ProdutoCard, BotaoTopo)
  pages/           paginas da aplicação (Home, Cadastro, Detalhes, Sobre)
  produtosStorage.js   funções de acesso ao LocalStorage
  tema.js          paleta de cores do site (design system)
  App.jsx          componente principal com as rotas
  GlobalStyle.js   estilos globais
  main.jsx         ponto de entrada da aplicação
```
