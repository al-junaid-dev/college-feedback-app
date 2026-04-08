# 🎓 College Feedback System

A modern **web-based Feedback System** built using **React.js, Tailwind CSS, and JavaScript**. This application allows students to securely submit feedback for subjects, while administrators can analyze and review the collected data through a dashboard.

---

## 🚀 Features

### 👨‍🎓 Student Panel

* Login using **Hall Ticket Number & Password**
* Submit feedback for subjects
* Rate subjects (1–5 scale)
* Add optional comments
* Prevents **duplicate feedback submissions**

### 🛠️ Admin Panel

* Secure admin login
* View all submitted feedback
* Analyze feedback in a structured table
* View **average rating**

---

## 🧱 Tech Stack

* **Frontend:** React.js
* **Styling:** Tailwind CSS
* **Logic:** JavaScript
* **Storage:** LocalStorage (for demo purposes)

---

## 📁 Project Structure

```
src/
│── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── AdminProtected.jsx
│
│── pages/
│   ├── Login.jsx
│   ├── StudentDashboard.jsx
│   ├── FeedbackForm.jsx
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│
│── services/
│   ├── authService.js
│
│── utils/
│   ├── constants.js
│
│── App.jsx
│── main.jsx
```

---

## 🔐 Demo Credentials

### 👨‍🎓 Students

| Hall Ticket | Password |
| ----------- | -------- |
| 101         | 101      |
| 102         | 102      |
| 103         | 103      |

### 🛠️ Admin

```
Username: admin
Password: admin123
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/feedback-system.git

# Navigate into project
cd feedback-system

# Install dependencies
npm install

# Run the project
npm run dev
```

---

## 🌐 Usage Flow

### Student Flow:

1. Login
2. Navigate to dashboard
3. Submit feedback

### Admin Flow:

1. Login
2. Access dashboard
3. View and analyze feedback

---

## 📊 Data Handling

* Feedback is stored in **localStorage**
* Each entry includes:

  * Student ID
  * Subject
  * Teacher
  * Rating
  * Comment
  * Timestamp

---

## 🚫 Limitations (Current Version)

* No backend/database integration
* Credentials stored in frontend (for demo only)
* No encryption or JWT authentication

---

## 🔮 Future Enhancements

* 🔥 Backend integration (Node.js + MongoDB / Firebase)
* 🔐 Secure authentication (JWT)
* 📊 Advanced analytics with charts
* 🌐 Deployment (Vercel / Netlify)
* 📱 Mobile responsive improvements

---

## 💡 Key Highlights

* Clean and scalable architecture
* Role-based access (Student/Admin)
* Duplicate feedback prevention
* Simple and intuitive UI

---

## 📌 Conclusion

This project demonstrates a complete **frontend-based feedback management system** with authentication, structured data handling, and admin analytics. It is designed to be easily extendable into a full-stack application.

---

## 👨‍💻 Author

**Al Junaid**
Engineering Student | Web Developer

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and feel free to contribute!
