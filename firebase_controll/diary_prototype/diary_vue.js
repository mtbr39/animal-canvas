
const app = {
  data() {
    return {
      email: "",
      password: "",
      user_email: "",
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
      let date = new Date()

      this.hours_text = date.getHours();
      this.minutes_text = date.getMinutes();

      let month = date.getMonth() + 1;
      this.date_text = date.getFullYear() + '年'
        + month + '月'
        + date.getDate() + '日';
    },
  },
};

const vm = Vue.createApp(app).mount("#app");

firebase.auth().onAuthStateChanged((user) => {
  console.log("現在のユーザー2", user.email);
  vm.user_email = user.email;
});
