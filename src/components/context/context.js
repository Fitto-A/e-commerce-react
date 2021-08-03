import React, { useState, useEffect, useContext } from "react";
import { auth, handleUserProfile } from "../../firebase/utils";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const initialState = {
        currentUser: null
    }

    const [isLogIn, setIsLogIn] = useState(initialState)

    var authListeneer = null;

    const handleLog = () => {
        authListeneer = auth.onAuthStateChanged( async userAuth => {
            if (userAuth) {
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot(snapshot => {
                    setIsLogIn({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    })
                })
            }
            setIsLogIn(initialState)
        })
    }

    useEffect(() => {
        handleLog();
    },[])



    return <AppContext.Provider
        value={{isLogIn, setIsLogIn}}
        >
        { children }
    </AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }