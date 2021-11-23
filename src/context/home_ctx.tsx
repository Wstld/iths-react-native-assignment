import React, { useEffect, useState,useContext } from "react";
import { IProduct, ProductType } from "../data_models/product";
import { FBaddProduct, FBremoveProduct, FBupdateProduct, setCollectionListner } from "../network_services/firebase";
import { AuthCtx } from "./login_ctx";
import {DocumentData} from 'firebase/firestore';
import { makeid } from "../util/helper_functions";


interface IProductsCtx{
    products:Array<IProduct>;
    addProduct: (userId:string,name:string,price:number,type:ProductType) => void;
    removeProduct: (userId:string,productId:string) => void;
    updateProduct: (userId:string,prodId:string,name:string,price:number,type:ProductType) => void;
};

export const ProductCtx = React.createContext<IProductsCtx|undefined>(undefined);

export const ProductCtxProvider:React.FC = ({children}) =>{
    const authContext = useContext(AuthCtx);
    const [products,setProducts] = useState<Array<IProduct>>(Array<IProduct>());
    const addProduct = (userId:string,name:string, price:number,type:ProductType) => {
        let prodId = `${makeid(10)}_${name}`;
        FBaddProduct(userId,prodId,name,price,type);
    }
    const removeProduct = (userId:string,productId:string) => FBremoveProduct(userId,productId); 
    const updateProduct = (userId:string,prodId:string,name:string,price:number,type:ProductType) => FBupdateProduct(userId,prodId,name,price,type);


    if(authContext !== undefined && authContext?.user?.id !== null){
    useEffect(() => {
        const listner = setCollectionListner(authContext.user!.id,(prodArr:Array<IProduct>) => {
           setProducts(prodArr);
        })
        
        return () => {
            //remove listner on unmount.
            listner
        }
    }, [])
}

return (<ProductCtx.Provider value={{products,addProduct,removeProduct,updateProduct}}>{children}</ProductCtx.Provider>)

}

