import {createSlice} from "@reduxjs/toolkit"

export interface CounterState {
    data: number
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'yarc (yet another redux counter with toolkit'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.data += action.payload
        }
    }
})