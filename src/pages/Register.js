import * as React from 'react';
import axios from 'axios'; 
import background from "../assets/bg2.jpg";

export default function Register(props) {
    const [firstName, setFirtName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tele, setTele] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [cin, setCin] = React.useState('');
    

    const register = async()=>{
        
        axios({
            // Endpoint to send files
            url: "http://192.168.48.82:8081/user/add",
            method: "POST",
            data : {"firstName":firstName,
                    "lastName":lastName,
                    "email":email,
                    "password":password,
                    "tele":tele,
                    "address":address,
                    "cni":cin
        }
            })
        
            // Handle the response from backend here
            .then((res) => {
                document.getElementById("exampleInputFirstName").value=''
                document.getElementById("exampleInputLastName").value=''
                document.getElementById("exampleInputTele").value=''
                document.getElementById("exampleInputCin").value=''
                document.getElementById("exampleInputAdresse").value=''
                document.getElementById("exampleInputEmail").value=''
                document.getElementById("exampleInputPassword").value=''
                document.getElementById("exampleInputPasswordRepeat").value=''
                document.getElementById("error").style.display="block"
             setTimeout(() => {
               document.getElementById("error").style.display="none"
           },3000);
            })
        
            // Catch errors if any
            .catch((err) => { 
             
            });
    }

    return (
        <div class="container-login" style={{backgroundImage:`url(${background})`,backgroundSize:'cover'}}>
          
           <a href='/'> <div style={{display:"none",position:"fixed", right: "40px",top: "20px"}}  class="alert alert-success alert-dismissible" role="alert" id="error">
                    
                    <h6><i class="fas fa-check"></i><b> Success!</b></h6>
                            Account created successfully!
                </div></a>
            
    <div class="row justify-content-center">
      <div class="col-xl-5 col-lg-6 col-md-9">
        <div class="card shadow-sm my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-12">
                <div class="login-form">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Register</h1>
                  </div>
                  
                  <form>
                  <div class="form-row">
                    <div class="col">
                      <label>First Name</label>
                      <input type="text" class="form-control" id="exampleInputFirstName" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirtName(e.target.value)}/>
                    </div>
                    <div class="col">
                      <label>Last Name</label>
                      <input type="text" class="form-control" id="exampleInputLastName" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                   
                    </div>
                    <br/>
                    <div class="form-row">
                    <div class="col">
                      <label>Tele</label>
                      <input type="text" class="form-control" id="exampleInputTele" placeholder="Enter Tele" value={tele} onChange={(e) => setTele(e.target.value)}/>
                    </div>
                    <div class="col">
                      <label>CIN</label>
                      <input type="text" class="form-control" id="exampleInputCin" placeholder="Enter CIN" value={cin} onChange={(e) => setCin(e.target.value)}/>
                    </div>
                   
                    </div>
                    <br/>
                    
                    <div class="form-group">
                      <label>Adresse</label>
                      <input type="text" class="form-control" id="exampleInputAdresse" aria-describedby="emailHelp"
                        placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div class="form-group">
                      <label>Email</label>
                      <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                        placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="form-group">
                      <label>Repeat Password</label>
                      <input type="password" class="form-control" id="exampleInputPasswordRepeat"
                        placeholder="Repeat Password"/>
                    </div>
                    </form>
                    <div class="form-group">
                      <button  class="btn btn-primary btn-block" onClick={register}>Register</button>
                    </div>
                    <hr/>
                    <a href="index.html" class="btn btn-google btn-block">
                      <i class="fab fa-google fa-fw"></i> Register with Google
                    </a>
                    <a href="index.html" class="btn btn-facebook btn-block">
                      <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                    </a>
                 
                  <hr/>
                  <div class="text-center">
                    <a class="font-weight-bold small" href="/">Already have an account?</a>
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