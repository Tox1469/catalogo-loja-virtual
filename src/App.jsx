import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BotaoTopo from './components/BotaoTopo.jsx'
import Home from './pages/Home.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Detalhes from './pages/Detalhes.jsx'
import Sobre from './pages/Sobre.jsx'

// componente principal, aqui ficam as rotas da aplicacao
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produto/:id" element={<Detalhes />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
      <Footer />
      <BotaoTopo />
    </BrowserRouter>
  )
}

export default App
