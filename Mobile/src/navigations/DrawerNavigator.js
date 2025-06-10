import React, { useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Speech from 'expo-speech';

const Tab = createBottomTabNavigator();

import {
  Image,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  Keyboard 
} from "react-native";

import { HelloWave } from "../components/HelloWave/HelloWave";
import { ThemedText } from "../components/ThemedText/ThemedText";
import { ThemedView } from "../components/ThemedView/ThemedView";


//Icons
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";

//Navigation
import ROUTES from "../constants/routes.js";

export default function DrawerNavigator({ navigation, route }) {

  const handlerMenuDrawer = () => {
    navigation.openDrawer();
  };

  const { name } = route.params || { name: "" };
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false)

  const scrollViewRef = useRef(null);
  const buttonContainerRef = useRef(null);

  const speakResponse = (text) => {
  if (text) {
    Speech.speak(text, {
      language: "es-ES", // español
      pitch: 1.0,
      rate: 1.0,
    });
  }
};


  const fetchResponse = async (message) => {
    setLoading(true);
    setIsError(false); // Resetear el error antes de cada petición
  
    try {
      const API_KEY = "De9c8BLVZi5Xty1G2b2jZqtet6dd61rtJJtyjTJL"; // 
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-r-plus",
        temperature: 0.5,
        chat_history: [], // Deja vacío si no quieres contexto previo
        message: `Responde exclusivamente preguntas sobre nutrientes, alimentación y salud nutricional. 
        Si la pregunta no está relacionada con estos temas, sólo si no está relacionada, responde: "Solo puedo responder preguntas sobre nutrientes y alimentación." Si te saludan y/o prenguntan como estas, debes responder el saludo y decir que responderás cualquier pregunta sobre los nutrientes o los alimentos. Cuando te hagan una pregunta puntual, sin saludo, solo debes responder la pregunta sin saludar.
        Si te dan las gracias deberías responder con "¡De nada! ¡Estoy para ayudarte en todo lo que necesites saber sobre los nutrientes!". 
        Aquí está la consulta del usuario: ${message}`
      }),
    });
  
      const data = await response.json();
      console.log("data ", data);

    if (data.text) {
      return data.text;
    } else {
      throw new Error("No se recibió una respuesta válida.");
    }
  } catch (error) {
    console.log("Error en la API:", error);
    setIsError(true);
    return "Ocurrió un error, por favor intenta de nuevo.";
  } finally {
    setLoading(false);
  }
};
  

  const handleAsk = async () => {
    const res = await fetchResponse(question);
    setResponse(res);
    setQuestion(""); // Vaciar el TextInput después de obtener la respuesta
    Keyboard.dismiss(); // Ocultar el teclado
  };

  const scrollToButton = () => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 250);
  };

  return (
     <ScrollView style={{ margin: 20 }}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/nutrientes.png")}
              style={styles.reactLogo}
            />
          </View>
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={{ marginTop: 15 }} type="title">
              ¡Hola {name}!
            </ThemedText>
            <HelloWave />
          </ThemedView>
        {isError && (
            <ThemedView style={styles.stepContainer}>
            <ThemedText style={{fontSize: 14, fontWeight: "bold" }}>
              Pregúntame lo que quieras sobre los nutrientes:
            </ThemedText>
          </ThemedView>
        )}
          {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
              <Text
              style={[
                styles.responseText,
                isError && { color: "red" }, // Aplica rojo si hay error
              ]}
            >
              {response}
            </Text>
                          {response !== "" && (
  <View style={{ alignItems: "center", marginTop: 0, marginBottom:10 }}>
    <Button title="🔊 Escuchar respuesta" onPress={() => speakResponse(response)} />
  </View>
)}
              </View>
              
            )}
          {!isError && (
              <ThemedView style={styles.stepContainer}>
              <ThemedText style={{ fontSize: 14, fontWeight: "bold" }}>
                Pregúntame lo que quieras sobre los nutrientes:
              </ThemedText>
            </ThemedView>
          )}
          <View>
          <TextInput
            placeholder="Pregunta sobre nutrientes..."
            value={question}
            onChangeText={setQuestion}
            onFocus={scrollToButton} // Ahora el scroll funciona correctamente
            style={styles.textInput}
            multiline
          />
          <View ref={buttonContainerRef} style={styles.buttonContainer}>
            <Button 
              title={loading ? "Cargando..." : "Preguntar"} 
              onPress={handleAsk} 
              disabled={loading} 
              color={loading ? "#ccc" : undefined} // Cambia el color cuando está deshabilitado
            />
            {loading && <ActivityIndicator size="small" color="#000" style={styles.loader} />}
          </View>
          </View>
        </ScrollView>
      );
    }
    
    const styles = StyleSheet.create({
      titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 3,
      },
      stepContainer: {
        gap: 8,
        marginBottom: 3,
      },
      reactLogo: {
        height: 140,
        width: 290,
        bottom: 0,
        left: 0,
        marginTop: 20,
      },
      imageContainer: {
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
      },
      textInput: {
        backgroundColor: "white",
        height: 100,
        padding: 10,
        borderRadius: 5,
        textAlignVertical: "top",
        marginBottom: 20,
        marginTop: 20,
      },
      buttonContainer: {
        width: 200,
        alignSelf: "center",
      },
      responseText: {
        margin: 10,
        fontSize: 16,
        textAlign: "center",
      },
      loader: {
        position: "absolute",
        right: 10,
        top: "50%",
        marginTop: -10, // Ajuste para centrar verticalmente
      },
    });