import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Cabecalho = styled.header`
  background-color: #1e2a4a;
  color: #fff;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`

const Logo = styled.h1`
  font-size: 1.4rem;

  span {
    color: #f5a623;
  }
`

const Menu = styled.nav`
  display: flex;
  gap: 8px;

  a {
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 0.95rem;
    transition: background-color 0.2s;
  }

  a:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  /* classe que o NavLink adiciona sozinho na rota ativa */
  a.active {
    background-color: #f5a623;
    color: #1e2a4a;
    font-weight: bold;
  }

  /* em telas pequenas o menu ocupa a linha inteira */
  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`

// cabeçalho fixo com o menu de navegação entre as páginas
function Header() {
  return (
    <Cabecalho>
      <Logo>
        Mix<span>Store</span>
      </Logo>
      <Menu>
        <NavLink to="/">Catálogo</NavLink>
        <NavLink to="/cadastro">Cadastrar Produto</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
      </Menu>
    </Cabecalho>
  )
}

export default Header
