import * as React from 'react';


export default function AgentDashboard() {
    return(
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Shortcuts</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="./">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Shortcuts</li>
             
            </ol>
          </div>
          <div class="row">
          <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Electric / water service</h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/waterElec.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <div class="card-body">
               
                <div class="btn-group dropright " style={{width:"10%"}}>
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                          Pay a bill
                        </button>
                        <div class="dropdown-menu ">
                          <a class="dropdown-item" href="/water-service">water service</a>
                          <a class="dropdown-item" href="/electric-service">electric service</a>
                        </div>
                      </div>
                 
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Phone service</h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/call.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <div class="card-body">
                <div class="btn-group dropright " style={{width:"10%"}}>
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                          Pay a bill
                        </button>
                        <div class="dropdown-menu ">
                          <a class="dropdown-item" href="/recharge-service">recharge service</a>
                          <a class="dropdown-item" href="/abonnement-service">abonnement service</a>
                        </div>
                      </div>
                      </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">University service</h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/university.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <div class="card-body">
                <div class="btn-group dropright " style={{width:"10%"}}>
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                          Pay a bill
                        </button>
                        <div class="dropdown-menu ">
                          <a class="dropdown-item" href="/registrations">school Fees Service</a>
                          <a class="dropdown-item" href="/universities">university Service</a>
                        </div>
                      </div>
                      </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Insurance service</h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/insurance.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <div class="card-body">
                <a type="button" class="btn btn-primary mb-1" href="/assurance">Pay a bill</a>
                  
                </div>
              </div>
            </div>
          </div>
          </div>
    )
}