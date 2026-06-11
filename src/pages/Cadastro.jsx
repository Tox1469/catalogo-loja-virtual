import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tema from '../tema.js'
import { salvarProdutoLocal } from '../produtosStorage.js'

const Conteudo = styled.main`
  max-width: 640px;
  margin: 0 auto;
  padding: 24px;
`

const Titulo = styled.h2`
  color: ${tema.cores.primaria};
  margin-bottom: 6px;
`

const Subtitulo = styled.p`
  color: #666;
  margin-bottom: 24px;
  font-size: 0.95rem;
`

const Formulario = styled.form`
  background-color: #fff;
  border: 1px solid ${tema.cores.borda};
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Campo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-weight: 600;
    font-size: 0.9rem;
    color: ${tema.cores.primaria};
  }

  input,
  select,
  textarea {
    padding: 10px 12px;
    border: 1px solid
      ${(props) => (props.$temErro ? tema.cores.erro : tema.cores.bordaInput)};
    border-radius: 6px;
    font-size: 0.95rem;
    font-family: inherit;
  }

  textarea {
    resize: vertical;
    min-height: 90px;
  }
`

const MensagemErro = styled.span`
  color: ${tema.cores.erro};
  font-size: 0.8rem;
`

const BotaoSalvar = styled.button`
  background-color: ${tema.cores.verde};
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background-color: ${tema.cores.verdeHover};
  }
`

const MensagemSucesso = styled.p`
  background-color: ${tema.cores.sucessoFundo};
  border: 1px solid ${tema.cores.verde};
  color: ${tema.cores.verde};
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 16px;
`

// pagina de cadastro com validacao feita na mao em javascript puro
function Cadastro() {
  const navigate = useNavigate()
  const [sucesso, setSucesso] = useState(false)
  const [erros, setErros] = useState({})

  // valida os campos e devolve um objeto com os erros que achou
  function validarFormulario(dados) {
    const novosErros = {}

    if (dados.title.trim().length < 3) {
      novosErros.title = 'O nome precisa ter pelo menos 3 caracteres.'
    }

    const preco = parseFloat(dados.price)
    if (dados.price === '' || isNaN(preco) || preco <= 0) {
      novosErros.price = 'Informe um preço válido maior que zero.'
    }

    if (dados.category === '') {
      novosErros.category = 'Selecione uma categoria.'
    }

    if (dados.description.trim().length < 10) {
      novosErros.description = 'A descrição precisa ter pelo menos 10 caracteres.'
    }

    // validacao simples do link da imagem
    if (!dados.image.startsWith('http')) {
      novosErros.image = 'Informe um link válido começando com http ou https.'
    }

    return novosErros
  }

  // listener do evento de submit do formulario
  function aoEnviar(evento) {
    evento.preventDefault() // impede a pagina de recarregar sozinha

    // pega os valores direto dos inputs pelo name deles
    const form = evento.target
    const dados = {
      title: form.nome.value,
      price: form.preco.value,
      category: form.categoria.value,
      description: form.descricao.value,
      image: form.imagem.value,
    }

    const novosErros = validarFormulario(dados)
    setErros(novosErros)

    // so salva se nao tiver nenhum erro
    if (Object.keys(novosErros).length === 0) {
      dados.price = parseFloat(dados.price)
      salvarProdutoLocal(dados)
      setSucesso(true)
      form.reset()

      // espera 1,5s e volta pro catalogo pra mostrar o produto novo
      setTimeout(() => {
        navigate('/')
      }, 1500)
    }
  }

  return (
    <Conteudo>
      <Titulo>Cadastrar Produto</Titulo>
      <Subtitulo>
        Preencha os dados abaixo. O produto será salvo no navegador
        (LocalStorage) e aparecerá no catálogo.
      </Subtitulo>

      {sucesso && (
        <MensagemSucesso>
          Produto cadastrado com sucesso! Redirecionando para o catálogo...
        </MensagemSucesso>
      )}

      <Formulario onSubmit={aoEnviar} noValidate>
        <Campo $temErro={!!erros.title}>
          <label htmlFor="nome">Nome do produto</label>
          <input id="nome" name="nome" type="text" placeholder="Ex: Fone de ouvido bluetooth" />
          {erros.title && <MensagemErro>{erros.title}</MensagemErro>}
        </Campo>

        <Campo $temErro={!!erros.price}>
          <label htmlFor="preco">Preço (R$)</label>
          <input id="preco" name="preco" type="number" step="0.01" placeholder="Ex: 67.90" />
          {erros.price && <MensagemErro>{erros.price}</MensagemErro>}
        </Campo>

        <Campo $temErro={!!erros.category}>
          <label htmlFor="categoria">Categoria</label>
          <select id="categoria" name="categoria" defaultValue="">
            <option value="" disabled>
              Selecione...
            </option>
            <option value="eletrônicos">Eletrônicos</option>
            <option value="roupas">Roupas</option>
            <option value="acessórios">Acessórios</option>
            <option value="casa e decoração">Casa e Decoração</option>
            <option value="outros">Outros</option>
          </select>
          {erros.category && <MensagemErro>{erros.category}</MensagemErro>}
        </Campo>

        <Campo $temErro={!!erros.description}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            placeholder="Descreva o produto, suas características, cores, etc."
          />
          {erros.description && <MensagemErro>{erros.description}</MensagemErro>}
        </Campo>

        <Campo $temErro={!!erros.image}>
          <label htmlFor="imagem">Link da imagem</label>
          <input id="imagem" name="imagem" type="text" placeholder="https://..." />
          {erros.image && <MensagemErro>{erros.image}</MensagemErro>}
        </Campo>

        <BotaoSalvar type="submit">Salvar produto</BotaoSalvar>
      </Formulario>
    </Conteudo>
  )
}

export default Cadastro
