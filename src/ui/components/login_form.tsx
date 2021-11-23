import { FormikHelpers, FormikErrors, Formik, ErrorMessage } from "formik";
import React, { FC,useContext } from 'react';
import { TextInput, View,Text, StyleSheet, Dimensions } from "react-native";
import { Button, Input } from "react-native-elements";
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { isEmpty } from "@firebase/util";
import { AuthCtx } from "../../context/login_ctx";

interface RegisterFormVal {
    username:string;
    password:string;
  }
  

  
  export const LoginUserForm = ( ) => {
    const authContext = useContext(AuthCtx);

    const registerSchema = Yup.object().shape({
        password: Yup.string().required('Required'),
        username:Yup.string().email('Invalid email').required('Required')
    });


    const initialVal:RegisterFormVal = {
      password:'',
      username:'',
    }
  
    const submit = (values:RegisterFormVal)=>{
      authContext?.login(values.username,values.password);
    }

  
    return(
    <Formik initialValues={initialVal} onSubmit={submit} validationSchema={registerSchema}>
      {({ handleChange, handleBlur, values, validateForm, errors}) => (
       
       <View style={styles.registerModal}>
          <Input leftIcon = {<Icon name='user-tie' size={24}/>} onChangeText ={handleChange('username')} value={values.username} placeholder='email'/>
          {errors.username != null ? <Text style={styles.errorMsg}>{errors.username}</Text> : <></>}

          <Input leftIcon = {<Icon name='lock' size={24}/>} onChangeText ={handleChange('password')} value={values.password} placeholder='password'/>
          {errors.username != null ? <Text style={styles.errorMsg}>{errors.password}</Text> : <></>}

          <Button disabled={errors.password != null || errors.username != null || !values.password.length} type = 'solid' title = 'login' raised = {true} onPress = {() => submit(values)}/>  
        </View>
  
      )
      
      }
  
    </Formik>
  )}


const styles = StyleSheet.create({
    registerModal:{
      minWidth:Dimensions.get('window').width *0.8,
      paddingBottom:0,
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
  