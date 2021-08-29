import React, { useState, useEffect } from 'react';
import './styles.scss';

import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, resetAllAuthForms } from '../../redux/User/user.actions';

import { useHistory } from 'react-router-dom';
import AuthContent from '../AuthContent/AuthContent';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';

const mapState = ({ user }) => ({
    signUpSeccess: user.signUpSeccess,
    signUpError: user.signUpError
})

const SignUp = () => {
    const { signUpSeccess, signUpError } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

    const initialState = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    
    const [userInfo, setUserInfo] = useState(initialState);
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (signUpSeccess) {
            setUserInfo(initialState);
            setErrors([])
            dispatch(resetAllAuthForms());
            history.push('/');
        }
    }, [signUpSeccess])

    useEffect(() => {
        if(Array.isArray(signUpError) && signUpError.length > 0) {
            setErrors(signUpError)
        }

    }, [signUpError])

    const handleChange = e => {
        const {name, value} = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = userInfo

        dispatch(signUpUser({
            displayName,
            email,
            password,
            confirmPassword
        }));

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
