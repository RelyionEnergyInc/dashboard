import React, { useEffect } from 'react';
import './App.css';
import ListDataSamples from './components/listStaticDataSamples';
import ListLiveDataSamples from './components/listLiveDataSamples';
import { GaugeModels, DoughnutModels } from './components/gaugeModels';
import { LineChart, BarChart } from './components/chartModels';
import useStore from './store';
import TestGauge from './components/test.js';
import GaugeChart from 'react-gauge-chart'
import TextValueModel from './components/textValueModel';


function App() {
  const idx = useStore(state => state.currentSample.id);
  const freq = useStore(state => state.currentSample.freq);


  const vab = Number(useStore(state => state.currentSample.Vab));
  const Vbc = Number(useStore(state => state.currentSample.Vbc));
  const Vca = Number(useStore(state => state.currentSample.Vca));

  const Ia = Number(useStore(state => state.currentSample.Ia));
  const Ib = Number(useStore(state => state.currentSample.Ib));
  const Ic = Number(useStore(state => state.currentSample.Ic));

  const Vavg = Math.round((vab + Vbc + Vca) / 3);


  const pf = useStore(state => state.currentSample.pf);

  const OnboardTemp = Number(useStore(state => state.currentSample["Onboard Temp"]));
  const FanSpeed = useStore(state => state.currentSample["Fan Speed"]);

  const SystemStatus = useStore(state => state.currentSample["System Status"]);
  const GridSupportStatus = useStore(state => state.currentSample["Grid Support Status"]);



  // State array for the line chart x-axis time labels
  const [labels, setLabels] = React.useState<Date[]>([]);
  // State 2D array for the line chart y-axis values of the 3 phases
  const [values, setValues] = React.useState<number[][]>([]);
  // const [values, setValues] = React.useState<number[]>([]);

  useEffect(() => {
    //Add the current time to the labels array and current freq to the first row of the values array
    if (labels.length < 10) {
      setLabels([...labels, new Date()]);
      setValues([...values, [freq | 0]]);

      // Add current Vab to the second row of the values array
      setValues([...values, [vab | 0]]);
    } else {
      // alert('Array is full');
      //Remove the first element of the labels array and the first element of the values array
      const newLabels = labels.slice(1);
      const newValues = values.slice(1);
      setLabels([]);
      setValues([]);
      setLabels([...newLabels, new Date()]);
      setValues([...newValues, [freq | 0]]);
      //Add the current time to the labels array and current freq to the values array
    }
  }, [idx, freq]);


  // Current Line Chart Values
  const [currLabels, setCurrLabels] = React.useState<Date[]>([]);
  const [currValues, setCurrValues] = React.useState<number[][]>([]);
  useEffect(() => {
    const avgCurrent = (Ia + Ib + Ic) / 3;

    if (currLabels.length < 10) {
      setCurrLabels([...currLabels, new Date()]);
      setCurrValues([...currValues, [avgCurrent | 0]]);
    } else {
      const newLabels = currLabels.slice(1);
      const newValues = currValues.slice(1);
      setCurrLabels([]);
      setCurrValues([]);
      setCurrLabels([...newLabels, new Date()]);
      setCurrValues([...newValues, [avgCurrent]]);
    }
    console.log('Current Values: ', currValues);
  }, [idx, Ia, Ib, Ic]);





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
      <h3 style={{ fontStyle: 'italic' }}>Update #: {idx}</h3>

      {/* <div className='tile'>
        <a href="#listDemoStaticContainer"><h2>Show Static Data List</h2></a>
      </div>
      <div className='data-list' id="listDemoStaticContainer">
        <ListDataSamples />
      </div> */}
      {/* <GaugeChart id="gauge-chart1" /> */}

      <div style={{
        width: "95vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'flex-start', backgroundColor: 'lightGrey', borderRadius: '25px', padding: '1vw', margin: '1vw'
      }}>
        <h1 style={{ marginBottom: 0, marginLeft: '1rem' }}> System Status </h1>
        <div style={{
          display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: 'center', width: '100%'
        }}>
          {/* Freq: divide by 1000 */}
          {/* Pf -0.8 0 0.8 */}
          <GaugeModels val1={FanSpeed} unit={'${value} RPM'} min={0} max={6000} numLabels={2} sectionColors={[
            "#FF3131",
            "#FF3131",
            "#86ff70",
            "#86ff70",
            "#86ff70",
            "#86ff70",
            "#86ff70",
            "#86ff70",
            "#FF3131"
          ]}
            title={'Fan Speed'} />
          <GaugeModels val1={OnboardTemp / 10} unit={'${value} °C'} min={0} max={100} numLabels={4} sectionColors={[
            "#86ff70",
            "#86ff70",
            "#86ff70",
            "#86ff70",
            "#FF3131"
          ]} title={'Temperature'} />
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'flex-end'
          }}>
            <TextValueModel label={"System Status"} value={SystemStatus} valueColor={'white'} />
            <TextValueModel label={"Grid Support Status"} value={GridSupportStatus} valueColor={'white'} />
          </div>
        </div>
      </div>


      <div style={{
        width: "95vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'flex-start', backgroundColor: '#AFE1AF', borderRadius: '25px', padding: '1vw', margin: '1vw'
      }}>
        <h1 style={{ marginBottom: 0, marginLeft: '1rem' }}> System Energy </h1>
        <div style={{
          display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: 'flex-start', width: '100%'
        }}>
          <div>
            <GaugeModels val1={Vavg} title={'Avg Voltage'} unit={'${value} V'} max={1000} numLabels={3} />
          </div>

          <div>
            <GaugeModels val1={pf} title={'Power Factor'} unit={'${value} kW'} useGradient={true} />
          </div>
          <div>

            <LineChart valueA={currValues} timeA={currLabels} xAxisLabel={"Time"} yAxisLabel={"Current ( A )"} minY={0} maxY={60} label={'(Ia + Ib + Ic) ÷ 3 '} title={'Current'} />
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className='tile'>
        <a href="#doughnutDemoContainer"><h2>Doughnuts</h2></a>
      </div>
      <div className='tile-content' id="doughnutDemoContainer">
        <div style={{
          width: "100vw", display: "flex",
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
        <a href="#barDemoContainer"><h2> Bars</h2></a>
      </div>
      <div className='tile-content' id="barDemoContainer">
        <div style={{
          maxWidth: "100vw",
        }}>
          <BarChart valueA={freq % 100} valueB={vab % 100} valueC={pf % 100} label={'Frequency, Vab, & Pf'} />
        </div>
      </div>

      <div className='tile'>
        <a href="#lineDemoContainer"><h2> Lines</h2></a>
      </div>
      <div className='tile-content' id="lineDemoContainer">
        <div style={{
          width: "100vw", display: "flex",
          flexDirection: "row", justifyContent: "space-evenly"
        }}>
          <div>
            <LineChart valueA={values} timeA={labels} minY={59950} maxY={60050} label={'Frequency'} />
          </div>
          {/* create a second line chart with values % by 100 */}
          <div>

            {/* Current, Voltage, 1 Pack per graph */}
            {/* Sep ac: Vac, Vbc, Vca, Ia, Ib Ic; real power, reactive power, system power */}
            {/* Sep dc: p2, p2, p2 */}
            <LineChart valueA={
              // Values mod 50
              values.map((val) => {
                return val.map((v) => {
                  return v % 13
                })
              })
            }
              timeA={labels} minY={0} maxY={100} label={"Frequency % 13"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
