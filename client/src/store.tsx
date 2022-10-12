// import create from 'zustand';
import { createContext } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import DataSample from './types/datasample.type';
import sampleReducer from './sampleStateSlice';

// export interface DemoState {
//     currentSample: DataSample;
//     idx: number;
//     value: number;
// }

export const store = configureStore({
    reducer: {
        currentSample: sampleReducer,
        idx: sampleReducer,
        value: sampleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// export const useStore = create<DemoState>((set) => ({
//     currentSample: {
//         id: 0,
//         time: new Date(),
//         freq: 0,
//         Vab: 0,
//         Vbc: 0,
//         Vca: 0,
//         Van: 0,
//         Vbn: 0,
//         Vcn: 0,
//         pf: 0,
//         'Real Power': 0,
//         'Reactive Power': 0,
//         'Apparent Power': 0,
//         Ia: 0,
//         Ib: 0,
//         Ic: 0,
//         'P2 Ctrl Method': 0,
//         'P2 throttle setpt': 0,
//         'P2 current setpt': 0,
//         'P2 power setpt': 0,
//         'P2 voltage setpt': 0,
//         'P2 Vmax Limit': 0,
//         'P2 Vmin Limit': 0,
//         'P2 Dischg PWR limit': 0,
//         'P2 Chrg PWR limit': 0,
//         'P2 Current limit': 0,
//         'P2 Voltage': 0,
//         'P2 Power': 0,
//         'P2 Current': 0,
//         'P3 Ctrl Method': 0,
//         'P3 throttle setpt': 0,
//         'P3 current setpt': 0,
//         'P3 power setpt': 0,
//         'P3 voltage setpt': 0,
//         'P3 Vmax Limit': 0,
//         'P3 Vmin Limit': 0,
//         'P3 Dischg PWR limit': 0,
//         'P3 Chrg PWR limit': 0,
//         'P3 Current limit': 0,
//         'P3 Voltage': 0,
//         'P3 Power': 0,
//         'P3 Current': 0,
//         'Avg PM Temp': 0,
//         'AC PM Temp': 0,
//         'DC PM Temp': 0,
//         'Onboard Temp': 0,
//         'Fan Speed': 0,
//         'System Status': 0,
//         'System Power': 0,
//         'Grid Support Status': 0,
//         'Link Peak Voltage': 0,
//         'Link Peak Current': 0,
//         'Grid Level Status': 0,
//         'Grid Stop Status': 0,
//         'Pack P2 Voltage': 0,
//         'Pack P3 Voltage': 0,
//     },
//     setCurrentSample: (sample: DataSample) => set(() => ({ currentSample: sample })),

//     idx: 0,
//     setIdx: (idx) =>
//         set((state) => ({
//             ...state,
//             idx
//         })),
//     value: 0,
//     setValue: (value) =>
//         set((state) => ({
//             ...state,
//             value
//         }))

// }));

