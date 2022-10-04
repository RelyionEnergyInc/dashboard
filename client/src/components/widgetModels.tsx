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
      nrOfLevels={50}
      percent={props.value / props.max}
      textColor="#000"
      colors={['#5BE12C', '#F5CD19', '#EA4228']}
      arcsLength={[0.3, 0.5, 0.2]}
    />
  )
}



export default function WidgetModels() {
  const values = [50, 73, 21, 35, 45, 93, 62, 75, 32, 9, 100];
  const [currValueIndex, setCurrValueIndex] = useState(0);

  useEffect(() => {
    // currValueIndexRef.current = currValueIndex;
    const interval = setInterval(() => {
      console.log(currValueIndex);
      setCurrValueIndex(currValueIndex + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  console.log(currValueIndex);
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",

    }}>
      <div style={{ maxWidth: '20vw' }}>
        <Meter value={values[currValueIndex]} max={100} />
      </div>
      <div style={{ maxWidth: '20vw' }}>
        <Meter value={75} max={100} />
      </div>
      <div style={{ maxWidth: '20vw' }}>
        <Meter value={75} max={100} />
      </div>
    </div>
  );
}

