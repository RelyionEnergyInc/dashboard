import React from 'react';
import './App.css';
import ListDataSamples from './components/listDataSamples';
import WidgetModels from './components/widgetModels';


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
        <WidgetModels />
      </div>
      <div className='tile'>
        <a href="#widgetDemoContainer"><h2>Show Static Widgets</h2></a>
      </div>
      <div className='tile-content' id="widgetDemoContainer">
        <WidgetModels />
      </div>

    </div>
  );
}

export default App;
