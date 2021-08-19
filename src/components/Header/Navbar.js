import React from 'react'
import './styles.scss';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utils';
import Logo from './../../assets/Logo.png';
import { useGlobalContext } from '../context/context'; 

const Navbar = () => {
    const { isLogIn } = useGlobalContext();
    
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
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/tienda'>
                                Tienda
                            </Link>
                        </li>
                        {!isLogIn.currentUser && (
                            <ul>
                                <li>
                                    <Link to='/registration'>
                                        Registrate
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/login'>
                                        Login
                                    </Link>
                                </li>
                            </ul>
                         )}
                        <li>
                            {isLogIn.currentUser && (
                                <ul>
                                    <li>
                                        <Link to='/micuenta'>
                                            Mi cuenta
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={() => auth.signOut()}>
                                            LogOut
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar;
