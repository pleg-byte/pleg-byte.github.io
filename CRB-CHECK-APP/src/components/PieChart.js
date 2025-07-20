import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function PieChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["Poor", "Fair", "Good", "Excellent"],
        datasets: [
          {
            label: "CRB Status Checker",
            data: [300, 500, 700, 900],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 205, 86)",
              "rgb(54, 162, 235)",
              "rgb(119, 221, 119)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  return (
    <div>
      <canvas
        ref={chartRef}
        style={{ width: "100px", height: "100px" }}
      ></canvas>
    </div>
  );
}
