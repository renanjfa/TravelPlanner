from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.service.PlanoService import PlanoService
from app.schema.PlanoSchema import CriarViagemRequest
from datetime import date

class PlanoController:
    @staticmethod
    def buscar_minhas_viagens(db: Session, usuario_id: int):
        try:
            viagens = PlanoService.obter_minhas_viagens(db, usuario_id)

            if viagens:
                for viagem in viagens:
                    status_verificado = viagem.data_fim < date.today()
                    
                    PlanoService.atualizar_status(
                        db=db, 
                        plano_id=viagem.id,
                        usuario_id=usuario_id, 
                        status_concluido=status_verificado
                    )

            viagens_atualizadas = PlanoService.obter_minhas_viagens(db, usuario_id)

            return viagens_atualizadas

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar viagens: {str(e)}"
            )
        
    @staticmethod
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
    
    @staticmethod
    def obter_detalhes(db: Session, plano_id: int, usuario_id: int):
        plano, erro = PlanoService.obter_detalhes(db, plano_id, usuario_id)
      
        if erro == "nao_encontrado":
            raise HTTPException(status_code=404, detail="Plano de viagem não encontrado")
        
        if erro == "acesso_negado":
            raise HTTPException(status_code=403, detail="Você não tem permissão para ver esta viagem")
            
        return plano
    
    @staticmethod
    def excluir_viagem(db: Session, plano_id: int, usuario_id: int):
        sucesso, erro = PlanoService.deletar_plano(db, plano_id, usuario_id)
        
        if erro == "nao_encontrado":
            raise HTTPException(status_code=404, detail="Plano de viagem não encontrado")
        
        if erro == "acesso_negado":
            raise HTTPException(status_code=403, detail="Você não tem permissão para excluir esta viagem")
            
        return {"mensagem": "Viagem excluída com sucesso"}
    
    @staticmethod
    def alterar_status_viagem(db: Session, plano_id: int, usuario_id: int, status_concluido: bool):
        plano, erro = PlanoService.atualizar_status(db, plano_id, usuario_id, status_concluido)
        
        if erro == "nao_encontrado":
            raise HTTPException(status_code=404, detail="Plano de viagem não encontrado")
        
        if erro == "acesso_negado":
            raise HTTPException(status_code=403, detail="Você não tem permissão para alterar esta viagem")
        return plano