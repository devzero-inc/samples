# Internal Employee Directory

## Overview
This Internal Employee Directory is a modern, full-stack web application designed to manage and display employee information within an organization. It leverages a MongoDB database for efficient data storage, Node.js and Express.js for a robust server-side environment, and React.js with Tailwind CSS for an interactive and responsive client-side experience.

## TODO:
1. Writing unit test
2. dockerizing front end
3. CI CD pipeline
4. Local lint and pre commit hook

## Features
- **Employee Data Management:** Manage employee records, view individual details, and visualize organizational hierarchy.
- **Search and Filter:** Quickly find employees based on various criteria.
- **Responsive Design:** Accessible on various devices and screen sizes.
- **Secure Access:** Role-based access control and authentication (TBD).


## Technologies Used
- **Database:** MongoDB
- **Backend:** Node.js, Express.js, Mongoose ODM
- **Frontend:** React.js, Tailwind CSS

## Table of contents

- [High Level Diagram](#high-level-diagram)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

## High Level Design

![Alt Text](https://i.imgur.com/S7Fwpg1.jpeg)

Our application operates by facilitating user interaction through the frontend interface. When a user accesses the frontend, the application initiates requests to the backend API endpoints. These endpoints, in turn, interact with the database to retrieve pertinent data. Once obtained, the backend delivers the requested data back to the frontend. The frontend is responsible for presenting this data on the website, ensuring a seamless and user-friendly experience.

## Tech Stack

Database: Our application utilizes a MongoDB database to store and manage data efficiently.

Backend: The server-side of our application is powered by Node.js and Express.js. These technologies enable us to create a robust server and design RESTful APIs. Additionally, we leverage Mongoose as an Object Data Modeling (ODM) tool to facilitate seamless interactions with the MongoDB database.

Frontend: For the client-side development, we have employed React.js, a powerful JavaScript library for building user interfaces. To enhance the visual aesthetics and responsiveness of the website, we have incorporated Tailwind CSS for comprehensive styling.


### Prerequisites
- Docker
- Node.js
## Installation

Dependencies:
```
Docker version - 24.0.7
Node version - 20.9.0
```


Run locally: 
```bash
git clone https://github.com/ScaleupInfra/devzero-nodejs-mongo-react.git
cd devzero-nodejs-mongo-react
```
To get the backend running:
```bash
cd backend
docker compose up
```
Backend will run on PORT ```8000``` -> [http://localhost:8000/](http://localhost:8000/)

To get the frontend running:
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on PORT ```5173``` [http://localhost:5173/](http://localhost:5173/)

Now you can go to: 
[http://localhost:5173/](http://localhost:5173/)


