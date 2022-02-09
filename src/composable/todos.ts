import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';


const initialValue = [{
    id: '1232323',
    title:'What is Lorem Ipsum?',
    description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    completed: false
}]

export interface Todo {
    id: string
    title: string
    description?: string
    completed: boolean
}

export function useTodo(){


    const todos = ref<Todo[]>(JSON.parse(localStorage.getItem('todos') || JSON.stringify(initialValue)))

    function createTodo(todo: Todo){
        todos.value.push({
            ...todo,
            id: uuidv4()
        })
        watchChange()
    }

    function updateTodo(todo: Todo){
        todos.value = todos.value.map(currentTodo => {
            if(currentTodo.id === todo.id){
                currentTodo = todo
            }
            return currentTodo
        })
        watchChange()
    }

    function deleteTodo(id: string){
        todos.value = todos.value.filter(todo => todo.id !== id)
        watchChange()
    }

    function watchChange(){
        localStorage.setItem('todos', JSON.stringify(todos.value))
    }

    return {
        todos,
        createTodo,
        updateTodo,
        deleteTodo  
    }
}