import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

function Navbar() {
    const setLogout = () => {
        Cookies.remove('token');
        window.location.replace('/');
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src='/logo.jpg' style={{ height: '30px' }} className='img-fluid' />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={"/categories"}>
                                    Categories
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/products'}>
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/users'}>
                                    Users
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/bills'}>
                                    Bills
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={(e) => setLogout()} to={'/#'}>
                                    Log out
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar