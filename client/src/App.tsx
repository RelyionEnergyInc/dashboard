import React from 'react';
import './App.css';
import ListDataSamples from './components/listDataSamples';
import GaugeModels from './components/gaugeModels';
import LineChart from './components/chartModels';



function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100vh",
      width: "100vw"

    }}>
      <div className='tile'>
        <a href="#listDemoContainer"><h2>Show List</h2></a>
      </div>
      <div className='tile-content' id="listDemoContainer">
        <ListDataSamples />
      </div>
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
