import styled from 'styled-components'
import tema from '../tema.js'

const Rodape = styled.footer`
  background-color: ${tema.cores.primaria};
  color: ${tema.cores.textoClaro};
  text-align: center;
  padding: 20px;
  margin-top: 40px;
  font-size: 0.85rem;

  p + p {
    margin-top: 4px;
  }
`

function Footer() {
  return (
    <Rodape>
      <p>MixStore - Catálogo de Produtos para Loja Virtual</p>
      <p>Trabalho de Front-End | Luis Boratto e Igor Pallisser</p>
    </Rodape>
  )
}

export default Footer
