import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type DataSample from './types/datasample.type';


export interface SampleState {
    currentSample: DataSample | null;
    idx: number;
    value: number;
}

const initialState: SampleState = {
    currentSample: null,
    idx: 4,
    value: 6,
};

export const sampleStateSlice = createSlice({
    name: 'sampleState',
    initialState,
    reducers: {
        increment: (state) => {
            state.idx += 1;
        },
        setSample: (state, action: PayloadAction<DataSample>) => {
            state.currentSample = action.payload;
        },
        setIdx: (state, action: PayloadAction<number>) => {
            state.idx = action.payload;
            console.log('setIdx', state.idx);
        },
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
});

export const { setSample, setIdx, setValue } = sampleStateSlice.actions;

export const selectSample = (state: RootState) => state.currentSample.value;

export default sampleStateSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from './store';
// import type DataSample from './types/datasample.type';


// export interface SampleState {
//     currentSample: DataSample | null;
// }

// const initialState: SampleState = {
//     currentSample: null,
// };

// export const sampleStateSlice = createSlice({
//     name: 'sampleState',
//     initialState,
//     reducers: {
//         setSample: (state, action: PayloadAction<DataSample>) => {
//             state.currentSample = action.payload;
//         },
//         clearSample: (state) => {
//             state.currentSample = null;
//         }
//     },
// });

// export const { setSample } = sampleStateSlice.actions;

// export const selectSample = (state: RootState) => state.currentSample;

// export default sampleStateSlice.reducer;



