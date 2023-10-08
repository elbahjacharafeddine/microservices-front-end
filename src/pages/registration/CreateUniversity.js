import React, { Component } from 'react'
import RegistrationService from '../../services/RegistrationService';



export default class createUniversity extends Component {
    constructor(props){
        super(props)

        this.state={
          code:'',
          name:'',
          address:'',
          
          hidediv: false,
          fields: {},
          errors: {},


            
        }
        this.changeCodeHandler=this.changeCodeHandler.bind(this);
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.changeAddressHandler=this.changeAddressHandler.bind(this);
      

        

        this.saveUniversity = this.saveUniversity.bind(this); 

    
    }
    handleClick=(event) =>{
      event.preventDefault();
      this.setState({
         hidediv: true
       });
     }
    // saveUniversity method
    saveUniversity = (r) => {
       r.preventDefault();
       let registration = {
          code:this.state.code,
          name:this.state.name,
          address:this.state.address,
          
       };
       if(registration.code!="" &&registration.name!=""&&registration.address!="" ){
       console.log('university => ' +JSON.stringify(registration));

       RegistrationService.createUniversity(registration).then(res =>{
         
            r.preventDefault();
            window.history.pushState({}, undefined, "/universities");
            window.history.go();
       });
      }

    }

    

    changeCodeHandler=(event) => {
      this.setState({code:event.target.value});
    }
    changeNameHandler=(event) => {
      this.setState({name:event.target.value});
    }
  
    changeAddressHandler=(event) => {
      this.setState({address:event.target.value});
    }
    cancel(){
      window.history.pushState({}, undefined, "/universities");
      window.history.go();
    }
   
    
  render() {
    return (

      <div>
        

<div class="container-fluid">


<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">University</h1>
    <a href="/universities" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            class="fas fa-arrow-left fa-sm text-white-50"></i> Back</a>
</div>


<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">University</h6>
    </div>

                <form>
                <div class="card-body">
                  {/* code name matricule number payment_date registration_date address year amount */}
                  <div class="form-group row">

               
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>University code</label>
                    <input placeholder='Code' name="code" className='form-control'
                    value={this.state.code} onChange={this.changeCodeHandler} required
                    />

                </div>
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>University name</label>
                    <input placeholder='Name' name="name" className='form-control'
                    value={this.state.name} onChange={this.changeNameHandler} required
                    />
                </div>
                
                <div class="col-sm-6 mb-4 mt-3 mb-sm-0">
                <label>University Address</label>
                    <input placeholder='Address' name="address" className='form-control'
                    value={this.state.address} onChange={this.changeAddressHandler} required
                    />
                </div>
            
                  
                  
                 
                <div class="col-sm-12 mb-3 mt-3 mb-sm-4">
                <center>
                  <button className='btn btn-success' onClick={this.saveUniversity}>Save</button>
                  <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                  </center>
                  </div>  
                  </div>
                  </div>
                </form>
                
              </div>
            </div>
          
            </div>
          

    )
  }
}
