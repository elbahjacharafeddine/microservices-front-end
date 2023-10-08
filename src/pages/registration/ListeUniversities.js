import React, {useRef ,Component } from 'react'
import RegistrationService from '../../services/RegistrationService'
import { useReactToPrint } from 'react-to-print'
import { useNavigate } from 'react-router-dom';
import PDF from './PDF';
import MyToast from './MyToast';
export default class ListeUniversities extends Component {
    constructor(props){
        super(props)
        // const componentRef = useRef();
        // const handlePrint = useReactToPrint({
        //   content: () => componentRef.current,
        //   documentTitle:'School Fees',
        //   onAfterPrint: () =>alert('Print success')
        // });

              

        this.state={
            universities:[],
            show:false,
            id:null,
            code:'',
            name:'',
            address:'',
            value:'',
            tableFilter:[],
            dataSource:[],
            user :JSON.parse(localStorage.getItem("user"))
            
            
        }

        this.addUniversity=this.addUniversity.bind(this);
        // this.filterData=this.filterData.bind(this);
        this.editUniversity=this.editUniversity.bind(this);
        this.deleteUniversity=this.deleteUniversity.bind(this);


        this.changeCodeHandler=this.changeCodeHandler.bind(this);
        this.changeNameHandler=this.changeNameHandler.bind(this);
       
        this.changeAddressHandler=this.changeAddressHandler.bind(this);




        // this.updateRegistration = this.updateRegistration.bind(this);
    }
    
    
    componentDidMount(){
        RegistrationService.getUniversities().then((res) => {
             this.setState({universities: res.data});
             this.setState({dataSource: res.data});
        });
        RegistrationService.getUniversityById(this.state.id).then( (res) => {
          let registration = res.data;
          this.setState({

              code:registration.code,
              name:registration.name,
              address:registration.address,
            

          });
      });
    }

    deleteUniversity(id){
      RegistrationService.deleteUniversity(id).then( res => {
           this.setState({universities: this.state.universities.filter(regist => regist.id !==id+1)});
      });
      this.setState({show:true});
      setTimeout(() => this.setState({ show: false }), 2500); 

    }

    addUniversity= (e) => {
      e.preventDefault();
      window.history.pushState({}, undefined, "/adduniversity");
      window.history.go();
      
      
    }

    editUniversity(id){

      // this.props.history.push(`/updateRegistration/${id}`);
      RegistrationService.getUniversityById(id).then( (res) => {
        let registration = res.data;
        this.setState({
            id:registration.id,
            code:registration.code,
            name:registration.name,
            address:registration.address,

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
  //        code:this.state.code,
  //        name:this.state.name,
  //        matricule:this.state.matricule,
  //        number:this.state.number,
  //        payment_date:this.state.payment_date,
  //        registration_date:this.state.registration_date,
  //        address:this.state.address,
  //        year:this.state.year,
  //        amount:this.state.amount
  //     };
  //     console.log('registration => ' +JSON.stringify(registration));

  //     RegistrationService.updateRegistration(registration,this.state.id).then( res => {

  //                this.props.history.push('/universities');
  //     });

  //  }

   

   

   changeCodeHandler=(event) => {
     this.setState({code:event.target.value});
   }
   changeNameHandler=(event) => {
     this.setState({name:event.target.value});
   }
   
   changeAddressHandler=(event) => {
     this.setState({address:event.target.value});
   }
   




    // ViewDataTableRegistration(){
    //   this.props.push('/AllShoolFees');
    // }
    

  
render() {
        
    return (
      <div>
         <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">University Service</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">School Service</li>
              <li class="breadcrumb-item active" aria-current="page">University Service</li>
            </ol>

        
          </div>
          <div class="row"></div>
            <div class="col-lg-12">
              <div class="card mb-4 p-2">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
              <button className='btn btn-primary breadcrumb-item' onClick={this.addUniversity} style={{marginRight:"20px"}}>Add University</button>

                  <form className="navbar-search" style={{width:"70%"}}>
                      <div className="input-group" >
                        <input type="text" className="form-control bg-light border-1 small" placeholder="What do you want to look for?"
                        value={this.state.value} onChange={(e) => this.setState({value:e.target.value})}
                    
                          aria-label="Search" aria-describedby="basic-addon2"  sx={{borderColor: "#3f51b5;",width:"100%"}} id="registrationId"/>
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button" onClick={(e)=>{
                          const result = this.state.universities.filter(registration => {
                            return registration.code.toLowerCase().match(this.state.value.toLowerCase()) || registration.name.toLowerCase().match(this.state.value.toLowerCase())
                            || registration.address.toLowerCase().match(this.state.value.toLowerCase())
                            ;
                            
                           });
                    
                           this.setState({tableFilter:result});
                    
                    
                        }}>
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                    </div>
        {/* <h2 className="text-center mb-0">School fees Table</h2> */}
        
        {/* <a href={"/AllShoolFees"}>DataTable of Registrations</a> */}
        {/* <button className='btn btn-primary' onClick={this.ViewDataTableRegistration}>DataTable of Registrations</button> */}
        
         <div className='row' >  {/*ref={componentRef} */}
         <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"University Deleted Successfully."}
            type={"success"}
          />
        </div>
        
        <div class="table-responsive p-3 ">
                  <table class="table align-items-center table-flush table-hover table-bordered">
                     <thead class="thead-light">
              <tr>
                <th>University Code</th>
                <th>University Name</th>
                <th>University Address</th>
                {this.state.user.role == "admin"?<th>Actions</th>:<></>}
              </tr>
              </thead>

              <tbody>
                {
                  this.state.value.length >0 ?  this.state.tableFilter.map(
                        registration =>
                        <tr key ={registration.id}>
                            <td>{registration.code}</td>
                            <td>{registration.name}</td>
                            <td>{registration.address}</td>
                            {this.state.user.role == "admin"? <td>
                            <a  data-toggle="modal" data-target="#updateModal">

                              <button className="btn btn-info" onClick ={ () => this.editUniversity(registration.id)}>Update</button>
                              
                                        </a>
                              {/* <button onClick ={ () => this.editUniversity(registration.id)} className="btn btn-info">Update</button> */}
                              
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
                                                  <div class="modal-body">Select "Delete" below if you want to delete This university!.</div>
                                                  <div class="modal-footer">
                                                      <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                                      <button data-dismiss="modal" style={{marginLeft:"12px"}} onClick ={ () => this.deleteUniversity(registration.id)} className="btn btn-danger">Delete</button>
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
                                                              {/* code name matricule number payment_date registration_date address year amount */}
                                                              <div className ="row d-sm-flex align-items-center justify-content-between mb-4" >

                                                              <div className='form-group'>
                                                                <label>Code</label>
                                                                <input placeholder='Last Name' name="code" className='form-control'
                                                                value={this.state.code} onChange={this.changeCodeHandler} required
                                                                />
                                                              </div>
                                                              <div className='form-group'>
                                                                <label>Name</label>
                                                                <input placeholder='First Name' name="name" className='form-control'
                                                                value={this.state.name} onChange={this.changeNameHandler}
                                                                />
                                                              </div>
                                                              
                                                              <div className='form-group'>
                                                                <label>Address</label>
                                                                <input placeholder='address' name="address" className='form-control'
                                                                value={this.state.address} onChange={this.changeAddressHandler}
                                                                />
                                                              </div>
                                                            
                                                              
                                        
                                                              </div>
                                                              <center><button className='btn btn-outline-primary btn-lg ' onClick={(r) => {
                                                                                r.preventDefault();

                                                                                
                                                                             
                                                                                let registration2 = {
                                                                                  code:this.state.code,
                                                                                  name:this.state.name,
                                                                                  address:this.state.address,
                                                                                 
                                                                                };
                                                                                console.log('registration => ' +JSON.stringify(registration2));

                                                                                RegistrationService.updateUniversity(registration2,this.state.id).then( res => {

                                                                                                    r.preventDefault();
                                                                                                    window.history.pushState({}, undefined, "/universities");
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
                                                      <button data-dismiss="modal" style={{marginLeft:"12px"}} onClick ={ () => this.deleteUniversity(registration.id)} className="btn btn-danger">Delete</button>
                                                  </div> */}
                                              </div>
                                          </div>
                                  
                                   {/* fin update model */}

                              
                            </td>:<></>}
                        </tr>

                   
                
               

               
                                                        
                                                       

                                              


                        
                      
                 

                  )

                  :

                  this.state.universities.map(
                    registration =>
                    <tr key ={registration.id}>
                        <td>{registration.code}</td>
                        <td>{registration.name}</td>
                        <td>{registration.address}</td>
                        {this.state.user.role == "admin"? <td>
                        <a  data-toggle="modal" data-target="#updateModal">
                 
                          <button className="btn btn-info" onClick ={ () => this.editUniversity(registration.id)}>Update</button>
                          
                                    </a>
                          {/* <button onClick ={ () => this.editUniversity(registration.id)} className="btn btn-info">Update</button> */}
                          
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
                                              <div class="modal-body">Select "Delete" below if you want to delete This university!.</div>
                                              <div class="modal-footer">
                                                  <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                                  <button data-dismiss="modal" style={{marginLeft:"12px"}} onClick ={ () => this.deleteUniversity(registration.id)} className="btn btn-danger">Delete</button>
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
                                                          {/* code name matricule number payment_date registration_date address year amount */}
                                                          <div className ="row d-sm-flex align-items-center justify-content-between mb-4" >

                                                          <div className='form-group'>
                                                                <label>Code</label>
                                                                <input placeholder='Last Name' name="code" className='form-control'
                                                                value={this.state.code} onChange={this.changeCodeHandler} required
                                                                />
                                                              </div>
                                                              <div className='form-group'>
                                                                <label>Name</label>
                                                                <input placeholder='First Name' name="name" className='form-control'
                                                                value={this.state.name} onChange={this.changeNameHandler}
                                                                />
                                                              </div>
                                                              
                                                              <div className='form-group'>
                                                                <label>Address</label>
                                                                <input placeholder='address' name="address" className='form-control'
                                                                value={this.state.address} onChange={this.changeAddressHandler}
                                                                />
                                                              </div>


                                                          </div>
                                                          
                                                          
                                                        
                                                          
                                                          <center><button className='btn btn-outline-primary btn-lg ' onClick={(r) => {
                                                                            r.preventDefault();

                                                                            
                                                                         
                                                                            let registration2 = {
                                                                              code:this.state.code,
                                                                              name:this.state.name,
                                                                              
                                                                              address:this.state.address,
                                                                             
                                                                            };
                                                                            console.log('registration => ' +JSON.stringify(registration2));

                                                                            RegistrationService.updateUniversity(registration2,this.state.id).then( res => {

                                                                                                r.preventDefault();
                                                                                                window.history.pushState({}, undefined, "/universities");
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
                                                  <button data-dismiss="modal" style={{marginLeft:"12px"}} onClick ={ () => this.deleteUniversity(registration.id)} className="btn btn-danger">Delete</button>
                                              </div> */}
                                          </div>
                                      </div>
                              
                               {/* fin update model */}

                          
                               </td>:<></>}
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
