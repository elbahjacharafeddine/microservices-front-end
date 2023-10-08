import React, { useState, useEffect } from 'react'
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";

import YearPicker from "react-year-picker";
import axios from 'axios';


const AssuranceChart = () => {

    const [data, setData] = useState({})
    const [datap,setDatap] = useState({})
    const [datanonp,setDatanonp] = useState({})
    const [affaire,setAffaire] = useState({})
    const [barChartYear, setBarChartYear] = React.useState("2023");

    const labels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
    const dataChart = {
      labels: labels,
      datasets: [
        {
          label: "unpaid",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data:datanonp,
        
        },
        {
          fill: true,
          label: 'paid',
          data: data ,
          backgroundColor: "rgba(78, 115, 223, 0.5)",
          borderColor: "rgba(78, 115, 223, 1)",
        }
      ],
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'probability'
            }
          }]
        }     
      }
    };


    const dataAffaire = {
      labels: labels,
      datasets: [
        {
          label: "Turnover per month",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data:affaire,
        
        }
      ],
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'probability'
            }
          }]
        }     
      }
    };
    

    const data1 = {
      labels: ['Unpaid', 'paid'],
      datasets: [
        {
          label: '# of Votes',
          data: datap,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    
    const updateLineFcature = (newValue)=>{
      console.log(newValue);
      setBarChartYear(newValue)
      axios({
          // Endpoint to send files
          url: "http://192.168.56.31:8085/assurance/by-year/"+newValue,
          method: "GET",
          })
          // Handle the response from backend here
          .then((res) => {
            console.log(res.data);
            setAffaire(res.data)
          })
      
          // Catch errors if any
          .catch((err) => { 
           
          });
    }
    
      useEffect(() => {
        fetch(`http://192.168.56.31:8085/assurance/chart`)
        .then((response) => response.json())
        .then((actualData) =>  {
          
          console.log(actualData);
          setData(actualData)});

        fetch(`http://192.168.56.31:8085/chart-non-payer`)
        .then((response) => response.json())
        .then((actualData) =>  {
          setDatanonp(actualData)});
        

        fetch(`http://192.168.56.31:8085/pie-chart`)
        .then((response) => response.json())
        .then((actualData) => setDatap(actualData));

        fetch(`http://192.168.56.31:8085/chart-chaiffre-affaire`)
        .then((response) => response.json())
        .then((actualData) => setAffaire(actualData));


       
       }, []);
      

       return (<>
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Assurance statistics</h1>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="./">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Statistics</li>
            <li class="breadcrumb-item active" aria-current="page">Assurance statistics</li>
          </ol>
        </div>
        <div class="row">
          <div class="col-lg-8" >
            <div class="card mb-4">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Turnover per month</h6>
              </div>
              <div class="card-body">
              <YearPicker 
              onChange={(newValue) => {
                updateLineFcature(newValue);
          }}/>
              <Bar  data={dataAffaire} />
                <hr/>
                
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Totale number of paid and unpaid bills</h6>
              </div>
              <div class="card-body">
              <Pie  data={data1} />
              
                <hr/>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Number of paid and unpaid bills per month</h6>
              </div>
              <div class="card-body">
              <Line  data={dataChart} />
                <hr/>
              </div>
            </div>
          </div>
          </div>
</>
);
};

export default AssuranceChart;