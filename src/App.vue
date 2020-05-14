<template>
  <div id="app">
    <div id="nav">
      <router-link class="nav-name" to="/"><b-button variant="outline-danger" size="sm">Login</b-button></router-link>
      <router-link class="nav-name" to="/game"><b-button variant="outline-danger" size="sm">Game</b-button></router-link>
      <b-link class="nav-name" to="/logout"><b-button variant="outline-danger" size="sm">Logout</b-button></b-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #2ecc71;
  width: 100vw;
  height: 100vh;
}

#Logo {
  font-weight: bold;
  font-size: 14px;
  color: #ff6161;
  padding-top: 15px;
  margin-right: 20px;
}

.nav-name {
  margin: 0 20px 0;
  text-decoration: none;
}

#nav {
  padding: 5px;
  /* background: chartreuse; */
  display: flex;
  align-items: center;
}

#nav a {
  font-weight: bold;
  font-size: 23px;
  color: #909090;
}

#nav a.router-link-exact-active {
  color: #2096f3;
}
</style>
