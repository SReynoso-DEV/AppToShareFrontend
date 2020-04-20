import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';

//const ApiURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;


export class CPublics extends Component {   
    state = {
        cubiculos: [], 
    }

    componentDidMount() {
        axios.get('api/room')
          .then(response => {
            this.setState({ cubiculos: response.data });
          });
    }

    historyPush(features) {
        this.props.history.push({
            pathname: '/Features',
            data: {features: features}
        })  
    }

    render() {
        return (
            <div>
                <Nav />
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Sede</th>
                            <th scope="col">Pabellón</th>
                            <th scope="col">Asientos</th>
                            <th scope="col">Piso</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.cubiculos.map(cubiculo => 
                            <tr key = {cubiculo._id}>
                                <th>{cubiculo.code}</th>
                                <td>{cubiculo.office}</td>
                                <td>{cubiculo.building}</td>
                                <td>{cubiculo.seats}</td>
                                <td>{cubiculo.floor}</td>
                                <td><button onClick={() => this.historyPush(cubiculo.features)}>Recursos</button></td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>

            </div>
        )
    }
}

export default CPublics;
