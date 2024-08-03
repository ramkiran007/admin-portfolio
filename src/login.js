import React, { useEffect } from 'react';
import { Chart as ChartJS, Tooltip, Title, Legend, SubTitle, CategoryScale, LinearScale } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { Chart } from 'react-chartjs-2';

ChartJS.register(MatrixController, MatrixElement, CategoryScale, LinearScale, Tooltip, Title, Legend, SubTitle);

const Heatmap = () => {
  const data = {
    datasets: [
      {
        label: 'Precision matrix (Column Sum=1)',
        data: [
         
            { x: 1, y: 1, v: 0.542 }, { x: 2, y: 1, v: 0.000 }, { x: 3, y: 1, v: 0.188 },
            { x: 4, y: 1, v: 0.233 }, { x: 5, y: 1, v: 0.111 }, { x: 6, y: 1, v: 0.042 },
            { x: 1, y: 2, v: 0.034 }, { x: 2, y: 2, v: 0.623 }, { x: 3, y: 2, v: 0.000 },
            { x: 4, y: 2, v: 0.007 }, { x: 5, y: 2, v: 0.033 }, { x: 6, y: 2, v: 0.019 },
            { x: 7, y: 2, v: 0.193 }, { x: 1, y: 3, v: 0.042 }, { x: 2, y: 3, v: 0.000 },
            { x: 3, y: 3, v: 0.500 }, { x: 4, y: 3, v: 0.029 }, { x: 5, y: 3, v: 0.000 },
            { x: 6, y: 3, v: 0.000 }, { x: 7, y: 3, v: 0.027 }, { x: 1, y: 4, v: 0.212 },
            { x: 2, y: 4, v: 0.000 }, { x: 3, y: 4, v: 0.710 }, { x: 4, y: 4, v: 0.200 },
            { x: 5, y: 4, v: 0.000 }, { x: 6, y: 4, v: 0.000 }, { x: 7, y: 4, v: 0.027 },
            { x: 1, y: 5, v: 0.068 }, { x: 2, y: 5, v: 0.057 }, { x: 3, y: 5, v: 0.000 },
            { x: 4, y: 5, v: 0.043 }, { x: 5, y: 5, v: 0.400 }, { x: 6, y: 5, v: 0.185 },
            { x: 7, y: 5, v: 0.034 }, { x: 1, y: 6, v: 0.042 }, { x: 2, y: 6, v: 0.038 },
            { x: 3, y: 6, v: 0.000 }, { x: 4, y: 6, v: 0.014 }, { x: 5, y: 6, v: 0.000 },
            { x: 6, y: 6, v: 0.667 }, { x: 7, y: 6, v: 0.038 }, { x: 1, y: 7, v: 0.017 },
            { x: 2, y: 7, v: 0.264 }, { x: 3, y: 7, v: 0.500 }, { x: 4, y: 7, v: 0.007 },
            { x: 5, y: 7, v: 0.100 }, { x: 6, y: 7, v: 0.019 }, { x: 7, y: 7, v: 0.636 },
            { x: 1, y: 8, v: 0.025 }, { x: 2, y: 8, v: 0.000 }, { x: 3, y: 8, v: 0.000 },
            { x: 4, y: 8, v: 0.033 }, { x: 5, y: 8, v: 0.000 }, { x: 6, y: 8, v: 0.000 },
            { x: 7, y: 8, v: 0.000 }, { x: 1, y: 9, v: 0.017 }, { x: 2, y: 9, v: 0.000 },
            { x: 3, y: 9, v: 0.000 }, { x: 4, y: 9, v: 0.004 }, { x: 5, y: 9, v: 0.000 },
            { x: 6, y: 9, v: 0.000 }, { x: 7, y: 9, v: 0.000 }, { x: 1, y: 10, v: 0.017 },
            { x: 2, y: 10, v: 0.000 }, { x: 3, y: 10, v: 0.000 }, { x: 4, y: 10, v: 0.004 },
            { x: 5, y: 10, v: 0.000 }, { x: 6, y: 10, v: 0.000 }, { x: 7, y: 10, v: 0.000 },
            { x: 1, y: 11, v: 0.017 }, { x: 2, y: 11, v: 0.000 }, { x: 3, y: 11, v: 0.000 },
            { x: 4, y: 11, v: 0.004 }, { x: 5, y: 11, v: 0.000 }, { x: 6, y: 11, v: 0.000 },
            { x: 7, y: 11, v: 0.000 }, { x: 1, y: 12, v: 0.017 }, { x: 2, y: 12, v: 0.000 },
            { x: 3, y: 12, v: 0.000 }, { x: 4, y: 12, v: 0.004 }, { x: 5, y: 12, v: 0.000 },
            { x: 6, y: 12, v: 0.000 }, { x: 7, y: 12, v: 0.000 }
         
          
        ],
        backgroundColor: function(context) {
          const value = context.dataset.data[context.dataIndex].v;
          const alpha = (value + 0.5) / 2;
          return `rgba(0, 150, 0, ${alpha})`; // Adjust colors as needed
        },
        borderColor: 'rgba(0, 0, 0, 0.9)',
        borderWidth: 1,
        width: ({ chart }) => (chart.chartArea || {}).width / 20 - 1,
        height: ({ chart }) => (chart.chartArea || {}).height / 30 - 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], // X axis labels
        offset: true,
        grid: {
          offset: true,
        },
        title: {
          display: true,
          text: 'Predicted Class',
        },
      },
      y: {
        type: 'category',
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], // Y axis labels
        offset: true,
        grid: {
          offset: true,
        },
        title: {
          display: true,
          text: 'Original Class',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: () => '',
          label: (context) => `Value: ${context.dataset.data[context.dataIndex].v}`,
        },
      },
      title: {
        display: true,
        text: 'Precision Matrix (Column Sum=1)',
      },
    },
  };

  return <Chart type="matrix" data={data} options={options} />;
};

export default Heatmap;
