import styled from 'styled-components'

const Rodape = styled.footer`
  background-color: #1e2a4a;
  color: #cfd6e4;
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
