import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Button } from 'reactstrap';

function MyReservations() {
    
    const [reservations, setReservations] = useState([]);
    useEffect(() =>  {
        if (localStorage.length === 0)
        window.location.href = "/"
        

        Swal.fire({
            title: 'Cargando tus reservas',
            text: 'Espera estamos buscando que las reservas que realizaste',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            onOpen: () => {
                Swal.showLoading()
            }
        })
        Axios.get('api/reservation', {
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response.data);
                setReservations(response.data);
                Swal.close()
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function eliminar(id) {
        Swal.fire({
            title: 'Estas seguro de eliminar tu reserva?',
            text: "Este acción no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Eliminando Reserva',
                    text: 'Un momento por favor ...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    onOpen: () => {
                        Swal.showLoading()
                    }
                })
                Axios.delete('api/reservation/'+ id, {
                  headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
              })
              .then(response => {
                Swal.close()
                console.log(response.data);
                Swal.fire({
                  icon: 'success',
                  title: 'Reserva Eliminada Satisfactoriamente',
                  html: `Sede: ${response.data.room.office}<br/>Codigo: ${response.data.room.code}<br/>Asientos: ${response.data.room.seats}<br/>Inicio: ${response.data.start}<br/>
                        Fin: ${response.data.end}<br/>Creador: ${response.data.userCode}<br/>Activador: ${response.data.userSecondaryCode}`,
                  showConfirmButton: true
              }).then(function (result){
                if (result.value){ 
                  window.location.href = "/myreservations"
                }
            })
            })
            .catch(error => {
                Swal.hideLoading()
                console.log(error.response)
                Swal.fire({
                    icon: 'error',
                    title: 'Error :(',
                    html: `${error.response}`,
                    showConfirmButton: true
                })
            })
            }
          })
    }

    return (
        <div>
            <Nav active="myreservations"/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Codigo</th>
                        <th scope="col">Fecha/Hora Inicio</th>
                        <th scope="col">Fecha/Hora Fin</th>
                        <th scope="col">Sede</th>
                        <th scope="col">Asientos</th>                      
                        <th scope="col">Usuario Activador</th>
                        <th scope="col">Activado</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reserva =>
                    <tr key = {reserva._id}>
                        <td>{reserva.room.code}</td>
                        <td>{reserva.start}</td>
                        <td>{reserva.end}</td>
                        <td>{reserva.room.office}</td>
                        <td>{reserva.room.seats}</td>
                        <td>{reserva.userSecondaryCode}</td>
                        <td>{reserva.active === true ? "Activado" : "Por Activar"}</td>
                        <td><Button color="danger" onClick={() => eliminar(reserva._id)}>Eliminar</Button></td>
                    </tr>
                    )}              
                </tbody>
            </table>            
        </div>
    )
}

export default MyReservations;