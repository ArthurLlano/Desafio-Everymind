import './App.css';
import Produto from './components/Home'
import Cadastros from './components/Cadastros';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Nunes Esporte</h1>
      <BrowserRouter>
      <Nav variant="tabs">
       <Nav.Link as={Link} to="/">Home</Nav.Link>
       <Nav.Link as={Link} to="/Cadastro">Produtos</Nav.Link>
      </Nav>
      <Routes>
        <Route path="/" index element={<Produto/>}></Route> 
        <Route path="/Cadastro" element={<Cadastros/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
