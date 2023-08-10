import { createSlice } from "@reduxjs/toolkit";
import { ally, enemy, nexusHp } from "../../utils/data/dataSet"

export const trainingList = createSlice({
    name:"trainingList",
    initialState:[],
    reducers:{
        addTrain:(state, action) => {
            if(state.length < 5) state.push(action.payload.unit)
        },
        completeTrain:(state, action) => {
            state.shift()
        }
    }
})