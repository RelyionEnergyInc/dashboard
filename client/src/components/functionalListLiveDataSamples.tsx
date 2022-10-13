
import { useEffect, useState } from "react";
import type DataSample from "../types/datasample.type";
import DataSampleService from "../services/datasample.service";


export default function FListLiveDataSamples() {
    const [samples, setSamples] = useState<DataSample[]>([]);
    const [currentSample, setCurrentSample] = useState<DataSample>();
    const [idx, setIdx] = useState<number>(1);
    const [freq, setFreq] = useState<number>(0);


    useEffect(() => {
        console.log("useEffect");
        setInterval(() => {
            console.log('Test');
            // setIdx(idx + 1);
            // console.log("Incrementing index: " + idx);
            // DataSampleService.get(idx)
            //     .then((response) => {
            //         setCurrentSample(response.data);
            //         console.log(response.data);
            //     })
            //     .catch((e) => {
            //         console.log(e);
            //     }
            //     );
        }, 1000);
    });

    return (
        <div>
            <h1>Live Data Samples</h1>
            <div>
                <div>
                    <h2>Current Sample</h2>
                    <div>
                        <h3>Id: {currentSample?.id}</h3>
                        <h3>Value: {currentSample?.freq}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}