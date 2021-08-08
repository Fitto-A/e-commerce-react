import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../components/context/context';
import { checkUserIsAdmin } from '../utils/Utils'

const useAdminAuth = props => {
    const { isLogIn } = useGlobalContext();
    const { currentUser } = isLogIn
    const history = useHistory();
    
    useEffect(() => {
        if (!checkUserIsAdmin(currentUser)) {
            history.push('/login');
        }
        
    }, [currentUser])

    return currentUser;
}

export default useAdminAuth;
