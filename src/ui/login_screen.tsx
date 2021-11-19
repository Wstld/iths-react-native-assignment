import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dimensions } from 'react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider,Input, Button } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './theme';
import { RootStackParams } from './root_stack_params';
import Icon from 'react-native-vector-icons/FontAwesome5';


type loginScreenProps = NativeStackNavigationProp<RootStackParams,'Login'>

export default function LoginScreen():JSX.Element{
    const navigation = useNavigation<loginScreenProps>();
  return <SafeAreaProvider>
    <ThemeProvider theme={theme}>
    <View style={styles.container}>
      <Input placeholder='Username' leftIcon = {<Icon name='user-tie' size={24}/>}/>
      <Input placeholder='Password' leftIcon = {<Icon name='lock' size={24}/>}/>
      <Button type = 'solid' title = 'login' raised = {true} onPress = {() => navigation.navigate('Home',{userId:''})}/>
    </View>
    </ThemeProvider>
    </SafeAreaProvider>


}

const styles = StyleSheet.create({
  container: {
    padding :20,
    alignSelf:'center',
    width:Dimensions.get('window').width * 0.5,
    height:Dimensions.get('window').width * 0.5,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
