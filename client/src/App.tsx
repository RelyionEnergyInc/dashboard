import React from 'react';
import './App.css';
import ListDataSamples from './components/listDataSamples';


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
      <ListDataSamples />
    </div>
  );
}

export default App;
