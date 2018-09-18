var passport =require('passport');
var User =require('../models/user');
var LocalStrategy =require('passport-local').Strategy;

passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    });
});

passport.use('local.signup',new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback :true
},function(req,email,password,done){
    req.checkBody('email','invalid email').notEmpty().isEmail();
    req.checkBody('password','invalid password').notEmpty().isLength({min :4});
    var errors =req.validationErrors();
     if(errors){
         var messages =[];
         errors.forEach(function(error){
             messages.push(error.msg);
         });
    return done(null,false,req.flash('error',messages));     
    };
    User.findOne({'email':email},function(err,user){
        if(err){
            return done(err);
        }
        if(user){
            return done(null,false,{message :'Email is already in use.'});
        }
    var newUser = new User();
    newUser.email =email;
    newUser.password =newUser.encryptpassword(password);
    newUser.save(function(err,result){
        if(err){
            return done(err);
        }
        return done(null,newUser);
    }); 
    });
}));

passport.use('local.signin',new LocalStrategy({
    usernameField :'email',
    passwordField :'password',
    passReqToCallback :true
},function(req,email,password,done){
    req.checkBody('email','invalid email').notEmpty().isEmail();
    req.checkBody('password','invalid password').notEmpty();
    var errors =req.validationErrors();
    console.log(email);
    console.log(password);
    
     if(errors){
         var messages =[];
         errors.forEach(function(error){
             messages.push(error.msg);
         });
    return done(null,false,req.flash('error',messages));    
    };  
  
   User.findOne({'email' :email},function(err,user){
       console.log(err);
       
       console.log(user);
       
       if(err){
       console.log('HEY ');

           return done(err);
       }
       if(!user) {
       console.log(' THERE');

           return done(null,false,{message :'No user found.'});
       }
       if(!user.validPassword(password)){
       console.log('HEY THERE');

           return done(null,false,{message :'Wrong password.'});
       }
       console.log('HEY THERE');
       
       return done(null,user);
   });


    // User.findOne({'email':email}).then(user => {
    //     if(!user) {
    //         console.log(' THERE');

    //         return done(null,false,{message :'No user found.'});
    //     }
    //     if(!user.validPassword(password)){
    //         console.log('HEY THERE');

    //         return done(null,false,{message :'Wrong password.'});
    //     }
    //     return done(null, user)
    // } ).catch(err => {
    //     console.log('err',err);
        
    // })

}));
