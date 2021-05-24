firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();



class fs {
  constructor() {
    this.user = {};
  }

  static logUser() {
    console.log("logUser");

    let user = firebase.auth().currentUser;
    let username, email, photoUrl, uid, emailVerified;

    if (user != null) {
      username = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;   // The user's ID, unique to the Firebase project. Do NOT use
                        // this value to authenticate with your backend server, if
                        // you have one. Use User.getToken() instead.
        console.log(username, email, photoUrl, emailVerified, uid);
    } else {
      console.log("userがぬる。");
    }

    return user;
  }

  static signUp(formInput) {
    const email = formInput.email;
    const password = formInput.password;
    console.log("fs!");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // サインイン後
        let user = userCredential.user;
        console.log("サインインしました！", user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, "そして", errorMessage);
        if (errorCode == "auth/email-already-in-use") {
          this.login({ email: email, password: password });
        }
      });
  }

  static login(formInput) {
    console.log("try login");
    const email = formInput.email;
    const password = formInput.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        this.logUser();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, "そして", errorMessage);
      });
  }


}

fs1 = new fs();

//onAuthStateChangedイベントに登録
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("現在のユーザー", user.email);
  } else {
    console.log("ユーザーなし");
  }
});






