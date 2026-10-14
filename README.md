# TASK-33
# TaskFlow – To-Do List Application

TaskFlow is a full-stack To-Do List application that helps users organize tasks, track progress, and manage daily work through a clean and responsive interface.

## 🚀 Live Demo

- **Live Website:** https://task-33-six.vercel.app
- **GitHub Repository:** https://github.com/ankitasaininwh-blip/TASK-33

## ✨ Features

- Add new tasks with a title and description
- View all tasks in a task list
- Edit existing tasks
- Mark tasks as completed
- Delete tasks
- Search tasks
- Track total and completed tasks
- Store tasks in MongoDB
- Responsive user interface
- REST API integration between frontend and backend

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

### Deployment
- Vercel – Frontend hosting
- Render – Backend hosting
- MongoDB Atlas – Database hosting

## 📁 Project Structure

```text
TASK-33/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
├── App.jsx
├── App.css
├── main.jsx
├── index.html
├── api.js
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB Atlas account or a MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/ankitasaininwh-blip/TASK-33.git
cd TASK-33
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
```

Replace the placeholder with your MongoDB connection string. Never commit actual credentials to GitHub.

### 4. Configure the Frontend

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start the Backend

From the `backend` directory, run:

```bash
npm run dev
```

If a development script is not configured, use:

```bash
node server.js
```

### 6. Start the Frontend

Open a second terminal in the project root and run:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## 🌐 Deployment

The frontend is deployed on Vercel, the backend is deployed on Render, and MongoDB Atlas stores the application data.

For production, configure the following environment variables in the hosting dashboards:

**Render backend**
- `MONGODB_URI`
- `CLIENT_ORIGIN` – the deployed frontend origin

**Vercel frontend**
- `VITE_API_URL` – the deployed backend API URL ending in `/api`

Redeploy the frontend after changing its environment variables.

## 🔒 Security

- Environment files containing credentials should not be committed.
- MongoDB credentials must remain private.
- Production database access should be restricted appropriately.

## 🎯 Learning Outcomes

This project demonstrates full-stack application development, REST API integration, database connectivity, CRUD operations, environment configuration, and cloud deployment.

## 👨‍💻 Author

**Task 33 Project**

Developed as a full-stack To-Do List application.
