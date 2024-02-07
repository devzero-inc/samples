# Todo List App

## Overview
This todo app offers a minimalist approach to task management, focusing on core functionalities that allow users to add, remove, and mark tasks as done. Designed with simplicity and ease of use in mind, it provides a clutter-free environment to help users concentrate on their tasks without unnecessary features. Whether it's for daily chores, work assignments, or personal goals, the app facilitates a straightforward way to keep track of tasks, ensuring users can effectively manage their to-dos and stay organized.

![Alt Text](https://i.imgur.com/Vi4JNhm.png)

## Table of contents
- [Todo](#todo)
- [Features](#features)
- [High level design](#high-level-design)
- [Technologies Used](#technologies-used)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

## Todo

1. Write Unit tests
1. Dockerize the app

## Features

**Add Todo:** Users can easily add tasks to their list, providing a simple way to keep track of new responsibilities or ideas.

**Remove Todo:** Allows for the deletion of tasks, ensuring users can keep their list clean and focused on current priorities.

**Update Todo:** Offers the flexibility to modify task details, enabling users to adjust deadlines, descriptions, or priorities as needed.

**Mark Done:** Users can mark tasks as completed, providing a satisfying way to track progress and maintain motivation by visually acknowledging accomplishments.

## High Level Design
![Alt Text](https://i.imgur.com/YtRFVzB.png)

The Todo-List-Nuxt-App delivers a streamlined task management experience, powered by Nuxt.js for the frontend, and a robust Backend API connected to a MySQL database. Utilizing a clear schema, the app enables users to effortlessly manage their tasks with CRUD operations. Interactions from the frontend trigger API calls, ensuring the UI is consistently synchronized with the backend, thus providing a dynamic and responsive environment for the users to track and update their tasks in real time.

## Technologies Used   

- **Database:** [MySQL](https://www.mysql.com/)
- **Backend + Frontend:** [Nuxt.js](https://nuxt.com/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)

## Tech Stack

**Database:** Database: The app uses MySQL for data storage, providing a secure and efficient way to manage tasks and user information. MySQL's reliability supports the app's core functionalities, ensuring smooth operation and data integrity.

**Backend + Frontend:** The application is built with Nuxt.js, integrating both frontend and backend seamlessly for a unified development experience. This is complemented by Tailwind CSS for styling, offering a utility-first approach that enables rapid and responsive design implementations.

### Prerequisites
- Nodejs

## Installation

Run locally: 
```bash
git clone https://github.com/devzero-inc/samples.git
cd samples/todo-list-nuxt-app
npm install
npm run dev
```
App will be running on ```PORT:3000``` -> [http://localhost:3000/](http://localhost:3000/)

Now just go to [http://localhost:3000/](http://localhost:3000/) and explore the application.