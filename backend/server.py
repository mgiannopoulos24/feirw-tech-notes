from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import pymongo
import os
import uuid
from datetime import datetime, timedelta
import json

# Database setup
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'test_database')

try:
    client = pymongo.MongoClient(MONGO_URL)
    db = client[DB_NAME]
    # Test the connection
    client.admin.command('ping')
    print(f"Connected to MongoDB at {MONGO_URL}")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    db = None

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Note(BaseModel):
    id: str
    title: str
    preview: str
    subject: str
    price: float
    download_count: int = 0

class QuizQuestion(BaseModel):
    id: str
    question: str
    options: List[str]
    correct_answer: int
    points: int
    subject: str

class QuizSubmission(BaseModel):
    nickname: str
    question_id: str
    selected_answer: int

class LeaderboardEntry(BaseModel):
    nickname: str
    total_points: int
    month: str

# Sample data initialization
def init_sample_data():
    if db is None:
        return
    
    # Sample notes
    sample_notes = [
        {
            "id": str(uuid.uuid4()),
            "title": "Αλγόριθμοι Αναζήτησης",
            "preview": "Γραμμική και δυαδική αναζήτηση, ανάλυση πολυπλοκότητας. Πλήρη θεωρία με παραδείγματα κώδικα Python για τις πανελλαδικές...",
            "subject": "Αλγόριθμοι",
            "price": 10.0,
            "download_count": 0
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Δομές Δεδομένων - Πίνακες & Λίστες",
            "preview": "Ολοκληρωμένη ανάλυση πινάκων, λιστών, στοιβών και ουρών. Υλοποίηση σε Python με ασκήσεις πανελληνίων...",
            "subject": "Δομές Δεδομένων",
            "price": 10.0,
            "download_count": 0
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Βάσεις Δεδομένων & SQL",
            "preview": "Σχεσιακό μοντέλο, κανονικοποίηση, ερωτήματα SQL. Όλη η θεωρία που χρειάζεστε για τις εξετάσεις ΑΕΠΠ...",
            "subject": "Βάσεις Δεδομένων",
            "price": 10.0,
            "download_count": 0
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Δίκτυα & Διαδίκτυο",
            "preview": "Πρωτόκολλα TCP/IP, OSI μοντέλο, δρομολόγηση. Αναλυτική παρουσίαση της δικτυακής θεωρίας για ΑΕΠΠ...",
            "subject": "Δίκτυα",
            "price": 10.0,
            "download_count": 0
        }
    ]
    
    # Sample quiz questions
    sample_questions = [
        {
            "id": str(uuid.uuid4()),
            "question": "Ποια είναι η χειρότερη περίπτωση πολυπλοκότητας του αλγορίθμου γραμμικής αναζήτησης;",
            "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            "correct_answer": 2,
            "points": 10,
            "subject": "Αλγόριθμοι"
        },
        {
            "id": str(uuid.uuid4()),
            "question": "Σε ποια δομή δεδομένων εφαρμόζεται η αρχή LIFO (Last In, First Out);",
            "options": ["Ουρά (Queue)", "Στοίβα (Stack)", "Λίστα (List)", "Πίνακας (Array)"],
            "correct_answer": 1,
            "points": 15,
            "subject": "Δομές Δεδομένων"
        },
        {
            "id": str(uuid.uuid4()),
            "question": "Ποιο από τα παρακάτω είναι SQL εντολή για εισαγωγή δεδομένων;",
            "options": ["SELECT", "INSERT", "UPDATE", "DELETE"],
            "correct_answer": 1,
            "points": 12,
            "subject": "Βάσεις Δεδομένων"
        },
        {
            "id": str(uuid.uuid4()),
            "question": "Ποιο επίπεδο του OSI μοντέλου είναι υπεύθυνο για τη δρομολόγηση;",
            "options": ["Φυσικό (Physical)", "Δικτύου (Network)", "Μεταφοράς (Transport)", "Εφαρμογής (Application)"],
            "correct_answer": 1,
            "points": 14,
            "subject": "Δίκτυα"
        },
        {
            "id": str(uuid.uuid4()),
            "question": "Ποια είναι η πολυπλοκότητα του αλγορίθμου δυαδικής αναζήτησης;",
            "options": ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            "correct_answer": 1,
            "points": 13,
            "subject": "Αλγόριθμοι"
        }
    ]
    
    # Insert sample data if collections are empty
    if db.notes.count_documents({}) == 0:
        db.notes.insert_many(sample_notes)
        print("Sample notes inserted")
    
    if db.quiz_questions.count_documents({}) == 0:
        db.quiz_questions.insert_many(sample_questions)
        print("Sample quiz questions inserted")

# Initialize sample data on startup
@app.on_event("startup")
async def startup_event():
    init_sample_data()

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "TechNotesGR API is running"}

@app.get("/api/notes")
async def get_notes():
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    notes = list(db.notes.find({}, {"_id": 0}))
    return {"notes": notes}

@app.get("/api/notes/{note_id}")
async def get_note(note_id: str):
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    note = db.notes.find_one({"id": note_id}, {"_id": 0})
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return note

@app.get("/api/quiz/questions")
async def get_quiz_questions():
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    questions = list(db.quiz_questions.find({}, {"_id": 0}))
    return {"questions": questions}

@app.post("/api/quiz/submit")
async def submit_quiz_answer(submission: QuizSubmission):
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    # Get the question
    question = db.quiz_questions.find_one({"id": submission.question_id}, {"_id": 0})
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Check if answer is correct
    is_correct = submission.selected_answer == question["correct_answer"]
    points_earned = question["points"] if is_correct else 0
    
    # Update leaderboard
    current_month = datetime.now().strftime("%Y-%m")
    leaderboard_entry = db.leaderboard.find_one({
        "nickname": submission.nickname,
        "month": current_month
    })
    
    if leaderboard_entry:
        db.leaderboard.update_one(
            {"nickname": submission.nickname, "month": current_month},
            {"$inc": {"total_points": points_earned}}
        )
    else:
        db.leaderboard.insert_one({
            "nickname": submission.nickname,
            "total_points": points_earned,
            "month": current_month
        })
    
    return {
        "correct": is_correct,
        "points_earned": points_earned,
        "correct_answer": question["options"][question["correct_answer"]]
    }

@app.get("/api/leaderboard")
async def get_leaderboard():
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    current_month = datetime.now().strftime("%Y-%m")
    leaderboard = list(db.leaderboard.find(
        {"month": current_month},
        {"_id": 0}
    ).sort("total_points", -1).limit(10))
    
    return {"leaderboard": leaderboard, "month": current_month}

@app.post("/api/contact")
async def contact_form(contact_data: dict):
    # For MVP, just return success
    # In production, this would send an email
    return {"message": "Η φόρμα επικοινωνίας στάλθηκε επιτυχώς!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)