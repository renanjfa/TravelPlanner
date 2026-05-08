from sqlalchemy.orm import Session
from app.schema.UserSchema import UsuarioCreate
from app.repository.UserRepository import UserRepository
from app.security import obter_hash_senha, verificar_senha

class AuthService:
    @staticmethod
    def registar_novo_usuario(usuario_data: UsuarioCreate, db: Session):
        usuario_existente = UserRepository.buscar_por_email(db, usuario_data.email)
        if usuario_existente:
            raise ValueError("Email já registrado!")
            
        senha_hash = obter_hash_senha(usuario_data.senha)

        return UserRepository.salvar_usuario(db, usuario_data, senha_hash)
    
    @staticmethod
    def autenticar_usuario(db: Session, email: str, senha_plana: str):
        usuario = UserRepository.buscar_por_email(db, email)

        if not usuario:
            return False

        if not verificar_senha(senha_plana, usuario.senha):
            return False

        return usuario