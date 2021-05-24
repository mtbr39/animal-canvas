
const app = {
  data() {
    return {
      email: "",
      password: "",
      user_email: "",
    };
  },
  created: function () {
    // this.user = fs.user;
  },
  methods: {
    signUp() {
      console.log("buttonSignUp");
      fs.signUp({ email: this.email, password: this.password });
    },
  },
};

const vm = Vue.createApp(app).mount("#app");

firebase.auth().onAuthStateChanged((user) => {
  console.log("現在のユーザー2", user.email);
  vm.user_email = user.email;
});
