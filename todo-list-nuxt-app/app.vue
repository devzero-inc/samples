<template>
  <div class=" h-screen w-screen bg-radial-gradient from-primary via-between to-secondary text-white flex items-center justify-center">
    <div class=" w-[28%] flex flex-col items-center justify-center gap-8 p-4 rounded-lg bg-custom-bg">
      <div class="flex w-full justify-between">
        <img class=" w-16 " src="/static/icons/devzero_logo.png" alt="logo">
        <div class="flex flex-col items-end">
          <h1 class=" text-4xl font-bold">DevZero</h1>
          <p class=" text-slate-400">Create your todos</p>
        </div>
      </div>
      <form class="flex w-full gap-4" @submit.prevent="addTodo">
        <input class=" border-b border-white bg-transparent outline-none px-2 py-1 flex-1" type="text" v-model="newTodo"
          placeholder="Add a new todo" />
        <button class=" bg-custom-blue hover:bg-custom-light-blue rounded-md px-2 text-white font-semibold">Add</button>
      </form>
      <ul class="flex flex-col gap-2 w-full">
        <li class=" w-full" v-for="todo in todos" :key="todo.id">
          <Todo :text="todo.text" :id="todo.id" :completed="todo.completed" @delete-todo="deleteTodo" @mark-as-done="markAsDone"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const todos = ref([
      { id: 1, text: 'Learn JavaScript', completed: false },
      { id: 2, text: 'Learn Vue', completed: false },
      { id: 3, text: 'Build something awesome', completed: false },
      { id: 4, text: 'Finish the todo app', completed: false },
      { id: 5, text: 'Refactor code', completed: false },
      
    ]);
    const newTodo = ref('');

    const addTodo = () => {
      if (newTodo.value.trim()) {
        const newTodoItem = {
          id: Date.now(),
          text: newTodo.value,
          completed: false
        };
        todos.value.push(newTodoItem);
        newTodo.value = '';
      }
    };

    const deleteTodo = (todoId: number) => {
      todos.value = todos.value.filter(todo => todo.id !== todoId);
    };

    const markAsDone = (todoId: number) => {
      const todo = todos.value.find(todo => todo.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
      }
      todos.value.sort((a, b) => Number(a.completed) - Number(b.completed));
    };

    return { todos, newTodo, addTodo, deleteTodo, markAsDone };
  },
};
</script>