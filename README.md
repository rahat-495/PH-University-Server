🚀 Features

User Authentication (Login/Signup)

CRUD Operations

Database Integration (MongoDB)

REST API using Express.js

TypeScript for Strong Typing

Hosted on Vercel

🛠 Tech Stack

Frontend: React.js (if applicable)

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)

Deployment: Vercel

Styling: Tailwind CSS (if used)

📂 Project Structure

/root <br/>
 ├── src/<br/>
 │   ├── controllers/<br/>
 │   ├── models/<br/>
 │   ├── routes/<br/>
 │   ├── services/<br/>
 │   ├── utils/<br/>
 │   ├── app.ts<br/>
 │   ├── server.ts<br/>
 ├── dist/<br/>
 ├── .env<br/>
 ├── package.json<br/>
 ├── tsconfig.json<br/>
 ├── vercel.json<br/>
 ├── README.md<br/>

⚙️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/rahat-495/level-2-project-2.git
cd your-repo

2️⃣ Install Dependencies

npm install

3️⃣ Setup Environment Variables

Create a .env file and add the necessary variables:

PORT=5555<br/>
DATABASE_URL=your_mongo_connection_url<br/>
JWT_ACCESS_SECRET=your_jwt_secret<br/>
JWT_REFRESH_SECRET=your_jwt_refresh_secret<br/>

4️⃣ Run the Server

Development Mode:

npm run dev

Production Mode:

npm run build
npm start

🚀 Deployment Guide

1️⃣ Build the Project

npm run build

2️⃣ Deploy to Vercel

vercel --prod

📧 Contact

For any inquiries, contact me at: kazirihatul@gmail.com.
