var UserModel = require("../models/user");
const bcrypt = require('bcryptjs');
const saltRounds = 10;


//create admin
var createadmin = ()=>{
    bcrypt.hash("admin", saltRounds).then((hash)=>{
        var tempdata = new UserModel({
            name : 'rupali',
            password : hash,
            emailid : 'periwal.rupali@gmail.com',
            contact : '9563152391',
            type: 'ADMIN',
        })
        tempdata.save().then(()=>{
        }).catch((err)=>{
        })
    }).catch((err)=>{
    })
}



 var hashPassword = (password)=>{
    return (new Promise((resolve,reject)=>{
        bcrypt.hash(password, saltRounds).then(function(hash) {
            resolve(hash);
        }).catch((err)=>{
            reject(err);
        })
    }))
}

module.exports={ createadmin, hashPassword }