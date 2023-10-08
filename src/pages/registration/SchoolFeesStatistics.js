import React, { useState, useEffect } from 'react'
import Chart from "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import YearPicker from "react-year-picker";
import axios from 'axios';

const SchoolFeesStatistics = () => {

    const [data, setData] = useState({})
    const [lable, setLabel] = useState({})
    const [total, setTotal] = useState({})
    const [datauniversity, setDataUniversity] = useState(null)
    const [datachart, setDatachart] = useState({})
    const [barChartYear, setBarChartYear] = useState("2022");

    const labels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
    const dataChart = {
      labels: labels,
      datasets: [
        {
          label: "number of paid fees per month",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data:datachart
        },
      ],
    };

    const data1 = {
      labels: lable,
    //   options: {
    //     plugins: {
    //         title: {
    //             display: true,
    //             text: 'Custom Chart Title'
    //         }
    //     }
    // },
      datasets: [
        {
          label: 'number of students that paid school fees',
          data: total,
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

    const handleChangeBar = (newValue)=>{
      setBarChartYear(newValue)
      console.log(newValue);
      axios({
        // Endpoint to send files
        url: "http://localhost:8082/rest/schoolfees-statistics/"+newValue,
        method: "GET",
        })
        // Handle the response from backend here
        .then((res) => {
          setDatachart(res.data)
        })
    
        // Catch errors if any
        .catch((err) => { 
         
        });
       
    }
    
    const chartFunction = () => {
        //data.datasets.data = 
        setData([0, 0, 5, 2, 20, 30, 45,0, 10, 5, 2, 20, 30, 45])
    }
    
      useEffect(() => {
        fetch(`http://localhost:8082/rest/schoolfees-statistics/nbuniversities`)
        .then((response) => response.json())
        .then((dataUniversity) =>  {setDataUniversity(dataUniversity)
        // console.log(dataUniversity[0][0])
        const arr1=[];
        const arr2=[];

        for (let i = 0; i < dataUniversity.length; i++) {
          arr1[i]=dataUniversity[i][0]
          
          arr2[i]=dataUniversity[i][1]

        }
        console.log(arr1)
        console.log(arr2)
        setLabel(arr1);
        setTotal(arr2);
        // console.log(arr1)

      
      
      }
        );
       
       }, []);

       
      

       return (<>
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">School service</h1>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="./">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Statistics</li>
            <li class="breadcrumb-item active" aria-current="page">School service statistics</li>
          </ol>
        </div>
        <div class="row">
          <div class="col-lg-8" >
            <div class="card mb-4">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Area Chart</h6>
              </div>
              <div class="card-body">
              <YearPicker 
                  onChange={(newValue) => {
                    handleChangeBar(newValue);
              }}/>
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
          {/* <div class="col-lg-8">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Bar Chart</h6>
              </div>
              <div class="card-body">
              <Line  data={dataChart} />
                <hr/>
              </div>
            </div>
          </div> */}
          </div>
</>
);
};

export default SchoolFeesStatistics;