import { useEffect, useState } from "react";
import Header from "../../components/header";
import { useParams } from "react-router-dom";
import { Tab, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import moment from "moment";

function Payments() {
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    const [payment, setPayment] = useState({
        employe_id: id,
    });

    const getPayments = async () => {
        axios.get(`http://localhost:3033/api/payments/${id}`)
        .then(response => {
            setPayments(response.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        });
    }

    const createPayment = async () => {
        axios.post('http://localhost:3033/api/payments', payment)
        .then(response => {
            console.log(response.data);
            getPayments();
            setPayment({
                employe_id: id,
                concept: '',
                value: ''
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    const deletePayment = async (id) => {
        axios.delete(`http://localhost:3033/api/payments/${id}`)
        .then(response => {
            console.log(response.data);
            getPayments();
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getPayments();
    }, []);


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
                <h1>Pagos del empleado</h1>
            </div>
            <div>
                <h3 style={{marginLeft: 50}}>Registrar Pago</h3>
                <div style={{marginLeft: 50, background: '#eaebec', padding: 10, borderRadius: 25, width: 400}}>
                    <div>
                        <label htmlFor="concept">Concepto</label>
                        <input className="employeInput" type="text" name="concept" id="concept" value={payment.concept} placeholder="nomina, bonificaciones" onChange={(ev) => setPayment({...payment, concept: ev.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="value">Valor</label>
                        <input className="employeInput" type="number" name="value" id="value" value={payment.value} onChange={(ev) => setPayment({...payment, value: ev.target.value})} />
                    </div>
                    <div>
                        <button style={{ cursor: 'pointer', marginRight: 5, height: 35, width: 90, borderRadius: 25, border: 'none'}} onClick={() => createPayment()}>Registrar</button>
                    </div>
                </div>
            </div>
            <div style={{ padding: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Concepto</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.concept}</TableCell>
                                <TableCell>{payment.value}</TableCell>
                                <TableCell>{moment(payment.created_at).format('MM/DD/YYYY')}</TableCell>
                                <TableCell>
                                    <button onClick={() => deletePayment(payment.id)} style={{cursor: 'pointer'}}>Eliminar</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </div>
    );
}

export default Payments;