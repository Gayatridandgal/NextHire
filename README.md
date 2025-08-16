# 🚀 NextHire – AI Resume & LinkedIn Analyzer  

NextHire helps job seekers **optimize their resumes and LinkedIn profiles** to pass ATS (Applicant Tracking Systems) and land more interviews.  
Upload a resume or paste LinkedIn text, choose a target role, and get **AI-powered ATS feedback, keyword suggestions, and actionable improvements** in seconds.  

---

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

### 📂 Upload & Check

*Upload resume, parse, and run ATS analysis*

### 📘 Resources

*Practical resume and interview tips*



---


> 🚀 NextHire – Because your next opportunity should be about **skills & impact**, not ATS filters.

