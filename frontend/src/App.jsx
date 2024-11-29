import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Employe from './pages/employe/employe'
import CreateEmploye from './pages/createEmploye/createEmploye'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employe/:id" element={<Employe />} /> 
      <Route path='/crearEmpleado' element={<CreateEmploye />} />
    </Routes>
  )
}

export default App
