from sqlalchemy.orm import Session
from app.schema.PlanoSchema import CriarViagemRequest
from app.repository import FormRepository, PlanoRepository
from app.service import IAService

class PlanoService:
    @staticmethod
    def obter_minhas_viagens(db: Session, usuario_id: int):
        return PlanoRepository.listar_por_usuario(db, usuario_id)

    @staticmethod
    def criar_viagem(db: Session, request: CriarViagemRequest, usuario_id: int):
        formulario_id = FormRepository.salvar_formulario(db, request)
        
        texto_roteiro_ia = IAService.gerar_roteiro_viagem(request)
        
        plano_viagem = PlanoRepository.salvar_plano(
            db=db, 
            request=request, 
            usuario_id=usuario_id, 
            formulario_id=formulario_id, 
            texto_ia=texto_roteiro_ia
        )
        
        PlanoRepository.salvar_destino(
            db=db, 
            plano_viagem_id=plano_viagem.id, 
            pais=request.pais, 
            cidade=request.cidade
        )
        
        return plano_viagem
    
    @staticmethod
    def obter_detalhes_seguros(db: Session, plano_id: int, usuario_id: int):
        plano = PlanoRepository.buscar_por_id(db, plano_id)

        if not plano:
            return None, "nao_encontrado"
  
        if plano.usuario_id != usuario_id:
            return None, "acesso_negado"
            
        return plano, None
    
    @staticmethod
    def deletar_plano_seguro(db: Session, plano_id: int, usuario_id: int):
        plano = PlanoRepository.buscar_por_id(db, plano_id)
    
        if not plano:
            return False, "nao_encontrado"

        if plano.usuario_id != usuario_id:
            return False, "acesso_negado"

        PlanoRepository.deletar(db, plano)
        return True, None
    
    @staticmethod
    def atualizar_status_seguro(db: Session, plano_id: int, usuario_id: int, status_concluido: bool):
        plano = PlanoRepository.buscar_por_id(db, plano_id)
        
        if not plano:
            return None, "nao_encontrado"
        if plano.usuario_id != usuario_id:
            return None, "acesso_negado"

        plano_atualizado = PlanoRepository.atualizar_status(db, plano, status_concluido)
        return plano_atualizado, None