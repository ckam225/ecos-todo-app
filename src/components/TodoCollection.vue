<script lang="ts" setup>
import { PropType } from 'vue';
import { Todo } from '../composable/todos';
import { Prop } from '../types';
import TodoItem from './Todo.vue';


const props = defineProps({
    todos:  {
       type: Array as PropType<Todo[]>,
       required: true
    } as Prop
})

const emit = defineEmits(['on-item-delete', 'on-item-selected'])

function handleDelete(todo: Todo){
    emit('on-item-delete', todo)
}

function handleSelected(todo: Todo){
    emit('on-item-selected', todo)
}

</script>

<template>
<div>
    <div v-if="todos.length===0" style="padding: 10px;">No todos available</div>
    <div v-else >
        <TodoItem v-for="todo in todos" 
            :todo="todo"
            :key="todo.id" 
            @on-delete="handleDelete"
            @on-selected="handleSelected"
        />
    </div>
</div>
</template>