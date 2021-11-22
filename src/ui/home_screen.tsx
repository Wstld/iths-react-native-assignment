import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { ThemeProvider,Text, Button } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './theme';
import { ProductCtxProvider } from '../context/home_ctx';


export default function HomeScreen():JSX.Element{

  return <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <ProductCtxProvider>
      <View>
        <Text h1>O!</Text>
      </View>
    </ProductCtxProvider>
    </ThemeProvider>
    </SafeAreaProvider>


}

