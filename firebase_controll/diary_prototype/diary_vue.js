
const app = {
  data() {
    return {
      email: "",
      password: "",
      user: "",
      date: {},
      hours_text: "",
      minutes_text: "",
      date_text: "",
      grid_items: [
        { feeling: "わ" },
        { feeling: "お" },
        { feeling: "え" },
        { feeling: "ん" },
      ],
      feel_set: [
        { feel: "うれしい" },
        { feel: "かなしい" },
        { feel: "たのしい" },
        { feel: "はらへった" },
      ],
    };
  },
  mounted: function () {
    this.updateTime();
    let timerID = setInterval(this.updateTime, 1000); 
  },
  methods: {
    signUp() {
      console.log("buttonSignUp");
      fs.signUp({ email: this.email, password: this.password });
    },
    updateTime() {
      let date = new Date();

      this.hours_text = date.getHours();
      this.minutes_text = date.getMinutes();

      let month = date.getMonth() + 1;
      this.date_text = date.getFullYear() + '年'
        + month + '月'
        + date.getDate() + '日';
      
      this.date = date.getTime();
    },
    saveFeel() {
      db.collection("users")
        .doc(this.user.uid)
        .collection("feelings")
        .add({
          type: 3,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
          console.log("きもち保存!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    }
  },
};

const vm = Vue.createApp(app).mount("#app");

firebase.auth().onAuthStateChanged((user) => {
  console.log("現在のユーザー2", user.email);
  vm.user = user;
});

// db.collection("users")
//   .where("id", "==", "現在のユーザーのID") //現在のユーザーを取り出す
//   .onSnapshot(function (querySnapshot) {
//     var cities = [];
//     querySnapshot.forEach(function (doc) {
//       cities.push(doc.data().name);
//     });
//     console.log("Current cities in CA: ", cities.join(", "));
//   });