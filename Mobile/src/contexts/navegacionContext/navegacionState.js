import React, { useContext, useReducer } from "react";
import navegacionReducer from "./naavegaionReducer";
import navegacionContext from "./navegacionContext";

import routes from "../../constants/routes";

//types
import {
    TAB_BAR_VISIBLE,
    ADD_RUTA
} from "./navegacionActions";

//Valores del context
const initialState = {
   historial: [{ruta: routes.CONTROL_TAB_ROUTE, pantalla: routes.TAB_REQ_TODOS}],
   actual: {ruta: routes.CONTROL_TAB_ROUTE, pantalla: routes.TAB_REQ_TODOS},
   anterior: {ruta: routes.CONTROL_TAB_ROUTE, pantalla: routes.TAB_REQ_TODOS},
   tabBarVisible: true
};

const NavegacionState = props => {

    const [state, dispatch] = useReducer(navegacionReducer, initialState);

    const agregarAlHistorial = (ruta) => {
        dispatch({
            type: ADD_RUTA,
            payload: ruta
        })
    }

    const verTabBar = (bool) => {
        dispatch({
            type: TAB_BAR_VISIBLE,
            payload: bool
        })
    }

    return (
        <navegacionContext.Provider
            value={{
              historial: state.historial,
              tabBarVisible: state.tabBarVisible,
              actual: state.actual,
              anterior: state.anterior,
              agregarAlHistorial,
              verTabBar
            }}
        >
            {props.children}
        </navegacionContext.Provider>
    )

}

export default NavegacionState;

