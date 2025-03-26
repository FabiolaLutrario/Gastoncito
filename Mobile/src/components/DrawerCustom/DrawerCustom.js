import {
    Text,
    Box,
    Button,
    Icon,
  } from "native-base";

  import React, {useContext} from "react";

    //Icons
    import { Entypo} from "@expo/vector-icons";

    import { BackHandler } from "react-native"; // Importar BackHandler
    import { COLORS } from "../../styles/colors";
  

    function DrawerCustom(props) {

        const handlerCerrarSesion = () => {
            BackHandler.exitApp(); // Cierra la aplicación
        };

    return (
            <Box style={{flex: 1}}>
                <Box my={2}>
                    <Button onPress={handlerCerrarSesion} bg={"#fff"} borderRadius={"none"}
                        rightIcon={<Icon as={Entypo} size="lg" name={ "log-out" } color={COLORS.secondary}/>}
                    >
                        <Box style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                            }}>
                                Cerrar Sesion
                            </Text>
                        </Box>
                    </Button>
                </Box>
            </Box>      
    );
    }
  
  export default DrawerCustom;