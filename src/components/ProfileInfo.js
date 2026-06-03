import React, { Component } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

class ProfileInfo extends Component {
    state = {
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        confirmaSenha: '',
        loading: true,
        mensagemErro: '',
        mensagemSucesso: ''
    }

    componentDidMount() {
        this.buscarDadosDoUsuario();
    }

    buscarDadosDoUsuario = async () => {
        try {
            const token = await AsyncStorage.getItem('@meu_app_token');

            if (!token) {
                this.setState({ mensagemErro: "Sessão não encontrada.", loading: false})
                return;
            }

            const resposta = await fetch('http://localhost:8000/usuarios/meu-perfil', {
                method: 'GET',
                headers: {
                    'Authorization': Bearer ${token},
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
                this.setState({ mensagemErro: "Não foi possível carregar o perfil", loading: false });
            }

        } catch (erro) {
            this.setState({ mensagemErro: "Não foi possível conectar ao servidor.", loading: false });
        }
    }

    salvarAlteracoes = async () => {
        const { nome, sobrenome, email, senha, confirmaSenha } = this.state;

        if (senha !== confirmaSenha) {
            this.setState({ mensagemErro: "As senhas não coincidem!", mensagemSucesso: '' });
            return; 
        }

        const dadosParaEnviar = {
            nome,
            sobrenome,
            email
        };

        if (senha.trim() !== '') {
            dadosParaEnviar.senha = senha;
        }

        try {
            const token = await AsyncStorage.getItem('@meu_app_token');

            if (!token) {
                this.setState({ mensagemErro: "Você não está autenticado.", mensagemSucesso: '' });
                return;
            }

            const resposta = await fetch('http://localhost:8000/usuarios/atualizar-perfil', {
                method: 'PUT', 
                headers: {
                    'Authorization': Bearer ${token},
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaEnviar),
            });

            if (resposta.ok) {
                this.setState({ mensagemSucesso: "Seu perfil foi atualizado!", mensagemErro: '' });
                this.setState({ senha: '', confirmaSenha: '' });
            } else {
                const erroApi = await resposta.json();
                this.setState({ mensagemErro: erroApi.mensagem || "Falha ao atualizar perfil.", mensagemSucesso: '' });
            }

        } catch (erro) {
            this.setState({ mensagemErro: "Problema ao tentar comunicar com o servidor.", mensagemSucesso: '' });
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

        const { mensagemErro, mensagemSucesso } = this.state

        return (
            <View style={styles.mainContent}>
                <Text style={styles.title}>Meu Perfil</Text>

                {mensagemErro ? <Text style={styles.erroText}>{mensagemErro}</Text> : null}
                {mensagemSucesso ? <Text style={styles.sucessoText}>{mensagemSucesso}</Text> : null}
            
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.profileTextInputs}>
                        <View style={styles.gapTextInput}>
                            <Text>Nome:</Text>
                            <TextInput 
                                style={styles.input} 
                                value={this.state.nome}
                                onChangeText={(txt) => this.setState({ nome: txt, mensagemErro: '', mensagemSucesso: '' })}
                            />
                        </View>

                        <View style={styles.gapTextInput}>
                            <Text>Sobrenome:</Text>
                            <TextInput 
                                style={styles.input} 
                                value={this.state.sobrenome}
                                onChangeText={(txt) => this.setState({ sobrenome: txt, mensagemErro: '', mensagemSucesso: '' })}
                            />
                        </View>

                        <View style={styles.gapTextInput}>
                            <Text>Email:</Text>
                            <TextInput 
                                style={styles.input} 
                                value={this.state.email}
                                onChangeText={(txt) => this.setState({ email: txt, mensagemErro: '', mensagemSucesso: '' })}
                            />
                        </View>

                        <View style={styles.gapTextInput}>
                            <Text>Senha (Nova):</Text>
                            <TextInput 
                                style={styles.input} 
                                secureTextEntry={true}
                                value={this.state.senha}
                                onChangeText={(txt) => this.setState({ senha: txt, mensagemErro: '', mensagemSucesso: '' })}
                                placeholder="Deixe em branco para manter"
                            />
                        </View>

                        <View style={styles.gapTextInput}>
                            <Text>Confirme Nova Senha (Nova):</Text>
                            <TextInput 
                                style={styles.input} 
                                secureTextEntry={true}
                                value={this.state.confirmaSenha}
                                onChangeText={(txt) => this.setState({ confirmaSenha: txt, mensagemErro: '', mensagemSucesso: '' })}
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
                </ScrollView>
            </View>
        );
    }
}

export default ProfileInfo;

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
        height: 40,
        width: 250,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    submitButton: {
        alignSelf: 'flex-start',
        padding: 10, 
        backgroundColor: '#003B8E',
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 40,
    },
    submitButtonText: {
        color: '#dfd813',
        fontWeight: '500'
    },
    gapTextInput: {
        gap: 5
    },
    erroText: {
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sucessoText: {
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
