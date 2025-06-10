import {Toast} from "native-base";
import Notificacion from "../components/Notificacion/Notificacion";

// tipo=  "successl"    ||   "warning"   ||   "error"
export const lanzarNotificacion = (tipo = "success", mensaje = "No recibe ningun mensaje") => {
    Toast.show({
        duration: 3000,
        render: () => <Notificacion tipo={tipo} texto={mensaje} />
        ,
        placement: "top"
    });
}