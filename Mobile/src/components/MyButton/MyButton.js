import {Button} from "native-base";

import React, {useState, useContext, useEffect} from "react";

import { MyTextLG, MyTextMD, MyTextSM } from "../ComponenteSinEscalado/Text/Text";

import {COLORS} from "../../styles/colors";

export default function MyButton ({onPress, text}){

    return (
        <Button bg={COLORS.secondary} shadow={9} px={10} borderRadius={"16"} onPress={onPress} w={"100%"} justifyContent={"center"} alignItems={"center"}>
            <MyTextMD color={COLORS.textColor} fontWeight="bold" textAlign={'center'}>{text}</MyTextMD>
        </Button>
    )
}