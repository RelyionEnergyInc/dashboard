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
  valueA: number[][];
  timeA: number[];
  minY: number;
  maxY: number;
  label: string;
}

export function LineChart({ valueA, timeA, minY, maxY, label }: LineChartProps) {

  // Future jack: 
  // https://www.chartjs.org/docs/latest/samples/line/multi-axis.html

  const options = {
    responsive: true,
    scales: {
      y: {
        min: minY,
        max: maxY,
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
        text: label,
      },
    },
    // maintainAspectRatio: false,
  };

  const values = valueA.map((value, index) => {
    return {
      x: timeA[index],
      y: value,
    };
  });
  const labels = [...timeA];


  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        fill: false,
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
  label: string;
}

export function BarChart({ valueA, valueB, valueC, label }: BarChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: label,
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