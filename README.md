

## ✨ Features  

- 📂 **Upload Resume (PDF/DOCX)** – text parsing and analysis  
- 🎯 **ATS Analysis** – role-aware keyword gaps, missing sections, formatting tips, and red flags  
- 💡 **Actionable Suggestions** – improve your resume with tailored feedback  
- 🌐 **Modern Frontend** – React + Vite, no Tailwind (custom styling)  
- ⚙️ **Backend API** – Node.js + Express, powered by Gemini AI  
- 🖥 **Multi-page UI**  
  - Welcome / Dashboard (vision & mission)  
  - Upload & Check (ATS analyzer)  
  - Resources (resume + job-hunt tips)  

---

## 🛠️ Tech Stack  

**Frontend**  
- React (Vite)  
- React Router  
- Axios  
- Custom CSS (no Tailwind)  

**Backend**  
- Node.js + Express  
- Multer (file uploads)  
- pdf-parse & mammoth (resume parsing)  
- Google Gemini API (AI analysis)  

---

## 📂 Project Structure  

```

NextHire/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # UI components (Welcome, Analyzer, Resources, etc.)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── api.js
│   └── package.json
│
├── server/                # Node.js backend
│   ├── controllers/       # API controllers
│   ├── services/          # Gemini AI service
│   ├── app.js             # Express app
│   └── package.json
│
├── README.md
└── .env.example

````

---

## ⚡ Getting Started  

### 1. Clone Repo  
```bash
git clone https://github.com/Gayatridandgal/NextHire.git
cd NextHire
````

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key or OPENAI_API_KEY=your_openai_api_key
```

Start backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file:

```
VITE_API_BASE=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173) 🎉

---



### 🏠 Welcome / Dashboard

*Inspiring vision and call-to-action*
<img width="951" height="621" alt="Screenshot 2025-08-16 224636" src="https://github.com/user-attachments/assets/1a002045-a979-487f-9e98-d12ae3c5e748" />


### 📂 Upload & Check

*Upload resume, parse, and run ATS analysis*
<img width="1204" height="481" alt="Screenshot 2025-08-16 224649" src="https://github.com/user-attachments/assets/ac170805-6c51-42d6-bab5-3b83a425a97e" />


### 📘 Resources

*Practical resume and interview tips*
<img width="996" height="570" alt="Screenshot 2025-08-16 224719" src="https://github.com/user-attachments/assets/c0b6885e-cf99-48a5-b341-1c546a895b49" />




---


> 🚀 NextHire – Because your next opportunity should be about **skills & impact**, not ATS filters.

