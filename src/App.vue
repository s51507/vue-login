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
body, html {
  height: 100%;
  margin: 0;
}
#app {
  text-align: center;
  color: #2c3e50;
  // background-color: #1516166b;
  width: fill-available;
  height: fill-available;
  // width: 100%;
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(./assets/images/login.jpg) center center fixed no-repeat;
  background-size: cover;
}

#app-inside{
  width: 25%;
  height: 27%;
  min-height: 250px;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  margin: auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, rgba(rgba(182, 245, 253, 0.5), 0.4), rgba(rgba(164, 201, 202, 0.5), 0.4));
  border: 2px solid rgba(28, 68, 80, 0.438);
  border-radius: 20px;

  // & input, button {
  //   -webkit-box-shadow: 0 0 0 90px rgba(146, 193, 199, 0.363) inset;
  //   -webkit-text-fill-color: rgb(0, 0, 0) !important;
  // }
}

</style>
