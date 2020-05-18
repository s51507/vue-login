<template>
  <div class="todoList" v-cloak>
    <el-input placeholder="请输入内容" v-model="newTodo" @keyup.enter.native="addTodo">
      <template slot="prepend">待辦事項</template>
      <el-button slot="append" icon="el-icon-plus" @click="addTodo">新增</el-button>
    </el-input>

      <el-tabs type="border-card" v-model="tabShow">
        <template  v-for="item in todoTabs">
          <el-tab-pane :name="item.name" :key="item.name">
            <span slot="label">
              <i :class="item.icon + ' tab-icon'"> {{item.label}}</i>
              <el-badge :type="item.badgeType" :value="item.value" v-show="item.value>0" size="mini"/>
            </span>
            <todo-render v-if="tabShow === item.name" :items="showTodos" @delTodo="delTodo" @doneTodo="doneTodo"/>
          </el-tab-pane>
        </template>
    </el-tabs>

    <msg-module
      ref="msgbox"
      :msg="msg"
    />

  </div>
</template>

<script>
import TodoRender from '@/components/widgets/todoList/todo-render.js'
import MsgModule from '@/components/widgets/messagebox'

export default {
  data () {
    return {
      todos: [],
      originTodos: [],
      newTodo: '',
      tabShow: 'all',
      msgTitle: '',
      msgText: '',
      count: {
        all: 0,
        waiting: 0,
        processing: 0,
        completed: 0
      },
      msg: {
        title: '',
        text: ''
      }
    }
  },
  components: {
    TodoRender,
    MsgModule
  },
  methods: {
    addTodo () {
      if (!this.newTodo) {
        this.openMsgBox('空的點屁點')
        return
      }
      const timeStamp = Math.floor(Date.now())
      this.originTodos.push({
        id: timeStamp,
        text: this.newTodo,
        completed: false,
        indeterminate: false
      })
      this.count.all++
      this.count.waiting++
      this.openMsgBox(`已新增 ${this.newTodo} 至待處理`)
      this.newTodo = ''
    },
    delTodo (delItem) {
      Array.from(this.originTodos, (item, index) => {
        if (item.id === delItem.id) {
          if (item.completed) this.count.completed--
          else if (item.indeterminate) this.count.processing--
          else this.count.waiting--
          this.count.all--
          this.originTodos.splice(index, 1)
        }
      })
      this.todos = [...this.originTodos]
    },
    doneTodo (item) {
      if (item.indeterminate) {
        item.indeterminate = false
        item.completed = true
        item.status = '已完成'
        this.count.processing--
        this.count.completed++
      } else if (item.completed) {
        item.indeterminate = false
        item.completed = false
        item.status = '待處理'
        this.count.completed--
        this.count.waiting++
      } else {
        item.indeterminate = true
        item.completed = false
        item.status = '進行中'
        this.count.waiting--
        this.count.processing++
      }
      this.openMsgBox(`${item.text} 的狀態已變更為 ${item.status}`)
    },
    openMsgBox (message) {
      this.msg.text = message
      this.$refs.msgbox.open()
    },
    updateTodos () {
      this.originTodos = [...this.todos]
    },
    resetTodos () {
      this.todos = []
    },
    __init__ () {
      this.todos = [
        { id: 1, text: 'FF14 齁勝', completed: true, indeterminate: false, status: '待處理' },
        { id: 2, text: '魂武做出來惹Yeah~', completed: true, indeterminate: false, status: '待處理' },
        { id: 3, text: '働きたくない _(┐「﹃ﾟ｡)_', completed: false, indeterminate: false, status: '待處理' },
        { id: 4, text: '新辦公室好遠喔', completed: false, indeterminate: true, status: '待處理' },
        { id: 5, text: '好累喔', completed: false, indeterminate: true, status: '待處理' },
        { id: 6, text: 'WHY~', completed: false, indeterminate: true, status: '待處理' },
        { id: 7, text: '何で', completed: false, indeterminate: true, status: '待處理' },
        { id: 8, text: '', completed: false, indeterminate: true, status: '待處理' },
        { id: 9, text: 'RRR', completed: false, indeterminate: false, status: '待處理' },
        { id: 10, text: 'RRRRRRRRRR', completed: true, indeterminate: false, status: '待處理' },
        { id: 11, text: 'RRRRR', completed: true, indeterminate: false, status: '待處理' },
        { id: 12, text: 'RRRRRRRRRR', completed: false, indeterminate: true, status: '待處理' },
        { id: 13, text: 'RRRRRR', completed: false, indeterminate: false, status: '待處理' }
      ]
      this.updateTodos()
      this.count = {
        all: this.originTodos.length,
        waiting: 0,
        processing: 0,
        completed: 0
      }
      Array.from(this.originTodos, (item) => {
        if (item.completed) this.count.completed++
        else if (item.indeterminate) this.count.processing++
        else this.count.waiting++
      })
    }
  },
  computed: {
    showTodos () {
      this.resetTodos()
      if (this.tabShow === 'all') return this.originTodos
      if (this.tabShow === 'waiting') {
        Array.from(this.originTodos, (item, index) => {
          if (!item.completed && !item.indeterminate) this.todos.push(item)
        })
      } else if (this.tabShow === 'processing') {
        Array.from(this.originTodos, (item, index) => {
          if (item.indeterminate) this.todos.push(item)
        })
      } else {
        Array.from(this.originTodos, (item, index) => {
          if (item.completed) this.todos.push(item)
        })
      }
      return this.todos
    },
    todoTabs () {
      return [
        { name: 'all', icon: 'el-icon-folder', label: '全部', badgeType: 'primary', value: this.count.all },
        { name: 'waiting', icon: 'el-icon-folder-opened', label: '待處理', badgeType: 'info', value: this.count.waiting },
        { name: 'processing', icon: 'el-icon-folder-remove', label: '進行中', badgeType: 'warning', value: this.count.processing },
        { name: 'completed', icon: 'el-icon-folder-checked', label: '已完成', badgeType: 'success', value: this.count.completed }
      ]
    }
  },
  mounted () {
    this.__init__()
  }
}
</script>

<style lang="scss">
.todoList {
  min-height: 250px;
  display: flex;
  flex-wrap: wrap;
  width: 492px;
  padding: 0px 50px;
  // justify-content: space-between;
  // overflow: hidden;
  // overflow-x: auto;
  // align-items: stretch;
  & .el-tabs {
    width: 100%;
    height: 50vh;
  }
  & .el-input {
    margin-bottom: 20px
  }
  & .el-tab-pane > div > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    & .is-checked {
      & > .el-checkbox__label {
        text-decoration: line-through;
        color: rgb(182, 180, 180);
      }
    }
  }
  & .tab-icon {
    margin: 7%;
  }
   .el-tabs__content {
    height: 400px;
    flex-grow: 1;
    overflow-y: scroll;
  }
}

// [v-cloak] {
// display: none;
// }

::-webkit-scrollbar-track
{
  box-shadow: inset 0 0 6px rgba(0,0,0,0);
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
  border-radius: 10px;
  background-color: white;
}

::-webkit-scrollbar
{
  width: 12px;
  background-color: white;
}

::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.089);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.089);
}
</style>
