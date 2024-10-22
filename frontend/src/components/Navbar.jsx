import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const Navbar = ({ isLoggedIn, setLoggedInAndUpdateUserData, user }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie = 'authToken=; Max-Age=0';
        setLoggedInAndUpdateUserData();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Blog App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text me-3 align-items-center d-flex">Hello, {user.name}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link me-3 align-items-center d-flex" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
