from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schema.FormSchema import FormularioCreate
from app.controller import FormController
from app.security import obter_usuario_atual

router = APIRouter(prefix="/formularios", tags=["Formulários"])

@router.post("/gerar-plano", status_code=status.HTTP_201_CREATED)
def gerar_plano_direto(
    formulario: FormularioCreate, 
    usuario_id: int = Depends(obter_usuario_atual),
    db: Session = Depends(get_db)
):
    return FormController.submeter_formulario(formulario=formulario, usuario_id=usuario_id, db=db)