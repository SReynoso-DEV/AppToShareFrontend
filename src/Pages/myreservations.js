import React from 'react';
import Nav from './Nav';

function MyReservations() {

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
                </tbody>
            </table>
            
        </div>
    )
}

export default MyReservations;