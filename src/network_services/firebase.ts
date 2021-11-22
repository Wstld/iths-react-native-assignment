import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase_config';
import { getFirestore, setDoc, doc as Doc, onSnapshot, deleteField,updateDoc} from 'firebase/firestore';
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
  } from 'firebase/auth';

import { IUser } from '../data_models/user';
import { IProduct, ProductType } from '../data_models/product';

initializeApp(firebaseConfig);
const firestore = getFirestore();
const auth = getAuth();

export const setCollectionListner = (userId:string, callback:(prodArr:Array<IProduct>) => void ) => {
    onSnapshot(Doc(firestore,userId,'products'), doc => {
     if(doc.exists()){
         const data = doc.data();
         const arr:Array<IProduct> = [];
        if (data !== null){
            Object.entries(data).forEach( (el) => {
               let prod:IProduct = el[1];
               arr.push(prod);
            }); 
        }
        callback(arr);
      
     }else{
        setDoc(Doc(firestore,userId,'products'),{}).then( () => setCollectionListner(userId,callback));
     }
    }, err => { 
        console.log(`ERORR_SNAP_COLLECTION: ${err}`);
    })
};

export const FBaddProduct = (userId:string,prodId:string,name:string,price:number,type:ProductType) => updateDoc(Doc(firestore,userId,'products',),{ [prodId]:{id:prodId,name:name,price:price,type:type}})
export const FBremoveProduct = (userId:string,prodId:string) => {
 updateDoc(Doc(firestore,userId,'products'),{ [prodId]:deleteField()} )
}; 


export const FBlogin = async (userName:string, password:string) => {
    await signInWithEmailAndPassword(auth,userName,password).then( userCredetial => { console.log(userCredetial)}, err => console.log(err))
}

export const setAuthListner = async (callback:(user:IUser) => void) =>{
    onAuthStateChanged(auth, user => {  if(user != null) {
        const loggedInUser:IUser = {
            email:user.email != null? user.email: '', 
            id: user.uid != null ? user.uid : '', 
            name: user.displayName
        } 
        callback(loggedInUser);
    } 

}, err => console.log(err.message));

}

export const FBlogout = async () =>{
    await signOut(auth);
}

export const FBregister = async (email:string,password:string) => {
    await createUserWithEmailAndPassword(auth,email,password).catch((err) => console.log(err));
}



