import React from 'react';
import './App.css';
import ListDataSamples from './components/listStaticDataSamples';
import ListLiveDataSamples from './components/listLiveDataSamples';
import GaugeModels from './components/gaugeModels';
import LineChart from './components/chartModels';


import useStore from './store';




function App() {
  const idx = useStore(state => state.currentSample.freq);
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
      {/* <div className='tile'>
        <a href="#listDemoLiveContainer"><h2>Show Live Data List</h2></a>
      </div> */}
      {/* <div className='tile-content' id="listDemoLiveContainer">
        <ListLiveDataSamples />
      </div> */}
      <div className='tile'>
        <a href="#gaugeDemoContainer"><h2>Show Dynamic Gauges</h2></a>
      </div>
      <div className='tile-content' id="gaugeDemoContainer">
        <GaugeModels />
      </div>
      <div className='tile'>
        <a href="#widgetDemoContainer"><h2>Show Dynamic Charts</h2></a>
      </div>
      <div className='tile-content' id="widgetDemoContainer">
        {/* <LineChart /> */}
      </div>

    </div>
  );
}

export default App;
