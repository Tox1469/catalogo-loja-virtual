import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { salvarProdutoLocal } from '../produtosStorage.js'

const Conteudo = styled.main`
  max-width: 640px;
  margin: 0 auto;
  padding: 24px;
`

const Titulo = styled.h2`
  color: #1e2a4a;
  margin-bottom: 6px;
`

const Subtitulo = styled.p`
  color: #666;
  margin-bottom: 24px;
  font-size: 0.95rem;
`

const Formulario = styled.form`
  background-color: #fff;
  border: 1px solid #e3e6ec;
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
    color: #1e2a4a;
  }

  input,
  select,
  textarea {
    padding: 10px 12px;
    border: 1px solid ${(props) => (props.$temErro ? '#d64545' : '#ccd2dd')};
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
  color: #d64545;
  font-size: 0.8rem;
`

const BotaoSalvar = styled.button`
  background-color: #1e7f4f;
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background-color: #25995f;
  }
`

const MensagemSucesso = styled.p`
  background-color: #e3f5eb;
  border: 1px solid #1e7f4f;
  color: #1e7f4f;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 16px;
`

// página de cadastro de produto com validação feita em JavaScript puro
function Cadastro() {
  const navigate = useNavigate()
  const [sucesso, setSucesso] = useState(false)
  const [erros, setErros] = useState({})

  // valida os campos do formulário e devolve um objeto com os erros encontrados
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

    // validação simples de URL da imagem
    if (!dados.image.startsWith('http')) {
      novosErros.image = 'Informe um link válido começando com http ou https.'
    }

    return novosErros
  }

  // listener do evento de submit do formulário
  function aoEnviar(evento) {
    evento.preventDefault() // impede o recarregamento padrão da página

    // pega os valores direto dos campos usando o FormData (JS puro)
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

    // só salva se não tiver nenhum erro
    if (Object.keys(novosErros).length === 0) {
      dados.price = parseFloat(dados.price)
      salvarProdutoLocal(dados)
      setSucesso(true)
      form.reset()

      // depois de 1,5s volta pro catálogo pra mostrar o produto novo
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
          <input id="preco" name="preco" type="number" step="0.01" placeholder="Ex: 149.90" />
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
