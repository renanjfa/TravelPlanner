import React, { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

class ProfileInfo extends Component {
    state = {
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        loading: true
    }

    componentDidMount() {
        this.buscarDadosDoUsuario();
    }

    buscarDadosDoUsuario = async () => {
        try {
            const token = await AsyncStorage.getItem('@meu_app_token');

            if (!token) {
                Alert.alert("Aviso", "Sessão não encontrada.");
                this.setState({ loading: false });
                return;
            }

            const resposta = await fetch('http://localhost:8000/usuarios/meu-perfil', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                this.setState({
                    nome: dados.nome,
                    sobrenome: dados.sobrenome,
                    email: dados.email,
                    loading: false
                });
            } else {
                Alert.alert("Erro", "Não foi possível carregar o perfil.");
                this.setState({ loading: false });
            }

        } catch (erro) {
            console.error("Erro no GET do perfil:", erro);
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
            this.setState({ loading: false });
        }
    }

    salvarAlteracoes = async () => {
        const { nome, sobrenome, email, senha } = this.state;

        try {
            const token = await AsyncStorage.getItem('@meu_app_token');

            if (!token) {
                Alert.alert("Erro", "Você não está autenticado.");
                return;
            }

            const resposta = await fetch('http://localhost:8000/usuarios/atualizar-perfil', {
                method: 'PUT', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    sobrenome,
                    email,
                    senha
                }),
            });

            if (resposta.ok) {
                Alert.alert("Sucesso", "Seu perfil foi atualizado!");
                this.setState({ senha: '' });
            } else {
                const erroApi = await resposta.json();
                Alert.alert("Erro", erroApi.mensagem || "Falha ao atualizar perfil.");
            }

        } catch (erro) {
            console.error("Erro no PUT do perfil:", erro);
            Alert.alert("Erro", "Problema ao tentar comunicar com o servidor.");
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#003B8E" />
                </View>
            );
        }

        return (
            <View style={styles.mainContent}>
                <Text style={styles.title}>Meu Perfil</Text>
            
                <View style={styles.profileTextInputs}>
                    <View style={styles.gapTextInput}>
                        <Text>Nome:</Text>
                        <TextInput 
                            style={styles.input} 
                            value={this.state.nome}
                            onChangeText={(txt) => this.setState({ nome: txt })}
                        />
                    </View>

                    <View style={styles.gapTextInput}>
                        <Text>Sobrenome:</Text>
                        <TextInput 
                            style={styles.input} 
                            value={this.state.sobrenome}
                            onChangeText={(txt) => this.setState({ sobrenome: txt })}
                        />
                    </View>

                    <View style={styles.gapTextInput}>
                        <Text>Email:</Text>
                        <TextInput 
                            style={styles.input} 
                            value={this.state.email}
                            onChangeText={(txt) => this.setState({ email: txt })}
                        />
                    </View>

                    <View style={styles.gapTextInput}>
                        <Text>Senha (Nova):</Text>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry={true}
                            value={this.state.senha}
                            onChangeText={(txt) => this.setState({ senha: txt })}
                            placeholder="Deixe em branco para manter"
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.submitButton} 
                        onPress={this.salvarAlteracoes}
                    >
                        <Text style={styles.submitButtonText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// IMPORTANTE: Exportar o componente para o React Navigation achar
export default ProfileInfo;

// IMPORTANTE: Estilos no final
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContent: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 18,
    },
    profileTextInputs: {
        gap: 18
    },
    input: {
        height: 40, // Aumentei um pouco para ficar melhor de clicar
        width: 250,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc', // Fica melhor com uma cor de borda definida
        borderRadius: 5,
    },
    submitButton: {
        alignSelf: 'flex-start',
        padding: 10, 
        backgroundColor: '#003B8E',
        borderRadius: 6,
        marginTop: 10,
    },
    submitButtonText: {
        color: '#dfd813',
        fontWeight: '500'
    },
    gapTextInput: {
        gap: 5
    },
});