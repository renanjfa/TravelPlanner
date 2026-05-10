from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.security import obter_usuario_atual
from app.schema.PlanoSchema import PlanoViagemResponse, CriarViagemRequest, PlanoViagemDetalhadoResponse
from app.controller.PlanoController import PlanoController

router = APIRouter(prefix="/viagens", tags=["Viagens"])

@router.get("/minhas-viagens", response_model=List[PlanoViagemResponse])
def listar_minhas_viagens(
    usuario_id: int = Depends(obter_usuario_atual),
    db: Session = Depends(get_db)
):
    return PlanoController.buscar_minhas_viagens(db, usuario_id)

@router.post("/gerar-plano", status_code=status.HTTP_201_CREATED)
def gerar_viagem_completa(
    request: CriarViagemRequest, 
    usuario_id: int = Depends(obter_usuario_atual),
    db: Session = Depends(get_db)
):
    return PlanoController.processar_nova_viagem(request, usuario_id, db)

@router.get("/minhas-viagens/{plano_id}", response_model=PlanoViagemDetalhadoResponse)
def get_detalhes_viagem(
    plano_id: int,
    usuario_id: int = Depends(obter_usuario_atual),
    db: Session = Depends(get_db)
):
    return PlanoController.obter_detalhes(db, plano_id, usuario_id)