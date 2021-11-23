import {  Formik } from "formik";
import React, { FC,useContext } from 'react';
import { View,Text, StyleSheet, Dimensions } from "react-native";
import { Button, Input } from "react-native-elements";
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome5';
import I18n from 'i18n-js';

import { AuthCtx } from "../../context/login_ctx";
import { stringPaths } from "../../config/lang";

interface RegisterFormVal {
    username:string;
    password:string;
  }
  
interface RegisterFormProps{
    callback:()=>void;
}
  
  export const RegisterUserForm:FC<RegisterFormProps> = ( { callback } ) => {
    const authContext = useContext(AuthCtx);

    const registerSchema = Yup.object().shape({
        password: Yup.string().min(6,I18n.t(stringPaths.login.registerForm.errorMsg.tooShort)).required(I18n.t(stringPaths.login.registerForm.errorMsg.required)),
        username:Yup.string().email(I18n.t(stringPaths.login.registerForm.errorMsg.notValidEmail)).required(I18n.t(stringPaths.login.registerForm.errorMsg.required))
    });


    const initialVal:RegisterFormVal = {
      password:'',
      username:'',
    }
  
    const submit = (values:RegisterFormVal)=>{
      authContext?.registerAndLogin(values.username,values.password);
      callback();
    }

  
    return(
    <Formik initialValues={initialVal} onSubmit={submit} validationSchema={registerSchema}>
      {({ handleChange, handleBlur, values, validateForm, errors}) => (
       
       <View style={styles.registerModal}>
          <Input leftIcon = {<Icon name='user-tie' size={24}/>} onChangeText ={handleChange('username')} value={values.username} placeholder={I18n.t(stringPaths.login.registerForm.email)}/>
          {errors.username != null ? <Text style={styles.errorMsg}>{errors.username}</Text> : <></>}

          <Input leftIcon = {<Icon name='lock' size={24}/>} onChangeText ={handleChange('password')} value={values.password} placeholder={I18n.t(stringPaths.login.registerForm.password)}/>
          {errors.username != null ? <Text style={styles.errorMsg}>{errors.password}</Text> : <></>}

          <Button disabled={errors.password != null || errors.username != null || !values.password.length} type = 'solid' title = {I18n.t(stringPaths.login.registerForm.addNewUser)} raised = {true} onPress = {() => submit(values)}/>   
          <Button type = 'solid' title = {I18n.t(stringPaths.login.registerForm.close)} raised = {true} onPress = {() => callback()}/>   
        </View>
  
      )
      
      }
  
    </Formik>
  )}


const styles = StyleSheet.create({
    registerModal:{
      minWidth:Dimensions.get('window').width *0.8,
      minHeight:Dimensions.get('window').height *0.4,
    },
    errorMsg:{
        color:'red',
        fontSize:14,
        marginTop:-20,
        textAlign:'center',
        padding:0,
        marginBottom:15,
    }
  
  })
  