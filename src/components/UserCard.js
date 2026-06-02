import { Component } from "react";
import { Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

class UserCard extends Component {

    state = {
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        mensagemErro: ''
    }

    componentDidMount() {
        this.buscarDadosDoUsuario();
    }

    buscarDadosDoUsuario = async () => {
        try {
            const token = await AsyncStorage.getItem('@meu_app_token');

            if (!token) {
                this.setState({ loading: false, mensagemErro: 'Sessão não encontrada.' });
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
                this.setState({ loading: false, mensagemErro: 'Não foi possível carregar o perfil.' });
            }

        } catch (erro) {
            console.error("Erro no GET do perfil:", erro);
            this.setState({ loading: false, mensagemErro: 'Não foi possível conectar ao servidor.' });
        }
    }

    render() {
        const { nome, mensagemErro } = this.state;
        
        return(
            <View style={styles.profileCard}>

                <Image
                source={'https://img.magnific.com/vetores-premium/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3383.jpg?semt=ais_hybrid&w=740&q=80'}
                style={styles.avatar}
                />

                <View>
                    <Text>{this.state.nome}</Text>
                    <Text style={styles.travelPlannerUserText}>Travel Planner User</Text>
                    {mensagemErro !== '' && (
                        <Text style={styles.errorText}>{mensagemErro}</Text>
                    )}
                </View>

            </View>
        );
    }

}
export default UserCard;

const styles = StyleSheet.create({

    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',

        padding: 15,

        borderWidth: 1,
        borderColor: '#EAEAEA',

        borderRadius: 90,

        marginBottom: 40,
    },

    avatar: {
        width: 55,
        height: 55,

        borderRadius: 999,

        marginRight: 12,
    },

    travelPlannerUserText: {
        fontSize: 10,
        color: '#ae9898',
    },

    errorText: {
        color: '#D32F2F',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    }
});