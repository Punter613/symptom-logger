from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from supabase import create_client
from dotenv import load_dotenv
import os
from pydantic import BaseModel, Field
from datetime import datetime
from analytics import summarize
from reports import generate_pdf

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

class Entry(BaseModel):
    date: str
    symptoms: str
    severity: int = Field(ge=1, le=10)
    duration: str
    trigger: str
    daily_impact: str
    work_impact: str
    medications: str
    notes: str

@app.post("/api/entry")
async def add_entry(e: Entry):
    data = e.dict()
    data["created_at"] = datetime.now().isoformat()
    res = supabase.table("symptom_logs").insert(data).execute()
    return res.data

@app.get("/api/entries")
async def get_entries():
    return supabase.table("symptom_logs").select("*").order("date",desc=True).execute().data

@app.get("/api/summary")
async def summary():
    data = supabase.table("symptom_logs").select("*").execute().data
    return summarize(data)

@app.get("/api/export/pdf")
async def export_pdf():
    data = supabase.table("symptom_logs").select("*").execute().data
    if not data:
        raise HTTPException(404,"No entries")
    file = generate_pdf(data)
    return FileResponse(file, media_type="application/pdf")
