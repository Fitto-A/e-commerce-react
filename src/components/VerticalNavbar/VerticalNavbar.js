import React from 'react'
import './styles.scss'

import { useGlobalContext } from '../context/context'

const VerticalNavbar = ({ children }) => {
    const { isLogIn } = useGlobalContext();
    const { currentUser } = isLogIn

    return (
        <div className='vertical-nav'>
            <div className="user-info">
                <ul>
                    <li>
                        <span>
                            { currentUser.displayName && currentUser.displayName }
                        </span>
                    </li>
                </ul>
            </div>
            <div className="menu">
                {children}
            </div>
        </div>
    )
}

export default VerticalNavbar
