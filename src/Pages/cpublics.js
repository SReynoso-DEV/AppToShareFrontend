import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export class CPublics extends Component {   
    state = {
        cubiculos: [], 
    }

    componentDidMount() {
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
            headers:{ "Authorization" : "Bearer " +  sessionStorage.getItem('token')}
          })
          .then(response => {
            this.setState({ cubiculos: response.data });
            console.log(this.state.cubiculos)
            Swal.close()
          });
    }

    historyPush(features) {
        this.props.history.push({
            pathname: '/features',
            data: {features: features}
        })  
    }

    recorriendo(available) {
        let features = ""
        available.features.map(f =>
            features += f + ", "
            )
        features = features.slice(0, -2);
        return features
    }

    render() {
        return (
            <div>
                <Nav />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Codigo</th>
                            <th scope="col">Fecha/Hora Disponible</th>
                            <th scope="col">Sede</th>
                            <th scope="col">Pabellon</th>
                            <th scope="col">Piso</th>
                            <th scope="col">Asientos</th>
                            <th scope="col">Features</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.cubiculos.map(cubiculo => 
                            cubiculo.available.map((av, index) =>
                                <tr key = {cubiculo._id + index}>                                    
                                    <th>{av.code}</th>
                                    <td>{cubiculo.start}</td>
                                    <td>{av.office}</td>
                                    <td>{av.building}</td>
                                    <td>{av.floor}</td>
                                    <td>{av.seats}</td>
                                    <td>{this.recorriendo(av)}</td>
                                    <td><Link to={""}>Reservar</Link></td>                                
                                </tr> 
                                )
                        )}                        
                    </tbody>
                </table>

            </div>
        )
    }
}

export default CPublics;
