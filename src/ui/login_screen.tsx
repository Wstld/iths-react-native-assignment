import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React,{ useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ThemeProvider,Input, Button, Overlay } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {theme} from './theme';
import { RootStackParams } from './root_stack_params';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AuthCtx } from '../context/login_ctx';
import { RegisterUserForm } from './components/register_form';
import { LoginUserForm } from './components/login_form';







type loginScreenProps = NativeStackNavigationProp<RootStackParams,'Login'>





export default function LoginScreen():JSX.Element{
  
  




  const navigation = useNavigation<loginScreenProps>();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showReg, setShowReg] = useState(false); 
    const authContext = useContext(AuthCtx);
    

  return (<SafeAreaProvider>
    <ThemeProvider theme={theme}>
    
    <Overlay isVisible={showReg} style={{    minWidth:Dimensions.get('window').width *0.8,
    minHeight:Dimensions.get('window').height *0.8,}}>
      <RegisterUserForm callback={() => {setShowReg(!showReg)}}/>
    </Overlay>



    <View >
   
      <LoginUserForm/>
      <Button type = 'clear' title = 'no account?' raised = {true} onPress = {() => {setShowReg(!showReg)}}/>
    </View>
    </ThemeProvider>
    </SafeAreaProvider>
    );
  


};

const styles = StyleSheet.create({
  registerModal:{
    minWidth:Dimensions.get('window').width *0.8,
    minHeight:Dimensions.get('window').height *0.8,
    backgroundColor:'blue',
  }

})
