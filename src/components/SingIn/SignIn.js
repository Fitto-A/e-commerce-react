import React, { Component } from 'react';
import './styles.scss'

import Button from '../Forms/Button';
import { signInWithGoogle } from './../../firebase/utils';

class SignIn extends Component {

    handleSubmit = async e => {
        e.preventDefault();
    }

    render() {
        return (
            <div className='signIn'>
                <div className="content">
                    <h2>LogIn</h2>
                    <div className="form-content">
                        <form onSubmit= { this.handleSubmit }>
                            <div className="socialSignIn">
                                <div className="row">
                                    <Button onClick={ signInWithGoogle }>
                                        SignIn whit Google
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
    
            </div>
        )
    }
}

export default SignIn
