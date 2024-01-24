# Photo Upload Directory

## Overview
The Photo Upload App is a streamlined and user-friendly platform designed for the effortless uploading and management of photos. Perfect for individuals looking to store, organize, and access their memories in the cloud, our app stands out for its intuitive design and reliable performance, ensuring your precious moments are always just a few clicks away.

![Alt Text](https://i.imgur.com/fYc1fAd.png)

## Table of contents
- [TODO](#todo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [High Level Design](#high-level-design)
- [Tech Stack](#tech-stack)

## TODO:
1. Write unit test for Backend routes.
1. Update HLD.

## Features
- **Pictures Management:** Streamline your photo collection with sophisticated yet user-friendly management features, ensuring your memories are neatly organized and always within reach.
- **Responsive Design:** Accessible on various devices and screen sizes.


## Technologies Used
- **Database:** PostgreSQL
- **Backend + Frontend:** Next.js
- **Styling:** TailwindCSS


## High Level Design

![Alt Text](https://i.imgur.com/XrHGDVc.jpg)

Our Photo Upload App employs a Next.js-based architecture, integrating a PostgreSQL database for structured image data and a responsive frontend. The system handles image storage and API interactions seamlessly, ensuring real-time state updates and swift user interface re-renders for an efficient and intuitive user experience.

## Tech Stack

**Database:** Our application harnesses the power of PostgreSQL, a robust SQL database, to store and manage data with efficiency and reliability.

**Backend + Frontend:** We've chosen Next.js for its seamless integration of frontend and backend capabilities, providing a cohesive development experience. This is complemented by Tailwind CSS for styling, offering a utility-first approach that enables rapid and responsive design implementations.


## Installation

Dependencies:
```
Docker version - 24.0.7
```


Run locally: 
```bash
git clone https://github.com/devzero-inc/samples.git
cd samples/photo-upload-app
docker compose up -d
```
App will be running on ```PORT:3000``` -> [http://localhost:3000/](http://localhost:3000/)

Now just go to [http://localhost:3000/](http://localhost:3000/) and explore the application.