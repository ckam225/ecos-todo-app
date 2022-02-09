<script setup lang="ts">
import {  ref } from 'vue';
import { Todo, useTodo } from './composable/todos';
import TodoCollection from './components/TodoCollection.vue';
import {NButton} from 'naive-ui'
import TodoModal from './components/TodoModal.vue';

const {todos, createTodo,updateTodo, deleteTodo} = useTodo()
const currentTodo = ref<Todo>({} as Todo)
const showModal =  ref(false)


function initializeTodo(){
 currentTodo.value = {} as Todo
}

function handleSaveTodo(todo: Todo){
  createTodo(todo)
  showModal.value = false
  initializeTodo()
}

function handleDeleteTodo(todo: Todo){
  if(confirm('Вы действительно хотите удалить ')){
    deleteTodo(todo.id)
  }
}

function handleUpdateTodo(todo: Todo){
  updateTodo(todo)
  showModal.value = false
}

function handleCreateTodo(){
  showModal.value = true
  initializeTodo()
}

function handleCloseModal(todo: Todo){
  showModal.value = false
  initializeTodo()
}

function handleSelectTodo(todo: Todo){
  currentTodo.value = todo
  showModal.value = true
}

</script>

<template>
  
  <div class="container">
    <div class="banner">
      <h1>Todos App</h1>
      <n-button @click="handleCreateTodo" type="primary" color="#fff" text-color="#057a36">добавить новый элемент</n-button>
    </div>
    <TodoCollection  :todos="todos"  
      @on-item-delete="handleDeleteTodo"
      @on-item-selected="handleSelectTodo"
     />
  </div>

<TodoModal
  :todo="currentTodo"
  :show-modal="showModal"
  @on-add="handleSaveTodo"
  @on-update="handleUpdateTodo"
  @on-cancel="handleCloseModal"
/>

</template>

<style>
body{
  background: #f5f5f5;
}
.container {
  width: 60%;
  margin: 50px auto;
  background: #fff;
}

.banner{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #51aa76;
  color: #fff;
}
.banner h1{
  padding: 10px;
}
</style>
