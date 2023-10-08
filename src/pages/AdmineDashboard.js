import * as React from 'react';


export default function AdminDashboard() {
    return(
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Statistics</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="./">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
             
            </ol>
          </div>
          <div class="row">
          <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Electric / water statistics</h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/waterElec.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <div class="card-body">
               
                <div class="btn-group dropright " style={{width:"10%"}}>
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                          show statistics
                        </button>
                        <div class="dropdown-menu ">
                          <a class="dropdown-item" href="/water statistics">water statistics</a>
                          <a class="dropdown-item" href="/electric statistics">electric statistics</a>
                        </div>
                      </div>
                 
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Phone statistics</h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/call.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <div class="card-body">
                 
                <a type="button" class="btn btn-primary mb-1" href="/recharge-statistics">show statistics</a>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">University statistics</h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/university.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <div class="card-body">
                <a type="button" class="btn btn-primary mb-1" href="/school-fees-statistic">show statistics</a>
                  
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Insurance statistics</h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/insurance.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <div class="card-body">
                <a type="button" class="btn btn-primary mb-1" href="/assurance-statics">show statistics</a>

                  
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card shadow-sm mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Users statistics</h6>
                </div>
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-center" >
                <img src={require('../assets/user.png')} style={{width:"30%"}} alt="waterElec service"/>                
                </div>
                <a style={{color:"white"}} href="/user statistic">
                <div class="card-body">
                
                <button type="button" class="btn btn-primary mb-1">show statistics</button>
                </div>
                </a>
              </div>
            </div>
          </div>
          </div>
    )
}