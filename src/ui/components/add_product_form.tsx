import { Formik } from "formik";
import React, { FC,useContext } from 'react';
import {  View,Text, StyleSheet, Dimensions } from "react-native";
import { Button, Input } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome5';
import I18n from 'i18n-js';
import { AuthCtx } from "../../context/login_ctx";
import { ProductCtx } from "../../context/home_ctx";
import { ProductType } from "../../data_models/product";
import { stringPaths } from "../../config/lang";

interface ProductFormVal {
    name:string;
    type:ProductType;
    price:number;
  }
  

  interface AddProductProps{
    callback:()=>void;
}

  export const AddProductForm:FC<AddProductProps> = ( { callback }) => {
    const prodContext = useContext(ProductCtx);
    const userContext = useContext(AuthCtx);
    const nameIsNotUsed = (name:string):boolean => {
        const find = prodContext?.products.find(val => val.name === name)
       return find === undefined ? true : false 
    
    }

    const registerSchema = Yup.object().shape({
      name: Yup.string().min(4,I18n.t(stringPaths.home.updateForm.errorMsg.tooShort)).test('isNameUsed',I18n.t(stringPaths.home.updateForm.errorMsg.nameAlreadyExists),(value)=>{
          return nameIsNotUsed(value??'');
      }).required(I18n.t(stringPaths.home.updateForm.errorMsg.required)),
      price:Yup.number().required(stringPaths.home.updateForm.errorMsg.required).when('type',{
          is:ProductType.Intergrated,
          then:Yup.number().min(1000,I18n.t(stringPaths.home.updateForm.errorMsg.needsMoreThanOneThousand))
      }),
      type:Yup.string()
  });

    
  


    const initialVal:ProductFormVal = {
        name:'',
        type:ProductType.Intergrated,
        price:0,
    }
  
    const submit = (values:ProductFormVal)=>{
        if(prodContext !== undefined && userContext !== undefined && userContext.user != null){
            //add prod 
            prodContext.addProduct(userContext.user.id,values.name,values.price,values.type);
            callback();
        }else{
            console.log('ERROR_IN_ADD_FORM: NO USER?')
        }
     
    }

  
    return(
    <Formik initialValues={initialVal} onSubmit={submit} validationSchema={registerSchema}>
      {({ handleChange, handleBlur, values, validateForm, errors}) => (
       
       <View style={styles.registerModal}>
          <Input leftIcon = {<Icon name='user-tie' size={24}/>} onChangeText ={handleChange('name')} placeholder={I18n.t(stringPaths.home.addForm.name)}/>
          {errors.name != null ? <Text style={styles.errorMsg}>{errors.name}</Text> : <></>}

          <Input leftIcon = {<Icon name='coins' size={24}/>} onChangeText ={handleChange('price')}  placeholder={I18n.t(stringPaths.home.addForm.price)} keyboardType='number-pad'/>
          {errors.price != null ? <Text style={styles.errorMsg}>{errors.price}</Text> : <></>}

          <Picker
        style={{marginBottom:20}}
            selectedValue={values.type}
            onValueChange = {
                handleChange('type')
            }
            
            
        >
            <Picker.Item label='Intergrated' value={ProductType.Intergrated}></Picker.Item>
            <Picker.Item label='Peripheral' value={ProductType.Peripheral}></Picker.Item>
        </Picker>

          <Button disabled={errors.price != null || errors.name != null || !values.name.length} type = 'solid' title={I18n.t(stringPaths.home.addForm.addProduct)} raised = {true} onPress = {() => submit(values)}/>   
          <Button type = 'solid' title={I18n.t(stringPaths.home.addForm.close)} raised = {true} onPress = {() => callback()}/>   
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
  