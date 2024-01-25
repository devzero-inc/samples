# Internal Employee Directory ![ workflow](https://github.com/devzero-inc/samples/actions/workflows/main.yml/badge.svg)

## Overview
This Internal Employee Directory is a modern, full-stack web application designed to manage and display employee information within an organization. It leverages a MongoDB database for efficient data storage, Node.js and Express.js for a robust server-side environment, and React.js with Tailwind CSS for an interactive and responsive client-side experience.

![Alt Text](https://i.imgur.com/CIW6oSl.png)

## Table of contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [High Level Design](#high-level-design)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

## Features
- **Employee Data Management:** Manage employee records, view individual details, and visualize organizational hierarchy.
- **Search and Filter:** Quickly find employees based on various criteria.
- **Responsive Design:** Accessible on various devices and screen sizes.
- **Secure Access:** Role-based access control and authentication (TBD).


## Technologies Used

- **Database:** [MongoDB](https://www.mongodb.com/) - A document-based, distributed database built for modern application developers and for the cloud era.
- **Backend:** 
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [Mongoose ODM](https://mongoosejs.com/)
  
- **Frontend:** 
  - [React.js](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)



## High Level Design

![Alt Text](https://i.imgur.com/S7Fwpg1.jpeg)

Our application operates by facilitating user interaction through the frontend interface. When a user accesses the frontend, the application initiates requests to the backend API endpoints. These endpoints, in turn, interact with the database to retrieve pertinent data. Once obtained, the backend delivers the requested data back to the frontend. The frontend is responsible for presenting this data on the website, ensuring a seamless and user-friendly experience.

## Tech Stack

Database: Our application utilizes a MongoDB database to store and manage data efficiently.

Backend: The server-side of our application is powered by Node.js and Express.js. These technologies enable us to create a robust server and design RESTful APIs. Additionally, we leverage Mongoose as an Object Data Modeling (ODM) tool to facilitate seamless interactions with the MongoDB database.

Frontend: For the client-side development, we have employed React.js, a powerful JavaScript library for building user interfaces. To enhance the visual aesthetics and responsiveness of the website, we have incorporated Tailwind CSS for comprehensive styling.


### Prerequisites
- Docker
## Installation

Dependencies:
```
Docker version - 24.0.7
```


Run locally: 
```bash
git clone https://github.com/devzero-inc/samples.git
cd samples/internal-employee-directory
docker compose up -d
```
Backend will be running on ```PORT:8000``` (you can test it by going to localhost:8000/test) -> [http://localhost:8000/](http://localhost:8000/)

Frontend will be running on ```PORT:5173``` -> [http://localhost:5173/](http://localhost:5173/)

Now just go to [http://localhost:5173/](http://localhost:5173/) and explore the application.


