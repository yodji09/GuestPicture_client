<template>
  <div id="app">
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
  font-size: 26px;
  color: #ff6161;
  padding-top: 15px;
  margin-right: 20px;
}

.nav-name {
  margin: 0 20px 0;
  text-decoration: none;
}

#nav {
  padding: 30px;
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
