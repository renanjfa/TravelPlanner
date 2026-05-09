# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import AuthRouter, FormRouter, PlanoRouter

app = FastAPI(
    title="Travel Planner API",
    description="API para criação e gerenciamento de planos de viagem.",
    version="1.0.0"
)

app.include_router(AuthRouter.router)
app.include_router(FormRouter.router)
app.include_router(PlanoRouter.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # AQUI VAI A URL DO FRONT
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Bem-vindo à API do Travel Planner!"}