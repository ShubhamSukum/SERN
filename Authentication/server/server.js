const express=require("express");
const mysql=require("mysql");
const cors=require("cors");
const bcrypt=require("bcrypt");

const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser")
const session=require("express-session");

// for bcrypt 
const saltRound=10;

const app=express();
app.use(express.json());

// We always have to put this when we use this
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    key:"userID",
    secret:"subscribe",     // imp
    saveUninitialized:false,
    resave:false,
    cookie:{
        expires:60*20*24,
    }
}));

// Updating
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET" , "POST"],
    credentials: true,      //*imp* to make it work
    
}));

// Database connection
const db=mysql.createConnection({
    user: "sqlUsername",
    host: "localhost",
    password: "sqlPassword",
    database: "mern", 
});

app.post("/register",(req,res)=>{

    const username=req.body.username;
    const password=req.body.password;

    bcrypt.hash(password,saltRound,(err,hash)=>{
        if(err)console.log(err);
                                                                            // Instead of password we wrote hash
        db.query("INSERT INTO users (username,password) VALUES (?,?)",[username,hash],(err,result)=>{
            console.log(err);
        })
    })
});

app.post("/login",(req,res)=>{  
    const username=req.body.username;
    const password=req.body.password;

    db.query("SELECT * FROM users WHERE username=?;",username,(err,result)=>{
        if(err){
            console.log(res.send({err:err}));
        }

        if(result.length>0){
            // Updated
            bcrypt.compare(password,result[0].password,(err,response)=>{
                if(response){
                    req.session.user=result;
                    console.log("session =>");
                    console.log(req.session.user);
                    res.send(result);
                }
                else{
                    res.send({message:"Wrong Username and password Combination!!"});
                }
            })
        }

        else{
            res.send({message:"User Doesn't exist!!"});
        }
    })
})

app.get("/login",(req,res)=>{
    if(req.session.user){
        res.send({LoggedIn:true,user:req.session.user});
    }else{
        res.send({LoggedIn:false});
    }
})



app.listen(3001,()=>{
    console.log("SQL app Server Running!!");
});