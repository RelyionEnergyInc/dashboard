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

  const pf = Number(useStore(state => state.currentSample.pf)) / 100;

  const RealPower = Number(useStore(state => state.currentSample["Real Power"]));

  // System Status
  const OnboardTemp = Number(useStore(state => state.currentSample["Onboard Temp"]));
  const FanSpeed = useStore(state => state.currentSample["Fan Speed"]);
  const SystemPower = useStore(state => state.currentSample["System Power"]);

  const SystemStatus = useStore(state => state.currentSample["System Status"]);
  const GridSupportStatus = useStore(state => state.currentSample["Grid Support Status"]);

  // P2 Status
  const P2Voltage = Number(useStore(state => state.currentSample["P2 Voltage"]));
  const P2Power = Number(useStore(state => state.currentSample["P2 Power"]));
  const P2Current = Number(useStore(state => state.currentSample["P2  Current"]) | 0);

  // P3 Status
  const P3Voltage = Number(useStore(state => state.currentSample["P3 voltage"]) | 0);
  const P3Power = Number(useStore(state => state.currentSample["P3 power"] | 0));
  const P3Current = Number(useStore(state => state.currentSample["P3 current"]) | 0);

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


  // System Current Line Chart Values
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
    // console.log('Current Values: ', currValues);
  }, [idx, Ia, Ib, Ic]);

  // P2 Current Line Chart Values
  const [p2CurrLabels, setP2CurrLabels] = React.useState<Date[]>([]);
  const [p2CurrValues, setP2CurrValues] = React.useState<number[][]>([]);
  useEffect(() => {
    if (p2CurrLabels.length < 10) {
      setP2CurrLabels([...p2CurrLabels, new Date()]);
      setP2CurrValues([...p2CurrValues, [P2Current | 0]]);
    } else {
      const newLabels = p2CurrLabels.slice(1);
      const newValues = p2CurrValues.slice(1);
      setP2CurrLabels([]);
      setP2CurrValues([]);
      setP2CurrLabels([...newLabels, new Date()]);
      setP2CurrValues([...newValues, [P2Current]]);
    }
    console.log('P2 Current Values: ', p2CurrValues);
  }, [idx, P2Current]);

  // P3 Current Line Chart Values
  const [p3CurrLabels, setP3CurrLabels] = React.useState<Date[]>([]);
  const [p3CurrValues, setP3CurrValues] = React.useState<number[][]>([]);
  useEffect(() => {
    if (p3CurrLabels.length < 10) {
      setP3CurrLabels([...p3CurrLabels, new Date()]);
      setP3CurrValues([...p3CurrValues, [P3Current | 0]]);
    } else {
      const newLabels = p3CurrLabels.slice(1);
      const newValues = p3CurrValues.slice(1);
      setP3CurrLabels([]);
      setP3CurrValues([]);
      setP3CurrLabels([...newLabels, new Date()]);
      setP3CurrValues([...newValues, [P3Current]]);
    }
    console.log('P3 Current Values: ', p3CurrValues);
  }, [idx, P3Current]);

  const gaugeArcLengths = [0.2, 0.4, 0.4];



  return (
    <div className='demo-body'>
      <div style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        justifyContent: "center",
        // maxWidth: '70rem',
      }}>

        <ListLiveDataSamples />

      </div>

      <h3 style={{ fontStyle: 'italic', textAlign: 'center' }}>Current Sample: {idx}</h3>
      <div className='demo-grid'>

        <div className='demo-section' style={{ backgroundColor: 'lightGrey' }}>
          <h1 > System Status </h1>
          <div className='demo-section-widgets'>
            {/* Freq: divide by 1000 */}
            {/* Pf -0.8 0 0.8 */}
            <GaugeModels val1={FanSpeed} unit={'${value} RPM'} min={0} max={6000} numLabels={2} title={'Fan Speed'} useGradient={true} gradientStartColor={"rgb(230,230,230)"} gradientEndColor={"lightblue"} />
            <GaugeModels val1={OnboardTemp / 10} unit={'${value} °C'} min={0} max={100} numLabels={4} customSegmentStops={[0, 70, 90, 100]} sectionColors={[
              "#86ff70",
              //Yellow
              "#ffff00",

              "#FF3131"
            ]} title={'Temperature'} />
            <div style={{
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'flex-end'
            }}>
              <TextValueModel label={"System Status"} value={SystemStatus} valueColor={'white'} />
              <TextValueModel label={"Grid Support Status"} value={GridSupportStatus} valueColor={'white'} />
              <TextValueModel label={"System Power"} value={SystemPower} valueColor={'white'} />
              <TextValueModel label={"Frequency"} value={freq / 1000} valueColor={'white'} />
              <TextValueModel label={"Power Factor"} value={pf} valueColor={'white'} />
            </div>
          </div>
        </div>


        <div className='demo-section' style={{ backgroundColor: 'rgba(109, 174, 109, 0.49)' }}>
          <h1> System Energy </h1>
          <div className='demo-section-widgets'>
            <GaugeModels val1={Vavg} title={'Avg Voltage'} unit={'${value} V'} max={1000} numLabels={3}
              sectionColors={[
                // A gradient from red to green to red
                '#a09450', '#9d9750', '#9a995f', '#979c5f', '#949f5e', '#91a25e', '#8ea55d', '#8ba85d', '#88ab5c', '#85ae5c', '#82b15b', '#7fb45b', '#7cb75a', '#79ba5a', '#76bd59', '#73c059', '#70c358', '#6dc658', '#6ac957', '#67cc57', '#64cf56', '#61d256', '#5ed556', '#5bd855', '#58db55', '#55de54', '#52e154', '#4fe454', '#4ce753', '#49ea53', '#46ed52', '#43f052', '#40f351', '#3df651', '#3af950', '#37fc50', '#34ff4f', '#34ff4f', '#37fc50', '#3af950', '#3df651', '#40f351', '#43f052', '#46ed52', '#49ea53', '#4ce753', '#4fe454', '#52e154', '#55de54', '#58db55', '#5bd855', '#5ed556', '#61d256', '#64cf56', '#67cc57', '#6ac957', '#6dc658', '#70c358', '#73c059', '#76bd59', '#79ba5a', '#7cb75a', '#7fb45b', '#82b15b', '#85ae5c', '#88ab5c', '#8ba85d', '#8ea55d', '#91a25e', '#949f5e', '#979c5f', '#9a995f', '#9d9750', '#a09450', '#a39151', '#a68e51', '#a98b52', '#ac8852', '#af8653', '#b28353', '#b68054',
              ]}
            />
            <GaugeModels val1={Math.abs(RealPower) * 10} title={'Real Power'} unit={'${value} W'} max={1000} numLabels={3}
              sectionColors={[
                // A gradient from red to green to red
                '#a09450', '#9d9750', '#9a995f', '#979c5f', '#949f5e', '#91a25e', '#8ea55d', '#8ba85d', '#88ab5c', '#85ae5c', '#82b15b', '#7fb45b', '#7cb75a', '#79ba5a', '#76bd59', '#73c059', '#70c358', '#6dc658', '#6ac957', '#67cc57', '#64cf56', '#61d256', '#5ed556', '#5bd855', '#58db55', '#55de54', '#52e154', '#4fe454', '#4ce753', '#49ea53', '#46ed52', '#43f052', '#40f351', '#3df651', '#3af950', '#37fc50', '#34ff4f', '#34ff4f', '#37fc50', '#3af950', '#3df651', '#40f351', '#43f052', '#46ed52', '#49ea53', '#4ce753', '#4fe454', '#52e154', '#55de54', '#58db55', '#5bd855', '#5ed556', '#61d256', '#64cf56', '#67cc57', '#6ac957', '#6dc658', '#70c358', '#73c059', '#76bd59', '#79ba5a', '#7cb75a', '#7fb45b', '#82b15b', '#85ae5c', '#88ab5c', '#8ba85d', '#8ea55d', '#91a25e', '#949f5e', '#979c5f', '#9a995f', '#9d9750', '#a09450', '#a39151', '#a68e51', '#a98b52', '#ac8852', '#af8653', '#b28353', '#b68054',
              ]}
            />
            <LineChart valueA={currValues} timeA={currLabels} xAxisLabel={"Time"} yAxisLabel={"Current ( A )"} minY={10} maxY={50} label={'(Ia + Ib + Ic) ÷ 3 '} title={'Current'} fill={true} fillColor='lightblue' pointColor='blue' />

          </div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
        }}>
          <div className='demo-section' id='compact' style={{ backgroundColor: 'rgba(138, 169, 202, 0.5)' }}>
            <h1> P2 Energy </h1>
            <div className='demo-section-widgets'>
              <div style={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'
              }}>
                <GaugeModels val1={P2Voltage} title={'P2 Voltage'} unit={'${value} V'} max={1000} numLabels={3} gaugeWidth={150} gaugeHeight={100} useGradient={true} gradientEndColor={"#FF3131"} needleHeightRatio={0.75} />

                <GaugeModels val1={P2Power} title={'P2 Power'} unit={'${value} kWh'} max={100} numLabels={3} gaugeWidth={150} gaugeHeight={100} useGradient={true} gradientStartColor={"#86ff70"} gradientEndColor={"#FF3131"} needleHeightRatio={0.75} />
              </div>
              <div className='line-chart-container'>
                <LineChart valueA={p2CurrValues} timeA={p2CurrLabels} xAxisLabel={"Time"} yAxisLabel={"Current ( A )"} minY={0} maxY={5} label={'Current'} title={'P2 Current'} fill={true} />
              </div>
            </div>
          </div>

          <div className='demo-section' id='compact' style={{ backgroundColor: 'rgba(138, 169, 202, 0.5)' }}>
            <h1> P3 Energy </h1>
            <div className='demo-section-widgets'>
              <div style={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'
              }}>
                <GaugeModels val1={P3Voltage} title={'P3 Voltage'} unit={'${value} V'} max={1000} numLabels={3} gaugeWidth={150} gaugeHeight={100} useGradient={true} gradientEndColor={"#FF3131"} needleHeightRatio={0.75} />
                <GaugeModels val1={P3Power} title={'P3 Power'} unit={'${value} kWh'} max={100} numLabels={3} gaugeWidth={150} gaugeHeight={100} useGradient={true} gradientStartColor={"#86ff70"} gradientEndColor={"#FF3131"} needleHeightRatio={0.75} />
              </div>
              <div className='line-chart-container'>
                <LineChart valueA={p3CurrValues} timeA={p3CurrLabels} xAxisLabel={"Time"} yAxisLabel={"Current ( A )"} minY={0} maxY={5} label={'Current'} title={'P3 Current'} fill={true} />
              </div>

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
      </div >
    </div>
  );
}

export default App;
