<template>
  <div class="login-main">
    <div class="login-form">
      <el-input type="text" v-model.lazy="user" placeholder="ian001" style="text-align:center"></el-input>
      <el-input type="text" v-model.lazy="pwd" placeholder="qqq111" style="text-align:center"></el-input>
      <el-button @click="login">Login</el-button><br>
      <el-button @click="openDialog">openDialog</el-button>
      <!-- <a target="_blank" :href="gameLink">{{ gameLink }}</a> -->
      <countdown />

    </div>

    <dialog-module
      v-model="dialogForm"
      width="500px"
      :rules="'userList'"
      :dialogShow.sync="dialogShow"
      :dialogItem="dialogItem"
      :dialogTitle="dialogTitle"
      :titleCode="titleCode"
      :columnID="columnID"
      :modifyData="modifyData"
      @submit="dialogSubmit"
      @handleDialogClosed="closeDialog"
    />

  </div>
</template>

<script>
import axios from 'axios'
import { HOST, LOGIN } from '@/constant'
import DialogModule from '@/components/widgets/dialog'
import Countdown from '@/components/countdown-new'

export default {
  components: {
    DialogModule,
    Countdown
  },
  data () {
    const validatePass = (rule, value, callback) => {
      const NULL_REGXP = /.+/
      const ENG_NUM_REGXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,20}$/
      const MIN6_MAX20_REGXP = /^.{6,20}$/
      if (!NULL_REGXP.test(value)) {
        callback(new Error('Can not null.'))
      } else if (!ENG_NUM_REGXP.test(value)) {
        callback(new Error('please enter 6~20 characters，must be english and digital combination'))
      } else if (!MIN6_MAX20_REGXP.test(value)) {
        callback(new Error('Password length is within 6 ~ 20 characters'))
      } else {
        callback()
      }
    }
    return {
      user: 'ian001',
      pwd: 'qqq111',
      dialogShow: false,
      dialogItem: [],
      dialogTitle: '',
      titleCode: '',
      columnID: '',
      modifyData: {},
      dialogForm: {},
      item1: [
        { label: 'input1', prop: 'input1', type: 'input', rules: { validator: validatePass, trigger: 'blur' } },
        { label: 'input2', prop: 'input2', type: 'input', rules: { validator: validatePass, trigger: 'blur' } }
      ]
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
      const res = await axios.post(LOGIN, data, config)
      if (res) {
        alert('登入成功', res.data.data.gameLink)
      }
      this.$router.push('/todoList')
    },
    openDialog () {
      this.dialogItem = this.item1
      this.dialogShow = true
    },
    closeDialog () {
      this.dialogShow = false
    },
    dialogSubmit () {
      this.dialogShow = false
    }
  }
}
</script>

<style lang="scss">
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

.login-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 320px;
  // height: 100%;
  line-height: 50px;
  min-height: 300px;
  margin: 50px;
  justify-content: center;
  // background: linear-gradient(to bottom, rgba(#042540, 0.4), rgba(#02152C, 0.4));
}

.el-input__inner:focus{
  border-color: rgba(250, 239, 79, 0.596);
  border-width: 2px;
}
</style>
