from sqlalchemy.orm import Session
from app.models.models import PlanoViagem, Destino
from app.schema.PlanoSchema import CriarViagemRequest


def salvar_plano(
    db: Session, 
    request: CriarViagemRequest, 
    usuario_id: int, 
    formulario_id: int, 
    texto_ia: str
):
    
    print("--- DADOS QUE CHEGARAM DO FRONT ---")
    print(f"Descrição que chegou: {request.descricao_viagem}")
    print("-----------------------------------")

    novo_plano = PlanoViagem(
        usuario_id=usuario_id,
        formulario_id=formulario_id,
        nome_viagem=request.nome_viagem,
        data_inicio=request.data_inicio,
        data_fim=request.data_fim,
        descricao=request.descricao_viagem,
        plano_detalhado=texto_ia,
        concluido=False,
        imagem_url=request.imagem_url
    )
    
    db.add(novo_plano)
    db.commit()
    db.refresh(novo_plano)
    
    return novo_plano


def salvar_destino(db: Session, plano_viagem_id: int, pais: str, cidade: str):
    novo_destino = Destino(
        plano_viagem_id=plano_viagem_id,
        pais=pais,
        cidade=cidade
    )
    
    db.add(novo_destino)
    db.commit()
    db.refresh(novo_destino)
    
    return novo_destino

@staticmethod
def listar_por_usuario(db: Session, usuario_id: int):
    return db.query(PlanoViagem).filter(PlanoViagem.usuario_id == usuario_id).all()

@staticmethod
def buscar_por_id(db: Session, plano_id: int):
        return db.query(PlanoViagem).filter(PlanoViagem.id == plano_id).first()

@staticmethod
def deletar(db: Session, plano: PlanoViagem):
        db.delete(plano)
        db.commit()

def atualizar_status(db: Session, plano: PlanoViagem, status_concluido: bool):
        plano.concluido = status_concluido
        db.commit()
        db.refresh(plano)
        return plano