import { createSlice } from "@reduxjs/toolkit";

export const attacks = createSlice({
  name:"attacks",
  initialState:[],
  reducers:{
    addAttack:(state,action) => {
        state.push(action.payload.attack)
    },
    removeAttack:(state,action) => {
        const index = state.findIndex(e => e.id === action.payload.id)
        state.splice(index, 1)
    },
    updateLocation:(state, action) => {
      const index = state.findIndex(e =>  e.id.toString() === action.payload.id.toString())
      if(index > -1) state[index].location = action.payload.location
    }
  }  
})