export default {
  props: ['items'],
  methods: {
    tabPane (items) {
      if (!items) return
      return Array.from(items, (item, index) => {
        return (
          <div key={ item.id }>
            <el-checkbox
              indeterminate = { item.indeterminate }
              v-model={ item.completed }
              onChange={() => {
                item.completed = !item.completed
                this.$emit('doneTodo', item)
              }}
            >
              {item}
            </el-checkbox>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              onClick={() => {
                this.$emit('delTodo', item)
              }}
            />
            <el-divider />
          </div>
        )
      })
    }
  },
  render () {
    const components = this.tabPane(this.items)

    return (
      <div>
        {components}
      </div>
    )
  }
}
