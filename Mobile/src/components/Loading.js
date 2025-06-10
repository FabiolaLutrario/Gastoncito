import React, {useState, useContext, useEffect} from "react";

import {
  Text,
  Heading,
  Container,
  Center,
  Box,
  Input, 
  Stack, 
  FormControl,
  Button,
  Modal,
  Spinner
  
} from "native-base";


//Styles
import globalStyles from "../styles/global";
import {COLORS} from "../styles/colors";

//Context
import authContext from "../contexts/autenticacion/authContext";


export default function Loading({isLoading}) {

    return (
        <Modal isOpen={isLoading}>
            <Box width={"30%"} height={"20%"} bg={"gray.800"} borderRadius={10} justifyContent="center" alignItems="center">
                <Spinner accessibilityLabel="Loading" size="lg"/>
                <Text color={"#fff"}>Cargando</Text>
            </Box>
        </Modal>

    );
}