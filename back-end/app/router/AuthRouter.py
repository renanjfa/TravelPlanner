from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schema import UserSchema
from app.controller.AuthController import AuthController

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/login", response_model=UserSchema.Token)
def login(usuario_credenciais: UserSchema.UsuarioLogin, db: Session = Depends(get_db)):
    return AuthController.login(usuario_credenciais, db);

@router.post("/cadastro", response_model=UserSchema.UsuarioResponse, status_code=status.HTTP_201_CREATED)
def registar_usuario(usuario: UserSchema.UsuarioCreate, db: Session = Depends(get_db)):
    return AuthController.registrar(usuario, db);
