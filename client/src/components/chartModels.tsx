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
  Filler,
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
  LineElement,
  Filler,
);

interface LineChartProps {
  valueA: number[][];
  xAxisLabel?: string;
  yAxisLabel?: string;
  timeA: Date[];
  minY: number;
  maxY: number;
  label: string;
  header?: string;
  title?: string;
  fill?: boolean;
}

export function LineChart({ valueA, timeA, xAxisLabel, yAxisLabel, minY, maxY, label, header, title, fill }: LineChartProps) {

  // Future jack: 
  // https://www.chartjs.org/docs/latest/samples/line/multi-axis.html

  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: minY,
        suggestedMax: maxY,
        ticks: {
          // Change desnity of y-axis labels here
          autoSkip: true,
          maxTicksLimit: 7
        },
        title: {
          display: yAxisLabel !== undefined,
          text: yAxisLabel,
        },
      },
      x:
      {
        title: {
          display: xAxisLabel !== undefined,
          text: xAxisLabel,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: header,
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1 / 5,
  };

  const values = valueA.map((value, index) => {
    return {
      x: timeA[index],
      y: value,
    };
  });
  // Set labels to the seconds of the timeA array
  const labels = timeA.map((time) => {
    return time.getHours() % 12 + ':' + time.getMinutes() + ':' + time.getSeconds();
  });
  // const labels = [...timeA];



  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        fill: fill,
        pointBackgroundColor: 'rgba(255, 99, 132, 0.9)',
        backgroundColor: ['rgba(255, 99, 132, 0.5)'],
      },
    ],
  };
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      maxHeight: '15rem',
    }}>
      <h3>{title}</h3>
      <Line data={data} options={options} height={200} style={{ marginTop: '-3rem', paddingBottom: '3rem' }} />
    </div>
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