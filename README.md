# Blog App Project

## Overview

This is a full-stack blog application built using Node.js, Express.js, SQLite, and React (with Vite). The backend manages the APIs and authentication using JSON Web Tokens (JWT), and the frontend provides the user interface for the blog features. The application includes user authentication, post creation, commenting, and different roles (user/admin) with specific permissions.


## Setup and Running the Application

### 1. Using Docker

The application is containerized using Docker. You can use the Dockerfile and Docker Compose file to easily set up and run the application.

#### Steps to Run

1. **Clone the Repository**

   ```sh
   git clone <repository-url>
   cd blog-app

2. **Build and Run with Docker Compose**

   ```sh
   docker-compose up --build
    ```

    This command will build the image and start the container on port 80.

### 2. Running Locally

If you want to run the application locally without Docker, follow these steps:

1. **Backend Setup**

   - Navigate to the root folder and install the backend dependencies:
     ```sh
     npm install
     ```

2. **Frontend Setup**

   - Navigate to the `frontend` folder and install the dependencies:
     ```sh
     cd frontend
     npm install
     ```
   - **Build the Frontend**
     ```sh
     npm run build
     ```

3. **Start the Server**

   - Return to the root folder and start the server:
     ```sh
     npm start
     ```

## Usage

### Accessing the Application

You can access the application via at `http://localhost:80`.
