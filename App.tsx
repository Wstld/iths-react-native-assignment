
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from './src/ui/root_stack_params';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/ui/login_screen';
import HomeScreen from './src/ui/home_screen';

export default function App(){
  const Stack = createNativeStackNavigator<RootStackParams>();
  return <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'Login'>
          <Stack.Screen name = 'Login' component= {LoginScreen}/>
          <Stack.Screen name ='Home' component= {HomeScreen}/>

        </Stack.Navigator>

      </NavigationContainer>

    </SafeAreaProvider>
 
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
