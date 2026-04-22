let UserModel = require("../models/user");
var passport = require("../services/passportconf");
var jwt = require('jsonwebtoken');
var config = require('config');




let userlogin = (req,res,next)=>{
    req.check('emailid', ` Invalid email address`).isEmail().notEmpty();
    req.check('password','Invalid password').isLength({min : 5,max :100});
    var errors = req.validationErrors()
    if(errors){
        res.json({
            success : false,
            message : 'Invalid inputs: ' + errors.map(e => e.msg).join(', '),
            errors : errors
        })
    }else{
        passport.authenticate('login',{session:false},(err,user,info)=>{
            if (err) {
               return res.json({ success: false, message: "Database Error: " + (err.message || "Please try again later.") });
            }
            if (!user) {
               return res.json(info);
            }
            else{
                var token = jwt.sign({_id:user._id},process.env.JWT_SECRET || config.get('jwt.secret'),{expiresIn: 5000000});
                // Set the token as an HttpOnly cookie
                res.cookie('Token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Lax',
                    maxAge: 5000000 * 1000 // 5,000,000 seconds in milliseconds
                });

                res.json({
                    success: true,
                    message: "login successful",
                    user: {
                        name : user.name,
                        type: user.type,
                        _id : user._id,
                        emailid : user.emailid,
                        contact : user.contact
                    },
                    token: token
                });
            }
            })(req,res,next);     
    }
        
}



     
let userlogout = (req, res) => {
    res.clearCookie('Token');
    res.json({
        success: true,
        message: "logout successful"
    });
};

module.exports = { userlogin, userlogout };

