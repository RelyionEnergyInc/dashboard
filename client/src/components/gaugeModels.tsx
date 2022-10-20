import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart";
ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutModelProps {
  values: number[];
  labels: string[];
}

interface GaugeModelProps {
  value: number;
  label: string;
  levelCount: number;
  arcLengths: number[];
}


export const data = {
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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

const options = {
  responsive: true,
}

export function DoughnutModels({ values, labels }: DoughnutModelProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: values,
        backgroundColor: ['rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
      },
    ],
  };
  return (
    <Doughnut data={data} options={options} width={300} height={300} />
  );
}


// export function GaugeModels({ value, levelCount, label, arcLengths }: GaugeModelProps) {

export function GaugeModels() {
  return (
    <GaugeChart
      id="gauge-chart"
      textColor="#333"
      nrOfLevels={3}
      arcsLength={[0.8, 0.15, 0.05]}
      colors={["#5BE12C", "#F5CD19", "#EA4228"]}
      percent={0.4273035096951447}
      arcPadding={0.02}
    // text
    />
  );
}