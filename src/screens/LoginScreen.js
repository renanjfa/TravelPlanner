import React from 'react';
import { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Input from '../components/InputLogin'
import HeaderLogin from '../components/HeaderLogin'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component{

    state = {
        inputEmail: '',
        inputSenha: '',
        mensagemErro: ''
    }

    inputChangeEmail = (email) => {
        this.setState({ inputEmail: email, mensagemErro: '' });
    }

    inputChangeSenha = (senha) => {
        this.setState({ inputSenha: senha, mensagemErro: '' });
    }

    fazerLogin = async () => {
        const { inputEmail, inputSenha } = this.state;

        this.setState({ mensagemErro: '' })

        if (!inputEmail || !inputSenha) {
            this.setState({ mensagemErro: 'Por favor, preencha todos os campos.' });
            return; 
        }

        try {
        const resposta = await fetch('http://191.52.73.134:8000/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: inputEmail,
                    senha: inputSenha }),
        });

        if (resposta.status === 401) { 
            this.setState({ mensagemErro: 'E-mail ou senha incorretos.' })
            return;
        }

        const dados = await resposta.json();

        console.log(dados);

        if (resposta.ok) {
            await AsyncStorage.setItem('@meu_app_token', dados.access_token);
            this.props.navigation.navigate('HomeDrawer');
        } else {
            this.setState({ mensagemErro: 'Algo deu errado no servidor.' })
        }

        } catch (erro) {
        console.error(erro);
        this.setState({ mensagemErro: 'Não foi possível conectar ao servidor.' })
        }
    };

    fazerCadastro = () => {
        this.props.navigation.navigate('Cadastro');
    }

    render () {
        const { inputEmail, inputSenha, mensagemErro } = this.state;

        return (
            <View style={styles.container}>
                <Image
                        source={require('../assets/photo_login.png')} 
                        style={styles.background}
                        resizeMode="cover"
                />
                <View style={styles.containerImagem}></View>


                <View style={styles.containerLogin}>
                    <HeaderLogin/>
                    <View style={styles.card}>
                        <View style={styles.titleCard}>
                            <Text style={styles.loginText}>Login</Text>
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
                        {mensagemErro !== '' && (
                            <Text style={styles.errorText}>{mensagemErro}</Text>
                        )}
                        <View style={styles.buttonCard}>
                            <TouchableOpacity onPress={this.fazerLogin} style={styles.loginButton}>
                                <Text style={styles.buttonText}>Fazer Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cadastro}>
                                <Text>Não tem uma conta?</Text>
                                <TouchableOpacity onPress={this.fazerCadastro} style={styles.cadastroButton}>
                                    <Text style={styles.buttonCadastro}>Fazer cadastro.</Text>
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
        padding: 40,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 50,
        alignSelf: 'center'
    },

    titleCard: {
        marginBottom: 30,
    },

    loginText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },

    inputCard: {
        width: '100%',
        marginBottom: 20,
    },

    inputTitle: {
        marginBottom: 5,
        marginLeft: 20,
    },

    inputText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },

    input: {
        width: '100%',
    },

    buttonCard: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },

    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    cadastro: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    
    buttonCadastro: {
        marginLeft: 5,
        fontSize: 13,
        color: '#7B68EE',
        fontWeight: 'bold',
    },

    loginButton: {
        backgroundColor: '#7B68EE',
        width: '90%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    errorText: {
        color: '#D32F2F',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: -5,
        marginBottom: 10,
        textAlign: 'center',
    }
});
