const app = {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
      signUp() {
          console.log("buttonSignUp");
          fs.signUp({ email: this.email, password: this.password});
    },
  },
};

Vue.createApp(app).mount("#app");
