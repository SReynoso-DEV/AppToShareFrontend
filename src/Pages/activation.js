import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'reactstrap';
import Axios from 'axios';

function Activation () {

    const [cubiculos, actCubiculos] = useState([]);
    useEffect(() =>  {  
        if (localStorage.length === 0)
            window.location.href = "/"
        

        Swal.fire({
            title: 'Cargando cubiculos',
            text: 'Espera estamos buscando que cubiculos puedes activar.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            onOpen: () => {
                Swal.showLoading()
            }
        })
        axios.get('api/reservation/secondary', {
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response.data);
                actCubiculos(response.data);
                Swal.close()
            });



    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function recorriendo(room) {
        let features = ""
        room.features.map(f =>
            features += f + ", "
        )
        features = features.slice(0, -2);
        return features
    }

    function eliminar(id){
        Swal.fire({
            title: 'Desea activar el cubiculo?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, activalo!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Activando Cubiculo',
                    text: 'Un momento por favor ...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    onOpen: () => {
                        Swal.showLoading()
                    }
                })
                Axios.put('api/reservation/'+ id, {}, {
                  headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
              })
              .then(response => {
                Swal.close()
                console.log(response.data);
                Swal.fire({
                  icon: 'success',
                  title: 'Cubiculo Activado Satisfactoriamente',
                  html: `Sede: ${response.data.room.office}<br/>Codigo: ${response.data.room.code}<br/>Asientos: ${response.data.room.seats}<br/>Inicio: ${response.data.start}<br/>
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
    
    return (
        <div>
            <Nav active="activation"/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Codigo</th>
                        <th scope="col">Reservado por</th>
                        <th scope="col">Fecha/Hora Disponible</th>
                        <th scope="col">Sede</th>                        
                        <th scope="col">Asientos</th>
                        <th scope="col">Recursos</th>

                    </tr>
                </thead>
                <tbody>
                    {cubiculos.map((cubiculo, index) =>
                    <tr key={cubiculo._id + index}>
                                <th>{cubiculo.room.code}</th>
                                <td>{cubiculo.userCode}</td>
                                <td>{cubiculo.start}</td>
                                <td>{cubiculo.room.office}</td>                                
                                <td>{cubiculo.room.seats}</td>
                                <td>{recorriendo(cubiculo.room)}</td>
                                <td><Button color="danger" onClick={() => eliminar(cubiculo._id)}>Activar</Button></td>   
                        </tr>                            
                            
                        )}
                </tbody>
            </table>            
        </div>
    )
    
}

export default Activation;
