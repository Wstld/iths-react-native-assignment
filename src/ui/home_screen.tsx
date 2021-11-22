import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useEffect,useContext } from 'react';
import { ThemeProvider,Text, Button, ListItem } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './theme';
import { ProductCtx, ProductCtxProvider } from '../context/home_ctx';
import { AuthCtx } from '../context/login_ctx';
import { Icon } from 'react-native-elements/dist/icons/Icon';




export default function HomeScreen():JSX.Element{



  return <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <ProductCtxProvider>
        <HomeScreenContent/>
    </ProductCtxProvider>
    </ThemeProvider>
    </SafeAreaProvider>

}

export const HomeScreenContent = () => {
  const prodContext = useContext(ProductCtx);
  const authContext = useContext(AuthCtx);
  return(   <View>
    {prodContext?.products !== null? prodContext?.products.map((el,i) => (
      <ListItem.Swipeable
      key = {i}
      rightContent={
        <Button
          title="Delete"
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
          onPress = {() => { 
            if (authContext !== undefined && authContext.user !== null){
              prodContext.removeProduct(authContext.user.id,el.id);
            }
          }}
        />
      }
    >
      <ListItem.Content>
        <ListItem.Title>Hello Swiper</ListItem.Title>
      </ListItem.Content>
     
    </ListItem.Swipeable>
    )) :
    <> </>
    }
  </View>)
}

