<template>
  <div id="app">
    <div class="navContainer">
      <div class="brand">
        <p>Guest Picture Syalala</p>
      </div>
      <div id="nav">
        <router-link class="nav-name" to="/">Login</router-link>
        <router-link class="nav-name" to="/game">Game</router-link>
        <b-link class="nav-name" @click.prevent="logout">End Game</b-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import socket from './config/socket'
export default {
  methods: {
    logout () {
      socket.emit('user-logout', localStorage.getItem('userName'))
      localStorage.clear()
      this.$router.push('/')
    }
  },
  data () {
    return {
      loginToken: ''
    }
  },
  created () {
    this.loginToken = localStorage.getItem('token')
  }
}
</script>
<style>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Nunito', sans-serif;
  background: #FEE6E6;
}

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(#FCFDFF, #F9FAFE);
  width: 100vw;
  height: 100vh;
}

.navContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 70px 0;
}

.brand {
  font-weight: bold;
  font-size: 16px;
  color: #409d7e;
  padding-top: 17px;
  margin-right: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-name {
  margin: 0 20px 0;
  background-color: none;
  text-transform: uppercase;
}

#nav {
  /* padding: 10px 0 0 0; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#nav a {
  font-weight: bold;
  font-size: 16px;
  color: #4d4e52;
  margin-left: 20px;
}

#nav a.router-link-exact-active {
  color: #409d7e;
}
</style>
