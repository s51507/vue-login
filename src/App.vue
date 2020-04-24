<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </div> -->
    <div id="app-inside">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #1456d17c;
  // width: 100vw;
  // height: 100vh;
  width: fill-available;
  height: fill-available;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: url(./assets/images/login.jpg) center center fixed no-repeat;
  // background-size: cover;
}

#app-inside{
  width: 320px;
  height: 27%;
  min-height: 250px;
  justify-content: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, rgba(rgba(2, 21, 44, 0.5), 0.4), rgba(rgba(2, 21, 44, 0.5), 0.4));
}

// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

</style>
