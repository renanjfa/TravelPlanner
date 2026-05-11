from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repository.UserRepository import UserRepository
from app.security import obter_hash_senha

class UsuarioController:
    def atualizar_perfil(db: Session, usuario_id: int, dados_atualizacao: dict):
        if not dados_atualizacao:
            raise HTTPException(status_code=400, detail="Nenhum dado para atualizar")

        if "email" in dados_atualizacao:
            usuario_existente = UserRepository.buscar_por_email(db, dados_atualizacao["email"])
            if usuario_existente and usuario_existente.id != usuario_id:
                raise HTTPException(status_code=400, detail="Este e-mail já está em uso")
            
        if "senha" in dados_atualizacao:
            dados_atualizacao["senha"] = obter_hash_senha(dados_atualizacao["senha"])

        return UserRepository.atualizar_usuario(db, usuario_id, dados_atualizacao)