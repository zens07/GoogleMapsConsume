import React, { Component } from "react";
import { Bar, Pie } from "react-chartjs-2";
// import './style.js';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["Arsir", "Non Arsir"],
        datasets: [
          {
            label: "Population",
            data: [50, 50],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
      ticks: [],
      sec: 0,
    };
  }
  handleAjaxData = () => {
    const dataArsir = 1;
    const dataNonArsir = 2;
    const data = [
      this.state.chartData.datasets[0].data[0] + dataArsir,
      this.state.chartData.datasets[0].data[1] + dataNonArsir,
    ];

    const chartData = {
      labels: ["Arsir", "Non Arsir"],
      datasets: [
        {
          label: "Population",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
        },
      ],
    };
    this.setState({
      chartData,
      ticks: [
        this.state.chartData.datasets[0].data[0] - 10,
        this.state.chartData.datasets[0].data[1] + 10,
      ],
    });
  };

  loadData = () => {
    const myData = setInterval(() => this.handleAjaxData(), 5000);
    setInterval(
        () => this.setState({ sec: this.state.sec + 1 },
        console.log(this.state.sec, " detik")
    ), 1000);
    setTimeout(() => {
      clearInterval(myData);
    }, 100000);
    // console.log(myData);
  };
  render() {
    return (
      <div className="App-footer" style={{ position: "relative" }}>
        <div style={{ position: "absolute" }}>
          <button
            style={{ backgroundColor: "grey", width: "auto", padding: 5 }}
            onClick={this.loadData}
          >
            Load Data
          </button>
        </div>
        <div className="content-chart">
          <Pie
            data={this.state.chartData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="content-chart">
          <Bar
            data={this.state.chartData}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      max: this.state.ticks[0],
                      min: this.state.ticks[1],
                      stepSize: this.state.ticks[1] + this.state.ticks[0] / 100,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default Chart;
