var mongoose = require("mongoose");
var config = require('config');
let tool = require("./tool")



//database connection
mongoose.Promise = global.Promise;
const options = {
  autoIndex: false,
  dbName: 'online-exam' // Explicitly set the database name for Mongoose 8.x compatibility
};

// Logs for debugging Beanstalk environment variables (Masking sensitive parts)

mongoose.connect(process.env.MONGODB_URI || config.get('mongodb.connectionString'),options).then(()=>{
    //tool.createadmin();
}).catch((err)=>{
    console.error("CRITICAL: Error connecting to database!");
    console.error("Error Message:", err.message);
    console.error("Error Code:", err.code);
    if (err.message.includes("authentication failed")) {
        console.error("Check your MONGODB_URI username and password.");
    }
    if (err.message.includes("ECONNREFUSED") || err.message.includes("ETIMEDOUT") || err.message.toLowerCase().includes("timed out")) {
        console.error("Network issue: Ensure your Atlas IP Whitelist allows Access from Anywhere (0.0.0.0/0).");
    }
})


module.exports=mongoose;