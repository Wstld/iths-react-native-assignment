
import React,{ useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from './src/ui/root_stack_params';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/ui/login_screen';
import HomeScreen from './src/ui/home_screen';
import { AuthCtx, AuthProvider } from './src/context/login_ctx';
import { ProductScreen } from './src/ui/product_screen';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function App(){
  return <SafeAreaProvider>
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
    </SafeAreaProvider>
 
  
}
export const AppNav:React.FC = () =>{
  const Stack = createNativeStackNavigator<RootStackParams>();
  const authContext = useContext( AuthCtx );
  console.log(authContext?.user)
  return(
    <NavigationContainer>
        {
          authContext?.user != null ?     
          <Stack.Navigator initialRouteName = 'Home'>
          <Stack.Screen name = 'Home' component= {HomeScreen} options={{headerRight: () => <Icon name='home' size={24} onPress={() => authContext.logout()}/>}}/>
          <Stack.Screen name = 'Product' component= {ProductScreen} initialParams={{product:undefined}}/>
          </Stack.Navigator>
          :
          <Stack.Navigator initialRouteName = 'Login'>
          <Stack.Screen name = 'Login' component= {LoginScreen}/>
          </Stack.Navigator>
        }
    
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
