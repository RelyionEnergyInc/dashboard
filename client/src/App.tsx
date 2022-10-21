import React, { useEffect } from 'react';
import './App.css';
import ListDataSamples from './components/listStaticDataSamples';
import ListLiveDataSamples from './components/listLiveDataSamples';
import { GaugeModels, DoughnutModels } from './components/gaugeModels';
import { LineChart, BarChart } from './components/chartModels';
import useStore from './store';
import TestGauge from './components/test.js';


function App() {
  const idx = useStore(state => state.currentSample.id);
  const freq = useStore(state => state.currentSample.freq);
  const vab = useStore(state => state.currentSample.Vab);
  const pf = useStore(state => state.currentSample.pf);



  // State array for the line chart x-axis time labels
  const [labels, setLabels] = React.useState<number[]>([]);
  // State array for the line chart y-axis values
  const [values, setValues] = React.useState<number[]>([]);

  useEffect(() => {
    //Add the current time to the labels array and current freq to the values array
    if (labels.length < 10) {
      setLabels([...labels, new Date().getSeconds()]);
      setValues([...values, freq]);
    } else {
      // alert('Array is full');
      //Remove the first element of the labels array and the first element of the values array
      const newLabels = labels.slice(1);
      const newValues = values.slice(1);
      setLabels([]);
      setValues([]);
      setLabels([...newLabels, new Date().getSeconds()]);
      setValues([...newValues, freq]);
      //Add the current time to the labels array and current freq to the values array
    }
  }, [idx, freq]);

  const gaugeArcLengths = [0.2, 0.4, 0.4];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      // height: "100vh",
      width: "100vw",
      paddingBottom: '20vh'

    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        // padding: '5vw',
        justifyContent: "center",
      }}>

        <ListLiveDataSamples />

      </div>
      <h2>{idx}</h2>

      {/* <div className='tile'>
        <a href="#listDemoStaticContainer"><h2>Show Static Data List</h2></a>
      </div>
      <div className='data-list' id="listDemoStaticContainer">
        <ListDataSamples />
      </div> */}
      <div className='tile'>
        <a href="#gaugeDemoContainer"><h2>Show Gauges</h2></a>
      </div>
      <div className='tile-content' id="gaugeDemoContainer">
        <div style={{
          width: "80vw", display: "flex",
          flexDirection: "row", justifyContent: "space-evenly"
        }}>
          <div >
            <GaugeModels val1={freq % 100} />
          </div>
          <div>
            <GaugeModels val1={pf % 100} />
          </div>
          {/* <div> */}
          {/* <GaugeModels val1={50} val2={50} val3={50} /> */}

          {/* <GaugeChart id="gauge-chart"
              textColor="#333"
              nrOfLevels={3}
              arcsLength={[0.8, 0.15, 0.05]}
              colors={["#5BE12C", "#F5CD19", "#EA4228"]}
              percent={0.4273035096951447}
              arcPadding={0.02}

            /> */}
          {/* </div> */}
        </div>
      </div>
      <div className='tile'>
        <a href="#doughnutDemoContainer"><h2>Show Doughnuts</h2></a>
      </div>
      <div className='tile-content' id="doughnutDemoContainer">
        <div style={{
          width: "80vw", display: "flex",
          flexDirection: "row", justifyContent: "space-evenly"
        }}>
          <div>
            <DoughnutModels values={[freq % 100, vab % 100, pf % 100]} labels={['Frequency', 'Vab', 'PF']} />
          </div>
          <div>
            <DoughnutModels values={[freq % 13, vab % 13, pf % 13]} labels={['Frequency', 'Vab', 'PF']} />
          </div>
        </div>
      </div>
      <div className='tile'>
        <a href="#barDemoContainer"><h2>Show Bars</h2></a>
      </div>
      <div className='tile-content' id="barDemoContainer">
        <div style={{
          maxWidth: "80vw",
        }}>
          <BarChart valueA={freq % 100} valueB={vab % 100} valueC={pf % 100} />
        </div>
      </div>

      <div className='tile'>
        <a href="#lineDemoContainer"><h2>Show Lines</h2></a>
      </div>
      <div className='tile-content' id="lineDemoContainer">
        <div style={{
          width: "80vw", display: "flex",
          flexDirection: "row", justifyContent: "space-evenly"
        }}>
          <div>
            <LineChart valueA={values} timeA={labels} minY={59950} maxY={60050} label={'Frequency'} />
          </div>
          {/* create a second line chart with values % by 100 */}
          <div>
            <LineChart valueA={values.map((value) => value % 50)} timeA={labels} minY={0} maxY={100} label={"Frequency % 50"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
