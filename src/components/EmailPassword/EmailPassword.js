import React, { useState } from 'react';
import './styles.scss';
import { withRouter } from 'react-router-dom'

import AuthContent from '../AuthContent/AuthContent'
import FormInput from '../Forms/FormInput'
import Button from '../Forms/Button'

import { auth } from '../../firebase/utils';

const EmailPassword = (props) => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const handleChange = e => {
        const {name, value} = e.target

        setEmail(value)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const config = {
                //Link para mandar al usuario luego de que resetee su contraseña
                url: 'http://localhost:3000/login'
            }

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    props.history.push('/login')
                    console.log('Contraseña reseteada');
                })
                .catch(() => {
                    const err = ['La casilla de correo electrónico ingresada no es válida. Por favor intenta nuevamente']
                    setErrors(err)
                    console.log('Algo salio mal');
                })

        } catch (err) {
            console.log(err);
        }
    }


    const configAuthContent = {
        titulo:'Email Password'
    }

    return (
        <AuthContent {...configAuthContent}>
            <div className="form-container">
                {errors.length > 0 && 
                    <ul>
                        {errors.map((err, index) => {
                            return(
                                <li key={index}>
                                    {err}
                                </li>
                            )
                        })}
                    </ul>
                }
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        type='email'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={handleChange}
                    />

                    <Button type='submit'>
                        Contraseña de e-mail
                    </Button>

                </form>
            </div>
            
        </AuthContent>
    )
}

export default withRouter(EmailPassword);
