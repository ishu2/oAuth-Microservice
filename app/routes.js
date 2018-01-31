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

   app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}));

   app.get('/auth/facebook/callback',passport.authenticate('facebook',{successRedirect:'/profile',failureRedirect:'/'}));

   app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

   app.get('/auth/google/callback',passport.authenticate('google',{successRedirect:'/profile',failureRedirect:'/'}));

   app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

   app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

   app.get('/connect/local', function(req, res){
       res.render('connect-local.ejs', { message: req.flash('signupMessage')});
   });

   app.post('/connect/local', passport.authenticate('local-signup', {
       successRedirect: '/profile',
       failureRedirect: '/connect/local',
       failureFlash: true
   }));

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