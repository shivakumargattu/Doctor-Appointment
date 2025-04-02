# MERN Stack Doctor Appointment

![MERN Logo](https://miro.medium.com/max/1200/1*WYQ8z7BxLQ3obIyYh4w5BQ.png)

A full-stack JavaScript boilerplate using MongoDB, Express, React, and Node.js with modern development practices.

## Features

- **Full authentication system** (Admin/doctor/Register/Login/Logout)
- **JWT-based authorization**
- **React hooks** for state management
- **Express REST API** with MVC architecture
- **Mongoose ODM** for MongoDB
- **Environment variables** configuration
- **Custom error handling** middleware
- **Responsive design** ready
- **API documentation** with Swagger

## Prerequisites

- Node.js >= 14.x
- npm >= 6.x or yarn
- MongoDB Atlas account or local MongoDB instance

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

# In server/.env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development

# In client/.env
REACT_APP_API_URL=http://localhost:4000/api
