# app/services/ai_service.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega as variáveis do .env
load_dotenv()

# Configura a biblioteca do Google com a sua chave
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def gerar_roteiro_viagem(formulario):
    """
    Recebe um objeto Formulario e pede para o Gemini gerar o plano de viagem.
    """
    # Escolhemos o modelo 'flash' pois ele é extremamente rápido e barato/gratuito
    # Se o 1.5 falhar, use este fallback seguro:
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    # Montamos o "Prompt" (A instrução que a IA vai ler)
    # Utilizamos os campos exatos que você definiu na modelagem do banco de dados
    prompt = f"""
    Você é um agente de viagens experiente. Crie um roteiro de viagem detalhado com base nas seguintes preferências do cliente:
    
    - Adultos: {formulario.qtd_adultos}
    - Crianças: {formulario.qtd_criancas}
    - Orçamento: R$ {formulario.orcamento}
    - Principal Interesse: {formulario.interesse}
    - Ritmo da Viagem: {formulario.ritmo_viagem}
    - Prioridade: {formulario.prioridade}
    - Tipo de Hospedagem: {formulario.tipo_hospedagem}
    - Período do Dia preferido para atividades: {formulario.periodo_dia}
    - Informações adicionais (Descrição): {formulario.descricao}
    
    Por favor, monte um plano de viagem criativo, sugerindo cidades (destinos), e separando as atividades dia a dia.
    """
    
    # Chamamos a IA para gerar o conteúdo
    resposta = model.generate_content(prompt)
    
    # Retornamos apenas o texto gerado pela IA
    return resposta.text