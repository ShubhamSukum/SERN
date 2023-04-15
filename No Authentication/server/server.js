const express=require("express");
const mysql=require("mysql");
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

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

    db.query("INSERT INTO users (username,password) VALUES (?,?)",[username,password],(err,result)=>{
        console.log(err);
    })
});

app.post("/login",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    db.query("SELECT * FROM users WHERE username=? AND password=?",[username,password],(err,result)=>{
        if(err)console.log(res.send({err:err}));

        if(result.length>0){
            res.send(result);
        }
        else{
            res.send({message:"Wrong Username and Password Combination!!"});
        }
    })
})

app.listen(3001,()=>{
    console.log("SQL app Server Running!!");
});