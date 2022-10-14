import { useSetRecoilState } from 'recoil';
import router from "next/router";
import { useFetchWrapper } from '../helpers';
import { authAtom, usersAtom } from '../state';
import { BASIC_CONSTANT } from "../variables/basic.constants";

export {useUserActions};

function useUserActions() {
    const fetchWrapper = useFetchWrapper();
    
    const setAuth = useSetRecoilState(authAtom);
    return {
        login,
        logout
    }

    function login(email, password) {
        return fetchWrapper.post(`${BASIC_CONSTANT.BACKEND_URL}/admin`,{email, password})
        .then(user => {
            localStorage.setItem(BASIC_CONSTANT.ADMIN_TOKEN, JSON.stringify(user));
            setAuth(user);
            
            router.push('/')
        })
    }
    
    function logout(){
        localStorage.removeItem(BASIC_CONSTANT.ADMIN_TOKEN);
        setAuth(null);
        router.replace('/admin/login'); 
    }
}