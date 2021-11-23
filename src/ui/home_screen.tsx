import React, { useState } from 'react';
import { View } from 'react-native';
import { useContext, useRef } from 'react';
import { ThemeProvider,Text, Button, ListItem, FAB, Overlay,Image } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {theme} from './theme';
import { ProductCtx} from '../context/home_ctx';
import { AuthCtx } from '../context/login_ctx';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { RootStackParams } from './root_stack_params';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AddProductForm } from './components/add_product_form';

import I18n from 'i18n-js';
import { stringPaths} from '../config/lang';


type HomeScreenPros = NativeStackScreenProps<RootStackParams,'Home'>


export default function HomeScreen({route,navigation}:HomeScreenPros):JSX.Element{
  


  return <SafeAreaProvider>
    <ThemeProvider theme={theme}>
        <HomeScreenContent route={route} navigation={navigation}/>
    </ThemeProvider>
    </SafeAreaProvider>

}

export const HomeScreenContent = ({route,navigation}:HomeScreenPros) => {

  const prodContext = useContext(ProductCtx);
  const authContext = useContext(AuthCtx);
  const selectedProduct = useRef('');

  const [removeOverlay,toggleRemoveOverlay] = useState(false);
  const [addOverlay,toggleAddOverlay] = useState(false);


  return(   <View style={{flexDirection:'column'}}>
    <Overlay isVisible={removeOverlay}>
      <View>
        <Image source={require('../../assets/sure.gif')} style={{width:300,height:300}} />
        <View style={{flexDirection:'column',justifyContent:'space-between', height:90, margin:10}}>
          <Button title='Hell yes!' onPress={ () => { 
              if (authContext !== undefined && authContext.user !== null && prodContext !== undefined){
                prodContext.removeProduct(authContext.user.id,selectedProduct.current);
                toggleRemoveOverlay(!removeOverlay);
              }else{
                //handle error.
              }
          }}/>
          <Button title='Oh no!' onPress={ () => { toggleRemoveOverlay(!removeOverlay) }}/>
        </View>
      </View>
    </Overlay>
    

          <Overlay isVisible={addOverlay}> 
            <AddProductForm callback = {() => {toggleAddOverlay(!addOverlay)}}/>
          </Overlay>


   
    <View style={{alignItems:'center',minHeight:20,justifyContent:'space-evenly',flexDirection:'row', backgroundColor:'lightblue', marginBottom:5, shadowRadius:10,shadowOpacity:0.2,shadowColor:'black', padding:10,}}>
      <Text h3>{I18n.t(stringPaths.home.header.name)}</Text>
      <Text h3>{I18n.t(stringPaths.home.header.type)}</Text>
      <Text h3>{I18n.t(stringPaths.home.header.price)}</Text>
    </View>
          
    {prodContext?.products !== null? prodContext?.products.map((el,i) => (
      <ListItem.Swipeable
      pad={0}
      topDivider= {true}
      bottomDivider = {true}
      key = {i}
      rightContent={
        <Button
          title={I18n.t(stringPaths.home.deleteBtn)}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          onPress = {() => { 
            selectedProduct.current = el.id;
            toggleRemoveOverlay(true);
          }}
        />
      }
      leftContent={
        <Button
          title={I18n.t(stringPaths.home.editBtn)}
          icon={{ name: 'edit', color: 'white' }}
          buttonStyle={{ minHeight: '100%'}}
          onPress = {() => {navigation.push('Product',{product:el}) }}
        />
      }
    >
      <ListItem.Content style={{justifyContent:'space-evenly', flexDirection:'row'}}>
        
      
          <Text>{el.name}</Text>
          <Text>{el.type}</Text>
          <Text>{el.price}</Text>
     
      </ListItem.Content>
     
    </ListItem.Swipeable>
    )) :
    <> </>
    }
    <FAB style={{margin:20}} icon={<Icon name='plus' size={14} color='white'/>} size='large' visible={true} onPress={ () => toggleAddOverlay(!addOverlay)}/>
  </View>)
}

