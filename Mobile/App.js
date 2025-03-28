import React, { useEffect, useRef, useState } from 'react';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, extendTheme } from 'native-base';

import MainComponent from './src/components/MainComponent/MainComponent';



//Gradient
const LinearGradient = require('expo-linear-gradient').LinearGradient;

import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  const [navigationIsReady, setNavigationIsReady] = useState(false)

  return (
    <NativeBaseProvider>
      <NavigationContainer onReady={()=>setNavigationIsReady(true)}>
        <MainComponent navigationIsReady={navigationIsReady}/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
