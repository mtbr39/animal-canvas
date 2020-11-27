
const firebaseConfig = {
    apiKey: "AIzaSyAPbINS4YeMKuqdUEwJ5D1Pcc3bqoEUNQo",
    authDomain: "firestoretrial-f908e.firebaseapp.com",
    databaseURL: "https://firestoretrial-f908e.firebaseio.com",
    projectId: "firestoretrial-f908e",
    storageBucket: "firestoretrial-f908e.appspot.com",
    messagingSenderId: "643217128291",
    appId: "1:643217128291:web:bec158d83762d6dedff156",
    measurementId: "G-1C4FEDWTK0"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();



const addSample = () => { 
    db.collection("sample").add({
        first: "Taro",
        last: "Yamada",
        born: 1995
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

const setSample = () => { 
    db.collection("sample").doc("LA").set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

const getSample = () => {
    db.collection("sample").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
}

firebase.auth().onAuthStateChanged( (user) => {
    if(user) {
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        console.log("onAuth", isAnonymous, uid);
    }
    else {

    }
    
} );

const createSpell = (inputSpell, inputAnswer) => {
    console.log("createSpell");
    db.collection("spell").doc(inputSpell).set({
        spell: inputSpell,
        answer: inputAnswer
    })
        .then((docRef) => {
            console.log("Spell written: ", inputSpell);
        })
        .catch((error) => {
            console.error("Error adding spell: ", error);
        });
}

const spellSubmit = () => {
    console.log("supellSubmit");
    let inputSpell = document.spell_form.spell.value;
    let inputAnswer = document.spell_form.answer.value;
    if(inputSpell!="" && inputAnswer!="") {
        
        createSpell(inputSpell, inputAnswer);
    }
}

const castSpell = () => {
    let inputSpell = document.spell_form.spell.value;
    if(inputSpell!="") {
        alert("answer");
        // db.collection("spell").doc(inputSpell).get()
        // .then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log(`${doc.id} => ${doc.data()}`);
        //     });
        // });
    }
}


//↑↑↑関数宣言↑↑↑
//↓↓↓main処理↓↓↓

firebase.auth().signInAnonymously().catch( (error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
} );

// addSample();
// setSample();
// getSample();
