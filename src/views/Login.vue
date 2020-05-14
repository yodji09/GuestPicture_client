<template>
<div class="loginPage">
  <div class="container">
    <h1>Welcome to The Greatest Game Ever, Guest Picture Syalala</h1>
    <p class="label">Please insert your most cool name, to play the game</p>
    <input v-model="userName" class="username" type="text" placeholder="Enter your name">
    <button @click.prevent="login">Login</button>
    <div class="copyright">
      <p>Copyright © 2020</p>
      <p>Team Satu MCC-005. All rights. reserved</p>
    </div>
  </div>
  <div>
    <img src="../assets/bg.png" alt="">
    <div class="circle"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      show: true
    }
  },
  methods: {
    login () {
      localStorage.setItem('userName', this.userName)
      this.$router.push('/room')
      this.userName = ''
    }
  }
}
</script>

<style scoped>
.loginPage {
  display: flex;
}
.container {
  width: 100vw;
  height: 100vh;
  margin-left: 0;
  display: flex;
  flex-direction: column;
}
h1 {
  margin-top: 150px;
  margin-left: 200px;
  font-weight: bold;
  font-size: 50px;
  text-align: left;
  color: #4d4e52;
}
.label {
  text-align: left;
  margin-left: 200px;
  font-size: 25px;
  margin-top: 30px;
  color: #676a6f;
}
.username {
  margin-top: 30px;
  margin-left: 200px;
  width: 20vw;
  height: 5vh;
  border: none;
  box-shadow: 0 20px 70px rgba(66, 154, 236, 0.185);
  border-radius: 20px;
  padding-left: 20px;
  color: #676a6f;
}
.username:focus {
  outline: none;
}
button {
  margin-top: 30px;
  margin-left: 200px;
  width: 20vw;
  height: 5vh;
  box-shadow: 0 20px 70px rgba(66, 154, 236, 0.185);
  border-radius: 20px;
  padding-left: 20px;
  background: #409d7e;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 26px;
}
button:focus {
  outline: none;
}
button:hover {
  background: #58caa4;
}
.copyright {
  margin-top: 25vh;
  margin-left: 200px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  text-align: left;
}
img {
  margin-top: 7vh;
  margin-right: 8vw;
}
</style>
