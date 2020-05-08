<template>
  <span/>
</template>
<script>
export default {
  props: {
    msg: {
      type: [Object, Array]
    }
  },
  methods: {
    open () {
      this.$alert(this.msg.text, this.msg.title, {
        confirmButtonText: '確定'
      })
    }
  }
}
</script>
