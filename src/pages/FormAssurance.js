import React,{Component} from "react";
import axios from 'axios'; 
import CheckoutAssuranceTwo from "../component/CheckoutAssuranceTwo";

export default class FormService extends Component {
  constructor(props){
    super(props);
    this.state = this.initialState;
    this.state.show=false
    this.userChange=this.userChange.bind(this);
    this.submitUser=this.submitUser.bind(this);
    
  }
  


  initialState = {
    firstName:"",lastName:"",password:"",email:""
    }



    resetUser=() => {
      this.setState(() => this.initialState)
      }
      submitUser= event =>{
        event.preventDefault();
        const facture = {
                etat: this.state.etat,
                metricule: this.state.metricule,
                montant: this.state.montant,
                type:this.state.type,
                dateDebut:this.state.dateDebut,
                dateFin:this.state.dateFin,
                

        };
      //  axios.post("http://localhost:8080/facture-new",facture)
      //   .then(response => {
     //    if(response.data!=null){
        //this.setState({"show":true});
        //setTimeout(() => this.setState({"show":false}),3000);
     //    console.log(response.data);
     //    }
     //    else{
        //this.setState({"show":false});
      //   }});
        //this.setState(this.initialState);
      }

      userChange =event =>{
        this.setState({
          [event.target.name]:event.target.value
        })
      };




    componentDidMount() {
    //   $(document).ready(function () {
    //     $('#dataTableHover').DataTable();
    //     // ID From dataTable with Hover
    //   });

    document.getElementById("payment_card").style.visibility = "hidden";
     }

showCard(){
  document.getElementById("payment_card").style.visibility = "visible";
  
    if (document.getElementById('paymentcard').checked) {
        //alert("checked");
        document.getElementById("payment_card").style.visibility = "visible";
    } else {
      document.getElementById("payment_card").style.visibility = "hidden";
    }

}

handleChange(event) {
  this.setState({value: event.target.value});
}

callPopUp(){
  return  <CheckoutAssuranceTwo name = {this.state.rowId} cm={0} dated = {this.state.dateDebut} fin = {this.state.dateFin} montant = {this.state.montant} type = {this.state.type} metricule={this.state.metricule}/>
}

  
    render(){
      const {etat,metricule,montant,type,dateFin,dateDebut}=this.state;
        return(<>

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Assurance Service</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Assurance Service</li>
            </ol>
        </div>
<section>
  <div class="row d-sm-flex align-items-center justify-content-center mb-4">
    <div class="col-md-8 mb-4 ">
      <div class="card mb-4 ">
        <div class="card-header py-3">
          <h5 class="mb-0" style={{textAlign:"center"}}>New insurance</h5>
        </div>
        <div class="card-body ">
          <form onSubmit={this.submitUser}>

            <div class="form-outline mb-4">
              <label class="form-label" for="metricule">Matricule:</label>
              <input type="text" id="metricule" class="form-control" name="metricule"  required value={metricule} onChange={this.userChange} />

            </div>


            <div class="form-outline mb-4">
              <label class="form-label" for="form6Example4">Start date:</label>
              <input type="date" id="form6Example4" class="form-control" name="dateDebut" required value={dateDebut} onChange={this.userChange}/>
            </div>


            <div class="form-outline mb-4">
              <label class="form-label" for="form6Example5">End date:</label>
              <input type="date" id="form6Example5" class="form-control" name="dateFin" required value={dateFin} onChange={this.userChange}/>
            </div>


            <div class="form-outline mb-4">
              <label class="form-label" for="form6Example6">Type:</label>
              <select className="form-control" name="type" value={type} onChange={this.userChange}>
                <option value="car">Car</option>
                <option value={"motorbike"}>Motorbike</option>
                <option value={"house"}>House</option>
              </select>
            </div>

            <hr class="my-4" />

            <h5 class="mb-4">Payment</h5>
            

            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="paymentcard" onClick={this.showCard} />
              <label class="form-check-label" for="paymentcard">
                By Card
              </label>
            </div>
            <br/>
            
            <div id="payment_normale">
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <label class="form-label" for="formNameOnCard">Amount</label>
                  <input type="text" id="formNameOnCard" class="form-control" name="montant" required value={montant} onChange={this.userChange}/>
                </div>
              </div>
            </div>
            </div>
            
            <div id="payment_card">
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <input type="text" id="formNameOnCard" class="form-control" />
                  <label class="form-label" for="formNameOnCard">Name on card</label>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <input type="text" id="formCardNumber" class="form-control" />
                  <label class="form-label" for="formCardNumber">Credit card number</label>
                </div>
              </div>
            </div>
            </div>

            <button class="btn btn-primary btn-lg btn-block" type="submit" data-toggle="modal" data-target="#exampleModalCenter">
              Valide
            </button>
          </form>
        </div>
      </div>
    </div>


  </div>
</section>



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

</>)
    }
}