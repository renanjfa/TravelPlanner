from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.security import  obter_usuario_atual
from app.repository.UserRepository import UserRepository
from app.schema.UserSchema import UsuarioResponse, UsuarioUpdate
from app.controller.UserController import UsuarioController

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

@router.put("/atualizar-perfil", response_model=UsuarioResponse)
def atualizar_meu_perfil(
    dados: UsuarioUpdate,
    usuario_id: int = Depends(obter_usuario_atual),
    db: Session = Depends(get_db)
):
    update_data = dados.model_dump(exclude_unset=True)

    usuario_atualizado = UsuarioController.atualizar_perfil(db, usuario_id, update_data)
    
    return usuario_atualizado