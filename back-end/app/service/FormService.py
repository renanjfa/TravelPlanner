from sqlalchemy.orm import Session
from app.schema.FormSchema import FormularioCreate
from app.repository import FormRepository, PlanoRepository
from app.service import IAService

def criar_formulario_e_gerar_plano(db: Session, formulario: FormularioCreate, usuario_id: int):
    novo_formulario = FormRepository.criar_formulario(db=db, formulario=formulario)

    texto_roteiro = IAService.gerar_roteiro_viagem(novo_formulario)

    novo_plano = PlanoRepository.criar_plano_viagem(
        db=db,
        usuario_id=usuario_id,
        formulario_id=novo_formulario.id,
        texto_roteiro=texto_roteiro
    )

    return novo_plano
    