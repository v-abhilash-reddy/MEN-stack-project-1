const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set('view engine',"ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

//connecting mongoDB
// const dbURI = 'mongoDB cluster string needed';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology : true}).then(console.log("connected to db")).catch((err)=>console.log(err + '\n mongoDB cluster string needed'));
const userSchema = {
    fullname: String,
    cityname: String,
    email: String,
    password: String
}
const User = new mongoose.model("User",userSchema);


//seeking routes
app.get("/",function(req,res){
    console.log("in the get home");
    res.render('home');
})

app.get("/login",function(req,res){
    console.log("in the get login");
    res.render('login');
})

app.get("/register",function(req,res){
    console.log("in the get register");
    res.render('register');
})

app.post("/register",function(req,res){
    console.log("in the post register");
    const newUser = new User({
        fullname: req.body.fullname,
        cityname: req.body.cityname,
        usermail: req.body.email,
        password: req.body.password
    })
    newUser.save(function(err){
        if(err){
            console.log(err);
        } else{
            res.render('i-home',{ username: userFound.fullname, city: userFound.cityname});
        }
    })
})

app.post("/login",function(req,res){
    console.log("in the post login");
    const usermail = req.body.email;
    const password = req.body.password;

    User.findOne({usermail:usermail},function(err,userFound){
        if(err){
            console.log(err);
        } else{
            if(userFound && userFound.password===password){
                    res.render('i-home',{ username: userFound.fullname, city: userFound.cityname});
            } else{
                res.render('non-user');
            }
        }
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000...");
});
