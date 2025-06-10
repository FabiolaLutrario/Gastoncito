//Types
import {
    TAB_BAR_VISIBLE,
    ADD_RUTA
} from "./navegacionActions";

const navegacionReducer = (state, action) => {
    switch (action.type) {

        case TAB_BAR_VISIBLE:
            return {
                ...state,
                tabBarVisible: action.payload
            }

        case ADD_RUTA:
            const historialNew = [...state.historial, action.payload]
            if(historialNew.length > 3) historialNew.shift();
            return {
                ...state,
                historial: historialNew,
                actual: action.payload,
                anterior: state.historial[state.historial.length - 1]
            }


        default:
            return state;
    }
}

export default navegacionReducer;