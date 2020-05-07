<template>
  <div class="todoList" v-cloak>
    <el-input placeholder="请输入内容" v-model="newTodo">
      <template slot="prepend">待辦事項</template>
      <el-button slot="append" icon="el-icon-plus" @click="addTodo">新增</el-button>
    </el-input>

      <el-tabs type="border-card" v-model="tabShow">
        <el-tab-pane name='all'>
          <span slot="label">
            <i class="el-icon-folder tab-icon"> 全部</i>
            <el-badge type="primary" :value="count.all" v-if="count.all>0" size="mini"></el-badge>
          </span>
          <todo-render v-if="tabShow === 'all'" :items="showTodos" @delTodo="delTodo" @doneTodo="doneTodo"/>
        </el-tab-pane>
        <el-tab-pane name='waiting'>
          <span slot="label">
            <i class="el-icon-folder-opened tab-icon"> 待處理</i>
            <el-badge type="info" :value="count.waiting" v-if="count.waiting>0" size="mini"></el-badge>
          </span>
          <todo-render v-if="tabShow === 'waiting'" :items="showTodos" @delTodo="delTodo" @doneTodo="doneTodo"/>
        </el-tab-pane>
        <el-tab-pane name='processing'>
          <span slot="label">
            <i class="el-icon-folder-remove tab-icon"> 進行中</i>
            <el-badge type="warning" :value="count.processing" v-if="count.processing>0" size="mini"></el-badge>
          </span>
          <todo-render v-if="tabShow === 'processing'" :items="showTodos" @delTodo="delTodo" @doneTodo="doneTodo"/>
        </el-tab-pane>
        <el-tab-pane name='completed'>
          <span slot="label">
            <i class="el-icon-folder-checked tab-icon"> 已完成</i>
            <el-badge type="success" :value="count.completed" v-if="count.completed>0" size="mini"></el-badge>
          </span>
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
      dialogItem: [],
      count: {
        all: 0,
        waiting: 0,
        processing: 0,
        completed: 0
      }
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
      this.count.all++
      this.count.waiting++
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
      // alert(`${item.text} 狀態已變更為 ${item.status}`)
      this.dialogItem = [{ inputType: 'showText', text: `${item.text} 的狀態已變更為 ${item.status}` }]
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
        { id: 1, text: 'FF14 齁勝', completed: false, indeterminate: false, status: '待處理' },
        { id: 2, text: '魂武做出來惹Yeah~', completed: false, indeterminate: false, status: '待處理' },
        { id: 3, text: '働きたくない _(┐「﹃ﾟ｡)_', completed: false, indeterminate: false, status: '待處理' }
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
  & .tab-icon {
    margin: 7%;
  }
}
</style>
