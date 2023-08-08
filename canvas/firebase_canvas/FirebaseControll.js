function writeUserData(userId, name, email, imageUrl) {
    firebase
        .database()
        .ref("users/" + userId)
        .set({
            username: name,
            email: email,
            profile_picture: imageUrl,
        });
}

function init () {
    var starCountRef = firebase.database().ref("posts/" + postId + "/starCount");
    starCountRef.on("value", (snapshot) => {
        const data = snapshot.val();
        updateStarCount(postElement, data);
    });
}

function getUserData(userId) {
    const dbRef = firebase.database().ref();
    dbRef
        .child("users")
        .child(userId)
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log("getUserData-debug", snapshot.val());
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

