
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import React from 'react';

import { ThemeProvider,Input, Button} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './theme';
import { RootStackParams } from './root_stack_params';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IProduct } from '../data_models/product';
import { View } from 'react-native';







type loginScreenProps = NativeStackScreenProps<RootStackParams,'Product'>

export function ProductScreen({route,navigation}:loginScreenProps){
    console.log(route.params.product?.id);
    return(
        <View>
            <Button></Button>
        </View>
    )
}
