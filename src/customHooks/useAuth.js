import { useEffect } from "react";
import { useHistory } from "react-router";
import { useGlobalContext } from "../components/context/context";

const useAuth = props => {
    const { isLogIn } = useGlobalContext();
    const { currentUser } = isLogIn
    const history = useHistory();

    useEffect(() => {
        if(!currentUser){
            history.push('/login')
        }

    }, [currentUser])

    return currentUser;
}

export default useAuth;