const firebaseConfig = {
    
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
    console.log("castSpell()");
    let inputSpell = document.spell_form.spell.value;
    if(inputSpell!="") {
        db.collection("spell").doc(inputSpell).get().then((doc) => {
            if (doc.data() != undefined) {
                console.log("answer: ", doc.data().answer);
            } else { 
                console.log("Not exist spell: ", inputSpell);
            }
        });
        
    }
}

const deleteSpell = () => { 
    console.log("deleteSpell()");
    let inputSpell = document.spell_form.spell.value;

    //get(): 取得して削除対象が存在するか判定
    db.collection("spell").doc(inputSpell).get().then((doc) => {
        if (doc.data() != undefined) {
            //doc().delete(): 削除処理
            db.collection("spell").doc(inputSpell).delete().then(function () {
                console.log("Document successfully deleted!", inputSpell);
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        }
        else { 
            console.log("Not exist spell: ", inputSpell);
            return;
        }
    });
}



firebase.auth().signInAnonymously().catch( (error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
} );

db.collection("spell").doc("SF")
    .onSnapshot(function (doc) {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data());
    });