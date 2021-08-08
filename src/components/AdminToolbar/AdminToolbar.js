import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/context'

import { checkUserIsAdmin } from '../../utils/Utils'

const AdminToolbar = props => {
    const { isLogIn } = useGlobalContext();
    const { currentUser } = isLogIn

    const isAdmin = checkUserIsAdmin(currentUser)
    
    if (!isAdmin) return null;

    return (
        <div className='admin-toolbar'>
            <ul>
                <li>
                    <Link to='/admin'>
                        My admin
                    </Link>
                </li>
            </ul> 
        </div>
    )
}

export default AdminToolbar
