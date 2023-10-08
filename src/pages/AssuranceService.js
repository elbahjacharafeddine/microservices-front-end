import React,{Component} from "react";
import axios from 'axios'; 
import CheckoutAssurance from '../component/CkeckoutAssurance'
import $ from 'jquery'; 


export default class AssuranceService extends Component {
  state = {
    factures: [],
    rowId:"",
    month:"",
    year:"",
    montant:"",
    type:"",
    factureId : "",
    user :JSON.parse(localStorage.getItem("user")),
    isFirst : true,
    counter:"",
    matricule:"" 
  }
  componentDidMount() {
    this.setState ({ user: JSON.parse(localStorage.getItem("user"))},()=>{
    this.counterNumber()})
  }
  updateRowId(props){
    this.setState({rowId:props.id }) 
    this.setState({month:props.mounth }) 
    this.setState({year:props.year }) 
    this.setState({montant:props.montant }) 
    this.setState({type:props.type }) 
    this.setState({matricule:props.metricule }) 
  }
  counterNumber() { 
       
    axios({
    // Endpoint to send files
    url: "http://192.168.48.82:8081/operation/assurance/"+this.state.user.id,
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
  callPopUp(){
    return  <CheckoutAssurance name = {this.state.rowId} cm={0} year = {this.state.year} month = {this.state.month} montant = {this.state.montant} type = {this.state.type}/>
  }

  updateFacture = (props)=>{
    this.setState({rowId:props.id }) 
    this.setState({month:props.mounth }) 
    this.setState({year:props.year }) 
    this.setState({montant:props.montant }) 
    this.setState({type:props.type }) 
    this.setState({etat:props.etat }) 
    this.setState({metricule:props.metricule }) 
  }

  update(event){
    event.preventDefault();
          const facture = {
                  etat: this.state.etat,
                  montant: this.state.montant,
                  type:this.state.type,
                  mounth:this.state.month,
                  id:this.state.rowId,
                  year:this.state.year,
                  
          };
  
          axios.post("http://192.168.56.31:8085/assurance/facture-update/"+this.state.rowId,facture)
          .then(response => console.log(response.status)) 
        
          console.log("est");
          document.getElementById("success").style.display="block"
          setTimeout(() => {
            document.getElementById("success").style.display="none"
        },2000);

          this.handleUpload()
        };
//componentDidMount(){
  //document.getElementById("test").style.background="red"
//}
    // componentDidMount() {
    //   $(document).ready(function () {
    //     $('#dataTableHover').DataTable();
    //     // ID From dataTable with Hover
    //   });
    // }
    handleDelete() { 
    
       axios({
         // Endpoint to send files
         url: "http://192.168.56.31:8085/assurance-facture/delete/"+this.state.rowId,
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
   
   handleUpload() { 
    document.getElementById("filtrer").style.display="block"
    this.setState ({isFirst : false})
    this.setState ({ factureId: document.getElementById('factureId').value },()=>{
     console.log( this.state.factureId)
     axios({
       // Endpoint to send files
       url: "http://192.168.56.31:8085/assurance-factures/"+this.state.factureId,
       method: "GET",
       })
   
       // Handle the response from backend here
       .then((res) => { 
           console.log(res.data); 
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
  axios({

  // Endpoint to send files
  url: "http://192.168.56.31:8085/facture/paye/"+this.state.factureId,
  method: "GET",
  })

  // Handle the response from backend here
  .then((res) => { 
      console.log(res.data);  
      this.setState({ factures: res.data })  
       // ID From dataTable with Hover
     
  })

  // Catch errors if any
  .catch((err) => { });
}
handleUploadNonP() { 
  axios({

  // Endpoint to send files
  url: "http://192.168.56.31:8085/facture/non paye/"+this.state.factureId,
  method: "GET",
  })

  // Handle the response from backend here
  .then((res) => { 
      console.log(res.data);  
      this.setState({ factures: res.data })  
       // ID From dataTable with Hover
     
  })

  // Catch errors if any
  .catch((err) => { });
} 

componentDidMount() {
  $('#exampleModalCenter').on('hidden.bs.modal', function (e) {
    this.handleUpload()
})

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
    if( element.etat.match(f.value) || element.type.match(f.value) || (element.mounth).toString().match(f.value) || (element.year).toString().match(f.value) || (element.montant).toString().match(f.value)  ){
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

                <div style={{display:"none",position:"fixed", right: "40px",top: "80px",zIndex:20}}  class="alert alert-danger alert-dismissible " role="alert" id="error">
                    
                    <h6><i class="fas fa-ban"></i><b> illegal operation !</b></h6>
                    you cannot delete a bill not payed!
        </div>

<div style={{display:"none",position:"fixed", right: "40px",top: "80px",zIndex:20}}  class="alert alert-success alert-dismissible " role="alert" id="success">
                    <h6><i class="fas fa-check"></i><b> Success!</b></h6>
                    operation done with success
                </div>
        
        <div style={{display:"none"}}  class="alert alert-danger alert-dismissible fade show" role="alert" id="error">
                    
                    <h6><i class="fas fa-ban"></i><b> illegal operation !</b></h6>
                    you cannot delete a bill not payed!
        </div>
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Assurance Service</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Assurance Service</li>
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
                
                
               <div class="btn-group dropup" style={{width:"10%",marginLeft:"10px"}}>
                  <div class="btn-group dropup" style={{width:"10%",marginLeft:"10px"}}>
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                          Select etat
                        </button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" onClick={(e) => this.handleUploadP()}>Paye</a>
                          <a class="dropdown-item" onClick={(e) => this.handleUploadNonP()}>Non Paye</a>
                          <a class="dropdown-item" onClick={(e) => this.handleUpload()}>Tous</a>
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

                {this.state.isFirst?<strong><p style={{color:"rgb(117, 117, 117)"}}>NB : you can search by client matricule</p></strong>:
                  <table class="table align-items-center table-flush table-hover" id="dataTableHover">
                    <thead class="thead-light">
                      <tr>
                      <th>Matricule</th>
                        <th>month</th>
                        <th>year</th>
                        <th>montant</th>
                       
                        <th>type</th>
                        <th>date Payement</th>
                        <th>etat</th>
                        <th >Action</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                    {this.state.factures.length==0 ? <tr class="odd"><td class="dataTables_empty" colSpan={10} valign="top">No data available in table</td></tr>: <></>}
                   
                    {
                    this.state.factures.map((facture) => (
                        <tr key={facture.id}>
                          <td>{facture.metricule}</td>
                        <td>{facture.mounth}</td>
                        <td>{facture.year}</td>
                        <td>{facture.montant}</td>
                        <td>{facture.type}</td>
                        <td>{facture.datePaiment}</td>
                        {facture.etat!=="non paye"? <td><span class="badge badge-success" style={{padding:"5px"}}>{facture.etat}</span></td> : <td><span class="badge badge-danger" style={{padding:"5px"}}>{facture.etat}</span></td>}
                        {facture.etat=="non paye"?<button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="btn btn-success mb-1" style={{margin:"5px"}}  onClick={(e) =>{this.updateRowId(facture)}}><i class="fas fa-check"></i></button>:<></>}
                        {this.state.user.role == "admin"? <button type="button" class="btn btn-danger mb-1 " data-toggle="modal" data-target="#delete" style={{margin:"5px"}} onClick={(e) =>{this.updateRowId(facture)}}><i class="fas fa-trash"></i></button>:<></>}
                        {this.state.user.role == "admin"? <button type="button" class="btn btn-info mb-1" data-toggle="modal" data-target="#elbahja" style={{margin:"5px"}} onClick={(e) =>{this.updateRowId(facture)}}>update</button> :<></>}
                        

                      </tr>
                      
))
                    }
                     
                    </tbody>
                  </table>}
                  
                </div>
              </div>
            </div>
          </div>


          






          <div class="modal" tabindex="-1" role="dialog" id="elbahja"> 
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Update Facture</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <form>
                 <div class="form-group">
                     <label>Id</label>
                     <input type="text" class="form-control" id="exampleInputId" aria-describedby="emailHelp"  value={this.state.rowId}
                        readOnly/>
                   </div>
                   <div class="form-group">
                     <label>Matricule</label>
                     <input type="text" class="form-control" id="exampleInputM" aria-describedby="emailHelp"  value={this.state.matricule}
                        readOnly/>
                   </div>
                 <div class="form-row">
                   <div class="col">
                     <label>Month</label>
                     <input type="text" class="form-control" id="exampleInputFirstName" placeholder="the month" value={this.state.month} onChange={(e) => this.setState({month:e.target.value})}/>
                   </div>
                   <div class="col">
                     <label>Year</label>
                     <input type="text" class="form-control" id="exampleInputLastName" placeholder="The year" value={this.state.year} onChange={(e) => this.setState({year:e.target.value})}/>
                   </div>
                   </div>

                   <div class="form-row">
                    
                    <div class="col">
                      <label>amount</label>
                      <input type="text" class="form-control" id="exampleInputFirstName" placeholder="amount" value={this.state.montant} onChange={(e) => this.setState({montant:e.target.value})}/>
                    </div>
                    <div class="col">
                      <label>type</label>
                      <input readOnly type="text" class="form-control" id="exampleInputLastName" placeholder="type" value={this.state.type} onChange={(e) => this.setState({type:e.target.value})}/>
                    </div>
                    </div>

                    <div class="form-group">
                     <label>State</label>
                     <input type="text" class="form-control" id="exampleInputId" aria-describedby="emailHelp" value={this.state.etat} onChange={(e) => this.setState({etat:e.target.value})}
                        readOnly/>
                   </div>
                    </form>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-outline-danger" data-dismiss="modal" onClick={(e)=>{this.update(e)}}>Save changes</button>
                </div>
              </div>
            </div>
          </div>




          
          
        </>)
        
    }

}

       