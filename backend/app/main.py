from fastapi import FastAPI

app = FastAPI(title="Sada Al-Tamr API")

@app.get("/")
def root():
    return {"message": "Sada Al-Tamr backend is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
