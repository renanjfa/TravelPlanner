from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.service.PlanoService import PlanoService

class PlanoController:
    @staticmethod
    def buscar_minhas_viagens(db: Session, usuario_id: int):
        try:
            viagens = PlanoService.obter_minhas_viagens(db, usuario_id)
            return viagens
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar viagens: {str(e)}"
            )