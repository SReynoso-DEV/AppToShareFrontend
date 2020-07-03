import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    const {
      active
    } = props;

    function clearLocalStorage(){
        localStorage.clear();
    }
  
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/home" className="navbar-brand" >Cubiculos Pool</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse show" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    
                    <li className= {"nav-item "+(active === "profile"?"active ": "" )}>
                        <Link to="/profile" className="nav-link">Mi Perfil</Link>
                    </li>
                    <li className= {"nav-item "+(active === "cpublics"?"active ": "" )}>
                        <Link to="/cpublics" className="nav-link">Cubiculos Disponibles</Link>
                    </li>
                    <li className= {"nav-item "+(active === "myreservations"?"active ": "" )}>
                        <Link to="/myreservations" className="nav-link">Mis Reservas</Link>
                    </li>
                    <li className= {"nav-item "+(active === "shared"?"active ": "")}>
                        <Link to="/shared" className="nav-link">Cubiculos Compartidos</Link>
                    </li>
                    <li onClick={() => clearLocalStorage()} className="nav-item">
                        <Link to="/" className="nav-link">LogOut</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;