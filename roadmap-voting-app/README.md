# Roadmap Voting App ![ workflow](https://github.com/devzero-inc/samples/actions/workflows/roadmap.yml/badge.svg)

## Overview
A roadmap voting app that democratizes the development process by enabling authenticated users to influence a project's trajectory. Through a simple and intuitive interface, users can vote on proposed features, track the progress of development items, and see at a glance which enhancements are up next or already completed. This platform ensures that every voice is heard and that the project aligns closely with the community's most valued feedback and needs.

![Alt Text](https://i.imgur.com/mJ9jW9E.png)

## Table of contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [High Level Design](#high-level-design)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

## Features
- **User Authentication:** Secure signup and sign-in capabilities to ensure a personalized and secure voting experience.
- **Voting System:** Users can cast their votes on feature proposals, influencing the priority of the project's development roadmap.
- **Development Tracking:** View the progress of different features from conception through to completion with clear, status-based categorization.
- **Roadmap Overview:** An at-a-glance look at the project's development pipeline, including upcoming, in-progress, and completed items.


## Technologies Used   

- **Database + Auth service:** [Supabase](https://supabase.com/)
- **Backend + Frontend:** [Next.js](https://nextjs.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)

## High Level Design

![Alt Text](https://i.imgur.com/MtVWN7J.jpeg)

The Roadmap Voting App offers an intuitive and collaborative platform for users to engage with and influence product development roadmaps. It integrates a seamless authentication process through Supabase, enabling users to vote on features after signing in. The frontend interfaces with a backend API that interacts with the Supabase database, managing entities such as users, posts, and votes. User interactions on the frontend trigger API calls, prompting state changes and data updates which are then dynamically reflected on the user interface. This continuous loop ensures a real-time, interactive experience, allowing the community's preferences to directly shape the product's evolution.

## Tech Stack

**Database + Auth Service:** Our application leverages Supabase, an open-source Firebase alternative that combines both database and authentication services. Supabase provides us with a PostgreSQL database for robust and relational data storage, along with secure and scalable user authentication.

**Backend + Frontend:** We've chosen Next.js for its seamless integration of frontend and backend capabilities, providing a cohesive development experience. This is complemented by Tailwind CSS for styling, offering a utility-first approach that enables rapid and responsive design implementations.

### Prerequisites
- Docker

## Installation

Run locally: 
```bash
git clone https://github.com/devzero-inc/samples.git
cd samples/roadmap-voting-app
docker compose up
```
App will be running on ```PORT:3000``` -> [http://localhost:3000/](http://localhost:3000/)

Now just go to [http://localhost:3000/](http://localhost:3000/) and explore the application.
