import React, {useRef ,Component } from 'react'
import RegistrationService from '../../services/RegistrationService'
import { useReactToPrint } from 'react-to-print'
import { useNavigate } from 'react-router-dom';
import PDF from './PDF';
import MyToast from './MyToast';
import axios from 'axios';
export default class ListRegistration extends Component {
    constructor(props){
        super(props)
        // const componentRef = useRef();
        // const handlePrint = useReactToPrint({
        //   content: () => componentRef.current,
        //   documentTitle:'School Fees',
        //   onAfterPrint: () =>alert('Print success')
        // });

              

        this.state={
            registrations:[],
            show:false,
            id:null,
            last_name:'',
            first_name:'',
            matricule:'',
            number:'',
            paymentDate:'',
            registration_date:'',
            university:'',
            year:'',
            amount:'',
            value:'',
            tableFilter:[],
            dataSource:[],
            universities:[],
            user :JSON.parse(localStorage.getItem("user")),
            counter: ""
            
            
        }

        this.addRegistration=this.addRegistration.bind(this);
        // this.filterData=this.filterData.bind(this);
        this.editRegistration=this.editRegistration.bind(this);
        this.deleteRegistration=this.deleteRegistration.bind(this);


        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeAmountHandler=this.changeAmountHandler.bind(this);
        this.changeMatriculeHandler=this.changeMatriculeHandler.bind(this);
        this.changeNumberHandler=this.changeNumberHandler.bind(this);
        this.changePaymentDateHandler=this.changePaymentDateHandler.bind(this);
        this.changeRegistrationDateHandler=this.changeRegistrationDateHandler.bind(this);
        this.changeUniversityHandler=this.changeUniversityHandler.bind(this);
        this.changeYearHandler=this.changeYearHandler.bind(this);



        // this.updateRegistration = this.updateRegistration.bind(this);
    }
    
    
    componentDidMount(){
        this.counterNumber()
     
        RegistrationService.getUniversities().then((res) => {
             this.setState({universities: res.data});
        });
     
        RegistrationService.getRegistrations().then((res) => {
             this.setState({registrations: res.data});
             this.setState({dataSource: res.data});
        });
        RegistrationService.getRegistrationById(this.state.id).then( (res) => {
          let registration = res.data;
          this.setState({

              last_name:registration.last_name,
              first_name:registration.first_name,
              matricule:registration.matricule,
              number:registration.number,
              paymentDate:registration.paymentDate,
              registration_date:registration.registration_date,
              university:registration.university,
              year:registration.year,
              amount:registration.amount

          });
      });
    }

    deleteRegistration(id){
      RegistrationService.deleteRegistration(id).then( res => {
           this.setState({registrations: this.state.registrations.filter(regist => regist.id !==id+1)});
      });
      this.setState({show:true});
      setTimeout(() => this.setState({ show: false }), 2500); 

    }

    addRegistration= (e) => {
      e.preventDefault();
      window.history.pushState({}, undefined, "/addregistration");
      window.history.go();
      
      
    }

    counterNumber() {

      axios({
        // Endpoint to send files
        url: "http://localhost:8083/operation/school/" + this.state.user.id,
        method: "GET",
      })
  
        // Handle the response from backend here
        .then((res) => {
          this.setState({ counter: res.data })
          console.log(res.data)
          // ID From dataTable with Hover
        })
  
        // Catch errors if any
        .catch((err) => { });
    }

    editRegistration(id){

      // this.props.history.push(`/updateRegistration/${id}`);
      RegistrationService.getRegistrationById(id).then( (res) => {
        let registration = res.data;
        this.setState({
            id:registration.id,
            last_name:registration.last_name,
            first_name:registration.first_name,
            matricule:registration.matricule,
            number:registration.number,
            paymentDate:registration.paymentDate,
            registration_date:registration.registration_date,
            university:registration.university,
            year:registration.year,
            amount:registration.amount,
            user :JSON.parse(localStorage.getItem("user"))

        });
    });
    }

    // filterData=(e)=>{
    //   if(e.target.value !=""){
    //     this.setState({value:e.target.value});
    //     const filterTable=this.state.dataSource.filter(o=>Object.keys(o).some(k=>
    //       String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
    //       this.setState({tableFilter:[...filterTable]})

    //   }else{
    //     this.setState({value:e.target.value});
    //     this.setState({dataSource:[...this.state.dataSource]});
        
    //   }


    // }



  //   updateRegistration = (r) => {
  //     r.preventDefault();
  //     let registration = {
  //        last_name:this.state.last_name,
  //        first_name:this.state.first_name,
  //        matricule:this.state.matricule,
  //        number:this.state.number,
  //        payment_date:this.state.payment_date,
  //        registration_date:this.state.registration_date,
  //        university:this.state.university,
  //        year:this.state.year,
  //        amount:this.state.amount
  //     };
  //     console.log('registration => ' +JSON.stringify(registration));

  //     RegistrationService.updateRegistration(registration,this.state.id).then( res => {

  //                this.props.history.push('/registrations');
  //     });

  //  }

   

   

   changeLastNameHandler=(event) => {
     this.setState({last_name:event.target.value});
   }
   changeFirstNameHandler=(event) => {
     this.setState({first_name:event.target.value});
   }
   changeMatriculeHandler=(event) => {
     this.setState({ matricule:event.target.value});
   }
   changeNumberHandler=(event) => {
     this.setState({number:event.target.value});
   }
   changePaymentDateHandler=(event) => {
     this.setState({paymentDate:event.target.value});
   }
   changeRegistrationDateHandler=(event) => {
     this.setState({registration_date:event.target.value});
   }
   changeUniversityHandler=(event) => {
     this.setState({university:event.target.value});
   }
   changeYearHandler=(event) => {
     this.setState({year:event.target.value});
   }
   changeAmountHandler=(event) => {
     this.setState({amount:event.target.value});
   }




    // ViewDataTableRegistration(){
    //   this.props.push('/AllShoolFees');
    // }
    

  
render() {
        
    return (
      <div>
         <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">School Fees Service</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">School Services</li>
              <li class="breadcrumb-item active" aria-current="page">School Fees Service</li>
            </ol>

        
          </div>
          <div class="row"></div>
            <div class="col-lg-12">
              <div class="card mb-4 p-2">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
              
          <button className='btn btn-primary' onClick={this.addRegistration} style={{marginRight:"20px"}}>Add Registration</button>
          {/* <button className='btn btn-primary' onClick={handlePrint}>Add Registration</button> */}
       
                  <form className="navbar-search" style={{width:"70%"}}>
                      <div className="input-group" >
                        <input type="text" className="form-control bg-light border-1 small" placeholder="What do you want to look for?"
                        value={this.state.value} onChange={(e) => this.setState({value:e.target.value})}
                    
                          aria-label="Search" aria-describedby="basic-addon2"  sx={{borderColor: "#3f51b5;",width:"100%"}} id="registrationId"/>
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button" onClick={(e)=>{
                          const result = this.state.registrations.filter(registration => {
                            return registration.last_name.toLowerCase().match(this.state.value.toLowerCase()) || registration.first_name.toLowerCase().match(this.state.value.toLowerCase())
                            || registration.university.toLowerCase().match(this.state.value.toLowerCase())
                            ;
                            
                           });
                    
                           this.setState({tableFilter:result});
                    
                    
                        }}>
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                        
                        
                      </div>
                    </form>
                    <div class=" dropdown no-arrow " style={{ marginLeft: "10px" }} >

                <a onClick={() => { this.counterNumber() }} class="nav-link btn-sm btn-info" href="" id="alertsDropdown" role="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-info-circle"></i>
                </a>

                <div class="dropdown-list dropdown-menu dropdown-menu-left shadow "
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

                    
                
        {/* <h2 className="text-center mb-0">School fees Table</h2> */}
        
        {/* <a href={"/AllShoolFees"}>DataTable of Registrations</a> */}
        {/* <button className='btn btn-primary' onClick={this.ViewDataTableRegistration}>DataTable of Registrations</button> */}
        
         <div className='row' >  {/*ref={componentRef} */}
         <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"School fes informations Deleted Successfully."}
            type={"success"}
          />
        </div>
         
        <div class="table-responsive p-3">
                  <table class="table align-items-center table-flush table-hover table-bordered" style={{width:"1300px"}}>
                     <thead class="thead-light" style={{overflowX: "scroll"}}>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>University</th>
                <th>Payment date</th>
                <th>Amount</th>
                <th >Payment receipt</th>
                {this.state.user.role == "admin"?<th colSpan={2}>Actions</th>:<></>}
              </tr>
              </thead>

              <tbody>
                {
                  this.state.value.length >0 ?  this.state.tableFilter.map(
                        registration =>
                        <tr key ={registration.id}>
                            <td>{registration.first_name}</td>
                            <td>{registration.last_name}</td>
                            <td>{registration.university}</td>
                            <td>{registration.paymentDate}</td>
                            <td>{registration.amount}</td>
                            <td><PDF  
                              first_name={registration.first_name} last_name={registration.last_name} university={registration.last_name}
                              amount={registration.amount} payment_date={registration.paymentDate}
                              /></td>
                           {this.state.user.role == "admin"?<> <td>
                            <a  data-toggle="modal" data-target="#updateModal">

                              <button className="btn btn-info" onClick ={ () => this.editRegistration(registration.id)}>Update</button>
                              
                                        </a></td>
                              {/* <button onClick ={ () => this.editRegistration(registration.id)} className="btn btn-info">Update</button> */}
                              
                              <td>   <a  data-toggle="modal" data-target="#deleteModal">
                              <button style={{marginLeft:"12px"}} className="btn btn-danger">Delete</button>
                                        </a></td>

                                      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalExample"
                                          aria-hidden="true">
                                          <div class="modal-dialog" role="document">
                                              <div class="modal-content">
                                                  <div class="modal-header">
                                                      <h5 class="modal-title" id="deleteModalExample">Are you Sure You wanted to Delete?</h5>
                                                      <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                                          <span aria-hidden="true">×</span>
                                                      </button>
                                                  </div>
                                                  <div class="modal-body">Select "Delete" below if you want to delete The client fes informations!.</div>
                                                  <div class="modal-footer">
                                                      <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                                      <button data-dismiss="modal" style={{marginLeft:"12px"}} onClick ={ () => this.deleteRegistration(registration.id)} className="btn btn-danger">Delete</button>
                                                  </div>
                                              </div>
                                          </div>
                                  </div>
                                  {/* debut update model */}

                                  <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalExample"
                                          aria-hidden="true">
                                          <div class="modal-dialog" role="document">
                                              <div class="modal-content">
                                                  <div class="modal-header">
                                                      <h5 class="modal-title" id="updateModalExample">Update</h5>
                                                      <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                                          <span aria-hidden="true">×</span>
                                                      </button>
                                                  </div>
                                                  <div class="modal-body">
                                                    {/* begin update */}

                                                    
                                                      
                                                        <div className ="card col">
                                                          {/* <h3 className='text-center'>Edit Registration</h3> */}
                                                          <div className='card-body'>
                                                            <form>
                                                              {/* last_name first_name matricule number payment_date registration_date university year amount */}
                                                              <div className ="row d-sm-flex align-items-center justify-content-between mb-4" >

                                                              <div className='form-group'>
                                                                <label>Last name</label>
                                                                <input placeholder='Last Name' name="last_name" className='form-control'
                                                                value={this.state.last_name} onChange={this.changeLastNameHandler} required
                                                                />
                                                              </div>
                                                              <div className='form-group'>
                                                                <label>First name</label>
                                                                <input placeholder='First Name' name="first_name" className='form-control'
                                                                value={this.state.first_name} onChange={this.changeFirstNameHandler}
                                                                />
                                                              </div>

                                                
                                                              
                                                              <div className='form-group'>
                                                                <label>payment_date</label>
                                                                <input placeholder='payment_date' type='date' name="paymentDate" className='form-control'
                                                                value={this.state.paymentDate} onChange={this.changePaymentDateHandler}
                                                                />
                                                              </div>
                                                              
                                                              <div className='form-group'>
                                                                <label>university</label>
                                                                {/* <input placeholder='university'  name="university" className='form-control'
                                                                value={this.state.university} onChange={this.changeUniversityHandler}
                                                                /> */}
                                                                <select className="form-control" name="university">
                                                                      <option selected disabled >Select University</option>
                                                                        {this.state.universities.map(
                                                                        univers =>
                                                                      <option value={this.state.university=univers.name}>{univers.name}</option>
                                                                        )}
                                                                  </select>
                                                              </div>
                                                            
                                                              <div className='form-group'>
                                                                <label>amount</label>
                                                                <input placeholder='amount' type='number' name="amount" className='form-control'
                                                                value={this.state.amount} onChange={this.changeAmountHandler}
                                                                />


                                                              </div>
                                                              
                                                              
                                                            
                                                              </div>
                                                              <center><button className='btn btn-outline-primary btn-lg ' onClick={(r) => {
                                                                                r.preventDefault();

                                                                                
                                                                             
                                                                                let registration2 = {
                                                                                  last_name:this.state.last_name,
                                                                                  first_name:this.state.first_name,
                                                                                  matricule:this.state.matricule,
                                                                                  number:this.state.number,
                                                                                  paymentDate:this.state.paymentDate,
                                                                                  registration_date:this.state.registration_date,
                                                                                  university:this.state.university,
                                                                                  year:this.state.year,
                                                                                  amount:this.state.amount
                                                                                };
                                                                                console.log('registration => ' +JSON.stringify(registration2));

                                                                                RegistrationService.updateRegistration(registration2,this.state.id).then( res => {

                                                                                                    r.preventDefault();
                                                                                                    window.history.pushState({}, undefined, "/registrations");
                                                                                                    window.history.go();
                                                                                                  });

                                                                            }}
                                                              
                                                              >Save</button></center>
                                                              {/* <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button> */}

                                                            </form>
                                                            
                                                          </div>
                                                        </div>
                                                      




   
      </div>

                                                    


                                                    {/* end update */}


                                                  </div>
                                                  {/* <div class="modal-footer">
                                                      <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                                      <button data-dismiss="modal" style={{marginLeft:"12px"}} onClick ={ () => this.deleteRegistration(registration.id)} className="btn btn-danger">Delete</button>
                                                  </div> */}
                                              </div>
                                          </div>
                                  
                                   {/* fin update model */}

                              
                                   </>
                            :<></>}
                        </tr>

                   
                
               

               
                                                        
                                                       

                                              


                        
                      
                 

                  )

                  :

                  this.state.registrations.map(
                    registration =>
                    <tr key ={registration.id}>
                        <td>{registration.first_name}</td>
                        <td>{registration.last_name}</td>
                        <td>{registration.university}</td>
                        <td>{registration.paymentDate}</td>
                        <td>{registration.amount}</td>
                        <td><PDF  
                          first_name={registration.first_name} last_name={registration.last_name} university={registration.last_name}
                          amount={registration.amount} payment_date={registration.paymentDate}
                          /></td>
                       {this.state.user.role == "admin"? <td>
                        <a  data-toggle="modal" data-target="#updateModal">

                          <button className="btn btn-info" onClick ={ () => this.editRegistration(registration.id)}>Update</button>
                          
                                    </a>
                          {/* <button onClick ={ () => this.editRegistration(registration.id)} className="btn btn-info">Update</button> */}
                          
                          <a  data-toggle="modal" data-target="#deleteModal">
                          <button style={{marginLeft:"12px"}} className="btn btn-danger">Delete</button>
                                    </a>

                                  <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalExample"
                                      aria-hidden="true">
                                      <div class="modal-dialog" role="document">
                                          <div class="modal-content">
                                              <div class="modal-header">
                                                  <h5 class="modal-title" id="deleteModalExample">Are you Sure You wanted to Delete?</h5>
                                                  <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                                      <span aria-hidden="true">×</span>
                                                  </button>
                                              </div>
                                              <div class="modal-body">Select "Delete" below if you want to delete The client fes informations!.</div>
                                              <div class="modal-footer">
                                                  <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                                  <button data-dismiss="modal" style={{marginLeft:"12px"}} onClick ={ () => this.deleteRegistration(registration.id)} className="btn btn-danger">Delete</button>
                                              </div>
                                          </div>
                                      </div>
                              </div>
                              {/* debut update model */}

                              <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="updateModalExample"
                                      aria-hidden="true">
                                      <div class="modal-dialog" role="document">
                                          <div class="modal-content">
                                              <div class="modal-header">
                                                  <h5 class="modal-title" id="updateModalExample">Update</h5>
                                                  <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                                      <span aria-hidden="true">×</span>
                                                  </button>
                                              </div>
                                              <div class="modal-body">
                                                {/* begin update */}

                                                
                                                  
                                                    <div className ="card col">
                                                      {/* <h3 className='text-center'>Edit Registration</h3> */}
                                                      <div className='card-body'>
                                                        <form>
                                                          {/* last_name first_name matricule number payment_date registration_date university year amount */}
                                                          <div className ="row d-sm-flex align-items-center justify-content-between mb-4" >

                                                          <div className='form-group'>
                                                            <label>Last name</label>
                                                            <input placeholder='Last Name' name="last_name" className='form-control'
                                                            value={this.state.last_name} onChange={this.changeLastNameHandler} required
                                                            />
                                                          </div>
                                                          <div className='form-group'>
                                                            <label>First name</label>
                                                            <input placeholder='First Name' name="first_name" className='form-control'
                                                            value={this.state.first_name} onChange={this.changeFirstNameHandler}
                                                            />
                                                          </div>

                                            
                                                          
                                                          <div className='form-group'>
                                                            <label>payment_date</label>
                                                            <input placeholder='payment_date' type='date' name="paymentDate" className='form-control'
                                                            value={this.state.paymentDate} onChange={this.changePaymentDateHandler}
                                                            />
                                                          </div>
                                                          
                                                          
                                                        
                                                          <div className='form-group'>
                                                            <label>amount</label>
                                                            <input placeholder='amount' type='number' name="amount" className='form-control'
                                                            value={this.state.amount} onChange={this.changeAmountHandler}
                                                            />
                                                          </div>

                                                          <div className='form-group'>
                                                            <label>university</label>
                                                            {/* <input placeholder='university'  name="university" className='form-control'
                                                                value={this.state.university} onChange={this.changeUniversityHandler}
                                                                /> */}
                                                                 <select className="form-control form-control" name="university">
                                                                      <option selected disabled >Select University</option>
                                                                        {this.state.universities.map(
                                                                        univers =>
                                                                              <option  key={this.state.university=univers.name}>{univers.name}</option>
                                                                              
                                                                        )}
                                                                  </select>
                                                          </div>
                                                          
                                                          
                                                        
                                                          </div>
                                                          <center><button className='btn btn-outline-primary btn-lg ' onClick={(r) => {
                                                                            r.preventDefault();

                                                                            
                                                                         
                                                                            let registration2 = {
                                                                              last_name:this.state.last_name,
                                                                              first_name:this.state.first_name,
                                                                              matricule:this.state.matricule,
                                                                              number:this.state.number,
                                                                              paymentDate:this.state.paymentDate,
                                                                              registration_date:this.state.registration_date,
                                                                              university:this.state.university,
                                                                              year:this.state.year,
                                                                              amount:this.state.amount
                                                                            };
                                                                            console.log('registration => ' +JSON.stringify(registration2));

                                                                            RegistrationService.updateRegistration(registration2,this.state.id).then( res => {

                                                                                                r.preventDefault();
                                                                                                window.history.pushState({}, undefined, "/registrations");
                                                                                                window.history.go();
                                                                                              });

                                                                        }}
                                                          
                                                          >Save</button></center>
                                                          {/* <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button> */}

                                                        </form>
                                                        
                                                      </div>
                                                    </div>
                                                  





  </div>

                                                


                                                {/* end update */}


                                              </div>
                                              {/* <div class="modal-footer">
                                                  <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                                  <button data-dismiss="modal" style={{marginLeft:"12px"}} onClick ={ () => this.deleteRegistration(registration.id)} className="btn btn-danger">Delete</button>
                                              </div> */}
                                          </div>
                                      </div>
                              
                               {/* fin update model */}

                          
                        </td>
                        :<></>}
                    </tr>

               
            
           

           
                                                    
                                                   

                                          


                    
                  
             

              )
                }
              </tbody>
            </table>
        </div>
        </div>
              </div></div></div>
         
          


   
      
    )
  }
}
