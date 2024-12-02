import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Employe from './pages/employe/employe'
import CreateEmploye from './pages/createEmploye/createEmploye'
import Payments from './pages/payments/Payments'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employe/:id" element={<Employe />} /> 
      <Route path='/crearEmpleado' element={<CreateEmploye />} />
      <Route path='/payments/:id' element={<Payments />} />
    </Routes>
  )
}

export default App
