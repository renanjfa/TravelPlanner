from sqlalchemy.orm import Session
from app.models.models import PlanoViagem

def criar_plano_viagem(db: Session, usuario_id: int, formulario_id: int, texto_roteiro: str):
    novo_plano = PlanoViagem(
        usuario_id=usuario_id,
        formulario_id=formulario_id,
        nome_viagem="Roteiro Gerado por IA",
        plano_detalhado=texto_roteiro,
        concluido=True
    )
    db.add(novo_plano)
    db.commit()
    db.refresh(novo_plano)
    return novo_plano

@staticmethod
def listar_por_usuario(db: Session, usuario_id: int):
    return db.query(PlanoViagem).filter(PlanoViagem.usuario_id == usuario_id).all()