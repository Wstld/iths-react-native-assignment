
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React,{ useState } from 'react';
import { View } from 'react-native';
import { ThemeProvider, Button, Overlay } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {theme} from './theme';
import { RootStackParams } from './root_stack_params';
import I18n from 'i18n-js';

import { RegisterUserForm } from './components/register_form';
import { LoginUserForm } from './components/login_form';
import { stringPaths } from '../config/lang';







type loginScreenProps = NativeStackNavigationProp<RootStackParams,'Login'>





export default function LoginScreen():JSX.Element{
    const [showReg, setShowReg] = useState(false); 
    
  return (<SafeAreaProvider>
    <ThemeProvider theme={theme}>
    
    <Overlay isVisible={showReg}>
      <RegisterUserForm callback={() => {setShowReg(!showReg)}}/>
    </Overlay>



    <View>
      <LoginUserForm/>
      <Button type = 'clear' title ={I18n.t(stringPaths.login.registerUser)} raised = {true} onPress = {() => {setShowReg(!showReg)}}/>
    </View>
    </ThemeProvider>
    </SafeAreaProvider>
    );
  


};


