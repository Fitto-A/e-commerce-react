import React, { useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

import AuthContent from '../AuthContent/AuthContent';
import Button from '../Forms/Button';
import FormInput from '../Forms/FormInput';

import { auth, signInWithGoogle } from './../../firebase/utils';

const SignIn = () => {

    const initialState = {
        email: '',
        password: ''
    }
    const [signInValues, setSignInValues] = useState(initialState)

    const handleChange = e => {
        const {name, value} = e.target
        setSignInValues({ ...signInValues, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = signInValues

        try {

            await auth.signInWithEmailAndPassword(email, password)
            setSignInValues(initialState)
            
        } catch (err) {
            console.log(err);
        }

    }

    const { email, password } = signInValues
    
    const configAuthContent = {
        titulo: 'Login'
    }

    return (
        <AuthContent {...configAuthContent}>
            <div className="form-content">
                <form onSubmit= { handleSubmit }>

                    <FormInput 
                        type='text'
                        name='email'
                        placeholder='E-mail'
                        value={email}
                        handleChange={handleChange}
                    />

                    <FormInput 
                        type='password'
                        name='password'
                        placeholder='Contraseña'
                        value={password}
                        handleChange={handleChange}
                    />

                    <Button type='submit'>
                        Login
                    </Button>

                    <div className="socialSignIn">
                        <div className="row">
                            <Button onClick={ signInWithGoogle }>
                                SignIn whit Google
                            </Button>
                        </div>
                    </div>
                    <div className="links">
                        <Link to='/recovery'>
                            Resetear Contraseña
                        </Link>
                    </div>
                </form>
            </div>  
        </AuthContent>
    )

}

export default SignIn
