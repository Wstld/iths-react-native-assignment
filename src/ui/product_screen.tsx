import { arrayRemove } from "@firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useContext, useEffect, useState } from "react";
import { Dimensions, PointPropType, View } from "react-native";
import { Overlay , Input, Button,Text } from "react-native-elements";

import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProductCtx } from "../context/home_ctx";
import { AuthCtx } from "../context/login_ctx";
import { ProductType } from "../data_models/product";
import { RootStackParams } from "./root_stack_params";



type ProductScreenProps = NativeStackScreenProps<RootStackParams,'Product'>

export const ProductScreen= ({route,navigation}:ProductScreenProps) => {
    const prodContext = useContext(ProductCtx);
    const authContext = useContext(AuthCtx);

    const [name,setName] = useState(route.params.product!.name);
    const [price,setPrice] = useState(route.params.product!.price);
    const [type,setType] = useState<ProductType>(
        route.params.product!.type === ProductType.Intergrated ? ProductType.Intergrated : ProductType.Peripheral
    ); 
    const [savePossible,setAddPossible] = useState(false);
    const [wrongPrice,setWrongPrice] = useState(false);

    const nameIsNotUsed = (name:string):boolean => {
        const find = prodContext?.products.find(val => val.name === name)
       return find === undefined ? true : false 
    }
    
    
    useEffect(() => {
        console.log('update')
        if(wrongPrice === false && price > 0 && name.length > 0 ){
       
            if(type === ProductType.Intergrated){
                if(price >= 1000){
                    setAddPossible(true);
                }else{
                    setAddPossible(false);
                }
            }else{
              
                    setAddPossible(true)
                
            }
        }else{
            setAddPossible(false)
        }
      
    }, [name,price,type])

    return(
        <View style={{height:Dimensions.get('window').height * 0.8,alignSelf:'center',width:Dimensions.get('window').width * 0.8,alignContent:'center'}}>
        
        <Text h1 style={{textAlign:'center',marginBottom:10}}>Add Product</Text>
        
        <Input value={name} leftIcon = {<Icon name='tag' size={24}/>} onChangeText = {name => setName(name)}/>
        <Input style={{marginBottom:0}} keyboardType='number-pad'  value={price.toString()}  leftIcon = {<Icon name='coins' size={24}/>} onChangeText = {price => {
            //check type for price intervall
            const newPrice = parseInt(price);
            if(type === ProductType.Peripheral){
                setWrongPrice(false)
                setPrice(newPrice)
            }else{
                if(newPrice>=1000){
                    setWrongPrice(false)
                    setPrice(newPrice)
                }else{
                    //add snack bar.
                    setWrongPrice(true);
                    setPrice(newPrice)   
                    
                }
            }
            
          
            
            }}/>

            { wrongPrice? <Text style={{textAlign:'center',marginTop:-12}} h4>Must be over 1000 for this type</Text> : <></>}

        <Picker
        style={{marginBottom:20}}
            selectedValue={type}
            onValueChange = {(item,index) => {
                setType(item)
            }
            
            }
        >
            <Picker.Item label='Intergrated' value={ProductType.Intergrated}></Picker.Item>
            <Picker.Item label='Peripheral' value={ProductType.Peripheral}></Picker.Item>
        </Picker>

        <Button disabled={ !savePossible } title='Save' icon={<Icon name='save' size={30}/>} onPress={() => {
 
            if(authContext !== undefined && authContext?.user != null){
                prodContext!.updateProduct(authContext?.user.id,route.params.product!.id,name,price,type);
                navigation.replace('Home');
            }
           
        }}/>

        <Button title='Cancle' icon={<Icon name='ban' size={30}/>} onPress={() => navigation.pop()}/>
  
        </View>

        )


   

}
        