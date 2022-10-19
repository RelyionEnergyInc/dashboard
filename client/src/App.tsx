import React, { useEffect } from 'react';
import './App.css';
import ListDataSamples from './components/listStaticDataSamples';
import ListLiveDataSamples from './components/listLiveDataSamples';
import GaugeModels from './components/gaugeModels';
import { LineChart, BarChart } from './components/chartModels';


import useStore from './store';





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

      <div className='tile'>
        <a href="#listDemoStaticContainer"><h2>Show Static Data List</h2></a>
      </div>
      <div className='tile-content' id="listDemoStaticContainer">
        <ListDataSamples />
      </div>
      <div className='tile'>
        <a href="#gaugeDemoContainer"><h2>Show Dynamic Gauges</h2></a>
      </div>
      <div className='tile-content' id="gaugeDemoContainer">
        <div style={{
          maxWidth: "80vw",
        }}>
          <GaugeModels values={[freq % 100, vab % 100, pf % 100]} labels={['Frequency', 'Vab', 'PF']} />
        </div>
      </div>
      <div className='tile'>
        <a href="#barDemoContainer"><h2>Show Dynamic Bars</h2></a>
      </div>
      <div className='tile-content' id="barDemoContainer">
        <div style={{
          maxWidth: "80vw",
        }}>
          <BarChart valueA={freq % 100} valueB={vab % 100} valueC={pf % 100} />
        </div>
      </div>

      <div className='tile'>
        <a href="#lineDemoContainer"><h2>Show Dynamic Lines</h2></a>
      </div>
      <div className='tile-content' id="lineDemoContainer">
        <div style={{
          maxWidth: "80vw",
        }}>
          <LineChart valueA={values} timeA={labels} />
        </div>
      </div>
    </div>
  );
}

export default App;
