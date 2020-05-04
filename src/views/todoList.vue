<template>
  <div class="todoList" v-cloak>
    <el-input placeholder="请输入内容" v-model="newTodo">
      <template slot="prepend">待辦事項</template>
      <el-button slot="append" icon="el-icon-plus" @click="addTodo">新增</el-button>
    </el-input>
      <el-tabs type="border-card" v-model="tabShow">
      <el-tab-pane label="全部" name='all'>
        <todo-render v-if="tabShow === 'all'" :items="showTodos" @delTodo="delTodo" @doneTodo="doneTodo"/>
      </el-tab-pane>
      <el-tab-pane label="進行中" name='processing'>
        <todo-render v-if="tabShow === 'processing'" :items="showTodos" @delTodo="delTodo" @doneTodo="doneTodo"/>
      </el-tab-pane>
      <el-tab-pane label="未完成" name='undone'>
        <todo-render v-if="tabShow === 'undone'" :items="showTodos" @delTodo="delTodo" @doneTodo="doneTodo"/>
      </el-tab-pane>
      <el-tab-pane label="已完成" name='completed'>
        <todo-render v-if="tabShow === 'completed'" :items="showTodos" @delTodo="delTodo" @doneTodo="doneTodo"/>
      </el-tab-pane >
      <!-- <todo-render :items="todos" @delTodo="delTodo" @doneTodo="doneTodo"/> -->
    </el-tabs>

    <dialog-module
      v-model="dialogForm"
      width="500px"
      :rules="'userList'"
      :dialogItem="dialogItem"
      :dialogShow.sync="dialogShow"
      @submit="dialogSubmit"
      @handleDialogClosed="closeDialog"
    />
  </div>
</template>

<script>
import TodoRender from '@/components/widgets/todoList/todo-render.js'
import DialogModule from '@/components/widgets/dialog'

export default {
  data () {
    return {
      todos: [],
      originTodos: [],
      newTodo: '',
      tabShow: 'all',
      dialogShow: false,
      dialogForm: [],
      dialogItem: []
    }
  },
  components: {
    TodoRender,
    DialogModule
  },
  methods: {
    addTodo () {
      if (!this.newTodo) {
        this.dialogItem = [{ inputType: 'showText', text: '空的點屁點' }]
        this.dialogShow = true
        return
      }
      const timeStamp = Math.floor(Date.now())
      this.originTodos.push({
        id: timeStamp,
        text: this.newTodo,
        completed: false,
        indeterminate: false
      })
      this.newTodo = ''
    },
    delTodo (delItem) {
      Array.from(this.originTodos, (item, index) => {
        if (item.id === delItem.id) this.originTodos.splice(index, 1)
      })
      this.todos = [...this.originTodos]
    },
    doneTodo (item) {
      // TODO @進行中

      // if (item.indeterminate) {
      //   item.indeterminate = false
      //   item.completed = true
      // } else if (item.completed) {
      //   item.indeterminate = false
      //   item.completed = false
      // } else {
      //   item.indeterminate = true
      //   item.completed = false
      // }
      // console.log('indeterminate', item.indeterminate)
      // console.log('completed', item.completed)

      item.completed = !item.completed
      this.dialogItem = [{ inputType: 'showText', text: item }]
      // this.dialogShow = true
    },
    closeDialog () {
      this.dialogShow = false
    },
    dialogSubmit () {
      this.dialogShow = false
    },
    updateTodos () {
      this.originTodos = [...this.todos]
    },
    resetTodos () {
      this.todos = []
    },
    __init__ () {
      this.todos = [
        { id: 1, text: 'FF14 齁勝', completed: false, indeterminate: false },
        { id: 2, text: '魂武做出來惹Yeah~', completed: false, indeterminate: false }
      ]
      this.updateTodos()
    }
  },
  computed: {
    showTodos () {
      this.resetTodos()
      if (this.tabShow === 'all') return this.originTodos
      if (this.tabShow === 'processing') {
        Array.from(this.originTodos, (item, index) => {
          if (item.completed !== true) this.todos.push(item)
        })
      } else if (this.tabShow === 'undone') {
        Array.from(this.originTodos, (item, index) => {
          if (item.completed !== true) this.todos.push(item)
        })
      } else {
        Array.from(this.originTodos, (item, index) => {
          if (item.completed === true) this.todos.push(item)
        })
      }
      return this.todos
    }
  },
  mounted () {
    this.__init__()
  }
}
</script>

<style lang="scss">
.todoList {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  // overflow: hidden;
  // overflow-x: auto;
  // align-items: stretch;
  & .el-tabs {
    width: 100%;
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
}
</style>
