<template>
  <el-dialog
    :class="`dialog-form ${dialogClass}`"
    :width="width"
    :close-on-click-modal="false"
    :title="getTitle"
    :visible="dialogShow"
    @open="handleDialogOpen"
    @close="handleDialogClose"
  >

    <el-form class="elform" label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm">
      <slot name="text-content"/>
      <template v-for="item in dialogItem">
        <el-form-item v-if="item.inputType !== 'img'" :label="item.label" :prop="item.prop" :rules="item.rules" :key="item.idx" :class="item.columnStyle ? 'oneColumn' : ''">
          <div v-if="item.word" class="label_word">{{item.word}}</div>
          <span v-if="item.inputType === 'lineText'">{{ruleForm[item.prop]}}</span>
          <!-- <label for="password" class="el-form-item__label">密码</label> -->
          <el-date-picker v-if="item.inputType === 'date'" type="date" placeholder="选择日期" v-model="ruleForm[item.prop]" style="width: 100%;" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>

          <el-date-picker v-if="item.inputType === 'datetime'" type="datetime" placeholder="选择日期" v-model="ruleForm[item.prop]" style="width: 100%;" value-format="timestamp"></el-date-picker>

          <el-input v-if="!item.inputType" v-model="ruleForm[item.prop]" :disabled="item.disabled" :placeholder="item.placeholder"></el-input>
          <el-input v-if="item.inputType === 'password'" type="password" v-model="ruleForm[item.prop]" :disabled="item.disabled" auto-complete="off" :placeholder="item.placeholder"></el-input>

          <el-time-picker v-if="item.inputType === 'time'" v-model="ruleForm[item.prop]" value-format="timestamp" :picker-options="item.pickerOption"  :placeholder="item.placeholder"></el-time-picker>

          <el-select v-if="item.inputType === 'select'" v-model="ruleForm[item.prop]"  :multiple="item.multiple" :placeholder="item.placeholder" :disabled="item.disabled">
            <template v-for="option in item.options" >
              <el-option :label="option.name" :value="option.id" :disabled="option.disabled || false" :key="option.index"></el-option>
            </template>
          </el-select>

          <template
            v-if="item.inputType === 'radio'">
            <template v-for="option in item.options" >
              <el-radio v-model="ruleForm[item.prop]" :key="option.index" :label="option.id">{{option.name}}</el-radio>
            </template>
          </template>
          <el-radio-group
            v-if="item.inputType === 'radio-button'"
            class="radioButton"
            v-model="ruleForm[item.prop]">
            <template v-for="option in item.options" >
              <el-radio-button :label="option.id" :key="option.index">{{option.name}}</el-radio-button>
            </template>
          </el-radio-group>

          <slot v-if="item.inputType === 'slot'" :name="item.slotName"/>
          <!-- <slot v-if="item.inputType === 'agent-domain'" name='agent-domain'/> -->

          <template v-if="item.inputType === 'textarea'">
            <div class="textarea-group" v-if="item.useLabelPlaceholder">
              <el-input
                v-model="ruleForm[item.prop]"
                type='textarea'
                :maxlength="item.maxlength"
                :autosize="item.autoSize"
              ></el-input>
              <p class="placeholder-label">{{ item.placeholder }}</p>
            </div>
            <el-input
              v-else
              v-model="ruleForm[item.prop]"
              type='textarea'
              :placeholder="item.placeholder"
              :maxlength="item.maxlength"
              :autosize="item.autoSize"
            ></el-input>
          </template>
          <lottery-num-select v-if="item.inputType === 'lottery'" v-model="ruleForm[item.prop]" :lotteryType="columnID" />

        </el-form-item>
        <img v-if="item.inputType === 'img'" class="qrcodeImg" :src="item.src" :key="item.idx" />
        <div v-if="item.inputType === 'text'" class="text-data" :key="item.idx">
          <div>
            {{ item.text }}
          </div>
          <div class="btn">
            <el-button size="big" type="primary" @click="handleCopy(item.text)">點擊複製</el-button>
          </div>
        </div>
      </template>

    </el-form>
    <div v-if="titleCode !== 9 && titleCode !== 8"  slot="footer">
      <!-- <el-button type="primary" size="big" @click="submitForm">{{getTitle}}</el-button> -->
      <el-button type="primary" size="big" @click="submitForm">确定</el-button>
      <el-button v-if="titleCode === 1" size="big" @click="resetForm">重置</el-button>
    </div>
  </el-dialog>
</template>

<script>
import formRules from '@/utils/formRules'
// import LotteryNumSelect from './selectLotteryNum'
import { mapActions } from 'vuex'

export default {
  props: {
    value: {
      type: [Object, Array],
      required: true
    },
    dialogItem: {
      type: Array
    },
    dialogShow: {
      type: Boolean,
      required: true
    },
    dialogTitle: String,
    titleCode: {
      type: [Number, String],
      required: true
    },
    columnID: [Number, String],
    modifyData: [Object, Array],
    disable: {
      type: Boolean
    },
    rule: String,
    submitCallback: {
      type: Function,
      required: false
    },
    width: [String, Number],
    dialogClass: {
      type: String,
      default: ''
    }
  },
  components: {
    // LotteryNumSelect
  },
  data () {
    return {
      ruleForm: {},
      rules: formRules[this.rule]
    }
  },
  computed: {
    getTitle () {
      if (this.dialogTitle) return this.dialogTitle

      switch (this.titleCode) {
        case 1: return '新建'
        case 2: return '修改'
        case 3: return '审核'
        case 4: return '出款'
        case 5: return '人工入款'
        case 6: return '注销'
        case 7: return '撤销結算'
        case 8: return 'token'
        case 9: return '二维码'
        default: return this.titleCode
      }
    }
  },
  watch: {
    ruleForm: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    },
    value: {
      handler (val) {
        this.ruleForm = this.value
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('User', [
      'getUserRebateById'
    ]),
    /**
     * Dialog 打开的回调
     */
    handleDialogOpen () {
      switch (this.titleCode) {
        case 2:
          this.initialModifyData()
          break
      }
    },
    /**
     * Dialog 关闭的回调
     */
    handleDialogClose () {
      this.ruleForm = {}
      this.resetForm()
      this.$emit('update:dialogShow', false)
      this.$emit('handleDialogClosed')
    },
    initialModifyData () {
      const modifyData = Object.assign({}, this.modifyData)
      const temp = {}
      this.dialogItem.forEach(item => {
        // eslint-disable-next-line no-prototype-builtins
        if (modifyData.hasOwnProperty(item.prop)) {
          temp[item.prop] = modifyData[item.prop]
        }
        if (temp.categoryID) temp.categoryID = parseInt(temp.categoryID)
        if (temp.createdTime) this.dateTime = temp.createdTime
        return item
      })
      this.ruleForm = temp
    },
    // New Function
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.submitCallback) {
            this.submitCallback()
          } else {
            this.$emit('submit', this.columnID)
          }
        }
      })
    },
    handleResetForm () {
      this.$refs.ruleForm.resetFields()
    },
    handleCopy (copyText) {
      this.$copyText(copyText).then(() => {
        this.$message({ type: 'success', message: '复制成功' })
      }, () => {
        this.$message({ type: 'error', message: '复制失敗' })
      })
    },
    // @memo unuse
    // async getRebateData() {
    //   let res = await this.getUserRebateById(this.columnId)

    //   this.rebateAgentMax = res.data.rebateAgentMax
    //   this.rebateMemberMax = res.data.rebateMemberMax
    // },
    resetValidate () {
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    resetForm () {
      if (!Object.keys(this.ruleForm).length) return
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
<style lang="scss">
  .dialog-form {
    .el-select {
      width: 100%;
    }
    .qrcodeImg {
      display: block;
      margin: 0 auto;
    }
    .el-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
        padding: 1%;
      }
      .textarea-group {
        .el-textarea textarea {
          padding-bottom: 30px;
        }
        .placeholder-label {
          line-height: 1.5;
          position: absolute;
          right: 10px;
          bottom: 10px;
          color: #999999;
        }
      }
      .oneColumn{
        width: 100%;
        .el-form-item__label{
          width: auto;
          text-align: right;
        }
        .el-form-item__content{
          width: 100%;
          max-width: 100%;
        }
      }
    }
    .text-data {
      margin: 0 auto;
      .btn {
        margin-top: 50px;
        text-align: right;
      }
    }
    .radioButton {
      label {
        span{
          padding: 12px 40px;
          border-radius: 4px !important;
          // margin: 10px;
        }
      }
    }
    .goldBtn {
      color: #b1a37e !important;
      background: #fff !important;
      border-color: #b1a37e !important;
    }
    &.column {
      .el-form {
      flex-direction: column;
        .el-form-item {
          width: 100%;
          padding: 1%;
        }
      }
    }
  }
</style>
