import React from 'react';
import './styles.scss'

const AuthContent = ({ titulo, children }) => {
    return (
        <div className='auth-container'>
            <div className="content">
                { titulo && <h2>{titulo}</h2> }

                <div className="children">
                    { children && children }
                </div>
            </div>
        </div>
    )
}

export default AuthContent 
