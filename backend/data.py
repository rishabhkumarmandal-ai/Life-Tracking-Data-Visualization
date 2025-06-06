# backend/main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from uuid import uuid4
from datetime import date

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Dummy User Auth --------------------
users_db = {"demo@example.com": {"id": "user123", "name": "Demo User"}}

# -------------------- Models --------------------
class Entry(BaseModel):
    id: str = None
    user_id: str
    date: date
    learning_hours: float
    workout_minutes: int
    calories_burned: int
    mood: int
    pomodoros: int
    tasks_completed: int
    reading_pages: int
    tag: str

# -------------------- In-Memory DB --------------------
db: List[Entry] = []

# -------------------- Auth Dependency --------------------
def get_current_user(email: str):
    if email in users_db:
        return users_db[email]
    raise HTTPException(status_code=401, detail="Unauthorized")

# -------------------- CRUD Routes --------------------
@app.get("/entries", response_model=List[Entry])
def get_entries(email: str, user=Depends(get_current_user)):
    return [entry for entry in db if entry.user_id == user['id']]

@app.post("/entries", response_model=Entry)
def create_entry(entry: Entry, user=Depends(get_current_user)):
    entry.id = str(uuid4())
    entry.user_id = user['id']
    db.append(entry)
    return entry

@app.put("/entries/{entry_id}", response_model=Entry)
def update_entry(entry_id: str, updated: Entry, user=Depends(get_current_user)):
    for i, entry in enumerate(db):
        if entry.id == entry_id and entry.user_id == user['id']:
            updated.id = entry_id
            updated.user_id = user['id']
            db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Entry not found")

@app.delete("/entries/{entry_id}")
def delete_entry(entry_id: str, user=Depends(get_current_user)):
    global db
    before = len(db)
    db = [e for e in db if not (e.id == entry_id and e.user_id == user['id'])]
    if len(db) == before:
        raise HTTPException(status_code=404, detail="Entry not found")
    return {"message": "Deleted successfully"}
