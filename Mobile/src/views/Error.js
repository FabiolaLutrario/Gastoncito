import React, {useState, useContext, useEffect} from "react";
import { BackHandler } from "react-native";
import {
  Text,
  Center,
  Box,
  Image
} from "native-base";

//Styles
import globalStyles from "../styles/global";
import {COLORS} from "../styles/colors";

//Images
const logo = require("../../assets/nutrientes.png");

export default function Error({route, navigation}) {

    const [textError, setTextError] = useState("Error en la App");

    useEffect(() => {
        if(route.params?.mensajeError) setTextError(route.params?.mensajeError);
    },[route.params?.mensajeError]);

    useEffect(() => {
        const onBackPress = () => true;
        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => subscription.remove();
      },[]);

    return (
        <Center flex={1} bg={{
            linearGradient: {
            colors: [COLORS.background, COLORS.backgrounB],
            start: [0, 0],
            end: [1, 0]
            }}}>
           
            <Box justifyContent={"center"} alignItems={"center"} style={[globalStyles.contenedor]}>


                <Image
                    source={logo}
                    width={500}
                    height={150}
                    alt="Logo Nutrientes"
                    resizeMode="contain"
                    borderWidth={1}
                />

                <Box background={"#ffff"} p={3} borderRadius={"md"}>
                    <Text color={"red.600"} fontWeight={"500"} fontSize={"xl"} textAlign={"center"}>{textError}</Text>
                </Box>

                <Box flexDir={"row"} justifyContent="center" alignItems={"center"} position="absolute" bottom={0}>
                    <Text color={"white"}>NUTRIGASTONCITO 2.0</Text>
                </Box>
            </Box>

        </Center>
    );
}
