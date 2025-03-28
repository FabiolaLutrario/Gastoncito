import React, { useReducer } from 'react';
import authReducer from './authReducer';
import authContext from './authContext';


//types
import {
  INICIAR_CARGA,
  FINALIZAR_CARGA,
} from './authActions';

const AuthState = props => {
  const initialState = {
    token: null,
    autenticado: false,
    usuario: null,
    mensaje: null,
    cargando: false,
    mensajeLicencia: '',
    mensajeVersion: '',
    linksApp: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const iniciarCarga = async () => {
    dispatch({
      type: INICIAR_CARGA,
    });
  };

  const finalizarCarga = async () => {
    dispatch({
      type: FINALIZAR_CARGA,
    });
  };


  return (
    <authContext.Provider
      value={{
        cargando: state.cargando,
        iniciarCarga,
        finalizarCarga,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
