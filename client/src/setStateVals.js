
import useStore from './store';
export function setIdx(idx) {
    useStore.setState({ idx });
    console.log("setIdx: " + idx);
}

export function setCurrentSample(sample) {
    useStore.setState({ currentSample: sample });
    console.log("setCurrentSample: " + sample.freq);
}