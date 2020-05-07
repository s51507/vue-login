<template>
  <span/>
</template>
<script>
export default {
  props: {
    value: {
      type: [Object, Array]
    },
    msgTitle: String,
    msgText: String
  },
  methods: {
    open () {
      this.$alert(this.msgText, this.msgTitle, {
        confirmButtonText: '確定',
        callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${action}`
        //   })
        }
      })
    }
  }
}
</script>
