<script setup lang="ts">
import {  computed, PropType, reactive, watchEffect } from 'vue';
import {NButton, NCard, NModal, NInput, NSpace, NSwitch, NCheckbox} from 'naive-ui'
import { Todo } from '../composable/todos';


const initialValue = {
  title: '',
  description: ''
} as Todo

const props = defineProps({
    todo: {
        type: Object as PropType<Todo>,
        required: true, 
    },
    showModal: {type: Boolean, default: false},
})

const emit = defineEmits(['on-update', 'on-add',  'on-cancel'])

const state = reactive<Todo>({...initialValue})

function resetForm() {
  state.title= ''
  state.description=''
}


function onAdd(){
  emit('on-add', {...state})
  resetForm()
}

function onUpdate(){
  emit('on-update', {...props.todo, ...state})
  resetForm()
}

function onCancel(){
  emit('on-cancel')
  resetForm()
}

const isUpdate = computed(() => !!props.todo.id)

watchEffect(() => {
  if(isUpdate.value){
    state.title = props.todo.title
    state.description = props.todo.description
    state.completed = props.todo.completed
  }
})

</script>

<template>
  

  <n-modal v-model:show="props.showModal" >
    <n-card
      style="width: 600px;"
      :title="`${isUpdate ? props.todo.title : 'Новый элемент' }`"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      
        <n-space vertical>
          <n-space align="center" item-style="display: flex;" v-if="isUpdate">
             <span>установить выполненным</span>
            <n-switch v-model:value="state.completed" />
          </n-space>
          <n-input v-model:value="state.title" type="text" placeholder="Название" />
          <n-input
              v-model:value="state.description"
              type="textarea"
              placeholder="Описание"
          />
        </n-space>
      <template #footer>
        <n-space>
            <n-button type="success" v-if="isUpdate" @click="onUpdate">Сохранить</n-button>
            <n-button type="success" v-else  @click="onAdd">Добавить</n-button>
            <n-button  @click="onCancel">Закрыть</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>

</template>

