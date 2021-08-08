import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Header/Navbar'
import VerticalNavbar from '../components/VerticalNavbar/VerticalNavbar'
import Footer from '../components/Footer/Footer'


const AdminLayout = props => {


    return (
        <div className='admin-layout'>
            <Navbar />
                <div className="control-panel">
                    <div className="sidebar">
                        <VerticalNavbar>
                            <ul>
                                <li>
                                    <Link to='/admin'>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <span className='sing-out'>
                                        Sing Out
                                    </span>
                                </li>
                            </ul>
                        </VerticalNavbar>
                    </div>
                    <div className="container">
                        {props.children}
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default AdminLayout
