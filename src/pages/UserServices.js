import * as React from 'react';
import axios from 'axios'; 


export default function UserServices() {
    const [users, setUsers] = React.useState([]);
    const [userId, setUserId] = React.useState("");
    const [user, setUser] =  React.useState(JSON.parse(localStorage.getItem("user")));
    const [firstName, setFirtName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tele, setTele] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [cin, setCin] = React.useState('');
    const [role, setRole] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    React.useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user")));
        load()
    },[])
    const create = async()=>{
        
      axios({
          // Endpoint to send files
          url: "http://192.168.48.82:8081/user/"+user.id+"/add",
          method: "POST",
          data : {
             
              "firstName":firstName,
                  "lastName":lastName,
                  "email":email,
                  "password":password,
                  "tele":tele,
                  "address":address,
                  "cni":cin,
                  "role":role
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
             setUsers(res.data)
              document.getElementById("error").style.display="block"
              setTimeout(() => {
                  document.getElementById("error").style.display="none"
              },2000);
          })
      
          // Catch errors if any
          .catch((err) => { 
           
          });
  }

    const update = async()=>{
        
        axios({
            // Endpoint to send files
            url: "http://192.168.48.82:8081/user/"+user.id+"/update",
            method: "PUT",
            data : {
                "id":userId,
                "firstName":firstName,
                    "lastName":lastName,
                    "email":email,
                    "password":password,
                    "tele":tele,
                    "address":address,
                    "cni":cin,
                    "role":role
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
                setUsers(res.data)
                document.getElementById("error").style.display="block"
                setTimeout(() => {
                    document.getElementById("error").style.display="none"
                },2000);
            })
        
            // Catch errors if any
            .catch((err) => { 
             
            });
    }
    const updateUserId = (props)=>{
        setUserId(props.id)
        setFirtName(props.firstName)
        setLastName(props.lastName)
        setAddress(props.address)
        setEmail(props.email)
        setPassword(props.password)
        setTele(props.tele)
        setCin(props.cni)
        setRole(props.role)
        setRepeatPassword(props.password)
    }
    const handelDelete = async()=>{
        axios({
            // Endpoint to send files
            url: "http://192.168.48.82:8081/user/"+user.id+"/delete/"+userId,
            method: "DELETE",
            })
            // Handle the response from backend here
            .then((res) => {
                setUsers(res.data)
                document.getElementById("error").style.display="block"
                setTimeout(() => {
                    document.getElementById("error").style.display="none"
                },2000);
            })
        
            // Catch errors if any
            .catch((err) => { 
             
            });
    }
    const handelUpgrade = async()=>{
        axios({
            // Endpoint to send files
            url: "http://192.168.48.82:8081/user/"+user.id+"/upgrade/"+userId,
            method: "GET",
            })
            // Handle the response from backend here
            .then((res) => {
                setUsers(res.data)
                document.getElementById("error").style.display="block"
                setTimeout(() => {
                    document.getElementById("error").style.display="none"
                },2000);
            })
        
            // Catch errors if any
            .catch((err) => { 
             
            });
    }
    const load = async()=>{
        axios({
            // Endpoint to send files
            url: "http://192.168.48.82:8081/user/all/"+user.id,
            method: "GET",
            })
            // Handle the response from backend here
            .then((res) => {
                setUsers(res.data)
            })
        
            // Catch errors if any
            .catch((err) => { 
             
            });
    }

    const filter = async() =>{
      console.log("hello");
      console.log(users);
      var f = document.getElementById("filtrer")
     // console.log(this.state.factures);
     // console.log(f.value);
     var  list =[]
      var yourValue = f.value;
      console.log(yourValue);

      if(yourValue.length ==0){
        load()
      }

      users.forEach(element => {
        if( element.firstName.match(f.value) || element.lastName.match(f.value) || element.email.match(f.value) || element.address.match(f.value) || element.tele.match(f.value)){ 
          list.push(element)
        }
      else{
        console.log("not found");
      }
      });

      setUsers(list)
    }
    return (
        <>
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Users</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Users</li>
            </ol>
          </div>
          <div style={{display:"none",position:"fixed", right: "40px",top: "80px",zIndex:"10"}}  class="alert alert-success alert-dismissible" role="alert" id="error">
                    <h6><i class="fas fa-check"></i><b> Success!</b></h6>
                    operation done with success
                </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <div class="modal fade" id="delete" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">Are you sure you want to delete this user?</h5>

                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-danger mb-1 " data-dismiss="modal" onClick={(e)=>{handelDelete()}}>Confirme</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="create" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                
                <div class="modal-body">
                <div class="container-login" style={{padding:"0px"}}>
          
          
           
   <div class="row justify-content-center" style={{padding:"0px"}}>
     <div class="col-xl-12 col-lg-6 col-md-9">
      
           <div class="row">
             <div class="col-lg-12">
               <div class="login-form" >
                 <div class="text-center">
                   <h1 class="h4 text-gray-900 mb-4">Add user</h1>
                 </div>
                 
                 <form>
                 
                 <div class="form-row">
                    
                   <div class="col">
                     <label>First Name</label>
                     <input type="text" class="form-control" id="exampleInputFirstName" placeholder="Enter First Name"  onChange={(e) => setFirtName(e.target.value)}/>
                   </div>
                   <div class="col">
                     <label>Last Name</label>
                     <input type="text" class="form-control" id="exampleInputLastName" placeholder="Enter Last Name"  onChange={(e) => setLastName(e.target.value)}/>
                   </div>
                  
                   </div>
                   <br/>
                   <div class="form-row">
                   <div class="col">
                     <label>Tele</label>
                     <input type="text" class="form-control" id="exampleInputTele" placeholder="Enter Tele" onChange={(e) => setTele(e.target.value)}/>
                   </div>
                   <div class="col">
                     <label>CIN</label>
                     <input type="text" class="form-control" id="exampleInputCin" placeholder="Enter CIN"  onChange={(e) => setCin(e.target.value)}/>
                   </div>
                  
                   </div>
                   <br/>
                   
                   <div class="form-group">
                     <label>Adresse</label>
                     <input type="text" class="form-control" id="exampleInputAdresse" aria-describedby="emailHelp"
                       placeholder="Enter Address"  onChange={(e) => setAddress(e.target.value)}/>
                   </div>
                   
                   <div class="form-group">
                     <label>Email</label>
                     <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                       placeholder="Enter Email Address"  onChange={(e) => setEmail(e.target.value)}/>
                   </div>
                   <div class="form-group">
                     <label>Password</label>
                     <input type="password" class="form-control" id="exampleInputPassword" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
                   </div>
                   <div class="form-group">
                     <label>Repeat Password</label>
                     <input type="password" class="form-control" id="exampleInputPasswordRepeat"
                       placeholder="Repeat Password"  onChange={(e) => setRepeatPassword(e.target.value)}/>
                   </div>
                   <div class="form-group">
                    <label for="select2SinglePlaceholder">Role</label>
                    <select class="select2-single-placeholder form-control" name="state" id="select2SinglePlaceholder" onChange={(e)=>{setRole(e.target.value)}}>
                      <option value="ADMIN">Admin</option>
                      <option value="AGENT">Agent</option>
                    </select>
                  </div>
                   </form>
                   
                 
                
                 <div class="text-center">
                 </div>
               </div>
             </div>
  
       </div>
     </div>
   </div>
 </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-primary mb-1 " data-dismiss="modal" onClick={(e)=>{create()}}>Confirme</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="update" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                
                <div class="modal-body">
                <div class="container-login" style={{padding:"0px"}}>
          
          
           
   <div class="row justify-content-center" style={{padding:"0px"}}>
     <div class="col-xl-12 col-lg-6 col-md-9">
      
           <div class="row">
             <div class="col-lg-12">
               <div class="login-form" >
                 <div class="text-center">
                   <h1 class="h4 text-gray-900 mb-4">Upadate</h1>
                 </div>
                 
                 <form>
                 <div class="form-group">
                     <label>Id</label>
                     <input type="text" class="form-control" id="exampleInputId" aria-describedby="emailHelp"
                       value={userId} disabled/>
                   </div>
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
                       placeholder="Repeat Password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                   </div>
                   </form>
                   
                 
                
                 <div class="text-center">
                 </div>
               </div>
             </div>
  
       </div>
     </div>
   </div>
 </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-primary mb-1 " data-dismiss="modal" onClick={(e)=>{update()}}>Confirme</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="disUpgrade" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">Are you sure you want to upgrade this ADMIN to agent?</h5>

                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-danger mb-1 " data-dismiss="modal" onClick={(e)=>{handelUpgrade()}}>Confirme</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal fade" id="upgrade" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">Are you sure you want to upgrade this agent to ADMIN?</h5>

                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-danger mb-1 " data-dismiss="modal" onClick={(e)=>{handelUpgrade()}}>Confirme</button>
                </div>
              </div>
            </div>
          </div>
                </div>
                
                <div class="table-responsive p-3">
                <button  type="button" class="btn btn-primary mb-1"  data-dismiss="modal" data-toggle="modal" data-target="#create" >Add user</button>
                <input className="form-control bg-light border-1 small" type="text" id="filtrer" onChange={(e) => {filter()}}  style={{marginBottom:"10px",width: "20%",fontSize: "16px",padding: "12px",float:"right"}} placeholder="Search for ..."/>

                  <table class="table align-items-center table-flush table-hover" id="dataTableHover">
                    <thead class="thead-light">
                      <tr>
                        <th>Id</th>
                        <th>Matricule</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Tele</th>
                        <th>CIN</th>
                        <th>Role</th>
                        <th colSpan={3}>Action</th>
                      </tr>
                    </thead>
                    
                    <tbody id="tbody">
                    {
                    users.map((user) => (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.matricule}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.tele}</td>
                        <td>{user.cni}</td>
                        <td>{user.role}</td>
                        <td style={{padding:"12px 6px"}}><button type="button" class="btn btn-primary mb-1"  data-dismiss="modal" data-toggle="modal" data-target="#update" onClick={(e)=>{updateUserId(user)}} >Upadate</button></td>
                        {user.role == "admin"?<td  style={{padding:"12px 6px"}}> <button type="button" class="btn btn-danger mb-1" data-dismiss="modal" data-toggle="modal" data-target="#disUpgrade" onClick={(e)=>{updateUserId(user)}} >degrade</button></td>:<td  style={{padding:"12px 6px"}}> <button type="button" class="btn btn-success mb-1" data-dismiss="modal" data-toggle="modal" data-target="#upgrade" onClick={(e)=>{updateUserId(user)}} >upgrade</button></td>}
                        <td style={{padding:"12px 6px"}}><button type="button" class="btn btn-danger mb-1 " data-dismiss="modal" data-toggle="modal" data-target="#delete" onClick={(e)=>{updateUserId(user)}}><i class="fas fa-trash"></i></button></td>
                      </tr>     
))
                    }
                    </tbody>
                  </table>
                  
                </div>
              </div>
            </div>
          </div>
        </>
    )
}