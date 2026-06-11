import { useState, useEffect } from 'react'
import styled from 'styled-components'
import tema from '../tema.js'

const Botao = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 50%;
  background-color: ${tema.cores.destaque};
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
  z-index: 20;

  &:hover {
    background-color: ${tema.cores.destaqueHover};
  }
`

// botao que aparece quando rola a pagina pra baixo
// aqui usamos addEventListener direto no window pra escutar o scroll
function BotaoTopo() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    function aoRolar() {
      // so mostra o botao depois de rolar 300px
      setVisivel(window.scrollY > 300)
    }

    window.addEventListener('scroll', aoRolar)

    // remove o listener quando o componente sai da tela (cleanup)
    return () => {
      window.removeEventListener('scroll', aoRolar)
    }
  }, [])

  if (!visivel) {
    return null
  }

  function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Botao onClick={voltarAoTopo} title="Voltar ao topo">
      ↑
    </Botao>
  )
}

export default BotaoTopo
