from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schema.FormSchema import FormularioCreate
from app.service import FormService

def submeter_formulario(formulario: FormularioCreate, usuario_id: int, db: Session):
    try:
        plano_gerado = FormService.criar_formulario_e_gerar_plano(
            db=db, 
            formulario=formulario,
            usuario_id=usuario_id
        )
        return plano_gerado
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Erro ao gerar a viagem: {str(e)}"
        )