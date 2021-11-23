import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, View } from "react-native";
import { Text } from 'react-native-elements';

import I18n from 'i18n-js';

import { ProductType } from "../data_models/product";
import { UpdateProductForm } from "./components/update_product_form";
import { RootStackParams } from "./root_stack_params";
import { stringPaths } from "../config/lang";



type ProductScreenProps = NativeStackScreenProps<RootStackParams,'Product'>

export const ProductScreen= ({route,navigation}:ProductScreenProps) => {
    const product = route.params.product;

    return(
        <View style={{height:Dimensions.get('window').height * 0.8,alignSelf:'center',width:Dimensions.get('window').width * 0.8,alignContent:'center'}}>
            <Text h2>{I18n.t(stringPaths.home.productEdit.header)}</Text>
            <UpdateProductForm callback={() => { 
                navigation.replace('Home');
         } } name={product!.name ?? ''} price={product!.price ?? 0} type={product!.type ?? ProductType.Intergrated} prodId={product!.id ?? ''} />
     
  
        </View>

        )


   

}
        