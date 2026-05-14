import React from 'react';
import { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';

import Input from '../components/InputLogin'
import HeaderLogin from '../components/HeaderLogin'

export default class RegisterScreen extends Component{

    state = {
        inputNome: '',
        inputSobrenome: '',
        inputEmail: '',
        inputSenha: '',
        inputConfirmaSenha: ''
    }

    inputChangeNome = (nome) => {
        this.setState({ inputNome: nome });
    }

    inputChangeSobrenome = (sobrenome) => {
        this.setState({ inputSobrenome: sobrenome });
    }

    inputChangeEmail = (email) => {
        this.setState({ inputEmail: email });
    }

    inputChangeSenha = (senha) => {
        this.setState({ inputSenha: senha });
    }

    inputChangeConfirmaSenha = (confirmaSenha) => {
        this.setState({ inputConfirmaSenha: confirmaSenha });
    }
    
    fazerCadastro = async () => {

        const { inputNome, inputSobrenome, inputEmail, inputSenha, inputConfirmaSenha } = this.state; 

        try {
                const resposta = await fetch('http://localhost:8000/auth/cadastro', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nome: inputNome, sobrenome: inputSobrenome, email: inputEmail,
                            senha: inputSenha }),
                });
        
                if (resposta.status === 401) { 
                    Alert.alert("Erro", "Dados preenchidos incorretamente!");
                    return;
                }
        
                const dados = await resposta.json();
        
                if (resposta.ok) {
                    Alert.alert("Sucesso", "Bem-vindo!");
                    this.props.navigation.navigate('Login');
                } else {
                    Alert.alert("Erro", "Algo deu errado no servidor.");
                }
        
                } catch (erro) {
                console.error(erro);
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
                }
        
    }

    fazerLogin = () => {

        this.props.navigation.navigate('Login');
    }

  

    render () {
        const { inputNome, inputSobrenome, inputEmail, inputSenha, inputConfirmaSenha } = this.state;

        return (
            <View style={styles.container}>
                <Image
                        source={require('../assets/photo_register.png')} 
                        style={styles.background}
                        resizeMode="cover"
                />
                <View style={styles.containerImagem}></View>


                <View style={styles.containerLogin}>
                    <HeaderLogin/>
                    <View style={styles.card}>
                        <View style={styles.titleCard}>
                            <Text style={styles.cadastroText}>Cadastro</Text>
                        </View>
                        <View style={styles.inputCard}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputText}>Nome:</Text>
                            </View>
                            <View style={styles.input}>
                                <Input 
                                    inputValue={inputNome} 
                                    inputChange={ this.inputChangeNome }
                                />
                            </View>
                        </View>
                        <View style={styles.inputCard}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputText}>Sobrenome:</Text>
                            </View>
                            <View style={styles.input}>
                                <Input 
                                    inputValue={inputSobrenome} 
                                    inputChange={ this.inputChangeSobrenome }
                                />
                            </View>
                        </View>
                        <View style={styles.inputCard}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputText}>Email:</Text>
                            </View>
                            <View style={styles.input}>
                                <Input 
                                    inputValue={inputEmail} 
                                    inputChange={ this.inputChangeEmail }
                                />
                            </View>
                        </View>
                        <View style={styles.inputCard}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputText}>Senha:</Text>
                            </View>
                            <View style={styles.input}>
                                <Input 
                                    inputValue={inputSenha} 
                                    inputChange={ this.inputChangeSenha }
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>
                        <View style={styles.inputCard}>
                            <View style={styles.inputTitle}>
                                <Text style={styles.inputText}>Confirme a senha:</Text>
                            </View>
                            <View style={styles.input}>
                                <Input 
                                    inputValue={inputConfirmaSenha} 
                                    inputChange={ this.inputChangeConfirmaSenha }
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonCard}>
                            <TouchableOpacity onPress={this.fazerCadastro} style={styles.cadastroButton}>
                                <Text style={styles.cadastroButtonText}>Fazer Cadastro</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.loginCard}>
                                <Text>Já tem uma conta?</Text>
                                <TouchableOpacity onPress={this.fazerLogin} style={styles.loginButton}>
                                    <Text style={styles.loginButtonText}>Fazer login.</Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                </View>
                

            </View>
            
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
    },

    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    containerImagem: {
        width: '60%',
    },

    containerLogin: {
        width: '40%',
        backgroundColor: '#FFF',
        flexDirection: 'column',
    },
    
    card: {
        backgroundColor: '#eeececc0',
        width: '85%',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center'
    },

    titleCard: {
        marginBottom: 10,
    },
    
    cadastroText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000',
    },

    inputCard: { 
        width: '100%',
        marginBottom: 10, 
    },

    inputTitle: {
        marginBottom: 2,
        marginLeft: 20,
    },

    inputText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000',
    },

    input: {
        width: '100%',
    },

    buttonCard: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
    },

    cadastroButton: {
        backgroundColor: '#7B68EE',
        width: '90%',
        height: 45,
        borderRadius: 25, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    cadastroButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    loginCard: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
 
    loginButton: {
        marginLeft: 5, 
    },

    loginButtonText: {
        fontSize: 13,
        color: '#7B68EE',
        fontWeight: 'bold',
    },

});