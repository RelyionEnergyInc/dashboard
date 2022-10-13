import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart() {
  return (
    <></>
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