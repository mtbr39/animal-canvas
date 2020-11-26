
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


addSample();
setSample();
getSample();
