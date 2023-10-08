import React, { Component } from "react";
import axios from 'axios';
import $ from 'jquery';
import CheckoutAbonnement from "../component/CheckoutAbonnement";


export default class AbonnementService extends Component {
  state = {
    abonnements: [],
    rowId: "",
    month: "",
    year: "",
    montant: "",
    type: "",
    abonnementId: "",
    user: JSON.parse(localStorage.getItem("user")),
    isFirst: true,
    counter: ""
  }
  componentDidMount() {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) }, () => {
      this.counterNumber()
    })
  }
  updateRowId(props) {
    this.setState({ rowId: props.id })
    this.setState({ month: props.month })
    this.setState({ year: props.year })
    this.setState({ montant: props.montant })
    this.setState({ type: props.type })
  }
  refreshPage() {
    window.location.reload();
  }
  callPopUp() {
    return <CheckoutAbonnement name={this.state.rowId} cm={0} year={this.state.year} month={this.state.month} montant={this.state.montant} type={this.state.type} />
  }
  counterNumber() {

    axios({
      // Endpoint to send files
      url: "http://192.168.48.82:8081/operation/recharge/" + this.state.user.id,
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

  testButton = function (event) {
    alert("Value of data-val here " + event.target.getAttribute("data-value"));
    document.getElementById("test").style.background = "red"
  }
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
      url: "http://192.168.48.118:8086/userAbonnement/deleteAbonnement/" + this.state.rowId,
      method: "DELETE",
    })

      // Handle the response from backend here
      .then((res) => {

        document.getElementById("deleted").style.display = "block"
        setTimeout(() => {
          document.getElementById("deleted").style.display = "none"
        }, 2000);
        this.setState({ abonnements: res.data })
        this.refreshPage()

        // $('#dataTableHover').DataTable().destroy(); 
        // ID From dataTable with Hover

      })

      // Catch errors if any
      .catch((err) => {
        console.log("error is!!!!!!!")
        console.log(err)


      });


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
    this.state.abonnements.forEach(element => {
      if((element.month).toString().match(f.value) || (element.year).toString().match(f.value) || (element.montant).toString().match(f.value)  ){
        list.push(element)
        console.log(f.value);
      }
    else{
      console.log("not found");
    }
    });      
    this.setState({abonnements : list})
  }

  handleUpload() {
    
    document.getElementById("filtrer").style.display="block"
    this.setState({ isFirst: false })
    this.setState({ abonnementId: document.getElementById('abonnementId').value }, () => {
      console.log(this.state.abonnementId)
      axios({
        // Endpoint to send files
        url: "http://192.168.48.118:8086/userAbonnement/getAbonnemntsByMatricule/" + this.state.abonnementId,
        method: "GET",
      })

        // Handle the response from backend here
        .then((res) => {
          console.log(res.data);
          this.setState({ abonnements: res.data })
          // $('#dataTableHover').DataTable().destroy(); 
          // ID From dataTable with Hover

        })

        // Catch errors if any
        .catch((err) => {
          this.setState({ abonnements: [] })
        });
    })


  }
  handleUploadP() {
    axios({

      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/getAbonnemntsPayeByMatricule/" + this.state.abonnementId,
      method: "GET",
    })

      // Handle the response from backend here
      .then((res) => {
        console.log(res.data);
        this.setState({ abonnements: res.data })
        // ID From dataTable with Hover

      })

      // Catch errors if any
      .catch((err) => { });
  }
  handleUploadNonP() {
    axios({

      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/getAbonnemntsNonPayeByMatricule/" + this.state.abonnementId,
      method: "GET",
    })

      // Handle the response from backend here
      .then((res) => {
        console.log(res.data);
        this.setState({ abonnements: res.data })
        // ID From dataTable with Hover

      })

      // Catch errors if any
      .catch((err) => { });
  }


  render() {
    return (<>

      <div style={{ display: "none" }} class="alert alert-danger alert-dismissible fade show" role="alert" id="error">


        <h6><i class="fas fa-ban"></i><b> illegal operation !</b></h6>
        you cannot delete a bill not payed!
      </div>
      <div style={{ display: "none", position: "fixed", right: "40px", top: "80px" }} class="alert alert-success alert-dismissible" role="alert" id="deleted">

        <h6><i class="fas fa-check"></i><b> Success!</b></h6>
        operation done with success
      </div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Subscription Service</h1>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="./">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Subscription/Reloads Service</li>
          <li class="breadcrumb-item active" aria-current="page">Subscription Service</li>
        </ol>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="card mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
              <form className="navbar-search" style={{ width: "70%" }}>
                <div className="input-group" >
                  <input type="text" className="form-control bg-light border-1 small" placeholder="What do you want to look for?"
                    aria-label="Search" aria-describedby="basic-addon2" sx={{ borderColor: "#3f51b5;", width: "100%" }} id="abonnementId" />
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



              <div class="btn-group dropup" style={{ width: "10%", marginLeft: "10px" }}>
                <div class="btn-group dropup" style={{ width: "10%", marginLeft: "10px" }}>
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
              <div class=" dropdown no-arrow " style={{ marginLeft: "30px" }} >

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

            <div class="table-responsive p-3">
            <input className="form-control bg-light border-1 small" type="text" id="filtrer" onChange={(e) => this.filter()}  style={{marginBottom:"10px",width: "20%",fontSize: "16px",display:"none",padding: "12px",float:"right"}} placeholder="Search for ..."/>
            {this.state.isFirst ? <strong><p style={{ color: "rgb(117, 117, 117)" }}>NB : you can search by client matricule or bill number</p></strong> :

              <table class="table align-items-center table-flush table-hover" id="dataTableHover">
                <thead class="thead-light">
                  <tr>
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

                  {
                    this.state.abonnements.map((abonnement) => (
                      <tr key={abonnement.id}>
                        <td>{abonnement.month}</td>
                        <td>{abonnement.year}</td>
                        <td>{abonnement.montant}</td>
                        <td>{abonnement.type}</td>
                        <td>{abonnement.datePayment}</td>
                        {abonnement.etat !== "not payed" ? <td><span class="badge badge-success" style={{ padding: "5px" }}>{abonnement.etat}</span></td> : <td><span class="badge badge-danger" style={{ padding: "5px" }}>{abonnement.etat}</span></td>}
                        {abonnement.etat == "not payed" ? <button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="btn btn-success mb-1" style={{ margin: "5px" }} onClick={(e) => { this.updateRowId(abonnement) }}><i class="fas fa-check"></i></button> : <></>}
                        {this.state.user.role == "admin" ? <button type="button" class="btn btn-danger mb-1 " data-toggle="modal" data-target="#delete" style={{ margin: "5px" }} onClick={(e) => { this.updateRowId(abonnement) }}><i class="fas fa-trash"></i></button> : <></>}



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

