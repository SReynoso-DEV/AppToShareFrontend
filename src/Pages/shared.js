import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Button } from 'reactstrap';
import RoomDetail from './roomDetail'
import JoinRoom from './joinRoom'
import * as moment from 'moment-timezone'
import 'moment/locale/es';


function Shared() {
    

    const [reservations, setReservations] = useState([]);
    useEffect(() =>  {
        if (localStorage.length === 0)
        window.location.href = "/"
        

        Swal.fire({
            title: 'Cargando tus reservas',
            text: 'Espera estamos buscando las reservas que realizaste',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            onOpen: () => {
                Swal.showLoading()
            }
        })
        Axios.get('api/reservation/public', {
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
        })
            .then(response => {
                //console.log(localStorage.getItem('token'));
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
                  html: `Sede: ${response.data.room.office}<br/>Codigo: ${response.data.room.code}<br/>Asientos: ${response.data.room.seats}<br/>Inicio: ${response.data.startOriginal}<br/>
                        Fin: ${response.data.end}<br/>Creador: ${response.data.userCode}<br/>Activador: ${response.data.userSecondaryCode}`,
                  showConfirmButton: true
              }).then(function (result){
                if (result.value){ 
                  window.location.reload(false);
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


    function activar(id) {
        Swal.fire({
            title: 'Estas seguro de activar tu reserva?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, activalo!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Activando Reserva',
                    text: 'Un momento por favor ...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    onOpen: () => {
                        Swal.showLoading()
                    }
                })
                Axios.put('api/reservation/'+ id, {
                  headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
              })
              .then(response => {
                Swal.close()
                console.log(response.data);
                Swal.fire({
                  icon: 'success',
                  title: 'Cubiculo activado correctamente',
                  html: `Recuerda que tanto la persona que reservo el cubiculo, como el usuario secondario, ambos deben activarlo.</br>Para poder usarlo.`,
                  showConfirmButton: true
              }).then(function (result){
                if (result.value){ 
                  window.location.reload(false);
                }
            })
            })
            .catch(error => {
                Swal.hideLoading()
                console.log(error.response)
                Swal.fire({
                    icon: 'error',
                    title: 'Error :(',
                    html: `${error.response.data.description.message}`,
                    showConfirmButton: true
                })
            })
            }
          })
    }

    return (
        
        <div>
            <Nav active="shared"/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Codigo</th>
                        <th scope="col">Fecha/Hora Inicio</th>
                        <th scope="col">Fecha/Hora Fin</th>
                        <th scope="col">Sede</th>
                        <th scope="col">Asientos</th>                      
                        <th scope="col">Topic</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reserva =>
                    <tr key = {reserva._id}>
                        <td>{reserva.room.code}</td>
                        <td>{moment(reserva.start).tz('America/Lima').format('LLLL')}</td>
                        <td>{moment(reserva.start).tz('America/Lima').format('LLLL')}</td>
                        <td>{reserva.room.office}</td>
                        <td>{reserva.room.seats}</td>
                        <td>{reserva.theme}</td>
                        <td>{reserva.active === true ? "Activado" : "Por Activar"}</td>
                        <td>{reserva.active === false ? 
                            <div>
                                <Button color="danger" onClick={() => activar(reserva._id)} >Activar</Button>&nbsp; 
                                <Button color="danger" onClick={() => eliminar(reserva._id)}>Eliminar</Button>
                            </div>:
                            <div>
                            <JoinRoom
                            buttonLabel="Ingresar"
                                    className="button"
                                    object = {{"data":reserva}}
                            />
                            <RoomDetail
                                    buttonLabel="Detalle"
                                    className="button"
                                    object = {{"data":reserva}}
                                />
                            </div>
                                
                                
                                }
                        </td>
                    </tr>
                    )}              
                </tbody>
            </table>            
        </div>
    )
}

export default Shared;