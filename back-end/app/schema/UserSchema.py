from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class UsuarioLogin(BaseModel):
    email: EmailStr
    senha: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UsuarioCreate(BaseModel):
    nome: str
    sobrenome: str
    email: EmailStr
    senha: str
    data_nascimento: Optional[date] = None
    idade: Optional[int] = None
    nacionalidade: Optional[str] = None
    telefone: Optional[str] = None

class UsuarioResponse(BaseModel):
    id: int
    nome: str
    sobrenome: str
    email: EmailStr

    class Config:
        from_attributes = True