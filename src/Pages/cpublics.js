import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalExample from './reservation'

function CPublics () {
    // state = {
    //     cubiculos: [],
    // }

    const [cubiculos, setCubiculos] = useState([]);
    useEffect(() =>  {
        Swal.fire({
            title: 'Cargando cubiculos',
            text: 'Espera estamos buscando que cubiculos estan disponibles.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            onOpen: () => {
                Swal.showLoading()
            }
        })
        axios.get('api/available', {
            headers: { "Authorization": "Bearer " + sessionStorage.getItem('token') }
        })
            .then(response => {
                console.log(response.data);
                setCubiculos(response.data);
                Swal.close()
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function recorriendo(available) {
        let features = ""
        available.features.map(f =>
            features += f + ", "
        )
        features = features.slice(0, -2);
        return features
    }

    return (
        <div>
            <Nav />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Codigo</th>
                        <th scope="col">Fecha/Hora Disponible</th>
                        <th scope="col">Sede</th>                        
                        <th scope="col">Asientos</th>
                        <th scope="col">Recursos</th>

                    </tr>
                </thead>
                <tbody>
                    {cubiculos.map(cubiculo =>
                        cubiculo.available.map((av, index) =>
                            <tr key={cubiculo._id + index}>
                                <th>{av.code}</th>
                                <td>{cubiculo.start}</td>
                                <td>{av.office}</td>                                
                                <td>{av.seats}</td>
                                <td>{recorriendo(av)}</td>
                                <td><ModalExample
                                    buttonLabel="Reservar"
                                    className="button"
                                    object = {{"office": av.office, "code": av.code, "start": cubiculo.start}}
                                /></td>                                
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            
        </div>
    )
}

export default CPublics;
