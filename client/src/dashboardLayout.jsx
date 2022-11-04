import Draggable, { DraggableCore } from 'react-draggable';
import GridLayout from "react-grid-layout";

import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { GaugeModels, DoughnutModels } from './components/gaugeModels';
import ListLiveDataSamples from './components/listLiveDataSamples';
import { LineChart, BarChart } from './components/chartModels';
import useStore from './store';

// import GaugeChart from 'react-gauge-chart';


import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

const originalLayouts = getFromLS("layouts") || {};
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export class Dashboard extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        rowHeight: 100
    };



    constructor(props) {
        super(props);
        console.log("Local storage layout:", originalLayouts);

        this.state = {
            layouts: JSON.parse(JSON.stringify(originalLayouts)),

            // If a layout is saved to local storage, initialize the items
            // with that layout. If not, use a default layout.
            items:
                // this.layouts.bind(this).map(function (i, key, list) {
                //     return {
                //         i: i.toString(),
                //         x: 0,
                //         y: 0,
                //         w: 2,
                //         h: 1,
                //         add: i === (list.length + 1),
                //         widget: 'add'
                //     };
                // })
                // ||
                [1].map(function (i, key, list) {
                    console.log("Saved layout", originalLayouts);
                    // if (originalLayouts.length > 1) {
                    //     originalLayouts.map(function (i, key, list) {
                    //         return {
                    //             i: i.toString(),
                    //             x: 0,
                    //             y: 0,
                    //             w: 2,
                    //             h: 1,
                    //             add: i === (list.length + 1),
                    //             // Get widget type from substring after first space in i
                    //             widget: 'add',
                    //         };
                    //     })
                    // } else {

                    return {
                        // an invisible element to initialize grid
                        i: i.toString(),
                        x: 0,
                        y: 0,
                        w: 2,
                        h: 1,
                        add: i === (list.length + 1),
                        widget: 'add'
                    };
                    // }
                }),
            newCounter: 0
        };
        if (originalLayouts && originalLayouts.length > 0) {
            console.log("originalLayouts:", originalLayouts.length);
            originalLayouts.forEach((layout, i) => {
                console.log("idx:", i);
                console.log("i:", JSON.parse(JSON.stringify(layout.i)));
                console.log("x:", layout.x);
                console.log("y:", layout.y);
                console.log("w:", layout.w);
                console.log("h:", layout.h);
                console.log("widget:", layout.widget);
            });
            // console.log("Local storage layout:", originalLayouts);
            // // this.state = {
            // //     ...this.state,
            // //     items: this.generateDOM()
            // // };
            // this.state = {
            //     ...this.state,
            //     items: originalLayouts.map(function (i, key, list) {
            //         return {
            //             i: i.toString(),
            //             x: i * 2,
            //             y: 0,
            //             w: 2,
            //             h: 1,
            //             add: i === (list.length + 1),
            //             widget: 'add'
            //         };
            //     }
            //     )
            // };


        }

        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }

    createElement(el) {
        const removeStyle = {
            position: "absolute",
            right: "10%",
            top: "5%",
            cursor: "pointer",
            backgroundColor: "red",
            borderRadius: '50%',
        };
        const i = el.add ? "+" : el.i;
        return (

            el.widget === 'add' ? (
                <div key={i} data-grid={el}
                    style={{
                        backgroundColor: "lightblue",
                        border: "1px dashed black",
                        borderRadius: "25px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        overflow: "hidden",
                        opacity: "0.5",
                    }}>
                    <span
                        className="add text"
                        onClick={this.onAddItem}
                        title="You can add an item by clicking here, too."
                    >
                        Add Widgets Above
                    </span>
                </div>
            ) : el.widget === 'Doughnut' ? (
                <div key={i} data-grid={el}
                    style={{
                        backgroundColor: "lightgray",
                        border: "1px solid black",
                        borderRadius: "25px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        overflow: "hidden",
                        width: "100%",
                        height: "100%",
                    }}>
                    <span className="text" style={{ paddingTop: '1rem' }}>{this.state.items.indexOf(el) + ". "}{" " + el.widget}</span>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <DoughnutModels values={[10, 20, 30]} labels={[['Frequency', 'Vab', 'PF']]} />
                    </div>
                    <span className="react-resizable-handle react-resizable-handle-se" style={{ fontSize: '0.5rem', paddingRight: '1rem' }}> Resize</span>
                </div>
            ) : el.widget === 'Gauge' ? (
                <div key={i} data-grid={el}
                    style={{
                        //Pastel green
                        backgroundColor: "#d1f2eb",
                        border: "1px solid black",
                        borderRadius: "25px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        overflow: "hidden",
                    }}>
                    <span className="text" style={{ paddingTop: '1rem' }}>{this.state.items.indexOf(el) + ". "}{" " + el.widget}</span>
                    <GaugeModels values={[10, 20, 30]} labels={[['Frequency', 'Vab', 'PF']]} />
                    <span className="react-resizable-handle react-resizable-handle-se" style={{ fontSize: '0.5rem', paddingRight: '1rem' }}> Resize</span>
                </div>
            ) : el.widget === 'Line Chart' ? (
                <div key={i} data-grid={el}
                    style={{
                        backgroundColor: "lightyellow",
                        border: "1px solid black",
                        borderRadius: "25px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        overflow: "hidden",
                    }}>
                    <span className="text" style={{ paddingTop: '1rem' }}>{this.state.items.indexOf(el) + ". "}{" " + el.widget}</span>
                    <LineChart valueA={[10, 20, 40, 70, 100]} timeA={[1, 2, 3, 4, 5]} minY={0} maxY={100} label={"Frequency % 30"} header={"Frequency Line Chart"} />
                </div>
            ) : (
                <div>
                    idk
                </div>
            )


        );
    }

    onAddItem(widget) {
        /*eslint no-console: 0*/
        console.log("adding", "n" + this.state.items.length + 1);
        this.setState({
            // Add a new item. It must have a unique key!
            items: this.state.items.concat({
                i: "n" + this.state.newCounter + " " + widget,
                x: (this.state.items.length * 2) % (this.state.cols || 12),
                y: Infinity, // puts it at the bottom
                w: 2,
                h: 3,
                widget: widget
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1
        });
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        console.log("onBreakpointChange", breakpoint, cols);
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange(layout) {
        console.log("onLayoutChange", layout);
        // create and save items from layout in storage

        this.setState({ layout: layout });
        if (this.state.items.length > 1) {
            saveToLS("layouts", layout);
            console.log("Saved to local storage: ", layout);
        }

        // this.props.onLayoutChange(layout);
        // this.setState({ layout: layout });
    }

    onRemoveItem(i) {
        if (this.state.items.length > 1) {
            console.log("removing", i);
            this.setState({
                // Update the items state to remove the item with the given key
                items: this.state.items.filter(item => item.i !== i)
            });
        }
        else
            console.log("Cannot remove last item");
    }

    // Run this.onAddItem for each item in originalLayouts on page load
    componentDidMount() {
        for (let i = 0; i < 5; i++) {
            // this.onAddItem('Doughnut');
        }
        // if (originalLayouts.length > 0) {
        //     originalLayouts.map((item) => {
        //         this.onAddItem('Doughnut');
        //         console.log("Added item: ", item);
        //         return null;
        //     });
        // }
        // else {
        //     console.log("No layouts in local storage");
        // }
    }


    render() {
        return (
            <div>
                {/* <button onClick={this.onAddItem('doughnut')}>Add Doughnut</button> */}
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    width: '100vw',
                    padding: '1rem',
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    backgroundColor: "lightblue",
                }}>
                    <button onClick={() => this.onAddItem('Doughnut')} style={{ backgroundColor: 'lightGreen', borderRadius: '15px' }}>Add Doughnut</button>
                    <button onClick={() => this.onAddItem('Gauge')} style={{ backgroundColor: 'lightGreen', borderRadius: '15px' }}>Add Gauge</button>
                    <button onClick={() => this.onAddItem('Line Chart')} style={{ backgroundColor: 'lightGreen', borderRadius: '15px' }}>Add LineChart</button>
                    {/* <button onClick={this.onAddItem('gauge')}>Add Gauge</button> */}
                    {/* Button to remove last item in list */}
                    <button onClick={this.onRemoveItem.bind(this, this.state.items[this.state.items.length - 1].i)} style={{ backgroundColor: 'coral', borderRadius: '15px' }}>
                        Remove Last Item
                    </button>
                    {/* Clear local storage */}
                    <button onClick={() => clearLS()} style={{ backgroundColor: 'coral', borderRadius: '15px' }}>
                        Clear Local Storage
                    </button>


                </div>
                <ResponsiveReactGridLayout
                    onLayoutChange={this.onLayoutChange.bind(this)}
                    onBreakpointChange={this.onBreakpointChange}
                    // layout={originalLayouts}
                    {...this.props}
                >

                    {_.map(this.state.items, el => this.createElement(el))}



                </ResponsiveReactGridLayout>
                {originalLayouts && originalLayouts.length > 0 ? (
                    _.map(originalLayouts, el => this.createElement(el)),

                    originalLayouts.map((layout, i) => (
                        <div key={i} className="layout">
                            <span className="text">Local Widget #{i + 1}</span>
                            <pre>{JSON.stringify(layout, null, "  ")}</pre>
                        </div>
                    ))
                ) : (
                    <div className="layout">
                        <span className="text">No layouts in local storage.</span>
                    </div>
                )}

            </div>
        );
    }
}

if (process.env.STATIC_EXAMPLES === true) {
    import("./test-hook.jsx").then(fn => fn.default(Dashboard));
}







const Dashboard2 = () => {
    // eventLogger = (e: MouseEvent, data: Object) => {
    //     console.log('Event: ', e);
    //     console.log('Data: ', data);
    // };
    const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];
    const layout = [
        { i: "1", x: 0, y: 0, w: 4, h: 10, resizeHandles: availableHandles },
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

        <Button variant='contained' onClick={addDoughnut()}>Add Gauge</Button>
        <GridLayout
            className="layout"
            id="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
            onLayoutChange={function () { }}
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



function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "rgl-8",
            JSON.stringify({
                [key]: value
            })
        );
    }
}

function clearLS() {
    if (global.localStorage)
        global.localStorage.removeItem("rgl-8");
}

export default Dashboard;