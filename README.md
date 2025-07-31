  # 🩺 MERN Stack Doctor Appointment System

![Healthcare App](https://img.icons8.com/color/96/000000/medical-doctor.png)

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing doctor appointments with **patient and admin dashboards**. It includes authentication, doctor listings, appointment management, and responsive UI.

---

## 🚀 Live Demo

### 👨‍⚕️ Patient Portal:
👉 [https://doctor-appointment-9uf8.vercel.app/](https://doctor-appointment-9uf8.vercel.app/)

![Patient 1](https://github.com/user-attachments/assets/080f6bd4-729d-46a7-aac7-7dbc5f8ef812)
![Patient 2](https://github.com/user-attachments/assets/1d5854cb-f38f-4e70-b392-95311a6d1fb3)

---

### 🔒 Admin Dashboard:
👉 [https://doctor-appointment-digy-lclx91j9s-shivakumargattus-projects.vercel.app/](https://doctor-appointment-digy-lclx91j9s-shivakumargattus-projects.vercel.app/)  
*(Admin credentials required)* 
📧 Email: admin@shiva.com  
🔑 Password: Shiv@409


![Admin 1](https://github.com/user-attachments/assets/83468738-3598-4d25-bc39-a2dd73a5a230)
![Admin 2](https://github.com/user-attachments/assets/8cc8c405-8287-493f-94c5-e69ce9db6472)

---

## ✨ Features

### 🧑‍⚕️ Patient Features
- Browse available doctors
- Book or cancel appointments
- View appointment history
- Manage user profile
- Fully responsive mobile interface

### 🛠️ Admin Features
- View & manage all appointments
- CRUD operations for doctors
- View patient details
- Dashboard analytics (optional)
- Admin-only access

---

## ⚙️ Tech Stack

### Frontend:
- React.js
- React Hooks & Context API
- Tailwind CSS
- Axios
- React Router
- Toastify

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)

### DevOps:
- Vercel – Frontend Hosting
- Render – Backend Hosting
- GitHub – Version Control

---

## 🔐 API Endpoints

> Backend URL: `https://doctor-appointment-0xl4.onrender.com`

| Method | Endpoint                             | Description                       |
|--------|--------------------------------------|-----------------------------------|
| POST   | `/api/user/register`                 | Register a new user               |
| POST   | `/api/user/login`                    | Login with email/password         |
| GET    | `/api/user/get-profile`              | Get logged-in user profile        |
| GET    | `/api/doctor/list`                   | Fetch list of doctors             |
| POST   | `/api/appointment/book`              | Book a new appointment *(future)* |
| GET    | `/api/appointment/my-appointments`   | View user’s appointment history   |

> 🔐 Most routes require: `Authorization: token` in headers.

---

## 🧪 Getting Started Locally

### 🔧 Prerequisites
- Node.js v16+
- MongoDB Atlas or local instance
- Git

### 🛠 Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/shivakumargattu/Doctor-Appointment
cd Doctor-Appointment

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install
