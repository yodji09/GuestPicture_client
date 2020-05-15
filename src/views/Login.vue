<template>
  <div class="loginPage">
    <div class="container">
      <h1>Welcome to The Greatest Game Ever, Guest Picture Syalala</h1>
      <p class="label">Please insert your most cool name, to play the game</p>
      <div v-if='errMessage'>
      {{errMessage}}
      </div>
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
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      show: true,
      token: '',
      message: '',
      errMessage: ''
    }
  },
  methods: {
    login () {
      axios({
        method: 'POST',
        url: 'https://frozen-plateau-23556.herokuapp.com/users/login',
        data: {
          username: this.userName
        }
      })
        .then(({ data }) => {
          this.$router.push('/room')
          this.token = data.token
          localStorage.setItem('token', this.token)
          localStorage.setItem('userName', this.userName)
          this.message = data.msg
          this.userName = ''
          this.errMessage = ''
        })
        .catch(() => {
          this.errMessage = 'Username Already Exist'
        })
    }
  }
}
</script>

<style scoped>
/* Desktops and laptops ----------- */
@media only screen
and (min-width : 1224px) {
.loginPage {
  display: flex;
}
.container {
  width: 100%;
  height: 100%;
  margin-left: 0;
  display: flex;
  flex-direction: column;
}
h1 {
  margin-top: 50px;
  margin-left: 50px;
  font-weight: bold;
  font-size: 40px;
  text-align: left;
  color: #4d4e52;
  width: 50vw;
}
.label {
  text-align: left;
  margin-left: 50px;
  font-size: 23px;
  margin-top: 30px;
  color: #676a6f;
}
.username {
  margin-top: 30px;
  margin-left: 50px;
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
  margin-left: 50px;
  width: 20vw;
  height: 5vh;
  box-shadow: 0 20px 70px rgba(66, 154, 236, 0.185);
  border-radius: 20px;
  padding-left: 20px;
  background: #409d7e;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 20px;
}
button:focus {
  outline: none;
}
button:hover {
  background: #58caa4;
}
.copyright {
  margin-top: 16vh;
  margin-left: 50px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  text-align: left;
  margin-bottom: 0;
}
img {
  margin-top: 7vh;
  width: 48vw;
  margin-left: -60px;
  z-index: 9999;
  padding-right: 120px;
}

}

/* Large screens ----------- */
@media only screen
and (min-width : 1824px) {
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
  margin-left: 80px;
  font-weight: bold;
  font-size: 50px;
  text-align: left;
  color: #4d4e52;
}
.label {
  text-align: left;
  margin-left: 80px;
  font-size: 25px;
  margin-top: 30px;
  color: #676a6f;
}
.username {
  margin-top: 30px;
  margin-left: 80px;
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
  margin-left: 80px;
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
  margin-left: 80px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  text-align: left;
}
img {
  margin-top: 7vh;
  margin-right: 8vw;
}
}
</style>
