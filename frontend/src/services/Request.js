const axios = require('axios');
const base = require("./conf").base;

axios.defaults.withCredentials = true;

let get = (uri,params=null)=>{
    return axios({
        method : 'get',
        url : uri,
        baseURL : base,
        params : {
            ...params
        }
    });
}

let post = (uri,params=null,data=null,others={})=>{
    return axios({
        method : 'post',
        url : uri,
        baseURL : base,
        params : {
            ...params
        },
        data : data,
        ...others
    });
}


module.exports = { get, post }