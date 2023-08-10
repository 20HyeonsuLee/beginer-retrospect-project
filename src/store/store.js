import { configureStore } from "@reduxjs/toolkit";
import { status } from "./slices/status";
import { trainingList } from "./slices/trainingList";
import { fieldUnit } from "./slices/fieldUnit";
import { selectedTurret } from "./slices/selectedTurret";
import { attacks } from "./slices/attacks";

export const store = configureStore({
    reducer:{
        status:status.reducer,
        trainingList:trainingList.reducer,
        fieldUnit:fieldUnit.reducer,
        selectedTurret:selectedTurret.reducer,
        attacks:attacks.reducer
    }
})