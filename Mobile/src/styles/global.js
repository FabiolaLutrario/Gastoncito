import { Dimensions, StyleSheet } from "react-native";

//Color
import {COLORS} from "./colors";

const globalStyles = StyleSheet.create({
    contenedor: {
        width: "98%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center"
    },

    titulo: {
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",

    },

    inputContainer: {
        marginBottom: 20,
        width: '96%',

    },

    input: {
        backgroundColor: '#eaeaea',
        width: '90%'
    },

    label:{
        borderWidth: 1,
        width: "100%"
    },

    boton:{
        backgroundColor: COLORS.secondary
    },

    //Eliminar
/*     button: {
        width: '100%',
        alignSelf: 'center',
        marginVertical: 5,
    },
    swipeContentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        borderColor: '#e3e3e3',
    } */
})

const { width, height } = Dimensions.get('window');

export const globalFontSizes = {
    title: width * 0.05,
    subtitle: width * 0.03,
    label: width * 0.025
}

export default globalStyles; 