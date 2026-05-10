from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.security import  obter_usuario_atual
from app.repository.UserRepository import UserRepository
from app.schema.UserSchema import UsuarioResponse

router = APIRouter(prefix="/usuarios", tags=["Usuários"])

@router.get("/meu-perfil", response_model=UsuarioResponse)
def buscar_meu_perfil(
    usuario_id: int = Depends(obter_usuario_atual),
    db: Session = Depends(get_db)
):
    usuario = UserRepository.buscar_por_id(db, usuario_id)
    
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
    return usuario