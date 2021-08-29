 import userTypes from "./user.types";
 import { auth, handleUserProfile, GoogleProvider } from "../../firebase/utils";

 export const setCurrentUser = user => ({
     type: 'SET_CUERRENT_USER',
     payload: user
 });

 export const resetAllAuthForms = () => ({
     type: 'RESET_AUTH_FORMS'
 })

 export const singInUser = ({ email, password }) => async dispatch => {
        try {
            await auth.signInWithEmailAndPassword(email, password)
            dispatch({
                type: 'SIGN_IN_SUCCESS',
                payload: true
            });

        } catch (err) {
            // console.log(err);
        }
};

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    
        if (password !== confirmPassword) {
            const passwordError = ['Las contraseñas no coinciden']
            dispatch ({
                type: 'SIGN_UP_ERROR',
                payload: passwordError
            })
            return;
        }
        
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName });
            dispatch({
                type: 'SIGN_UP_SUCCESS',
                payload: true
            });
            
        } catch (err) {
            console.log(err);
        }
}

export const resetPassword = ({ email }) => async dispatch => {
    
    const config = {
        //Link para mandar al usuario luego de que resetee su contraseña
        url: 'http://localhost:3000/login'
    }
    try {

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({
                    type: 'RESET_PASSWORD_SUCCESS',
                    payload: true
                });
                // props.history.push('/login')
            })
            .catch(() => {
                const err = ['La casilla de correo electrónico ingresada no es válida. Por favor intenta nuevamente']
                dispatch({
                    type: 'RESET_PASSWORD_ERROR',
                    payload: err
                })
                // setErrors(err)
            })

    } catch (err) {
        console.log(err);
    }
}

export const signInWithGoogle = () => async dispatch => {

    try {
        await auth.signInWithPopup(GoogleProvider)
            .then(() => {
                dispatch({
                    type: 'SIGN_IN_SUCCESS',
                    payload: true
                });
            })
        
    } catch (err) {
        // console.log(err);
    }
}
