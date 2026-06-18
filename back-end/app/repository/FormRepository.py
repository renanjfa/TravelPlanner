from sqlalchemy.orm import Session
from app.models.models import Formulario 
from app.schema.PlanoSchema import CriarViagemRequest

def salvar_formulario(db: Session, request: CriarViagemRequest) -> int:
    novo_formulario = Formulario(
        orcamento=request.orcamento,
        qtd_adultos=request.qtd_adultos,
        qtd_criancas=request.qtd_criancas,
        descricao=request.descricao_viagem,
        pais=request.pais,
        cidade=request.cidade,
        interesse=request.interesse,
        ritmo_viagem=request.ritmo_viagem,
        prioridade=request.prioridade,
        tipo_hospedagem=request.tipo_hospedagem,
        periodo_dia=request.periodo_dia
    )
    
    db.add(novo_formulario)
    db.commit()
    db.refresh(novo_formulario)

    return novo_formulario.id