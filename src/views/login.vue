<template>
  <div class="login-main">
    <div class="login-form">
      <input type="text" v-model.lazy="user" placeholder="ian001" style="text-align:center"><br>
      <input type="text" v-model.lazy="pwd" placeholder="qqq111" style="text-align:center"><br>
      <button @click="login">Login</button><br>
      <!-- <a target="_blank" :href="gameLink">{{ gameLink }}</a> -->
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import { HOST, LOGIN } from '@/constant'

export default {
  data () {
    return {
      user: 'ian001',
      pwd: 'qqq111'
    }
  },
  computed: {

  },
  methods: {
    async login () {
      const data = {
        account: this.user,
        password: this.pwd
      }
      const config = {
        method: 'post',
        baseURL: HOST,
        url: LOGIN,
        'Content-Type': 'application/json',
        data
      }
      // 嘗試另一個寫法
      // axios(config)

      // 大大們的寫法
      const res = await axios.post(LOGIN, data, config)
      if (res) {
        console.log(res.data.data.gameLink)
        alert('登入成功', res.data.data.gameLink)
      }
      this.$router.push('/todoList')

      // 原本寫法
      // axios({
      //   method: 'post',
      //   baseURL: 'https://dummy-lottery-uat.lianfa.co',
      //   url: '/user/game-link',
      //   'Content-Type': 'application/json',
      //   data
      // })
      //   .then((result) => { this.gameLink = result.data.data.gameLink })
      //   .catch((err) => { console.error(err) })
    }
  }
}
</script>

// <style lang="scss">
// .login-main{
//   // width: 100vw;
//   // height: 100vh;
//   width: -webkit-fill-available;
//   height: -webkit-fill-available;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   // background: url(../assets/images/login.jpg) center center fixed no-repeat;
//   background-size: cover;
// }

// .login-form{
//   width: 320px;
//   height: 27%;
//   min-height: 250px;
//   justify-content: center;
//   margin: auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background: linear-gradient(to bottom, rgba(#042540, 0.4), rgba(#02152C, 0.4));
// }
// </style>
