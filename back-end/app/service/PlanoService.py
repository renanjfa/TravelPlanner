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
        # 1. Separar e salvar o Formulário primeiro (precisamos do ID dele)
        formulario_id = FormRepository.salvar_formulario(db, request)
        
        # 2. Chamar a IA do seu serviço isolado (Gemini)
        texto_roteiro_ia = IAService.gerar_roteiro_viagem(request)
        
        # 3. Salvar o Plano de Viagem
        plano_viagem = PlanoRepository.salvar_plano(
            db=db, 
            request=request, 
            usuario_id=usuario_id, 
            formulario_id=formulario_id, 
            texto_ia=texto_roteiro_ia
        )
        
        # 4. Salvar o Destino (Como não há DestinoRepository na imagem, usamos o PlanoRepository)
        PlanoRepository.salvar_destino(
            db=db, 
            plano_viagem_id=plano_viagem.id, 
            pais=request.pais, 
            cidade=request.cidade
        )
        
        return plano_viagem