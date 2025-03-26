import React, { useState, useRef } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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


export default function HomeNavigator({ navigation, route }) {

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

  const fetchResponse = async (message) => {
    setLoading(true);
    setIsError(false); // Resetear el error antes de cada petición
  
    try {
      const API_KEY = "AIzaSyAC-uHl_Jj1PDRyA3cXTaJ17DFeocFuQXg"; // Reemplaza con tu API Key
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Responde exclusivamente preguntas sobre nutrientes, alimentación y salud nutricional. 
                    Si la pregunta no está relacionada con estos temas, responde: "Solo puedo responder preguntas sobre nutrientes y alimentación.", a no ser que te saluden o te pregunten como estas y ahí le debes responder el saludo. Y si te dan las gracias deberías responder con "¡De nada! ¡Estoy para ayudarte en todo lo que necesites saber sobre los nutrientes! " 
                    Aquí está la consulta del usuario: ${message}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      console.log("data ", data);
  
      if (data.error) {
        throw new Error(data.error.message);
      }
  
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo obtener la respuesta.";
    } catch (error) {
      console.log("Error en la API:", error);
      setIsError(true); // Activar el estado de error
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
