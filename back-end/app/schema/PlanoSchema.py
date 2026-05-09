from pydantic import BaseModel
from datetime import date
from typing import Optional

class PlanoViagemResponse(BaseModel):
    id: int
    nome_viagem: str
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None
    descricao: Optional[str] = None
    plano_detalhado: str
    concluido: bool

    class Config:
        from_attributes = True