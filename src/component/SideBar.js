import React,{Component} from "react";
export default class SideBar extends Component {
  state = {
    user:JSON.parse(localStorage.getItem("user"))
  }
  componentDidMount() {
     this.setState(JSON.parse(localStorage.getItem("user")))
     console.log(this.state.user.role)

    }
    render(){
        return(
                <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
        <div className="sidebar-brand-icon">
          
        </div>
        <div className="sidebar-brand-text mx-3">ENSAJ Tashilat</div>
      </a>
      <hr className="sidebar-divider my-0"/>
      {this.state.user.role === "admin"?
     <>
      <li className="nav-item active">
        <a className="nav-link" href="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
      </li>
      <hr className="sidebar-divider"/>
      </>
      :<>
      <li className="nav-item active">
        <a className="nav-link" href="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Shortcuts</span></a>
      </li>
      <hr className="sidebar-divider"/>
      </>}
      {this.state.user.role === "admin"?
     <>
     <div className="sidebar-heading">
      Management
      </div>
      <li className="nav-item">
        <a className="nav-link" href="/user-service">
          <i className="fas fa-fw  fa-solid fa-user"></i>
          <span>Users</span>
        </a>
      </li>
      <hr className="sidebar-divider"/>
      </>
      :<>
      
      </>}
      
      <div className="sidebar-heading">
        Services
      </div>
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBootstrap"
          aria-expanded="true" aria-controls="collapseBootstrap">
          <i className="far fa-fw fa-window-maximize"></i>
          <span>Electro Water Services</span>
        </a>
        <div id="collapseBootstrap" className="collapse" aria-labelledby="headingBootstrap" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Electro Water Services</h6>
            <a className="collapse-item" href="/water-service">Water Service</a>
            <a className="collapse-item" href="/electric-service">Electro Service</a>
           
          </div>
        </div>
      </li> 
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBootstrap22"
          aria-expanded="true" aria-controls="collapseBootstrap">
          <i className="fa fa-university" aria-hidden="true"></i>
          <span>School Service</span>
        </a>
        <div id="collapseBootstrap22" className="collapse" aria-labelledby="headingBootstrap" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">School service</h6>
            <a className="collapse-item" href="/registrations">School Fees service</a>
            <a className="collapse-item" href="/universities">university service</a>
           
          </div>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseForm" aria-expanded="true"
          aria-controls="collapseForm">
          <i className="fab fa-fw fa-wpforms"></i>
          <span>Phones services</span>
        </a>
        <div id="collapseForm" className="collapse" aria-labelledby="headingForm" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Phones services</h6>
            <a className="collapse-item" href="abonnement-service">Subscription service</a>
            <a className="collapse-item" href="recharge-service">Reloads service</a>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/assurance">
          <i className="fas fa-car"></i>
          <span>Assurance</span>
        </a>
      </li>
      
     
      <hr className="sidebar-divider"/>
      <div className="version" id="version-ruangadmin"></div>
    </ul>
   
        );
    }
}