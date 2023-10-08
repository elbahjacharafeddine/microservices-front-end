import React, { Component } from "react";
import axios from 'axios';
import Checkout from '../component/Checkout'
import $ from 'jquery';


export default class RechargeService extends Component {
    state = {
        recharges: [],
        rowId: "",
        month: "",
        year: "",
        montant: "",
        type: "",
        operateur: "",
        tel: "",
        rechargeId: "",
        user: JSON.parse(localStorage.getItem("user")),
        counter: ""

    }
    componentDidMount() {
        this.setState({ user: JSON.parse(localStorage.getItem("user")) }, () => {
            this.counterNumber()
            document.getElementById("filtrer").style.display="block"

          })
        this.handleUpload()
    }

    updateRowId(props) {
        this.setState({ rowId: props.id })
        this.setState({ month: props.month })
        this.setState({ year: props.year })
        this.setState({ montant: props.montant })
        this.setState({ type: props.type })
        this.setState({ tel: props.tel })
        this.setState({ operateur: props.operateur })

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
    handleUpload() {
        axios({

            // Endpoint to send files
            url: "http://192.168.48.118:8086/userAbonnement/getAllRecharges",
            method: "GET",
        })

            // Handle the response from backend here
            .then((res) => {
                console.log(res.data);
                this.setState({ recharges: res.data })
                // ID From dataTable with Hover

            })


            // Catch errors if any
            .catch((err) => { });
    }
    callPopUp() {
        return <Checkout name={this.state.rowId} cm={0} year={this.state.year} month={this.state.month} montant={this.state.montant} type={this.state.type} />
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
            url: "http://192.168.48.118:8086/userAbonnement/deleteRecharge/" + this.state.rowId,
            method: "DELETE",
        })

            // Handle the response from backend here
            .then((res) => {
                document.getElementById("added").style.display = "block"
                setTimeout(() => {
                    document.getElementById("added").style.display = "none"
                }, 2000);
                this.setState({ recharges: res.data })

                // $('#dataTableHover').DataTable().destroy(); 
                // ID From dataTable with Hover

            })

            // Catch errors if any
            .catch((err) => {
                console.log("error is!!!!!!!")
                console.log(err)

            });
    }
    refreshPage() {
        window.location.reload();
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
        this.state.recharges.forEach(element => {
          if((element.month).toString().match(f.value) || (element.year).toString().match(f.value) || (element.montant).toString().match(f.value)  ){
            list.push(element)
            console.log(f.value);
          }
        else{
          console.log("not found");
        }
        });      
        this.setState({recharges : list})
      }
    



    onSubmit = async (e) => {
        this.setState({ montant: document.getElementById('selectMontant').value, tel: document.getElementById('selectPhone').value, operateur: document.getElementById('selectOperateur').value, type: document.getElementById('selectType').value },

            async () => {
                console.log(this.state.montant)


                let montant = this.state.montant;
                let operateur = this.state.operateur;
                let tel = this.state.tel;
                let type = this.state.type;
                let month = new Date().getMonth() + 1
                let year = new Date().getFullYear()
                const userRecharge = { montant, operateur, tel, type, month, year };
                await axios.post("http://192.168.48.118:8086/userAbonnement/"+this.state.user.id+"/addRecharge", userRecharge)


                    // Handle the response from backend here
                    .then((res) => {
                        document.getElementById("added").style.display = "block"
                        setTimeout(() => {
                            document.getElementById("added").style.display = "none"
                        }, 2000);
                        console.log(res.data);

                        // $('#dataTableHover').DataTable().destroy(); 
                        // ID From dataTable with Hover

                    })

                    // Catch errors if any
                    .catch((err) => {
                        console.log("error is!!!!!!!")
                        console.log(err)
                    });
            })
    };









    render() {


        
        return (<>


            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Reloads Service</h1>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="./">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Phone Service</li>
                    <li class="breadcrumb-item active" aria-current="page">reloads Service</li>
                </ol>
            </div>
            <div style={{ display: "none", position: "fixed", right: "40px", top: "80px" }} class="alert alert-success alert-dismissible" role="alert" id="added">

                <h6><i class="fas fa-check"></i><b> Success!</b></h6>
                operation done with success
            </div>
            <div class="row"></div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card mb-4">
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >

                            <button type="button" class="btn btn-primary mb-1" data-toggle="modal" data-target="#add" style={{width:'20%'}}>Add reload</button>
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

                            <div class="modal fade" id="add" tabindex="-1" role="dialog"
                                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalCenterTitle">Add Phone to-up</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form>
                                            <div class="modal-body">

                                                <div class="form-group">
                                                    <label>Numero de télephone</label>
                                                    <input type="text" class="form-control" id="selectPhone" aria-describedby="emailHelp"

                                                        placeholder="Enter phone number" />
                                                </div>
                                                <div class="form-group">
                                                    <label >Operator</label>
                                                    <select class="select2-single form-control" id="selectOperateur">
                                                        <option value="">Select</option>
                                                        <option value="Orange">Orange</option>
                                                        <option value="INWI">INWI</option>
                                                        <option value="Maroc telecom">Maroc Telecom</option>

                                                    </select>
                                                </div>


                                                <div class="form-group">
                                                    <label >Type of reload</label>
                                                    <select class="select2-single form-control" id="selectType" >
                                                        <option value="">*3</option>
                                                        <option value="Orange">*5</option>
                                                        <option value="INWI">*6</option>
                                                        <option value="Maroc telecom">*7</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>Montant a payer</label>
                                                    <input type="text" class="form-control" id="selectMontant" aria-describedby="emailHelp"

                                                        placeholder="Enter an amount" />
                                                </div>

                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Close</button>
                                                <button onClick={((e) => this.onSubmit(e))} type="button" data-dismiss="modal" class="btn btn-primary">Save</button>

                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>


                            <div class="modal fade" id="delete" tabindex="-1" role="dialog"
                                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalCenterTitle">Are you sure you want to delete this reload?</h5>
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
                            <table class="table align-items-center table-flush table-hover" id="dataTableHover">
                                <thead class="thead-light">
                                    <tr>
                                        <th>month</th>
                                        <th>year</th>
                                        <th>montant</th>
                                        <th>Operateur</th>
                                        <th>Tel</th>
                                        <th>date Payement</th>
                                        <th >Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        this.state.recharges.map((recharge) => (
                                            <tr key={recharge.id}>
                                                <td>{recharge.month}</td>
                                                <td>{recharge.year}</td>
                                                <td>{recharge.montant}</td>
                                                <td>{recharge.operateur}</td>
                                                <td>{recharge.tel}</td>
                                                <td>{recharge.date}</td>
                                                {this.state.user.role == "admin" ? <button type="button" class="btn btn-danger mb-1 " data-toggle="modal" data-target="#delete" style={{ margin: "5px" }} onClick={(e) => { this.updateRowId(recharge) }}><i class="fas fa-trash"></i></button> : <></>}



                                            </tr>

                                        ))
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        </>)

    }

}

