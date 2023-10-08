
import * as React from 'react';
import axios from 'axios'; 
import background from "../assets/bg2.jpg";

export default function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const login = async()=>{
        
        axios({
            // Endpoint to send files
            url: "http://192.168.48.82:8081/user/login",
            method: "POST",
            data : {"email":email,
                    "password":password
        }
            })
        
            // Handle the response from backend here
            .then((res) => {
                if(res.data != false){
                    localStorage.setItem("user",JSON.stringify(res.data))
                    window.location.reload(false);
               }
            })
        
            // Catch errors if any
            .catch((err) => { 
             
            });
    }
    return (
        <div class="container-login" style={{backgroundImage:`url(${background})`,backgroundSize:'cover',height:"100vh"}}>
    <div class="row justify-content-center">
      <div class="col-xl-5 col-lg-12 col-md-9">
        <div class="card shadow-sm my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-12">
                <div class="login-form">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Login</h1>
                  </div>
                  <form class="user">
                    <div class="form-group">
                      <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                        placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control" id="exampleInputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small" sx={{lineHeight: "1.5rem;"}}>
                        <input type="checkbox" class="custom-control-input" id="customCheck"/>
                        <label class="custom-control-label" for="customCheck">Remember
                          Me</label>
                      </div>
                    </div>
                    </form>
                    <div class="form-group">
                      <button  class="btn btn-primary btn-block" onClick={login}>Login</button>
                    </div>
                   
                    <hr/>
                    <a href="index.html" class="btn btn-google btn-block">
                      <i class="fab fa-google fa-fw"></i> Login with Google
                    </a>
                    <a href="index.html" class="btn btn-facebook btn-block">
                      <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                    </a>
                  
                  <hr/>
                  <div class="text-center">
                    <a class="font-weight-bold small" href="/register">Create an Account!</a>
                  </div>
                  <div class="text-center">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}