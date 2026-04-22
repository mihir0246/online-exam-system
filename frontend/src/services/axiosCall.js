import apis from './Apis';
const axios = require('axios');

axios.defaults.withCredentials = true;

export const SecureGet = (p)=>{
    return axios({
        method:'get',
        baseURL : apis.BASE,
        ...p
    })
}

export const Get =(p)=>{
    return axios({
        method:'get',
        baseURL : apis.BASE,
        ...p,
    })
}


export const SecurePost =(p)=>{
    return axios({
        method:'post',
        baseURL : apis.BASE,
        ...p
    })
}

export const Post =(p)=>{
    return axios({
        baseURL : apis.BASE,
        method:'post',
        ...p,
    })
}
