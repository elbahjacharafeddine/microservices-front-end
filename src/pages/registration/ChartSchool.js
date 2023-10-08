import * as React from 'react';
import axios from 'axios'; 
import YearPicker from "react-year-picker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,

} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
export const options2 = {
  responsive: true,
  plugins: {
    
    title: {
      display: true,
    },
  },
};


export const options = {
  responsive: true,
  plugins: {
    
    title: {
      display: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];


export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'paid',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(78, 115, 223, 0.5)",
      borderColor: "rgba(78, 115, 223, 1)",
    },
    {
      fill: true,
      label: 'unpaid',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

export default function WaterCharts(props) {
  
  const [donuChart, setDonuChart] = React.useState([]);
  const [lineChartP, setLineChartP] = React.useState([]);
  const [lineChartNp, setLineChartNp] = React.useState([]);
  const [barChart, setBarChart] = React.useState([]);
  const [barChartYear, setBarChartYear] = React.useState("2001");
  const [lineChartYear, setLineChartYear] = React.useState("2001");
  React.useEffect(()=>{
    loadDonutChart()
    loadLineChart()
    loadBarChart()
},[])
// lineChart 
 const LineChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
    },
  },
};
const LineChartData = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'paid',
      data: lineChartP,
      backgroundColor: "rgba(78, 115, 223, 0.5)",
      borderColor: "rgba(78, 115, 223, 1)",
    },
    {
      fill: true,
      label: 'unpaid',
      data: lineChartNp,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};
const loadLineChart = async()=>{
  axios({
      // Endpoint to send files
      url: "http://localhost:8080/water/statistics/line chart/"+lineChartYear,
      method: "GET",
      })
      // Handle the response from backend here
      .then((res) => {
        setLineChartP(res.data.p)
        setLineChartNp(res.data.n)
      })
  
      // Catch errors if any
      .catch((err) => { 
       
      });
}
// donuChart
const loadDonutChart = async()=>{
  axios({
      // Endpoint to send files
      url: "http://localhost:8080/water/statistics/donut chart",
      method: "GET",
      })
      // Handle the response from backend here
      .then((res) => {
        setDonuChart(res.data)
      })
  
      // Catch errors if any
      .catch((err) => { 
       
      });
}
const donuChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
    },
  },
};
 const donuChartData = {
  labels: ['unpaid', 'paid'],
  datasets: [
    {
      label: 'number of bills',
      data: donuChart,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        
      ],
      borderWidth: 1,
    },
  ],
};

//bar chart
const barChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Turnover per month',
    },
  },
};
const barChartData = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'turnover (Dh)',
      data: barChart,
      backgroundColor: "rgba(78, 115, 223, 0.5)",
      borderColor: "rgba(78, 115, 223, 1)",
    },
   
  ],
};
const loadBarChart = async()=>{
  axios({
      // Endpoint to send files
      url: "http://localhost:8080/water/statistics/bar chart/"+barChartYear,
      method: "GET",
      })
      // Handle the response from backend here
      .then((res) => {
        setBarChart(res.data)
      })
  
      // Catch errors if any
      .catch((err) => { 
       
      });
}
const handleChangeBar = (newValue)=>{
  setBarChartYear(newValue)
  console.log(newValue);
  axios({
    // Endpoint to send files
    url: "http://localhost:8080/water/statistics/bar chart/"+newValue,
    method: "GET",
    })
    // Handle the response from backend here
    .then((res) => {
      setBarChart(res.data)
    })

    // Catch errors if any
    .catch((err) => { 
     
    });
   
}
const handleChangeLine = (newValue)=>{
  setLineChartYear(newValue)
  axios({
    // Endpoint to send files
    url: "http://localhost:8080/water/statistics/line chart/"+newValue,
    method: "GET",
    })
    // Handle the response from backend here
    .then((res) => {
      setLineChartP(res.data.p)
      setLineChartNp(res.data.n)
    })

    // Catch errors if any
    .catch((err) => { 
     
    });
}

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
                  <h6 class="m-0 font-weight-bold text-primary">Number of paid and unpaid bills per month</h6>
                </div>
                
                <div class="card-body">
                <div align="right" style={{width:"100%",marginRight:"30px",zIndex:1300}} >
                    </div>
                    <YearPicker 
                  onChange={(newValue) => {
                    handleChangeLine(newValue);
              }}
                />
                  <Line options={LineChartOptions} data={LineChartData} />
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
                  <Doughnut options={donuChartOptions} data={donuChartData} />
                  <hr/>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Turnover per month</h6>
                </div>
                <div class="card-body">
                <YearPicker 
                  onChange={(newValue) => {
                    handleChangeBar(newValue);
              }}/>
                <Bar options={barChartOptions} data={barChartData} />
                  <hr/>
                </div>
              </div>
            </div>
            </div>
  </>
 );
}