import React, { Component } from 'react'
import RegistrationService from '../../services/RegistrationService';
import { useParams } from "react-router-dom";


export default class UpdateRegistration extends Component {
    constructor(props){
        super(props)

        this.state={
          id: this.props.match.params.id,
          last_name:'',
          first_name:'',
          matricule:'',
          number:'',
          payment_date:'',
          registration_date:'',
          university:'',
          year:'',
          amount:''


            
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

        

        this.updateRegistration = this.updateRegistration.bind(this); 

    
    }

    componentDidMount(){
        RegistrationService.getRegistrationById(this.state.id).then( (res) => {
            let registration = res.data;
            this.setState({

                last_name:registration.last_name,
                first_name:registration.first_name,
                matricule:registration.matricule,
                number:registration.number,
                payment_date:registration.payment_date,
                registration_date:registration.registration_date,
                university:registration.university,
                year:registration.year,
                amount:registration.amount

            });
        });
    }



    // saveRegistration method
    updateRegistration = (r) => {
       r.preventDefault();
       let registration = {
          last_name:this.state.last_name,
          first_name:this.state.first_name,
          matricule:this.state.matricule,
          number:this.state.number,
          payment_date:this.state.payment_date,
          registration_date:this.state.registration_date,
          university:this.state.university,
          year:this.state.year,
          amount:this.state.amount
       };
       console.log('registration => ' +JSON.stringify(registration));

       RegistrationService.updateRegistration(registration,this.state.id).then( res => {

                  this.props.history.push('/registrations');
       });

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
      this.props.history.push('/registrations');
    }
    
  render() {
    return (
      <div>

        <div className='container'>
          <div className ="row">
            <div className ="card col-md-6 offset-md-3 offset-md-3">
              <h3 className='text-center'>Edit Registration</h3>
              <div className='card-body'>
                <form>
                  {/* last_name first_name matricule number payment_date registration_date university year amount */}
                  <div className ="row">

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
                    <label>Matricule</label>
                    <input placeholder='matricule' name="matricule" className='form-control'
                    value={this.state.matricule} onChange={this.changeMatriculeHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>number</label>
                    <input placeholder='number' type='number' name="number" className='form-control'
                    value={this.state.number} onChange={this.changeNumberHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>payment_date</label>
                    <input placeholder='payment_date' type='date' name="payment_date" className='form-control'
                    value={this.state.payment_date} onChange={this.changePaymentDateHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>registration_date</label>
                    <input placeholder='registration_date' type='date' name="registration_date" className='form-control'
                    value={this.state.registration_date} onChange={this.changeRegistrationDateHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>university</label>
                    <input placeholder='university' name="university" className='form-control'
                    value={this.state.university} onChange={this.changeUniversityHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>year</label>
                    <input placeholder='year'  type='number' name="year" className='form-control'
                    value={this.state.year} onChange={this.changeYearHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>amount</label>
                    <input placeholder='amount' type='number' name="amount" className='form-control'
                    value={this.state.amount} onChange={this.changeAmountHandler}
                    />


                  </div>
                  
                  
                 
                  </div>
                  <button className='btn btn-success' onClick={this.updateRegistration}>Save</button>
                  <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>

                </form>
                
              </div>
            </div>
          </div>
        </div>




   
      </div>
    )
  }
}
