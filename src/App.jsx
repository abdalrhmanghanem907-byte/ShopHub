
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar"
function App() {
  

  return (
    
    <div className='app'>
       <Navbar/>
      <Routes>
          
        <Route path='/' element={<Home/>}/>
        <Route path='Auth' element={<Auth/>}/>
        <Route path='Checkout'element={<Checkout/>}/>
      </Routes>
    </div>
  )
}

export default App
