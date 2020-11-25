
import { firebaseConfig } from './config_param.js'

firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();

db.collection("users").doc("names").set({
    first: "Taro",
    last: "Yamada",
    born: 1995
})
.then( (docRef) => {
    console.log("Document written with ID: ", docRef.title);
})
.catch( (error) => {
    console.error("Error adding document: ", error);
});
