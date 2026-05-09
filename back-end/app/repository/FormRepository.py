from sqlalchemy.orm import Session
from app.models.models import Formulario
from app.schema.FormSchema import FormularioCreate

def criar_formulario(db: Session, formulario: FormularioCreate):
    novo_formulario = Formulario(
        qtd_adultos=formulario.qtd_adultos,
        qtd_criancas=formulario.qtd_criancas,
        descricao=formulario.descricao,
        orcamento=formulario.orcamento,
        interesse=formulario.interesse,
        ritmo_viagem=formulario.ritmo_viagem,
        prioridade=formulario.prioridade,
        tipo_hospedagem=formulario.tipo_hospedagem,
        periodo_dia=formulario.periodo_dia
    )
    db.add(novo_formulario)
    db.commit()
    db.refresh(novo_formulario)
    return novo_formulario

