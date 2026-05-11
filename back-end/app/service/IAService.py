import os
import google.generativeai as genai
from dotenv import load_dotenv
from app.schema.PlanoSchema import CriarViagemRequest

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def gerar_roteiro_viagem(request: CriarViagemRequest):
    model = genai.GenerativeModel('gemini-2.5-flash')

    data_inicio_formatada = request.data_inicio.strftime('%d/%m/%Y')
    data_fim_formatada = request.data_fim.strftime('%d/%m/%Y')

    prompt = f"""
    Você é um agente de viagens experiente e especialista em montar roteiros personalizados. 
    Crie um roteiro de viagem detalhado para a viagem chamada "{request.nome_viagem}", com base nas seguintes informações:
    
    **DESTINO E DATAS:**
    - País: {request.pais}
    - Cidade: {request.cidade}
    - Data de Início: {data_inicio_formatada}
    - Data de Fim: {data_fim_formatada}
    
    **PERFIL DOS VIAJANTES:**
    - Adultos: {request.qtd_adultos}
    - Crianças: {request.qtd_criancas}
    - Orçamento Estimado: R$ {request.orcamento}
    
    **PREFERÊNCIAS DA VIAGEM:**
    - Principal Interesse: {request.interesse}
    - Ritmo da Viagem: {request.ritmo_viagem}
    - Prioridade: {request.prioridade}
    - Tipo de Hospedagem: {request.tipo_hospedagem}
    - Período do Dia preferido para atividades: {request.periodo_dia}
    - Informações Adicionais: {request.descricao_viagem if request.descricao_viagem else "Nenhuma"}
    
    **INSTRUÇÕES DE FORMATAÇÃO E REGRAS:**
    1. Monte um plano de viagem focado especificamente na cidade de {request.cidade} ({request.pais}).
    2. Estruture a resposta utilizando formatação Markdown (ex: ## Dia 1, ### Manhã, etc.).
    3. Separe as atividades dia a dia, cobrindo exatamente o período entre a Data de Início e a Data de Fim.
    4. Leve estritamente em consideração o orçamento disponível e a presença de crianças (se houver) para sugerir os passeios.
    """

    resposta = model.generate_content(prompt)

    return resposta.text