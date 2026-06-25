# ✨ StellarLog - Premium Daily Workspace Planner

StellarLog ek ultra-modern, dynamic aur single-file hybrid architecture par aadharit workspace management tool hai. Yeh tool developers aur professionals ko unke daily execution logs, tasks, aur micro-notes ko date aur context (topic) ke sath track karne me madad karta hai. Is project ko Express.js (Day 11 MVC guidelines) ke mutabik design kiya gaya hai.

---

## 🚀 Key Features (Project Functions)

* **Context-Driven Log Entry Form**: Date, Topic (Context) aur Detailed Description accept karne ke liye ek modern glassmorphic form.
* **Centralized Routing & MVC Architecture**: Day 11 ke curriculum ke anusar pure backend routes aur logics ko handle karne ke liye Express Router aur MVC pattern ka upyog.
* **Advanced History Filtering**: Bina pure page ko reload kiye, kisi bhi specific date ke logs ko filter karne ke liye dedicated active filter system.
* **Live Record Synchronization**: Ek hi click me backend server se saare purane data ko fetch aur render karne ka option.
* **Instant Record Destruction**: Kisi bhi purane log ko click-to-delete action ke sath server aur UI dono se real-time me remove karne ki suvidha.
* **Centralized Global Error Handling**: Form validation aur invalid requests ko handle karne ke liye ek robust backend middleware handler.
* **Ultra-Modern Cyberpunk UI/UX**: Plus Jakarta Sans typography, neon glowing indicators, smooth keyframe transitions aur glassmorphic UI element panels.

---

## 🛠️ Tech Stack Used

* **Frontend**: Vanilla HTML5, Advanced CSS3 (Studio Dark Theme Layout), Modern Asynchronous JavaScript (Fetch API / ES6+).
* **Backend**: Node.js, Express.js Framework (Using CommonJS runtime optimization).
* **Data Layer**: Temporary In-Memory Array Data-Structure (Day 11 Architecture standard).

---

## 📂 Project Architecture

```text
├── index.html        # Frontend user interface layout
├── style.css         # Modern glassmorphism studio styling
├── app.js            # Hybrid execution file (Frontend Fetch Logic + Backend Express MVC)
├── package.json      # Node dependency registry and project metadata
└── package-lock.json # Exact dependency locking definition
```

---

## ⚙️ How to Setup and Run Locally

Aap is project ko apne local system par neeche diye gaye steps se chala sakte hain:

### 1. Repository Clone Karein
```bash
git clone <your-github-repo-link>
cd notes_project
```

### 2. Dependencies Install Karein
```bash
npm install
```

### 3. Backend Server Start Karein
```bash
node app.js
```
*Terminal me aapko `Server is running on port 5001` ka message dikhega.*

### 4. Frontend Application Open Karein
Apne project folder me jakar `index.html` file par double-click karein ya use drag karke apne kisi bhi progressive browser (Chrome/Edge/Firefox) me open kar lein.

---

## 📋 API Endpoint Structure (For Testing via Postman/ThunderClient)

| Method | Endpoint | Description | Request Body / Query |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/notes` | Saare live notes fetch karne ke liye | *None* |
| **GET** | `/api/notes?date=YYYY-MM-DD` | Specific date ke hisab se filter karne ke liye | *Query Parameter* |
| **POST** | `/api/notes` | Ek naya log entry create karne ke liye | `{"date": "YYYY-MM-DD", "topic": "Text", "text": "Text"}` |
| **DELETE**| `/api/notes/:id` | Kisi specific note ko delete karne ke liye | *URL Param (ID)* |

---

## 🎯 Project Roadmap / Future Improvements

* [ ] Data persistence ke liye **MongoDB/Mongoose (Day 13)** integration add karna.
* [ ] Multi-user facility ke liye **JWT-based Authentication/Login** system implement karna.
* [ ] Notes ko content ke hisab se dhoodhne ke liye **Text-based Search Bar** functionality jodna.
*
