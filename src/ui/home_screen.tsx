import React, { useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { useEffect,useContext, useRef } from 'react';
import { ThemeProvider,Text, Button, ListItem, FAB, Overlay,Image,Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './theme';
import { ProductCtx, ProductCtxProvider } from '../context/home_ctx';
import { AuthCtx } from '../context/login_ctx';


import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RootStackParams } from './root_stack_params';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AddProductOverlay } from './components/add_overlay';

type HomeScreenPros = NativeStackScreenProps<RootStackParams,'Home'>


export default function HomeScreen({route,navigation}:HomeScreenPros):JSX.Element{


  return <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <ProductCtxProvider>
        <HomeScreenContent route={route} navigation={navigation}/>
    </ProductCtxProvider>
    </ThemeProvider>
    </SafeAreaProvider>

}

export const HomeScreenContent = ({route,navigation}:HomeScreenPros) => {
  //{uri:"https://giphy.com/gifs/theoffice-gphyoffice726-pICj6JWqVpm5aapOIS"} <iframe src="https://gifer.com/embed/5JM" width=480 height=465.924 frameBorder="0" allowFullScreen></iframe><p><a href="https://gifer.com">a través de GIFER</a></p>
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
    
  
    <AddProductOverlay toggleVisibillity={() => toggleAddOverlay(!addOverlay)} show={addOverlay}/>



   

    
    {prodContext?.products !== null? prodContext?.products.map((el,i) => (
      <ListItem.Swipeable
      pad={0}
      topDivider= {true}
      bottomDivider = {true}
      key = {i}
      rightContent={
        <Button
          title="Delete"
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
          title="Edit"
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
    <FAB  icon={<Icon name='plus' size={14} color='white'/>} size='large' visible={true} onPress={ () => toggleAddOverlay(!addOverlay)}/>
  </View>)
}

