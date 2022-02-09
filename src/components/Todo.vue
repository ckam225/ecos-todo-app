<script setup lang="ts">
import { PropType, reactive, ref } from 'vue'
import { Todo } from '../composable/todos';
import {NButton, NCard, NSpace, NCheckbox} from 'naive-ui'

const props = defineProps({
    todo: {
        type: Object as PropType<Todo>,
        required: true
    }
})

const emit = defineEmits(['on-selected', 'on-delete'])



</script>

<template>
  <n-card  :class="{'completed-item': props.todo.completed}"> 
    <n-checkbox type="checkbox" :checked="props.todo.completed">
      <span :class="{completed: props.todo.completed}">{{ props.todo.title}}</span>
    </n-checkbox>
    
    <p :class="{completed: props.todo.completed}">{{ props.todo.description }}</p>
     <n-space>
        <n-button @click="$emit('on-selected', todo)" type="primary" ghost>Редактировать</n-button>
        <n-button @click="$emit('on-delete', todo) " type="error" ghost>Удалить</n-button>
    </n-space>
  </n-card>
</template>

<style scoped>
.completed{
    text-decoration: line-through;
}
.completed-item{
      background: rgba(0, 0, 0, 0.1);
}

</style>
