import Draggable, { DraggableCore } from 'react-draggable';
import GridLayout from "react-grid-layout";

import { Button } from '@mui/material';
import React, { useEffect } from 'react';

import { GaugeModels, DoughnutModels } from './components/gaugeModels';
import ListLiveDataSamples from './components/listLiveDataSamples';
import { LineChart, BarChart } from './components/chartModels';
import useStore from './store';

// import GaugeChart from 'react-gauge-chart';

const Dashboard = () => {
    // eventLogger = (e: MouseEvent, data: Object) => {
    //     console.log('Event: ', e);
    //     console.log('Data: ', data);
    // };
    const layout = [
        { i: "1", x: 0, y: 0, w: 4, h: 10 },
        { i: "2", x: 1, y: 0, w: 3, h: 3 },
        { i: "3", x: 4, y: 0, w: 2, h: 5 },
        { i: "4", x: 1, y: 4, w: 3.5, h: 5 }
    ];

    const idx = useStore(state => state.currentSample.id);
    const freq = useStore(state => state.currentSample.freq);
    const vab = useStore(state => state.currentSample.Vab);
    const pf = useStore(state => state.currentSample.pf);

    ///////// Setup for line chart

    // State array for the line chart x-axis time labels
    const [labels, setLabels] = React.useState([]);
    // State 2D array for the line chart y-axis values of the 3 phases
    const [values, setValues] = React.useState([]);
    // const [values, setValues] = React.useState<number[]>([]);

    useEffect(() => {
        //Add the current time to the labels array and current freq to the first row of the values array
        if (labels.length < 10) {
            setLabels([...labels, new Date().getSeconds()]);
            setValues([...values, [freq]]);

            // Add current Vab to the second row of the values array
            setValues([...values, [vab]]);
        } else {
            // alert('Array is full');
            //Remove the first element of the labels array and the first element of the values array
            const newLabels = labels.slice(1);
            const newValues = values.slice(1);
            setLabels([]);
            setValues([]);
            setLabels([...newLabels, new Date().getSeconds()]);
            setValues([...newValues, [freq]]);
            //Add the current time to the labels array and current freq to the values array
        }
    }, [idx, freq]);


    function addDoughnut() {
        // layout.push({ i: layout.length, x: 1, y: 4, w: 3.5, h: 5 });
        // // Add a new div element and donut chart elment to the layout DOM
        // const newDiv = document.createElement("div");
        // newDiv.setAttribute("key", layout.length);
        // newDiv.setAttribute("style", "background-color: #fff; border: 1px solid #ddd; border-radius: 4px; padding: 10px; margin: 10px;");
        // document.getElementById("layout").appendChild(newDiv);



    }
    console.log("idx: ", idx);

    return (<>
        <div style={{ display: 'none' }}>
            {/* Required to pull values into state */}
            <ListLiveDataSamples />
        </div>

        <Button variant='contained' onClick={addDoughnut()}>Add Doughnut</Button>
        <GridLayout
            className="layout"
            id="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
        >

            <div key="1" style={{ backgroundColor: 'lightyellow' }}>
                <LineChart valueA={
                    // Values mod 50
                    values.map((val) => {
                        return val.map((v) => {
                            return v % 30;
                        })
                    })
                }
                    timeA={labels} minY={0} maxY={100} label={"Frequency % 30"} header={"Frequency Line Chart"} />
            </div>
            <div key="2" style={{ backgroundColor: 'lightblue' }}>
                <BarChart valueA={10} valueB={20} valueC={30} label={'Values'} />
            </div>
            <div key="3" style={{ backgroundColor: 'lightgreen', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DoughnutModels values={[freq % 13, vab % 13, pf % 13]} labels={['Frequency', 'Vab', 'PF']} />
            </div>
            <div key="4" style={{ backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <GaugeModels val1={45} />
            </div>
        </GridLayout>
    </>
    );
}

export default Dashboard;