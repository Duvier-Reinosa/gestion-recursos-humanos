import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import EmployeFiles from "../../components/employeFiles";


function Employe() {
    const {id} = useParams();

    const [employe, setEmploye] = useState({});
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState([])

    console.log(employe);

    useEffect(() => {
        axios.get(`http://localhost:3033/api/employes/${id}`)
            .then(response => {
               setEmploye(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
        
        axios.get('http://localhost:3033/api/employe_status')
            .then(response => {
                setStatus(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [id]);

    if (loading) {
        return (
            <div>
                <Header />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                    <h1>Cargando...</h1>
                </div>
            </div>
        );
    }

    return (
      <div>
          <Header />
          <div style={{ marginLeft: '10px'}}>
              <h1>Empleado</h1>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', width: '50%', marginLeft: '20px'}}>
            <input className="employeInput" value={employe.name} type="text" placeholder="Nombre" onChange={ev => setEmploye({...employe, name: ev.target.value})} />
            <input className="employeInput" value={employe.address} type="text" placeholder="Dirección" onChange={ev => setEmploye({...employe, address: ev.target.value})} />
            <input className="employeInput" value={employe.init_date} type="date" placeholder="Fecha de ingreso" onChange={ev => setEmploye({...employe, init_date: ev.target.value})} />
            <input className="employeInput" value={employe.phone_number} type="text" placeholder="Teléfono" onChange={ev => setEmploye({...employe, phone_number: ev.target.value})} />
            <input className="employeInput" value={employe.email} type="text" placeholder="Correo" onChange={ev => setEmploye({...employe, email: ev.target.value})} />
            <select className="employeInput" value={employe.employe_status_id} onChange={ev => setEmploye({...employe, employe_status_id: ev.target.value})}>
                <option value="">Seleccione un estado</option>
                {status.map((status) => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                ))}
            </select>
            <input className="employeInput" value={employe.document} type="text" placeholder="Documento" onChange={ev => setEmploye({...employe, document: ev.target.value})} />
            <button
                style={{ width: 100, marginLeft: 10, height: 40, background: '#0d78bc', border: 'none', color: 'white', cursor: 'pointer', borderRadius: 25}}
            onClick={() => {
                axios.put(`http://localhost:3033/api/employes/${id}`, employe)
                    .then(response => {
                        console.log(response);
                        alert('Empleado actualizado');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }}>Actualizar</button>
          </div>
          <EmployeFiles />
      </div>
    );
}

export default Employe;