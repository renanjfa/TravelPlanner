from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.service.PlanoService import PlanoService
from app.schema.PlanoSchema import CriarViagemRequest

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
        

    def processar_nova_viagem(request: CriarViagemRequest, usuario_id: int, db: Session):
        try:
            viagem_gerada = PlanoService.criar_viagem(db, request, usuario_id)
            return {
                "status": "sucesso",
                "mensagem": "Plano criado com sucesso"
            }
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao processar a viagem: {str(e)}"
            )