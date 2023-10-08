import * as React from 'react';
import axios from 'axios';
import YearPicker from "react-year-picker";
import { TextField } from '@mui/material';
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

export default function RechargeCharts(props) {
  const [lineChartYear, setLineChartYear] = React.useState("2022");
  const [lineChartOrange, setLineChartOrange] = React.useState([]);
  const [lineChartInwi, setLineChartInwi] = React.useState([]);
  const [lineChartMarocTelecom, setLineChartMarocTelecom] = React.useState([]);
  const [lineChartP, setLineChartP] = React.useState([]);
  const [lineChartNp, setLineChartNp] = React.useState([]);
  const [donuChart, setDonuChart] = React.useState([]);
  const [donu2Chart, setDonu2Chart] = React.useState([]);
  const [barChart, setBarChart] = React.useState([]);
  const [barChartYear, setBarChartYear] = React.useState("2001");
  const [donutChartYear, setDonutChartYear] = React.useState("2022");
  const [donutChartTel, setDonutChartTel] = React.useState("");
  const [totalClients, setTotalclients] = React.useState("");
  const [totalRecharges, setTotalRecharges] = React.useState("");
  const [totalP, setTotalP] = React.useState("");
  const [totalNP, setTotalNP] = React.useState("");


  React.useEffect(() => {
    loadLineChartRecharge();
    loadLineChart();
    loadDonutChart()
    loadBarChart()
    loadDonut2Chart()
    loadTotalClient()
    loadTotalRecharge()
    loadTotalP()
    loadTotalNP()
  }, [])
  // lineChart 
  const LineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
    },
  };
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const LineChartDataRecharge = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Orange',
        data: lineChartOrange,
        backgroundColor: "rgba(78, 115, 223, 0.5)",
        borderColor: "rgba(78, 115, 223, 1)",
      },
      {
        fill: true,
        label: 'Inwi',
        data: lineChartInwi,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        fill: true,
        label: 'Maroc Telecom',
        data: lineChartMarocTelecom,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
      }
    ],
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
  const loadLineChart = async () => {
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/line chart/" + lineChartYear,
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
  const loadTotalClient = async () => {
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/total",
      method: "GET",
    })
      // Handle the response from backend here
      .then((res) => {
        setTotalclients(res.data)
      })

      // Catch errors if any
      .catch((err) => {

      });
  }
  const loadTotalP = async =>{
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/totalP",
      method: "GET",
    })
      // Handle the response from backend here
      .then((res) => {
        setTotalP(res.data)
      })

      // Catch errors if any
      .catch((err) => {

      });
  }
  const loadTotalNP = async =>{
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/totalNP",
      method: "GET",
    })
      // Handle the response from backend here
      .then((res) => {
        setTotalNP(res.data)
      })

      // Catch errors if any
      .catch((err) => {

      });
  }
  const loadTotalRecharge = async =>{
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/totalR",
      method: "GET",
    })
      // Handle the response from backend here
      .then((res) => {
        setTotalRecharges(res.data)
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
  const donut2ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
    },
  };
  const donuChartData = {
    labels: ['paid', 'unpaid'],
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
  const donut2ChartData = {
    labels: ['abonnement', 'recharge'],
    datasets: [
      {
        label: 'nombre',
        data: donu2Chart,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',

        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',

        ],
        borderWidth: 1,
      },
    ],
  };

  const loadDonutChart = async () => {
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/donut_chart",
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
  const loadDonut2Chart = async () => {
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/donut_chart2/" + donutChartTel + "/" + donutChartYear,
      method: "GET",
    })
      // Handle the response from backend here
      .then((res) => {
        setDonu2Chart(res.data)
      })

      // Catch errors if any
      .catch((err) => {

      });
  }
  const loadLineChartRecharge = async () => {
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/line chart/recharge/" + lineChartYear,
      method: "GET",
    })
      // Handle the response from backend here
      .then((res) => {
        setLineChartOrange(res.data.orange)
        setLineChartInwi(res.data.inwi)
        setLineChartMarocTelecom(res.data.maroc_telecom)
      })

      // Catch errors if any
      .catch((err) => {

      });
  }
  const handleChangeLineRecharge = (newValue) => {
    setLineChartYear(newValue)
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/line chart/recharge/" + newValue,
      method: "GET",
    })
      // Handle the response from backend here
      .then((res) => {
        setLineChartOrange(res.data.orange)
        setLineChartInwi(res.data.inwi)
        setLineChartMarocTelecom(res.data.maroc_telecom)
      })

      // Catch errors if any
      .catch((err) => {

      });
  }
  const handleChangeDonutT = (newValue) => {
    setDonutChartTel(newValue)
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/donut_chart2/" + newValue + "/" + donutChartYear,
      method: "GET",
    })
      // Handle the response from backend here
      .then((res) => {
        setDonu2Chart(res.data)
      })

      // Catch errors if any
      .catch((err) => {

      });
  }
  const handleChangeDonutY = (newValue) => {
    setDonutChartYear(newValue)
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/donut_chart2/" + donutChartTel + "/" + newValue,
      method: "GET",
    })
      // Handle the response from backend here
      .then((res) => {
        setDonu2Chart(res.data)
      })

      // Catch errors if any
      .catch((err) => {

      });
  }

  const handleChangeLine = (newValue) => {
    setLineChartYear(newValue)
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/line chart/" + newValue,
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
  const loadBarChart = async () => {
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/bar chart/" + barChartYear,
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
  const handleChangeBar = (newValue) => {
    setBarChartYear(newValue)
    console.log(newValue);
    axios({
      // Endpoint to send files
      url: "http://192.168.48.118:8086/userAbonnement/statistics/bar chart/" + newValue,
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



  return (<>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Phone statistics</h1>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="./">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Statistics</li>
        <li class="breadcrumb-item active" aria-current="page">Phone statistics</li>
      </ol>
    </div>
    <div class="row mb-3">
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1">Client</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{totalClients}</div>
                    <div class="mt-2 mb-0 text-muted text-xs">
                      <span>Totale number of</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-users fa-2x text-info"></i>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1">Total number of reloads</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{totalRecharges}</div>
                    <div class="mt-2 mb-0 text-muted text-xs">
                      <span>Totale number of</span>
                    </div>
                  </div>
                  <div class="col-auto">
                  <i class="fas fa-mobile fa-2x text-success" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1">Unpaid subscriptions</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{totalNP}</div>
                    <div class="mt-2 mb-0 text-muted text-xs">
                      <span>Totale number of Unpaid</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-money fa-2x text-warning"></i>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-uppercase mb-1">Paid subscriptions</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{totalP}</div>
                    <div class="mt-2 mb-0 text-muted text-xs">
                      <span>Totale number of paid</span>
                    </div>
                  </div>

                  <div class="col-auto">
                  <i class="fas fa-money fa-2x text-success"></i>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

    <div class="row">

      <div class="col-lg-4">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Paid and unpaid subscriptions</h6>
          </div>
          <div class="card-body">
            <Doughnut options={donuChartOptions} data={donuChartData} />
            <hr />
            Paid and unpaid subscriptions

          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Total number of paid and unpaid subscriptions</h6>
          </div>
          <div class="card-body">
            <div align="right" style={{ width: "100%", marginRight: "30px", zIndex: 1300 }} >
            </div>
            <YearPicker
              onChange={(newValue) => {
                handleChangeLine(newValue);
              }}
            />
            <Line options={LineChartOptions} data={LineChartData} />
            <hr />

          </div>
        </div>
      </div>

    </div>
    <div class="row">

      <div class="col-lg-4">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Subscriptions and reloads for a client</h6>
          </div>

          <div class="card-body">

            <YearPicker
              onChange={(newValue) => {
                handleChangeDonutY(newValue);
              }}
            />


            <Doughnut options={donut2ChartOptions} data={donut2ChartData} />
            <hr />
            <TextField
              onChange={(e) => {
                handleChangeDonutT(e.target.value);
              }}
              variant="outlined"
              sx={{ width: '200px' }}
              label="Client phone number"
            />

          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Turnover of subscriptions</h6>
          </div>
          <div class="card-body">
            <div align="right" style={{ width: "100%", marginRight: "30px", zIndex: 1300 }} >
            </div>
            <YearPicker
              onChange={(newValue) => {
                handleChangeBar(newValue);
              }}
            />
            <Bar options={barChartOptions} data={barChartData} />
            <hr />

          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Number of reloads for each Operator</h6>
          </div>

          <div class="card-body">

            <YearPicker
              onChange={(newValue) => {
                handleChangeLineRecharge(newValue);
              }}
            />


            <Bar options={LineChartOptions} data={LineChartDataRecharge} />
            <hr />


          </div>
        </div>
      </div>
      

    </div>


  </>
  );
}
