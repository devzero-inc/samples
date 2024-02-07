<template>
  <div class=" h-screen w-screen bg-radial-gradient from-primary via-between to-secondary text-white flex items-center justify-center">
    <div class="w-[62%] h-[65%] flex p-4 items-center justify-between rounded-lg bg-custom-bg">
      <div class=" hidden md:flex flex-col h-full w-[60%] justify-between">
        <div class="flex gap-2 items-center">
          <img class=" -ml-4 w-16 " src="/static/icons/devzero_logo.png" alt="logo">
          <h1 class=" text-4xl font-bold">DevZero</h1>
        </div>
        <div class="">
          <img class=" w-[18rem] lg:w-[30rem]" src="/static/icons/todo_list.png" alt="nothing">
        </div>
      </div>
      <div class=" flex flex-col items-center gap-8 h-full w-full md:w-[45%]">
        <div class="flex w-full justify-between md:justify-end">
          <img class=" block md:hidden w-16 " src="/static/icons/devzero_logo.png" alt="logo">
          <div class="flex flex-col items-end">
            <h1 class=" text-2xl sm:text-4xl font-bold text-center">Todo List</h1>
            <p class=" text-sm sm:text-base text-slate-400 text-center">Create your tasks</p>
          </div>
        </div>
        <form class="flex w-full gap-4" @submit.prevent="addTodo">
          <input class=" border-b border-white bg-transparent outline-none px-2 py-1 w-[80%] lg:flex-1" type="text" v-model="newTodo"
            placeholder="Add a new todo" />
          <button class=" bg-custom-blue hover:bg-custom-light-blue rounded-md px-2 text-white font-semibold">Add</button>
        </form>
        <ul v-if="todos" class="flex flex-col gap-2 w-full overflow-auto flex-1">
          <li class=" w-full" v-for="todo in todos" :key="todo.id">
            <Todo :title="todo.title" :id="todo.id" :is_completed="todo.is_completed" @delete-todo="deleteTodo" @mark-as-done="markAsDone"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { fetchTasks, addTask, deleteTask, updateTask } from "~/http/api";

interface Task {
  id: string;
  title: string;
  is_completed: number;
  created_at: string;
}

export default {
  setup() {

    const todos = ref<Task[]>([]);

    const newTodo = ref('');

    const fetchTodos = async () => {
      try {
        const tasks: Task[] | null = await fetchTasks();
        if(tasks !== null && tasks !== undefined) {
          tasks.sort((a, b) => Number(a.is_completed) - Number(b.is_completed));
          todos.value = tasks;
        }
      } catch (error) {
        console.error('Failed to fetch todos', error);
      }
    };

    onMounted(() => {
      fetchTodos();
    });

    const addTodo = async () => {
      if (newTodo.value.trim()) {
        const newTodoTitle = newTodo.value;
        await addTask(newTodoTitle);
        fetchTodos();
        newTodo.value = '';
      }
    };

    const deleteTodo = async (todoId: string) => {
      await deleteTask(todoId);
      todos.value = todos.value.filter(todo => todo.id !== todoId);
    };

    const markAsDone = async (todoId: string) => {
      await updateTask(todoId);

      const todo = todos.value.find(todo => todo.id === todoId);
      if (todo) {
        todo.is_completed = 1;
      }
      todos.value.sort((a, b) => Number(a.is_completed) - Number(b.is_completed));
    };

    return { todos, newTodo, addTodo, deleteTodo, markAsDone };
  },
};
</script>