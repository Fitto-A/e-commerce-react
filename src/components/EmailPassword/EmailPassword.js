import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux'; 
import { resetPassword, resetAllAuthForms } from '../../redux/User/user.actions';

import { withRouter, useHistory } from 'react-router-dom'

import AuthContent from '../AuthContent/AuthContent'
import FormInput from '../Forms/FormInput'
import Button from '../Forms/Button'

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const EmailPassword = props => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess){
            dispatch(resetAllAuthForms());
            history.push('/login');
        }

    }, [resetPasswordSuccess])


    useEffect(() => {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setErrors(resetPasswordError)
        }
    }, [resetPasswordError])

    const handleChange = e => {
        const {name, value} = e.target

        setEmail(value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword({ email }))

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
