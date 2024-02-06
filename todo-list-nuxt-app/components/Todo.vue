<template>
    <div class="bg-custom-blue rounded-md p-2 flex gap-2 items-center justify-between">
        <p v-if="completed" class=" line-through">
            {{ text }}
        </p>
        <p v-else>
            {{ text }}
        </p>
        <div class="flex gap-2">
            <button @click="$emit('mark-as-done', id)" class="px-2 py-1 bg-green-700 hover:bg-green-600 rounded-md" v-show="!completed">Done</button>
            <button @click="deleteTodo" class="px-2 py-1 bg-red-700 hover:bg-red-600 rounded-md">Delete</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        text: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        deleteTodo() {
            this.$emit('delete-todo', this.id);
        }
    }
});
</script>

