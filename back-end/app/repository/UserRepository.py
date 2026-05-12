from sqlalchemy.orm import Session
from app.models import models

class UserRepository:
    @staticmethod
    def buscar_por_email(db: Session, email: str):
        return db.query(models.User).filter(models.User.email == email).first()

    @staticmethod
    def salvar_usuario(db: Session, usuario_data, senha_encriptada: str):
        novo_usuario = models.User(
            nome=usuario_data.nome,
            sobrenome=usuario_data.sobrenome,
            email=usuario_data.email,
            senha=senha_encriptada,
            data_nascimento=usuario_data.data_nascimento,
            idade=usuario_data.idade,
            nacionalidade=usuario_data.nacionalidade,
            telefone=usuario_data.telefone
        )
        db.add(novo_usuario)
        db.commit()
        db.refresh(novo_usuario)
        return novo_usuario
    
    @staticmethod
    def buscar_por_id(db: Session, usuario_id: int):
        return db.query(models.User).filter(models.User.id == usuario_id).first()
    
    @staticmethod
    def atualizar_usuario(db: Session, usuario_id: int, dados_para_atualizar: dict):
        usuario_db = db.query(models.User).filter(models.User.id == usuario_id)
        
        if usuario_db.first():
            usuario_db.update(dados_para_atualizar)
            db.commit()
            return usuario_db.first()
        return None