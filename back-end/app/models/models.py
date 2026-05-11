from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Text, Numeric
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    sobrenome = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    senha = Column(String(255), nullable=False)
    data_nascimento = Column(Date)
    idade = Column(Integer)
    nacionalidade = Column(String(50))
    telefone = Column(String(20))

    planos = relationship("PlanoViagem", back_populates="usuario", cascade="all, delete-orphan")

class Formulario(Base):
    __tablename__ = "formularios"

    id = Column(Integer, primary_key=True, index=True)
    qtd_adultos = Column(Integer, default=1)
    qtd_criancas = Column(Integer, default=0)
    descricao = Column(Text)
    orcamento = Column(Numeric(10, 2))
    interesse = Column(String(100))
    ritmo_viagem = Column(String(50))
    prioridade = Column(String(50))
    tipo_hospedagem = Column(String(50))
    periodo_dia = Column(String(50))

    plano = relationship("PlanoViagem", back_populates="formulario", uselist=False, cascade="all, delete-orphan")

class PlanoViagem(Base):
    __tablename__ = "planos_viagem"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False)
    formulario_id = Column(Integer, ForeignKey("formularios.id", ondelete="CASCADE"), unique=True, nullable=False)
    nome_viagem = Column(String(150), nullable=False)
    data_inicio = Column(Date)
    data_fim = Column(Date)
    descricao = Column(Text)
    plano_detalhado = Column(Text)
    concluido = Column(Boolean, default=False)
    imagem_url = Column(String(255), nullable=True)

    usuario = relationship("User", back_populates="planos")
    formulario = relationship("Formulario", back_populates="plano")
    destinos = relationship("Destino", back_populates="plano_viagem", cascade="all, delete-orphan")

class Destino(Base):
    __tablename__ = "destinos_plano"

    id = Column(Integer, primary_key=True, index=True)
    plano_viagem_id = Column(Integer, ForeignKey("planos_viagem.id", ondelete="CASCADE"), nullable=False)
    pais = Column(String(100))
    cidade = Column(String(100))

    plano_viagem = relationship("PlanoViagem", back_populates="destinos")