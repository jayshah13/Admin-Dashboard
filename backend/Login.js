const express               =  require('express'),
      app                   =  express(),
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      User                  =  require("./models/User");


//Connecting database
mongoose.connect("mongodb://localhost/auth_demo");

app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));


passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());

//=======================
//      R O U T E S
//=======================

app.get("/", (req,res) =>{
    res.render("home");
})

app.get("/userprofile",isLoggedIn ,(req,res) =>{
    res.render("userprofile");
})
//Auth Routes
app.get("/Login",(req,res)=>{
    res.render("login");
});

app.post("/Login",passport.authenticate("local",{
    successRedirect:"/userprofile",
    failureRedirect:"/login"
}),function (req, res){

});

app.get("/Registration",(req,res)=>{
    res.render("register");
});

app.post("/Registration",(req,res)=>{
    
    User.register(new User({name: req.body.name,username:req.body.username,phonenumber:req.body.phonenumber,emailid:req.body.emailid}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("Register");
        }
    passport.authenticate("local")(req,res,function(){
        res.redirect("Login");
    })    
    })
})

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


//Listen On Server


app.listen(process.env.PORT ||3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");
    }
      
});