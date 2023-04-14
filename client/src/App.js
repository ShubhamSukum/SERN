import './App.css';
import React,{useState} from "react";
import Axios from "axios";

function App() {

  const [usernameReg,setUsernameReg]=useState("");
  const [passwordReg,setpasswordReg]=useState("");

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const [loginStatus,setLoginStatus]=useState("");
  
  // Register 
  const register=()=>{
    Axios.post("http://localhost:3001/register",{
      username:usernameReg,
      password:passwordReg,
    }).then((response)=>{
      console.log(response.data);
    });
  };

  // Login
  const Login=()=>{
    Axios.post("http://localhost:3001/login",{
      username:username,
      password:password,
    }).then((response)=>{
      if(response.data.message){
        setLoginStatus(response.data.message);
      }
      else{
        setLoginStatus("Username => "+response.data[0].username + " *** Password => " + response.data[0].password);
        console.log(response);
      }
      
    });
  };

  return (
    <div className="App">
        <div className="Registration">
            <h1>Registration</h1>

            <div style={{padding: "10px",margin: "10px"}}>
            <label style={{padding: "10px",margin: "10px"}}>Username</label>
            <input type="text" 
            onChange={(e)=>{
              setUsernameReg(e.target.value);
            }}/> 
            </div>
                   
            <div style={{padding: "10px",margin: "10px"}}>
            <label style={{padding: "10px",margin: "10px"}}>Password</label>
            <input type="text" 
            onChange={(e)=>{
              setpasswordReg(e.target.value);
            }}/>  
            </div>
            
            <button onClick={register}>Register</button>
        </div>

        <div className="Login">
            <h1>Login</h1>

            <div style={{padding: "10px",margin: "10px"}}>
              <input type="text" placeholder="Username" 
              onChange={(e)=>{
                setUsername(e.target.value);
              }}/>
            </div>
            
            <div style={{padding: "10px",margin: "10px"}}>
              <input type="password" placeholder="password" 
              onChange={(e)=>{
                setPassword(e.target.value);
              }}/>
            </div>
            
            <button onClick={Login}>Login</button>
        </div>
        
        <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;
