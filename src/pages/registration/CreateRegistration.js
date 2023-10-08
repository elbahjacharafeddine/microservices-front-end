import React, { Component } from 'react'
import RegistrationService from '../../services/RegistrationService';



export default class CreateRegistration extends Component {
    constructor(props){
        super(props)

        this.state={
          last_name:'',
          first_name:'',
          matricule:'',
          number:'',
          payment_date:'',
          registration_date:'',
          university:'',
          year:'',
          amount:'',
          hidediv: false,
          fields: {},
          errors: {},
          universities:[],


            
        }
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeAmountHandler=this.changeAmountHandler.bind(this);
        this.changeMatriculeHandler=this.changeMatriculeHandler.bind(this);
        this.changeNumberHandler=this.changeNumberHandler.bind(this);
        this.changePaymentDateHandler=this.changePaymentDateHandler.bind(this);
        this.changeRegistrationDateHandler=this.changeRegistrationDateHandler.bind(this);
        this.changeUniversityHandler=this.changeUniversityHandler.bind(this);
        this.changeYearHandler=this.changeYearHandler.bind(this);

        

        this.saveRegistration = this.saveRegistration.bind(this); 

    
    }

    componentDidMount(){
      RegistrationService.getUniversities().then((res) => {
           this.setState({universities: res.data});
      });
    }
    handleClick=(event) =>{
      event.preventDefault();
      this.setState({
         hidediv: true
       });
     }
    // saveRegistration method
    saveRegistration = (r) => {
       r.preventDefault();
       let registration = {
          last_name:this.state.last_name,
          first_name:this.state.first_name,
          matricule:this.state.matricule,
          number:this.state.number,
          paymentDate:this.state.payment_date,
          registrationDate:this.state.registration_date,
          university:this.state.university,
          year:this.state.year,
          amount:this.state.amount
       };
       if(registration.last_name!="" &&registration.first_name!=""&&registration.matricule!=""&&registration.number!=""&&registration.paymentDate!=""&&registration.registrationDate!=""
       &&registration.university!="" && registration.year!="" &&registration.amount!=""
       ){
       console.log('registration => ' +JSON.stringify(registration));

       RegistrationService.createRegistration(registration).then(res =>{
         
            r.preventDefault();
            window.history.pushState({}, undefined, "/registrations");
            window.history.go();
       });
      }

    }

    

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
      this.setState({payment_date:event.target.value});
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
    cancel(){
      window.history.pushState({}, undefined, "/registrations");
      window.history.go();
    }
   
    
  render() {
    return (

      <div>
        

<div class="container-fluid">


<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Pay School Fees</h1>
    <a href="/registrations" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            class="fas fa-arrow-left fa-sm text-white-50"></i> Back</a>
</div>


<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Pay School Fees</h6>
    </div>

                <form>
                <div class="card-body">
                  {/* last_name first_name matricule number payment_date registration_date university year amount */}
                  <div class="form-group row">

               
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>Last name</label>
                    <input placeholder='Last Name' name="last_name" className='form-control'
                    value={this.state.last_name} onChange={this.changeLastNameHandler} required
                    />

                </div>
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>First name</label>
                    <input placeholder='First Name' name="first_name" className='form-control'
                    value={this.state.first_name} onChange={this.changeFirstNameHandler} required
                    />
                </div>
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>Matricule</label>
                    <input placeholder='matricule' name="matricule" className='form-control'
                    value={this.state.matricule} onChange={this.changeMatriculeHandler} required
                    />
                   
                </div>
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>Payment Mode</label>
                <select class="form-control form-control" name="payment_mode">
                            <option selected disabled>Select Status</option>
                            <option value="ESPECE" selected>ESPECE</option>
                            <option value="VISA CARD">VISA CARD</option>
                        </select>
                   
                </div>
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>number</label>
                    <input placeholder='number' type='number' name="number" className='form-control'
                    value={this.state.number} onChange={this.changeNumberHandler} required
                    />
                   
                </div>
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>payment_date</label>
                    <input placeholder='payment_date' type='date' name="payment_date" className='form-control'
                    value={this.state.payment_date} onChange={this.changePaymentDateHandler} required
                    />
                </div>
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>registration_date</label>
                    <input placeholder='registration_date' type='date' name="registration_date" className='form-control'
                    value={this.state.registration_date} onChange={this.changeRegistrationDateHandler} required
                    />
                   
                </div>
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>university</label>
                    {/* <input placeholder='university' name="university" className='form-control'
                    value={this.state.university} onChange={this.changeUniversityHandler} required
                    /> */}
                    

                        <select className="form-control" name="university">
                            <option selected disabled >Select Status</option>
                            {this.state.universities.map(
                             university =>
                            <option key ={this.state.university=university.name}>{university.name}</option>
                            )}
                        </select>
 
                </div>    
               
                
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>year</label>
                    <input placeholder='year'  type='number' name="year" className='form-control'
                    value={this.state.year} onChange={this.changeYearHandler} required
                    />
                </div>
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                <label>amount</label>
                    <input placeholder='amount' type='number' step=".01" name="amount" className='form-control'
                    value={this.state.amount} onChange={this.changeAmountHandler} required
                    />
                </div>
                </div>
                  
                  
                 
                <div class="col-sm-6 mb-3 mt-3 mb-sm-0">
                  <button className='btn btn-success' onClick={this.saveRegistration}>Save</button>
                  <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                  {/* <div className="date-range" hidden = {this.state.hidediv}> */}
                  
                  <button className='btn btn-primary'  onClick={this.handleClick} style={{marginLeft:"10px"}}>Pay Fees</button>
                  {/* </div>
           */}
                  </div>  
                  </div>
                  
                </form>
                
              </div>
            </div>
            



            {/* Payment ajouté le 18 */}

            <div class="container py-5" id="results" className="search-results" hidden = {!this.state.hidediv}>
    
    <div class="row mb-4">
        {/* <div class="col-lg-8 mx-auto text-center">
            <h1 class="display-6">Bootstrap Payment Forms</h1>
        </div> */}
    </div> 
    <div class="row">
        <div class="col-lg-6 mx-auto">
            <div class="card ">
                <div class="card-header">
                    <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                      
                        <ul role="tablist" class="nav bg-light nav-pills rounded nav-fill mb-3">
                            <li class="nav-item"> <a data-toggle="pill" href="#credit-card" class="nav-link active "> <i class="fas fa-credit-card mr-2"></i> Credit Card </a> </li>
                        </ul>
                    </div> 
                    <div class="tab-content">
                        
                        <div id="credit-card" class="tab-pane fade show active pt-3">
                            <form>
                                <div class="form-group"> <label for="username">
                                        <h6>Card Owner</h6>
                                    </label> <input type="text" name="username" placeholder="Card Owner Name" required class="form-control "/> </div>
                                <div class="form-group"> <label for="cardNumber">
                                        <h6>Card number</h6>
                                    </label>
                                    <div class="input-group"> <input type="text" name="cardNumber" placeholder="Valid card number" class="form-control " required />
                                        <div class="input-group-append"> <span class="input-group-text text-muted"> <i class="fab fa-cc-visa mx-1"></i> <i class="fab fa-cc-mastercard mx-1"></i> <i class="fab fa-cc-amex mx-1"></i> </span> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-8">
                                        <div class="form-group"> <label><span class="hidden-xs">
                                                    <h6>Expiration Date</h6>
                                                </span></label>
                                            <div class="input-group"> <input type="number" placeholder="MM" name="" class="form-control" required /> <input type="number" placeholder="YY" name="" class="form-control" required /> </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group mb-4"> <label data-toggle="tooltip" title="Three digit CV code on the back of your card" >
                                                <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
                                            </label> <input type="text" required class="form-control" /> </div>
                                    </div>
                                </div>
                
                                <div class="card-footer"> <button type="button" class="subscribe btn btn-primary btn-block shadow-sm" onClick={this.saveRegistration}> Confirm Payment </button></div>
                            </form>
                        </div>
                    </div> 
               
                  
                </div>
            </div>
        </div>
    </div>

            {/* end payment */}
            </div>
            </div>

    )
  }
}
