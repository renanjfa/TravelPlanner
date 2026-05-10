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
        
    def obter_detalhes(db: Session, plano_id: int, usuario_id: int):
        # Manda o Service processar as regras
        plano, erro = PlanoService.obter_detalhes_seguros(db, plano_id, usuario_id)
      
        if erro == "nao_encontrado":
            raise HTTPException(status_code=404, detail="Plano de viagem não encontrado")
        
        if erro == "acesso_negado":
            raise HTTPException(status_code=403, detail="Você não tem permissão para ver esta viagem")
            
        return plano