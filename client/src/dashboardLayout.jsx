import Draggable, { DraggableCore } from 'react-draggable';
import GridLayout from "react-grid-layout";

import { GaugeModels, DoughnutModels } from './components/gaugeModels';
import { LineChart, BarChart } from './components/chartModels';
import GaugeChart from 'react-gauge-chart';

const Dashboard = () => {
    // eventLogger = (e: MouseEvent, data: Object) => {
    //     console.log('Event: ', e);
    //     console.log('Data: ', data);
    // };
    const layout = [
        { i: "a", x: 0, y: 0, w: 4, h: 10 },
        { i: "b", x: 1, y: 0, w: 3, h: 3 },
        { i: "c", x: 4, y: 0, w: 2, h: 5 },
        { i: "d", x: 1, y: 4, w: 3.5, h: 5 }
    ];

    return (
        <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
        >
            <div key="a" style={{ backgroundColor: 'lightyellow' }}>
                <LineChart valueA={[10, 20, 40, 60]} timeA={[1, 2, 3, 4]} label={'Values'} />
            </div>
            <div key="b" style={{ backgroundColor: 'lightblue' }}>
                <BarChart valueA={10} valueB={20} valueC={30} label={'Values'} />
            </div>
            <div key="c" style={{ backgroundColor: 'lightgreen', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DoughnutModels values={[10, 20, 30]} />
            </div>
            <div key="d" style={{ backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <GaugeModels val1={45} />
            </div>
        </GridLayout>
    );
}

export default Dashboard;