# Symptom Logger XL

Minimalist, evidence-focused symptom logging system for medical/disability tracking.

Backend: FastAPI + Supabase  
Frontend: React + Vite  
Extras: PDF export, analytics dashboard

Run backend:
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000

Run frontend:
cd frontend
npm install
npm run dev
