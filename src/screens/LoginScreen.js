import React from 'react';
import { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Input from '../components/InputLogin'
import HeaderLogin from '../components/HeaderLogin'

export default class LoginScreen extends Component{

    state = {
        inputEmail: '',
        inputSenha: ''
    }

    inputChangeEmail = (email) => {
        this.setState({ inputEmail: email });
    }

    inputChangeSenha = (senha) => {
        this.setState({ inputSenha: senha });
    }

    fazerLogin = () => {
        const { inputEmail, inputSenha } = this.state; 

        if (!inputEmail || ! inputSenha) {
            alert('Por favor, preencha o email e a senha.');
            return;
        }

        // Verificação de email e senha
    }

    fazerCadastro = () => {
        this.props.navigation.navigate('Cadastro');
    }
  

    render () {
        const { inputEmail, inputSenha } = this.state;

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
                        <View style={styles.emailCard}>
                            <View style={styles.email}>
                                <Text style={styles.emailText}>Email:</Text>
                            </View>
                            <View style={styles.inputEmail}>
                                <Input 
                                    inputEmail={inputEmail} 
                                    inputChangeEmail={ this.inputChangeEmail }
                                />
                            </View>
                        </View>
                        <View style={styles.senhaCard}>
                            <View style={styles.senha}>
                                <Text style={styles.senhaText}>Senha:</Text>
                            </View>
                            <View style={styles.inputSenha}>
                                <Input 
                                    inputSenha={inputSenha} 
                                    inputChangeSenha={ this.inputChangeSenha }
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>
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

    emailCard: {
        width: '100%',
        marginBottom: 20,
    },

    email: {
        marginBottom: 5,
        marginLeft: 20,
    },

    emailText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },

    inputEmail: {
        width: '100%',
    },

    senhaCard: {
        width: '100%',
    },
     
    senha: {
        marginBottom: 5,
        marginLeft: 20,
    },

    senhaText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },

    inputSenha: {
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
    }
});