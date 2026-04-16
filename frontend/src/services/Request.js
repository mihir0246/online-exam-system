const axios = require('axios');
import LocalAuth from './AuthServices';
const base = require("./conf").base;


let get = (uri,params=null)=>{
    return axios({
        method : 'get',
        url : uri,
        baseURL : base,
        params : {
            Token : LocalAuth.retriveToken(),
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
            Token : LocalAuth.retriveToken(),
            ...params
        },
        data : data,
        ...others
    });
}


module.exports = { get, post }