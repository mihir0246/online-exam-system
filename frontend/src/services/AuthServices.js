import apis from "./Apis";
import { Get, Post} from './axiosCall';


class AuthService{
    constructor(){
        this.token=null;
    }
    
    retrieveToken = ()=>{
        // We still check localStorage for backward compatibility with UI components
        // but authentication now primarily uses HttpOnly cookies.
        return localStorage.getItem('Token')
    }

    storeToken = (t)=>{
        localStorage.setItem('Token', t);
    }

    deleteToken = async ()=>{
        localStorage.removeItem('Token');
        // Clear the HttpOnly cookie via backend logout endpoint
        try {
            await Post({ url: apis.LOGOUT });
        } catch (error) {
            console.error('Logout request failed:', error);
        }
    }

    LoginAuth = (u,p)=>{
        return Post({
            url:apis.LOGIN,
            data:{
                emailid : u,
                password : p
            }
        })    
    }

    FetchAuth = ()=>{
        return Get({
            url : apis.GETDETAILSUSER
            // No manual Authorization header; withCredentials is true in axiosCall.js
        })
    }


}

export default new AuthService();
