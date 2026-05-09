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

class CriarViagemRequest(BaseModel):
    nome_viagem: str
    data_inicio: date
    data_fim: date

    pais: str
    cidade: str

    orcamento: float
    qtd_adultos: int = 1
    qtd_criancas: int = 0
    descricao_viagem: Optional[str] = None
    interesse: str
    ritmo_viagem: str
    prioridade: str
    tipo_hospedagem: str
    periodo_dia: str