import { createSlice } from "@reduxjs/toolkit";
import { ally, enemy, nexusHp } from "../../utils/data/dataSet"

export const status = createSlice({
    name:"status",
    initialState:[{
        level:1,
        maxHp:500,
        team:ally,
        exp:0,
        coin:100,
        tower:[null],
        menu:"main"
    },{
        level:1,
        maxHp:500,
        team:enemy,
        exp:0,
        coin:100,
        tower:[null],
        menu:"main"
    }],
    reducers:{
        levelUp:(state, action) => {
            const payload = action.payload
            if(state[payload.team].level < 5) state[payload.team].level++
            state[payload.team].maxHp = nexusHp[state[payload.team].level - 1]
        },
        addTower:(state, action) => {
            const payload = action.payload
            if(state[payload.team].tower.length < 4) state[payload.team].tower.push(null)
        },
        setMenu:(state, action) => {
            state[0].menu = action.payload.menu
        },
        setTurret:(state, action) => {
            const payload = action.payload
            state[payload.team].tower[payload.index] = payload.turret
            // state[payload.team].tower[payload.index].team = payload.team
        },
        removeTurret:(state, action) => {
            const payload = action.payload
            state[payload.team].tower[payload.index] = null
        },
        setMotion:(state, action) => {
            const payload = action.payload
            state[payload.team].tower[payload.index].attackMotion = payload.motion
            state[payload.team].tower[payload.index].target = payload.target
        },
        setDeg:(state, action) => {
            const payload = action.payload
            state[payload.team].tower[payload.index].deg = payload.deg
        }
    }
})