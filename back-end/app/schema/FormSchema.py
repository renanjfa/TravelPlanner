from pydantic import BaseModel
from typing import Optional

class FormularioCreate(BaseModel):
    qtd_adultos: int = 1
    qtd_criancas: int = 0
    descricao: Optional[str] = None
    orcamento: Optional[float] = None
    interesse: Optional[str] = None
    ritmo_viagem: Optional[str] = None
    prioridade: Optional[str] = None
    tipo_hospedagem: Optional[str] = None
    periodo_dia: Optional[str] = None

class FormularioResponse(FormularioCreate):
    id: int

    class Config:
        from_attributes = True