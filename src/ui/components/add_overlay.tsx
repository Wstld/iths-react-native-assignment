import { arrayRemove } from "@firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import React, { FC, useContext, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Overlay , Input, Button,Text } from "react-native-elements";

import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProductCtx } from "../../context/home_ctx";
import { AuthCtx } from "../../context/login_ctx";
import { ProductType } from "../../data_models/product";

export interface AddProductProps{
    show:boolean,
    toggleVisibillity:() => void
}

export const AddProductOverlay:FC<AddProductProps> = ({show,toggleVisibillity}) => {
    const prodContext = useContext(ProductCtx);
    const authContext = useContext(AuthCtx);

    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [type,setType] = useState<ProductType>(ProductType.Peripheral); 
    const [addPossible,setAddPossible] = useState(false);
    const [wrongPrice,setWrongPrice] = useState(false);

    const nameIsNotUsed = (name:string):boolean => {
        const find = prodContext?.products.find(val => val.name === name)
        console.log(find);
       return find === undefined ? true : false 
    
    }
    
    useEffect(() => {
        if(wrongPrice === false && price > 0 && name.length > 0 && nameIsNotUsed(name)){
       
            if(type === ProductType.Intergrated){
                if(price >= 1000 && nameIsNotUsed(name)){
                    setAddPossible(true)
                }
            }else{
                if(nameIsNotUsed(name)){
                    setAddPossible(true)
                }
            }
        }else{
            setAddPossible(false)
        }
      
    }, [name,price,type])
   

    return(
        <Overlay isVisible={show}>
        <Text h1 style={{textAlign:'center',marginBottom:10}}>Add Product</Text>
        <View style={{height:Dimensions.get('window').height * 0.8,alignSelf:'center',width:Dimensions.get('window').width * 0.8,alignContent:'center'}}>
        <Input placeholder='Name' leftIcon = {<Icon name='tag' size={24}/>} onChangeText = {name => setName(name)}/>
        <Input style={{marginBottom:0}} keyboardType='number-pad' placeholder='Price'  leftIcon = {<Icon name='coins' size={24}/>} onChangeText = {price => {
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
                if(item === ProductType.Intergrated){
                    setPrice(1000);
                }
                setType(item)
            }
            
            }
        >
            <Picker.Item label='Intergrated' value={ProductType.Intergrated}></Picker.Item>
            <Picker.Item label='Peripheral' value={ProductType.Peripheral}></Picker.Item>
        </Picker>
        <Button disabled={ !addPossible } title='Add Product' icon={<Icon name='plus-circle' size={30}/>} onPress={() => {
            toggleVisibillity()
            if(authContext !== undefined && authContext.user != null){
                prodContext?.addProduct(authContext.user.id,name,price,type);
            }
           
        }}/>
        <Button title='Cancle' icon={<Icon name='ban' size={30}/>} onPress={() => toggleVisibillity()}/>
  
        </View>
      </Overlay>
    )
}