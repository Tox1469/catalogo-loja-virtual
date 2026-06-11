import { createGlobalStyle } from 'styled-components'

// estilos globais da aplicação (reset basico + fonte)
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* box model: padding e borda entram no tamanho total */
  }

  body {
    font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
    background-color: #f4f5f7;
    color: #2d2d2d;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
  }
`

export default GlobalStyle
