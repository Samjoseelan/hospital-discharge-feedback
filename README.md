# CareVoice — Hospital Inpatient Discharge Feedback

A separated React/FastAPI application for secure discharge feedback, analytics, complaint management, and QR-code distribution.

## Run locally

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Backend (PostgreSQL must be running and `.env` configured):

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open `http://localhost:5173/admin` for the dashboard or `http://localhost:5173/feedback/demo` for the patient form. API documentation is available at `http://localhost:8000/docs`.
