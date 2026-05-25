import { StyleSheet, View, Alert, ActivityIndicator, Text } from "react-native";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormsNovaViagem from "../components/FormsNovaViagem";
import FormsQuestionario from "../components/FormsQuestionario";
import Header from "../components/Header";

const FormsScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const [viagemData, setViagemData] = useState({
        nome_viagem: "",
        pais: "",
        cidade: "",
        data_inicio: "",
        data_fim: "",
        orcamento: "", 
        qtd_adultos: "",
        qtd_criancas: "",
        descricao_viagem: "",
        interesse: "",
        ritmo_viagem: "",
        prioridade: "",
        tipo_hospedagem: "",
        periodo_dia: ""
    });

    const handleInputChange = (campo, valor) => {
        setViagemData(prevState => ({
            ...prevState,
            [campo]: valor
        }));
    };

    const handleSubmit = async () => {
        try { 
            const token = await AsyncStorage.getItem('@meu_app_token');

            if (!token) {
                Alert.alert("Erro de Autenticação", "Você precisa estar logado para criar uma viagem.");
                navigation.navigate('Login');
                return;
            }

            if (!viagemData.nome_viagem || !viagemData.data_inicio || !viagemData.data_fim) {
                Alert.alert("Campos Obrigatórios", "Por favor, preencha o nome da viagem e as datas de ida e volta.");
                return;
            }

            setLoading(true);

            const dadosParaEnviar = {
                ...viagemData,
                orcamento: parseInt(viagemData.orcamento) || 0,
                qtd_adultos: parseInt(viagemData.qtd_adultos) || 1, 
                qtd_criancas: parseInt(viagemData.qtd_criancas) || 0,
                data_inicio: viagemData.data_inicio ? viagemData.data_inicio.replace(/\//g, '-') : "",
                data_fim: viagemData.data_fim ? viagemData.data_fim.replace(/\//g, '-') : ""
            };

            const resposta = await fetch('http://localhost:8000/viagens/gerar-plano', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(dadosParaEnviar) 
            });

            if (resposta.status === 401) { 
                setLoading(false);
                Alert.alert("Sessão Expirada", "Sua sessão expirou. Por favor, faça login novamente.");
                return;
            }

            const dados = await resposta.json();
            console.log("Resposta do servidor:", dados);
            setLoading(false);

            if (resposta.ok) {
                navigation.navigate('MyTrips');
            } else {
                Alert.alert("Erro", dados.detail || "Algo deu errado ao processar os dados.");
            }

        } catch (erro) {
            setLoading(false);
            console.error("Erro no fetch:", erro);
            Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
        }
    };

    const navigationAction = () => {
        navigation.goBack();
    };

    return(
        <View style={styles.container}>
            <Header navigation={navigation} navigationAction={navigationAction}/>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#003B8E" />
                    <Text style={styles.loadingText}>Gerando seu roteiro personalizado...</Text>
                </View>
            )}

            <View style={styles.divisao}>
                <FormsNovaViagem 
                    dados={viagemData} 
                    onChange={handleInputChange} 
                />

                <View style={styles.line} />

                <FormsQuestionario 
                    dados={viagemData} 
                    onChange={handleInputChange} 
                    onSubmit={handleSubmit} 
                />
            </View>
        </View>
    );
}

export default FormsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'column',
    },
    divisao: {
        flexDirection: 'row',
        padding: 30,
        paddingLeft: 100,
    },
    line: {
        height: '110%', 
        width: 1, 
        backgroundColor: '#ccc', 
        marginHorizontal: 70 
    },

    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.85)', 
        zIndex: 999, 
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#003B8E'
    }
});