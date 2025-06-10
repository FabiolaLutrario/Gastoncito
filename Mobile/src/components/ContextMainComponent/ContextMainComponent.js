import React, { useEffect, useRef } from "react";

//Contexts
import AuthState from "../../contexts/autenticacion/authState";
import NavegacionState from "../../contexts/navegacionContext/navegacionState";

//Views
import AuthNavigator from "../../navigations/AuthNavigator";

export default function ContextMainComponent({navigationIsReady}) {
  return (
    <>
          <NavegacionState>
            <AuthState>              
              <AuthNavigator navigationIsReady={navigationIsReady}/>
            </AuthState>
          </NavegacionState>
    </>
  );
}