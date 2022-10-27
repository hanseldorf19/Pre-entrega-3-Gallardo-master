import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar} from './components/NavBar/NavBar'
import { TopBar } from './components/NavBar/TopNav/TopNav'
import { ProdListContainer } from './components/ProdListContainer/ProdListContainer'
import { useParams } from 'react-router-dom'
import { ProductDetailContainer } from './components/ProductDetailContainer/ProductDetailContainer'
import { EventsDefault } from './components/EventsDefault/EventsDefault'
import { PaginaContexto } from './components/Temas/PaginaContexto/PaginaContexto'
import { CartProvider } from './context/CartContext'
import { CartContainer} from './components/CartContainer/CartContainer'

function App() {
  console.log(useParams());
  return (
  <CartProvider>  
    <BrowserRouter>

      <div className='App'>
        <TopBar/>
          <header className="App-header">
      
            <NavBar/>
              
          </header>
          <Routes>  
                <Route path="/" element={<ProdListContainer/>}/>
                <Route exact path="category/:categoryId" element={<ProdListContainer/>}/>
                <Route path='/item/:id' element={<ProductDetailContainer/>}/>
               
                <Route path='/contacto' element={<EventsDefault/>}/>
                <Route path='/ejemplo/contexto' element={<PaginaContexto/>}/>
                <Route path='/cart' element={<CartContainer/>}/>

              </Routes>
       
          <footer>
            derechos reservados
          </footer>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
