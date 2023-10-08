import React, { useState, useEffect } from 'react'
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";


const Statistiques = () => {

    const [data, setData] = useState({})
    const labels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
    const dataChart = {
      labels: labels,
      datasets: [
        {
          label: "Statistics for Electrico-Water",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data:data
        },
      ],
    };

    const data1 = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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
    
    const chartFunction = () => {
        //data.datasets.data = 
        setData([0, 0, 5, 2, 20, 30, 45,0, 10, 5, 2, 20, 30, 45])
    }
    
      useEffect(() => {
        fetch(`http://localhost:8080/electric/chart`)
        .then((response) => response.json())
        .then((actualData) =>  setData(actualData));
       
       }, []);
      

       return (<>
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Water statistics</h1>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="./">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Statistics</li>
            <li class="breadcrumb-item active" aria-current="page">Water statistics</li>
          </ol>
        </div>
        <div class="row">
          <div class="col-lg-8" >
            <div class="card mb-4">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Area Chart</h6>
              </div>
              <div class="card-body">
              <Bar  data={dataChart} />
                <hr/>
                
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Bar Chart</h6>
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
                <h6 class="m-0 font-weight-bold text-primary">Bar Chart</h6>
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

export default Statistiques;