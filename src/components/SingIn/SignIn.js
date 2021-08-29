import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { singInUser, resetAllAuthForms, signInWithGoogle } from '../../redux/User/user.actions';

import AuthContent from '../AuthContent/AuthContent';
import Button from '../Forms/Button';
import FormInput from '../Forms/FormInput';

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess
})

const SignIn = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { signInSuccess } = useSelector(mapState);
    
    const initialState = {
        email: '',
        password: ''
    }
    const [signInValues, setSignInValues] = useState(initialState);

    useEffect(() => {
        if(signInSuccess){
            setSignInValues(initialState);
            dispatch(resetAllAuthForms());
            history.push('/');
        }

    }, [signInSuccess])

    const handleChange = e => {
        const {name, value} = e.target
        setSignInValues({ ...signInValues, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = signInValues

        dispatch(singInUser({email, password}));
    }

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
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
                            <Button onClick={handleGoogleSignIn}>
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
