
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import SideBar from './component/SideBar';
import NavBar from './component/NavBar';
import WaterService from './pages/WaterService';
import ElectricService from './pages/ElectricService';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/error'; 
import Error404 from './pages/error404';
import AdminDashboard from './pages/AdmineDashboard';
import AgentDashboard from './pages/AgentDashboard'; 
import UserServices from './pages/UserServices';
import WaterCharts from './pages/WaterCharts';
import Statistiques from './pages/Statistiques';
import UserCharts from './pages/UserCharts'
import ElectricCharts from './pages/ElectricCharts';
import ListRegistration from "./pages/registration/ListRegistration";
import ListeUniversities from "./pages/registration/ListeUniversities";
import CreateUniversity from "./pages/registration/CreateUniversity";
import CreateRegistration from "./pages/registration/CreateRegistration";
import UpdateRegistration from "./pages/registration/UpdateRegistration";
import SchoolFeesStatistics from './pages/registration/SchoolFeesStatistics';
import AssuranceService from "./pages/AssuranceService"
import FormService from "./pages/FormAssurance"
import AssuranceChart from './pages/AssuranceChart';
import PageAssurance from './pages/PageAssurance';
import RechargeCharts from './pages/RechargeCharts';
import AbonnementService from './pages/AbonnementService';
import RechargeService from './pages/RechargeService';
import axios from 'axios'; 
export default class App extends Component {
    

    render() {
        return (
            <>
            <Routes>
                <Route path='*' exact={true} element={<Error/>} />
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>  
        </>

        )
    }
}
                