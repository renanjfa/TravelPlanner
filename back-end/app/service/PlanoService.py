from sqlalchemy.orm import Session
from app.repository import PlanoRepository

class PlanoService:
    @staticmethod
    def obter_minhas_viagens(db: Session, usuario_id: int):
        return PlanoRepository.listar_por_usuario(db, usuario_id)