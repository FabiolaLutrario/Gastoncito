import React, { useContext, useEffect, useState } from "react";

//Contexts
import authContext from "../contexts/autenticacion/authContext";

//Components
import Loading from "../components/Loading";

//Views
import Login from "../views/login/Login";
import Error from "../views/Error";

//Navigation
import ROUTES from "../constants/routes.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
const Stack = createNativeStackNavigator();

export default function AuthNavigator({navigationIsReady}) {
  
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)

  const aContext = useContext(authContext);
  const {
    cargando,
  } = aContext;


  const iniciar = async () => {
      setTimeout(()=>setLoading(false), 1000);
  };

  const inicializarApp = async () => {
    try {
        await iniciar();
      } catch (err) {
      console.log(err);
      navigation.navigate(ROUTES.ERROR, {
        mensajeError:
          err.response !== undefined ? err.response.data.errMsg : err.message,
      });
    }
  };

  useEffect(() => {
    inicializarApp();
  }, []);



  useEffect(()=>{
    if(navigationIsReady && loading == false){
        navigation.navigate(ROUTES.LOGIN);
    }
  },[navigationIsReady,loading])

  return (
    <>
      <Stack.Navigator
        initialRouteName={ROUTES.LOGIN}
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={ROUTES.HOME}
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={ROUTES.ERROR}
          component={Error}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>

      <Loading isLoading={cargando} />
    </>
  );
}