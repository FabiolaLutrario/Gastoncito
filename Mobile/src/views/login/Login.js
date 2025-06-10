import React, { useState, useContext} from "react";

import {
  Center,
  Box,
  Stack,
  FormControl,
  Button,
  Icon,
  Image,
} from "native-base";

import { Input } from "../../components/ComponenteSinEscalado/Input/Input";
import { MyTextMD } from "../../components/ComponenteSinEscalado/Text/Text";

//Icons
import { MaterialIcons } from "@expo/vector-icons";

//Styles
import globalStyles from "../../styles/global";
import { COLORS } from "../../styles/colors";

//Context
import authContext from "../../contexts/autenticacion/authContext";
import { Keyboard } from "react-native";

//Routes
import ROUTES from "../../constants/routes";
import { useFocusEffect } from "@react-navigation/native";

//Images
const logo = require("../../../assets/nutrientes.png");

export default function Login({ navigation, route }) {
  //Context de Autenticacion
  const aContext = useContext(authContext);
  const {
    iniciarCarga,
    finalizarCarga,
  } = aContext;

  //Valores state
  const [name, setName] = useState("");
  const [botonAceptarPresionado, setBotonAceptarPresionado] = useState(false);

  const handlerIniciarSesion = async () => {
    await iniciarCarga();
    Keyboard.dismiss();
    await finalizarCarga();
    setBotonAceptarPresionado(true);
    navigation.navigate(ROUTES.HOME, { name });
  };

/*   useFocusEffect(
    React.useCallback(() => {
      if (navigation.isFocused() === true) {
        if (botonAceptarPresionado)
          navigation.navigate(ROUTES.DRAWER_HOME, { name });
      }
    }, [botonAceptarPresionado])
  ); */

  return (
    <Center
      flex={1}
      bg={{
        linearGradient: {
          colors: [COLORS.background, COLORS.backgrounB],
          start: [0, 0],
          end: [1, 0],
        },
      }}
    >
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        style={[globalStyles.contenedor]}
      >
        <Image
          source={logo}
          width={500}
          height={150}
          alt="Logo Nutrientes"
          resizeMode="contain"
          marginBottom={"5"}
        />
        <FormControl>
          <Stack space={5}>
            <Center>
              <Stack style={globalStyles.inputContainer} alignItems="center">
                <Input
                  variant="outline"
                  size="xl"
                  p={2}
                  placeholder="Nombre"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  style={globalStyles.input}
                  bg={COLORS.textColor}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={"xl"}
                      ml="2"
                      mr="2"
                      color="muted.400"
                    />
                  }
                />
              </Stack>
            </Center>
          </Stack>
        </FormControl>
        <Button
          size="sm"
          width={"80%"}
          style={globalStyles.boton}
          onPress={handlerIniciarSesion}
          mt={5}
          marginBottom={"8"}
        >
          <MyTextMD color="white">Aceptar</MyTextMD>
        </Button>
        <Box
          flexDir={"row"}
          justifyContent="center"
          alignItems={"center"}
          position="absolute"
          bottom={0}
          marginBottom={"5"}
        >
          <MyTextMD color={"white"}>NUTRIGASTONCITO 2.0 </MyTextMD>
        </Box>
      </Box>
    </Center>
  );
}