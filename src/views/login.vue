<template>
  <div class="login-main">
    <div class="login-form">
      <el-input type="text" v-model.lazy="user" placeholder="ian001" style="text-align:center"></el-input>
      <el-input type="text" v-model.lazy="pwd" placeholder="qqq111" style="text-align:center"></el-input>
      <el-button @click="login">Login</el-button><br>
      <el-button @click="openDialog">openDialog</el-button>
      <!-- <a target="_blank" :href="gameLink">{{ gameLink }}</a> -->
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

export default {
  components: {
    DialogModule
  },
  data () {
    const validatePass = (rule, value, callback) => {
      const NULL_REGXP = /.+/
      const ENG_NUM_REGXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,20}$/
      const MIN6_MAX20_REGXP = /^.{6,20}$/
      if (!NULL_REGXP.test(value)) {
        callback(new Error('密码不得为空白'))
      } else if (!ENG_NUM_REGXP.test(value)) {
        callback(new Error('请输入6～20个字，且是英文及数字组合'))
      } else if (!MIN6_MAX20_REGXP.test(value)) {
        callback(new Error('密码长度在 6 ~ 20 个字符之内'))
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
  min-height: 250px;
  justify-content: center;
  margin: auto;
  // background: linear-gradient(to bottom, rgba(#042540, 0.4), rgba(#02152C, 0.4));
}
</style>
