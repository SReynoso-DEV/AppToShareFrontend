import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalExample2 from './activated'

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
                    {cubiculos.map(cubiculo =>
                    <tr>
                                <th>{cubiculo.room.code}</th>
                                <td>{cubiculo.userCode}</td>
                                <td>{cubiculo.start}</td>
                                <td>{cubiculo.room.office}</td>                                
                                <td>{cubiculo.room.seats}</td>
                                <td>{recorriendo(cubiculo.room)}</td>
                                <td><ModalExample2
                                    buttonLabel="Activar"
                                    className="button"
                                    object = {{"office": cubiculo.room.office, "code": cubiculo.room.code, "start": cubiculo.start,"id":cubiculo._id}}
                                /></td>    
                        </tr>                            
                            
                        )}
                </tbody>
            </table>            
        </div>
    )
    
}

export default Activation;
