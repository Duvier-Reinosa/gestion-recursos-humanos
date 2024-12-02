import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgb(222 222 222)', height: 50, padding: 10}}>
      <h1 style={{ color: '#483285'}}>Recursos Humanos</h1>
      <div style={{ display: 'flex'}}>
        <h1 style={{fontWeight: '600', fontSize: 12, margin: 0, color: '#fff', cursor:'pointer', background: '#0d78bc', padding: 5, borderRadius: 25}} onClick={ ()=> navigate('/')}>Empleados</h1>
        <h1 style={{fontWeight: '600', fontSize: 12, margin: 0, color: '#fff', cursor:'pointer', background: '#0d78bc', padding: 5, borderRadius: 25, marginLeft: 10}} onClick={ ()=> navigate('/crearEmpleado')}>Crear empleado</h1>
      </div>
    </header>
  );
}

export default Header;