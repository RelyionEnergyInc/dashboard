import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import { useEffect, useState } from 'react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

interface LineChartProps {
  valueA: number[];
  timeA: number[];
}

export function LineChart({ valueA, timeA }: LineChartProps) {


  const options = {
    responsive: true,
    scales: {
      y: {
        min: 59950,
        max: 60050,
        stepSize: 5,
      },
      x:
      {

      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
    // maintainAspectRatio: false,
  };

  const values = [...valueA]
  const labels = [...timeA];


  const data = {
    labels,
    datasets: [
      {
        label: 'Frequency',
        data: values,
        backgroundColor: ['rgba(255, 99, 132, 0.5)'],
      },
    ],
  };
  return (
    <Line data={data} options={options} height={300} />
  )
}

interface BarChartProps {
  valueA: number;
  valueB: number;
  valueC: number;
}

export function BarChart({ valueA, valueB, valueC }: BarChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
    // maintainAspectRatio: false,
  };

  const labels = ['A', 'B', 'C'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [valueA, valueB, valueC],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [valueC, valueB, valueA],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Bar data={data} options={options} width={500} height={200} />
  )
}