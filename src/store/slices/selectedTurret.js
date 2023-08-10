import { createSlice } from "@reduxjs/toolkit";

export const selectedTurret = createSlice({
    name:"selectedTurret",
    initialState:null,
    reducers:{
        setSelectedTurret:(state, action) => {
            return action.payload.turret
        },
        setImagelocation:(state, action) => {
            if(state !== null) {
                state.imgLocation.x = action.payload.x
                state.imgLocation.y = action.payload.y
            }
        }
    }
})