import * as React from 'react';


export default function PageAssurance() {
    return(
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Assurance</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="./">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Insurance Service</li>
             
            </ol>
          </div>
          <div class="row">
          <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Insurance </h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/insurance.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <div class="card-body">
                <a href="/assurance-service"><button type="button" class="btn btn-primary mb-1">Check all</button></a>
                  
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Insurance </h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/insurance.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <div class="card-body">
                <a href="/assurance-new"><button type="button" class="btn btn-primary mb-1">Pay new Facture</button></a>
                  
                </div>
              </div>
            </div>
          </div>
          </div>
    )
}