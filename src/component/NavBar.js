import React,{Component} from "react";
export default class Navbar extends Component {
      state = {
        user: JSON.parse(localStorage.getItem("user"))
      }
    
    render(){
        return(
            <>
            
            <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
          <button id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>
          <ul className="navbar-nav ml-auto">
           
            <div className="topbar-divider d-none d-sm-block"></div>
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <img className="img-profile rounded-circle" src="img/boy.png" sx={{maxWidth: "60px"}}/>
                <span className="ml-2 d-none d-lg-inline text-white small">Hello {this.state.user.firstName}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="javascript:void(0);" data-toggle="modal" data-target="#logoutModal">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
        
        

            </>
        );}
    }