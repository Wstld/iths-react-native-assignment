import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase_config';
import { getFirestore, setDoc, doc, getDoc, onSnapshot, } from 'firebase/firestore';

initializeApp(firebaseConfig);
const firestore = getFirestore();

export const setDocListner = async (userId:string,document:string) => {
    onSnapshot(doc(firestore,userId,document), doc => {
        console.log(doc.data())
    }, err => console.log(err.message));
}

