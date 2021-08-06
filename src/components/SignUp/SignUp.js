import React, { useState, useEffect } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from '../../firebase/utils';

import AuthContent from '../AuthContent/AuthContent';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';

const SignUp = () => {
    
    const initialState = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorsAr: []
    };
    
    const [userInfo, setUserInfo] = useState(initialState);

    const handleChange = e => {
        const {name, value} = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = userInfo

        if (password !== confirmPassword) {
            const passwordError = ['Las contraseñas no coinciden']
            setUserInfo({
                ...userInfo,
                errorsAr: passwordError
            })
            return
        }
        
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName });
            setUserInfo(initialState)
            
        } catch (err) {
            console.log(err);
        }

    }
        
    const { displayName, email, password, confirmPassword, errorsAr } = userInfo
    
    const configAuthContent = {
        titulo: 'Registrate'
    }

    return (
        <AuthContent {...configAuthContent} >
            <div className="form-container">

                {errorsAr.length > 0 && (
                        <ul>
                            {errorsAr.map((err, index)=> {
                                return (
                                    <li key={index}>
                                        {err}
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                <form onSubmit={handleFormSubmit}>
                    <FormInput 
                        type='text'
                        name='displayName'
                        value= {displayName}
                        placeholder='Nombre Completo'
                        onChange= {handleChange}
                    />
                    <FormInput 
                        type='text'
                        name='email'
                        value= {email}
                        placeholder='E-mail'
                        onChange= {handleChange}
                    />
                    <FormInput 
                        type='password'
                        name='password'
                        value= {password}
                        placeholder='Contraseña'
                        onChange= {handleChange}
                    />
                    <FormInput 
                        type='password'
                        name='confirmPassword'
                        value= {confirmPassword}
                        placeholder='Confirmar contraseña'
                        onChange= {handleChange}
                    />
                    <Button type='submit'>
                        Registrarse
                    </Button>
                </form>
            </div>
        </AuthContent>

    )
}

export default SignUp
