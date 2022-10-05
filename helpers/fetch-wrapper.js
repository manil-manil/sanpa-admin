import {useRecoilState} from 'recoil';
import router from "next/router";
import {authAtom} from '../state';
import { BASIC_CONSTANT } from "../variables/basic.constants";
export {useFetchWrapper};

function useFetchWrapper() {
    const [auth,setAuth] = useRecoilState(authAtom);

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE'),
    };

    function request(method) {
        return (url, body) => {
            const requestOptions = {
                method,
                headers: authHeader(url)
            };
            if(body){
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
            return fetch(url, requestOptions).then(handleResponse)
        }
    }

    function authHeader(url) {
        // return auth header with jwt if user is logged in and request is to the api url
        const token = auth;
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith(BASIC_CONSTANT.BACKEND_URL);
        if (isLoggedIn && isApiUrl) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }

    function handleResponse(response) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(data => {
                if (!response.ok) {
                    if ([401, 403].includes(response.status) && auth) {
                        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                        localStorage.removeItem(BASIC_CONSTANT.ADMIN_TOKEN);
                        setAuth(null);
                        router.replace('/admin/login');
                    }
        
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                return data;
            });
        } else {
            return response.text().then(text => {
                const data = text;
                if (!response.ok) {
                    if ([401, 403].includes(response.status) && auth) {
                        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                        localStorage.removeItem(BASIC_CONSTANT.ADMIN_TOKEN);
                        setAuth(null);
                        router.replace('/admin/login');
                    }
        
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
        
                return data;
            });
        }
    }  
}