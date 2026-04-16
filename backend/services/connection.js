var mongoose = require("mongoose");
var config = require('config');
let tool = require("./tool")



//database connection
mongoose.Promise = global.Promise;
const options = {
  autoIndex: false
};

mongoose.connect(process.env.MONGODB_URI || config.get('mongodb.connectionString'),options).then(()=>{
    console.log("connected to mongoDB");
    //tool.createadmin();
}).catch((err)=>{
    console.log("Error connecting to database",err);
})


module.exports=mongoose;