import { useState, useRef, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';

interface MeterProps {
  value: number;
  max: number;
}




export function Meter(props: MeterProps) {
  return (
    <GaugeChart
      id="gauge-chart1"
      nrOfLevels={200}
      percent={props.value / props.max}
      animate={true}
      animateDuration={2000}
      textColor="#000"
      colors={['#5BE12C', '#F5CD19', '#EA4228']}
      arcsLength={[0.3, 0.5, 0.2]}
    />
  )
}

const gaugeStyle = {
  maxWidth: "20vw",
  height: 250,
}



export default function GaugeModels() {
  const values = [50, 73, 21, 35, 45, 93, 62, 75, 32, 9, 100];
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setTimeout(() => setCounter(counter + 1), 1000);
  }, [counter]);

  // console.log(values[counter % values.length]);
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",

    }}>
      <div style={gaugeStyle}>
        <Meter value={values[counter % values.length]} max={100} />
      </div>
      <div style={gaugeStyle}>
        <Meter value={Math.floor(Math.random() * (100 - values[counter % values.length]) + values[counter % values.length])} max={100} />
      </div>
      <div style={gaugeStyle}>
        <Meter value={Math.floor(Math.random() * 99 + 1)} max={100} />
      </div>
    </div>
  );
}

