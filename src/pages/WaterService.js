import React,{Component} from "react";
import axios from 'axios'; 
import $ from 'jquery'; 
import Checkout from '../component/Checkout'

export default class WaterService extends Component {
 
 
    state = {
        factures: [],
        rowId:"",
        month:"",
        year:"",
        montant:"",
        type:"",
        code:"",
        etat:"",
        datePayement:"",
        factureId : "",
        user :JSON.parse(localStorage.getItem("user")),
        isFirst : true,
        counter:""
      }
      componentDidMount() {
        this.setState ({ user: JSON.parse(localStorage.getItem("user"))},()=>{
        this.counterNumber()})
      }
      
      updateRowId(props){
        this.setState({rowId:props.id }) 
        this.setState({month:props.month }) 
        this.setState({year:props.year }) 
        this.setState({montant:props.montant }) 
        this.setState({type:props.type }) 
        this.setState({code:props.code }) 
        this.setState({datePayement:props.datePayement }) 
        this.setState({etat:props.etat }) 
      }
      callPopUp(){
        return  <Checkout name = {this.state.rowId} cm={0} year = {this.state.year} month = {this.state.month} montant = {this.state.montant} type = {this.state.type}/>
      }
      counterNumber() { 
       
        axios({
        // Endpoint to send files
        url: "http://192.168.48.82:8081/operation/water/"+this.state.user.id,
        method: "GET",
        })
    
        // Handle the response from backend here
        .then((res) => { 
            this.setState({ counter: res.data })  
            console.log(res.data)
             // ID From dataTable with Hover
        })
    
        // Catch errors if any
        .catch((err) => { });}
    
      handleUpdate() { 
    
        axios({
          // Endpoint to send files
          url: "http://192.168.48.82:8080/water/update",
          method: "POST",
          data : {"id":this.state.rowId,
                  "month":this.state.month,
                  "year":this.state.year,
                  "montant":this.state.montant,
                  "type":this.state.type,
                  "datePayement":this.state.datePayement,
                  "etat":this.state.etat,
                  "code":this.state.code
      }
          })
      
          // Handle the response from backend here
          .then((res) => { 
            this.setState({factures:res.data})
            document.getElementById("success").style.display="block"
             setTimeout(() => {
               document.getElementById("success").style.display="none"
           },2000);
              
              // $('#dataTableHover').DataTable().destroy(); 
               // ID From dataTable with Hover
             
          })
      
          // Catch errors if any
          .catch((err) => { 
           
            
          });
 
        
    }
      handleDelete() { 
    
        axios({
          // Endpoint to send files
          url: "http://192.168.48.82:8080/water/delete facture/"+this.state.rowId,
          method: "DELETE",
          })
      
          // Handle the response from backend here
          .then((res) => { 
           if(res.data ===""){
             document.getElementById("error").style.display="block"
             setTimeout(() => {
               document.getElementById("error").style.display="none"
           },2000);
           }else{
            document.getElementById("success").style.display="block"
                setTimeout(() => {
                    document.getElementById("success").style.display="none"
                },2000);
             this.setState({ factures: res.data }) 
           }
              
              // $('#dataTableHover').DataTable().destroy(); 
               // ID From dataTable with Hover
             
          })
      
          // Catch errors if any
          .catch((err) => { 
           
            
          });
 
        
    }
     
    componentDidMount() {
        $('#exampleModalCenter').on('hidden.bs.modal', function (e) {
          this.handleUpload()
      })
    
    }
    handleUpload() { 

      document.getElementById("filtrer").style.display="block"
      this.setState ({isFirst : false})
       this.setState ({ factureId: document.getElementById('factureId').value },()=>{
        axios({
          // Endpoint to send files
          url: "http://192.168.48.82:8080/water/factures/"+this.state.factureId,
          method: "GET",
          })
      
          // Handle the response from backend here
          .then((res) => { 
              this.setState({ factures: res.data }) 
              // $('#dataTableHover').DataTable().destroy(); 
               // ID From dataTable with Hover
             
          })
      
          // Catch errors if any
          .catch((err) => { 
            this.setState({ factures: [] }) 
          });
       })
      
        
    }
    
    
     handleUploadP() { 
      this.setState ({ factureId: document.getElementById('factureId').value },()=>{
      axios({
  
      // Endpoint to send files
      url: "http://192.168.48.82:8080/water/paye/"+this.state.factureId,
      method: "GET",
      })
  
      // Handle the response from backend here
      .then((res) => { 
          this.setState({ factures: res.data })  
           // ID From dataTable with Hover
         
      })
  
      // Catch errors if any
      .catch((err) => { });})
  }
  handleUploadNonP() { 
    this.setState ({ factureId: document.getElementById('factureId').value },()=>{
    axios({

    // Endpoint to send files
    url: "http://192.168.48.82:8080/water/non paye/"+this.state.factureId,
    method: "GET",
    })

    // Handle the response from backend here
    .then((res) => { 
        this.setState({ factures: res.data })  
         // ID From dataTable with Hover
    })

    // Catch errors if any
    .catch((err) => { });})
}

filter(){
  console.log(this.state.factures);
  var f = document.getElementById("filtrer")
 // console.log(this.state.factures);
 // console.log(f.value);
 var  list =[]
  var yourValue = f.value;
  if(yourValue.length ==0){
    this.handleUpload();
  }
  this.state.factures.forEach(element => {
    if(f.value == element.id || element.code.match(f.value)||  element.etat.match(f.value) || element.type.match(f.value) || (element.month).toString().match(f.value) || (element.year).toString().match(f.value) || (element.montant).toString().match(f.value)  ){
      list.push(element)
      console.log(f.value);
    }
  else{
    console.log("not found");
  }
  });      
  this.setState({factures : list})
}
    
  
    render(){
        return(<>
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
                       value={this.state.rowId} disabled/>
                   </div>
                   <div class="form-group">
                     <label>Code</label>
                     <input type="text" class="form-control" id="exampleInputCode" aria-describedby="emailHelp"
                       value={this.state.code} disabled/>
                   </div>
                 <div class="form-row">
                    
                   <div class="col">
                     <label>Month</label>
                     <input type="text" class="form-control" id="exampleInputMonth" placeholder="Enter Month" value={this.state.month} onChange={(e) => this.setState({month:e.target.value})}/>
                   </div>
                   <div class="col">
                     <label>Year</label>
                     <input type="text" class="form-control" id="exampleInputYear" placeholder="Enter Year" value={this.state.year} onChange={(e) => this.setState({year:e.target.value})}/>
                   </div>
                  
                   </div>
                   <br/>
                   <div class="form-row">
                   <div class="col">
                     <label>Type</label>
                     <input type="text" class="form-control" id="exampleInputType" placeholder="Enter Tele" value={this.state.type} onChange={(e) => this.setState({type:e.target.value})} disabled/>
                   </div>
                   <div class="col">
                     <label>Etat</label>
                     <input type="text" class="form-control" id="exampleInputEtat" placeholder="Enter CIN" value={this.state.etat} oonChange={(e) => this.setState({etat:e.target.value})} disabled/>
                   </div>
                  
                   </div>
                   <br/>
                   
                   <div class="form-group">
                     <label>Date Payement</label>
                     <input type="text" class="form-control" id="exampleInputDate" aria-describedby="emailHelp"
                       placeholder="Enter Address" value={this.state.datePayement} onChange={(e) => this.setState({datePayement:e.target.value})} disabled/>
                   </div>
                   
                   <div class="form-group">
                     <label>Montant (Dh)</label>
                     <input type="text" class="form-control" id="exampleInputMontant" aria-describedby="emailHelp"
                       placeholder="Enter Montant" value={this.state.montant} onChange={(e) => this.setState({montant:e.target.value})}/>
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
                  <button type="button" class="btn btn-primary mb-1 " data-dismiss="modal" onClick={(e)=>{this.handleUpdate()}}>Confirme</button>
                </div>
              </div>
            </div>
          </div>
        <div style={{display:"none",position:"fixed", right: "40px",top: "80px",zIndex:20}}  class="alert alert-success alert-dismissible " role="alert" id="success">
                    <h6><i class="fas fa-check"></i><b> Success!</b></h6>
                    operation done with success
                </div>
        <div style={{display:"none",position:"fixed", right: "40px",top: "80px",zIndex:20}}  class="alert alert-danger alert-dismissible " role="alert" id="error">
                    
                    <h6><i class="fas fa-ban"></i><b> illegal operation !</b></h6>
                    you cannot delete a bill not payed!
        </div>
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Water Service</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Electro Water Services</li>
              <li class="breadcrumb-item active" aria-current="page">Water Service</li>
            </ol>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                  <form className="navbar-search" style={{width:"70%"}}>
                  <div className="input-group" >
                    <input type="text" className="form-control bg-light border-1 small" placeholder="What do you want to look for?"
                      aria-label="Search" aria-describedby="basic-addon2"  sx={{borderColor: "#3f51b5;",width:"100%"}} id="factureId"/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button" onClick={(e) => this.handleUpload()}>
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
                <div class="modal fade" id="delete" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">Are you sure you want to delete this facture?</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
               
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-danger mb-1 " data-dismiss="modal" onClick={(e) => this.handleDelete()}>Confirme</button>
                </div>
              </div>
            </div>
          </div>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              
              <div class="modal-content" id="yarbi">
              
                <div class="modal-body">
                 {this.callPopUp()}
                </div>
                
              </div>
            </div>
          </div>
                
                
              
                 <div class="btn-group dropup" style={{width:"10%",marginLeft:"10px"}}>
                  <div class="btn-group dropup" style={{width:"10%",marginLeft:"10px"}}>
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                          Select etat
                        </button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item"  onClick={(e) => this.state.factureId==""?console.log("empty string"):this.handleUploadP()}>Paye</a>
                          <a class="dropdown-item" onClick={(e) => this.state.factureId==""?console.log("empty string"):this.handleUploadNonP()}>Non Paye</a>
                          <a class="dropdown-item" onClick={(e) => this.state.factureId==""?console.log("empty string"):this.handleUpload()}>Tous</a>
                        </div>
                      </div>
          </div>  
          <div class=" dropdown no-arrow " style={{marginLeft:"30px"}} >
             
                <a onClick={()=>{this.counterNumber()}} class="nav-link btn-sm btn-info"  href="" id="alertsDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i  class="fas fa-info-circle"></i>
              </a>
            
              <div  class="dropdown-list dropdown-menu dropdown-menu-left shadow "
                aria-labelledby="alertsDropdown">
                <h6 class="dropdown-header">
                  Counter
                </h6>
                <div class="dropdown-item d-flex align-items-center" href="#">
                  <div class="mr-3">
                    <div class="icon-circle bg-warning">
                      <i class="fas fa-exclamation-triangle text-white"></i>
                    </div>
                  </div>
                  <div>
                  Until now you have carried out <strong>{this.state.counter}</strong> operation(s)
                  </div>
                </div>
              </div>
            </div>
          
          
                
                </div>
                
                
                <div class="table-responsive p-3">
                <input className="form-control bg-light border-1 small" type="text" id="filtrer" onChange={(e) => this.filter()}  style={{marginBottom:"10px",width: "20%",fontSize: "16px",display:"none",padding: "12px",float:"right"}} placeholder="Search for ..."/>

                  {this.state.isFirst?<strong><p style={{color:"rgb(117, 117, 117)"}}>NB : you can search by client matricule or bill number</p></strong>:
                  <table class="table align-items-center table-flush table-hover" id="dataTableHover">
                    <thead class="thead-light">
                      <tr>
                      {this.state.user.role == "admin"?  <th>Id</th>:<></>}
                      <th>code</th>
                        <th>month</th>
                        <th>year</th>
                        <th>montant</th>
                        <th>type</th>
                        <th>date Payement</th>
                        <th>etat</th>
                        <th colSpan={3}>Action</th>
                      </tr>
                    </thead>
                    
                    <tbody >
                    {this.state.factures.length==0 ? <tr class="odd"><td class="dataTables_empty" colSpan={7} style={{textAlign:"center"}} >No data available in table</td></tr>: <></>}

                      
                 
                    {
                    this.state.factures.map((facture) => (
                        <tr key={facture.id}>
                           {this.state.user.role == "admin"? <td>{facture.id}</td>:<></>}
                        <td>{facture.code}</td>
                        <td>{facture.month}</td>
                        <td>{facture.year}</td>
                        <td>{facture.montant}</td>
                        <td>{facture.type}</td>
                        <td>{facture.datePayement}</td>
                        {facture.etat!=="Non paye"? <td><span class="badge badge-success" style={{padding:"5px"}}>{facture.etat}</span></td> : <td><span class="badge badge-danger" style={{padding:"5px"}}>{facture.etat}</span></td>}
                        {facture.etat=="Non paye"?<button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="btn btn-success mb-1" style={{margin:"5px"}}  onClick={(e) =>{this.updateRowId(facture)}}><i class="fas fa-check"></i></button>:<></>}
                        {this.state.user.role == "admin"? <button type="button" class="btn btn-primary mb-1"  data-dismiss="modal" data-toggle="modal" data-target="#update" style={{margin:"5px"}} onClick={(e) =>{this.updateRowId(facture)}}>Upadate</button>:<></>}
                        {this.state.user.role == "admin"? <button type="button" class="btn btn-danger mb-1 "  style={{margin:"5px"}} data-dismiss="modal" data-toggle="modal" data-target="#delete" onClick={(e) =>{this.updateRowId(facture)}}><i class="fas fa-trash"></i></button>:<></>}
                        
                      </tr>     
))
                    }
                     
                    </tbody>
                  </table>}
                  
               
                </div>
                
              </div>
            </div>
          </div>


          
          
        </>)
        
    }

}


       