import { Tab, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/header'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

function Home () {
    const navigate = useNavigate()
    const [employess, setEmployess] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3033/api/employes')
            .then(response => {
                setEmployess(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])


    return (
        <div>
            <Header />
            <div style={{padding: 10, margin: 20, background: '', height: '80vh', borderRadius: '25px'}}>
                <Table style={{ background: ''}}>
                    <TableHead style={{background: '#cecfd0'}}>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Fecha de ingreso</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>documento</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && <TableRow><TableCell colSpan={5}>Cargando...</TableCell></TableRow>}
                        {employess.map((employe) => (
                            <TableRow key={employe.id}>
                                <TableCell>{employe.name}</TableCell>
                                <TableCell>{employe.address}</TableCell>
                                <TableCell>{moment(employe.init_date).format('MM/DD/YYYY')}</TableCell>
                                <TableCell>{employe.status_name}</TableCell>
                                <TableCell>{employe.document}</TableCell>
                                <TableCell>
                                    <button onClick={() => navigate(`/employe/${employe.id}`)} style={{ cursor: 'pointer', marginRight: 5, height: 35, width: 90, borderRadius: 25, border: 'none'}}>editar</button>
                                    <button onClick={() => navigate(`/payments/${employe.id}`)} style={{ cursor: 'pointer', marginRight: 5, height: 35, width: 90, borderRadius: 25, border: 'none'}}>pagos</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Home