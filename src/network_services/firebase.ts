import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase_config';
import { getFirestore, setDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
  } from 'firebase/auth';
import { async } from '@firebase/util';
import { IUser } from '../data_models/user';

initializeApp(firebaseConfig);
const firestore = getFirestore();
const auth = getAuth();

export const setDocListner = async (userId:string,document:string) => {
    onSnapshot(doc(firestore,userId,document), doc => {
        console.log(doc.data())
    }, err => console.log(err.message));
}
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



