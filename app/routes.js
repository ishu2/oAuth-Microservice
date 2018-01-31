var User=require('./models/user');

module.exports=function(app,passport){

   app.get('/',function(req,res){
       res.render('index');
   });

   app.get('/login',function(req,res){
       res.render('login',{message:req.flash('loginMessage')});
   });

   app.post('/login',passport.authenticate('local-login',{
       successRedirect:'/profile',
       failureRedirect:'/login',
       failureFlash:true
   }));

   app.get('/signup',function(req,res){
       res.render('signup',{message:req.flash('signupMessage')});
   });

   app.post('/signup',passport.authenticate('local-signup',{
       successRedirect:'/',
       failureRedirect:'/signup',
       failureFlash:true
   }));

   app.get('/profile',isLoggedIn,function(req,res){
       res.render('profile',{user:req.user});
   });

   app.get('/:username/:password',function(req,res){
       var newUser=new user();
       newUser.local.username=req.params.username;
       newUser.local.password=req.params.password;
       console.log(newUser.local.username+" : "+newUser.local.password);
       newUser.save(function(err){
           if(err)
             throw err;
       });
       res.send("Success!");
   });

   app.get('/logout',function(req,res){
       req.logout();
       res.redirect('/');
   })

};

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}