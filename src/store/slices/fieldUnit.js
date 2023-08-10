import { createSlice } from "@reduxjs/toolkit";
import { ally, enemy, nexusHp } from "../../utils/data/dataSet"
import { getIndex } from "../../utils/functions/isRange";

export const fieldUnit = createSlice({
    name:"fieldUnit",
    initialState:[{
        id:"ally",
        hp:500,
        team:ally,
        location:null,
        range:100,
        hitRange:150
    },{
        id:"enemy",
        hp:500,
        team:enemy,
        location:null,
        range:100,
        hitRange:150
    }],
    reducers:{
        addUnit:(state, action) => {
            state.push(action.payload.unit)
        },
        removeUnit:(state, action) => {
            const index = getIndex(state, action.payload.id)
            if(index > -1) state.splice(index, 1)
        },
        hitUnit:(state, action) => {
            const index = getIndex(state, action.payload.id)
            if(index > -1) state[index].hp -= action.payload.damage
        },
        updateLocation:(state, action) => {
            const index = state.findIndex(e =>  e.id.toString() === action.payload.id.toString())
            if(index > -1) state[index].location = action.payload.location
        },
        setUpperBody:(state, action) => {
            const index = getIndex(state, action.payload.id)
            if(index > -1) state[index].upperBody = action.payload.motion
        },
        setLowerBody:(state, action) => {
            const index = getIndex(state, action.payload.id)
            if(index > -1) state[index].lowerBody = action.payload.motion
        }
    }
})