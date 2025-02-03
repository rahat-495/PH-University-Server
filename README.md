# 🚀 PH-University

This project is a high-performance, full-stack web application built with TypeScript, Node.js, and Express.js, using MongoDB as the database. It features user authentication, role-based access control, and efficient CRUD operations. Designed for scalability, it follows a modular architecture, ensuring maintainability and flexibility. The backend is optimized for speed and security, with JWT authentication and middleware handling. The project is deployed on Vercel, making it easily accessible and production-ready. 🚀

## 🚀 Features

- User Authentication (Login/Signup)
- CRUD Operations
- Database Integration (MongoDB)
- REST API using Express.js
- TypeScript for Strong Typing
- Hosted on Vercel

## 🛠 Tech Stack

- **Frontend:** React.js (if applicable)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS (if used)

## 📂 Project Structure

```
/root
├── src/
│   ├── app/
│   │   ├── builder/
│   │   ├── config/
│   │   ├── errors/
│   │   ├── interface/
│   │   ├── modules/
│   │   │   ├── academicDepartment/
│   │   │   ├── academicFaculty/
│   │   │   ├── academicSemester/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── course/
│   │   │   ├── faculty/
│   │   │   ├── middlewares/
│   │   │   ├── offeredCourse/
│   │   │   ├── semesterRegistration/
│   │   │   ├── student/
│   │   │   ├── user/
│   ├── routes/
│   ├── utils/
│   ├── app.ts
│   ├── server.ts
├── dist/
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
├── vercel.json
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/rahat-495/level-2-project-2.git
cd level-2-project-2
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file and add the necessary variables:

```env
PORT=5555
DATABASE_URL=your_mongo_connection_url
JWT_ACCESS_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

### 4️⃣ Run the Server

#### Development Mode:

```sh
npm run dev
```

#### Production Mode:

```sh
npm run build
npm start
```

## 🚀 Deployment Guide

### 1️⃣ Build the Project

```sh
npm run build
```

### 2️⃣ Deploy to Vercel

```sh
vercel --prod
```

## 📧 Contact

For any inquiries, contact me at: **kazirihatul@gmail.com**
