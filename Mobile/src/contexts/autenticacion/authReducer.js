//Types
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    LIMPIAR_ERROR,
    MENSAJE_LICENCIA,
    MENSAJE_VERSION,
    INICIAR_CARGA,
    FINALIZAR_CARGA,
    SET_LINKS_APP
} from "./authActions";

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTRO_ERROR:
            return {
                ...state,
                token: null,
                mensaje: action.payload.msg,
                autenticado: false,
                usuario: null,
                cargando: false
            }

        case LIMPIAR_ERROR: {
            return {
                ...state,
                token: null,
                mensaje: null,
                autenticado: false,
                usuario: null,
                cargando: false
            }
        }

        case INICIAR_CARGA:
            return {
                ...state,
                cargando: true
            }

        case FINALIZAR_CARGA:
            return {
                ...state,
                cargando: false
            }

        default:
            return state;
    }
}

export default authReducer;