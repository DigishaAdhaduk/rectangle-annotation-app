# 🟦 Rectangle Annotation App

A web application built using **React** and **KonvaJS** that allows authenticated users to draw, manage, and persist rectangle annotations on a canvas. Each user has their own saved annotations and background image, securely handled by a backend. This project is developed as part of an assignment with a focus on clean UI, proper structure, and reliable functionality.

---

## ✨ Features

### 🔐 Authentication
- Username and password based login
- Token-based authentication
- First login automatically creates a user
- Logout functionality

### 🖼 Canvas & Annotations
- Canvas implemented using react-konva
- Upload background image (map / image / screenshot)
- Draw rectangles using click-and-drag
- Select rectangles with visual highlight
- Move and resize rectangles
- Delete selected rectangles
- Real-time display of rectangle position and dimensions

### 💾 Data Persistence
- Annotations stored per user
- Background image persisted per user
- Secure CRUD operations via REST APIs

### 🎨 UI & Architecture
- Clean and responsive user interface
- Login UI separated from canvas UI
- Canvas logic separated from UI components
- Beginner-friendly and readable codebase

---

## 🧱 Tech Stack

### 🖥 Frontend
- React (Vite)
- KonvaJS (react-konva)
- Plain CSS (no UI frameworks)

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB
- Token-based authentication

---

## ⚙️ Local Setup Instructions

### 📥 Clone Repository
git clone https://github.com/DigishaAdhaduk/rectangle-annotation-app.git  
cd rectangle-annotation-app

### 🧠 Backend Setup
cd backend  
npm install  
node index.js  

Backend runs on: http://localhost:4000

### 🎨 Frontend Setup
cd frontend  
npm install  
npm run dev  

Frontend runs on: http://localhost:5173

---

## 🧪 Application Flow

1. Open the application
2. Login using username and password
3. Upload a background image (optional)
4. Click Draw and drag to create rectangles
5. Select rectangles to view details
6. Move, resize, or delete rectangles
7. Logout to return to login screen

---

## 🔌 API Endpoints

POST /login – Login / create user  
GET /annotations – Fetch user annotations  
POST /annotations – Create annotation  
PUT /annotations/:id – Update annotation  
DELETE /annotations/:id – Delete annotation  
GET /bg – Fetch background image  
POST /bg – Save background image 
 
All protected routes require:
Authorization: <JWT_TOKEN>
---

## 🚀 Deployment

### 🌍 Frontend (Vercel)
The frontend is deployed using Vercel to make the application accessible for testing and evaluation.

Vercel Deployment URL:  
https://rectangle-annotation-app.vercel.app

### 🖧 Backend
Backend is deployed on Render and connected to MongoDB Atlas.

Backend URL:  
https://rectangle-annotation-app.onrender.com


---

## 📤 Submission Details

https://github.com/DigishaAdhaduk/rectangle-annotation-app

### 🌐 Hosted Links
Frontend:  
https://rectangle-annotation-app.vercel.app/

Backend API:  
https://rectangle-annotation-app.onrender.com

### 👤 Collaborator Added
anees_ahmad@vecros.com

---

## 📌 Notes

- Only KonvaJS is used for canvas functionality as required
- No additional canvas or drawing libraries are used
- Application is tested thoroughly for core functionality and edge cases
- Focus is kept on clean UI, structure, and usability

---



