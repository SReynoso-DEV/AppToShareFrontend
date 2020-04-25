import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

/*

*/

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/home" className="navbar-brand" >Cubiculos Pool</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse show" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/profile" className="nav-link">Mi Perfil<span class="sr-only">(current)</span></Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/cpublics" className="nav-link">Cubiculos Publicos</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/" className="nav-link">LogOut</Link>
                    </li>
                </ul>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}

export default Nav;