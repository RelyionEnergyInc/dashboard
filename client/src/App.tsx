import React from 'react';
import './App.css';
import ListDataSamples from './components/listStaticDataSamples';
import ListLiveDataSamples from './components/listLiveDataSamples';
import GaugeModels from './components/gaugeModels';
import { LineChart, BarChart } from './components/chartModels';


import useStore from './store';





function App() {
  const idx = useStore(state => state.currentSample.id);
  const freq = useStore(state => state.currentSample.freq);

  // const idx = currentSample.id;


  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      // height: "100vh",
      width: "100vw"

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
          <GaugeModels />
        </div>
      </div>
      <div className='tile'>
        <a href="#barDemoContainer"><h2>Show Dynamic Bars</h2></a>
      </div>
      <div className='tile-content' id="barDemoContainer">
        <div style={{
          maxWidth: "80vw",
        }}>
          <BarChart valueA={freq * 0.001} valueB={idx % 100} valueC={50} />
        </div>
      </div>
    </div>
  );
}

export default App;
