import React from 'react'
import './styles.scss';
import { Link } from 'react-router-dom';

import Logo from './../../assets/Logo.png';

const Navbar = () => {
    return (
        <header className='header'>
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        <img src={Logo} alt="API Logo" />
                    </Link>
                </div>
                <div className='navbarLinks'>
                    <ul>
                        <li>
                            <Link to='/registration'>
                                Registrate
                            </Link>

                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar;
