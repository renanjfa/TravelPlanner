from pydantic import BaseModel
from datetime import date
from typing import Optional

class PlanoViagemResponse(BaseModel):
    id: int
    nome_viagem: str
    descricao: Optional[str] = None
    imagem_url: Optional[str] = None

    class Config:
        from_attributes = True

class PlanoViagemDetalhadoResponse(BaseModel):
    id: int
    nome_viagem: str
    data_inicio: Optional[date]
    data_fim: Optional[date]
    descricao: Optional[str]
    plano_detalhado: str # O roteiro completo
    imagem_url: Optional[str]
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
    imagem_url: Optional[str] = None