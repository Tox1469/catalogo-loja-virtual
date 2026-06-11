import { createGlobalStyle } from 'styled-components'
import tema from './tema.js'

// estilos globais (reset basico + fonte padrao)
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* box model: padding e borda entram no tamanho total */
  }

  body {
    font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
    background-color: ${tema.cores.fundo};
    color: ${tema.cores.texto};
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
