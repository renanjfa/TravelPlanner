from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.schema.UserSchema import UsuarioCreate
from app.service.AuthService import AuthService
from app.schema import UserSchema
from app.security import criar_token_acesso
from app.repository.UserRepository import UserRepository

class AuthController:
    @staticmethod
    def registrar(usuario_data: UsuarioCreate, db: Session):
        try:
            novo_usuario = AuthService.registar_novo_usuario(usuario_data, db)
            return novo_usuario
            
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )
        
    def login(usuario_credenciais: UserSchema.UsuarioLogin, db: Session):

        usuario_db = UserRepository.buscar_por_email(db, usuario_credenciais.email)

        usuario = AuthService.autenticar_usuario(
            db,
            email=usuario_credenciais.email, 
            senha_plana=usuario_credenciais.senha
        )

        if not usuario:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email ou senha incorretos",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        token_acesso = criar_token_acesso(data={"sub": str(usuario_db.id)})
        
        return {"access_token": token_acesso, "token_type": "bearer"}