var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var config = require("config");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var UserModel =  require("../models/user");



//user login local strategy
passport.use('login',new LocalStrategy({
  usernameField: 'emailid',
  passwordField : 'password',
  passReqToCallback : true 
  },
  function(req,emailid, password, done) {
    UserModel.findOne({ 'emailid' : emailid, 'status' : true }).then((user) => {
      if (!user) {
          return done(null, false,{
              success: false,
              message: "Invalid emailid"
          });
      }
      else{
          bcrypt.compare(password, user.password).then(function(res) {
            if(res){
              return done(null, user,{
                success: true,
                message: "logged in successfully"
              });
            }
            else{
              return done(null, false,{
                success: false,
                message: "Invalid Password"
              });
            }
          });
        }
    }).catch((err) => {
        return done(err,false,{
            success: false,
            message: "Server Error"
        });
    });
  }
));




// Combined extractor to support both Authorization header and HttpOnly cookie
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['Token'];
    }
    return token;
};

//options jwt
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor
]);
opts.secretOrKey = process.env.JWT_SECRET || config.get('jwt.secret');

passport.use('user-token',new JwtStrategy(opts, function(jwt_payload, done) {
  UserModel.findById(jwt_payload._id).then((user) => {
        if (user) {
            return done(null, user,{
                success: true,
                message: "Successfull"
            }); 
        } else {
            return done(null, false,{
                success: false,
                message: "Authentication Failed"
            });
        }
    }).catch((err) => {
        return done(err, false,{
            success: false,
            message: "Server Error"
        }); 
    });
}));




module.exports = passport