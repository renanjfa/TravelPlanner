import { Component } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


class TripScreen extends Component {

    state = {
        titulo: '',
        descricao: 'Carregando os detalhes da sua viagem...', 
        loading: true
    }

    componentDidMount() {
        const { id } = this.props.route.params;
        this.buscarDadosDaViagem(id);
    }
    
    buscarDadosDaViagem = async (id) => {

        try {
            const token = await AsyncStorage.getItem('@meu_app_token');

            if (!token) {
                Alert.alert("Aviso", "Sessão não encontrada.");
                this.setState({ loading: false, descricao: 'Sessão não encontrada.' });
                return;
            }

            const resposta = await fetch(`http://localhost:8000/viagens/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                this.setState({
                    titulo: dados.nome_viagem,
                    descricao: dados.plano_detalhado,
                    loading: false
                });
            } else {
                Alert.alert("Erro", "Não foi possível carregar a viagem.");
                this.setState({ loading: false, descricao: 'Erro ao carregar roteiro.' });
            }

        } catch (erro) {
            console.error("Erro no GET da viagem:", erro);
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
            this.setState({ loading: false, descricao: 'Falha na conexão com o servidor.' });
        }

    }

    navigationAction = () => {
        this.props.navigation.goBack();
    }
        
    render() {
        const { descricao, titulo } = this.state;
        const posicao = [-22.9068, -43.1729]; 

        // separa o roteiro por dias
        const linhas = descricao.split('\n');
        const blocosDias = [];
        let blocoAtual = null;

        linhas.forEach(linha => {
            const linhaLimpa = linha.trim();
            if (!linhaLimpa) return;

            if (linhaLimpa.startsWith('Dia ')) {
                if (blocoAtual) blocosDias.push(blocoAtual);
                blocoAtual = { tituloDia: linhaLimpa, atividades: [] };
            } else if (blocoAtual) {
                blocoAtual.atividades.push(linhaLimpa);
            }
        });

        if (blocoAtual) blocosDias.push(blocoAtual);

        return(
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.logo}>
                        TravelPlanner
                    </Text>
                                
                    <TouchableOpacity style={styles.sairButton} onPress={() => this.navigationAction()}>
                        <Text style={styles.buttonText}>Sair da Viagem</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.headerViagem}>  
                        <Text style={styles.titulo}>
                            {titulo}
                        </Text>
                </View>

                <View style={styles.containerRoteiro}>

                    <View style={styles.caixaTexto}>
                        <Text style={styles.tituloDetalhes}>Roteiro Detalhado:</Text>
                        
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>

                            {blocosDias.map((bloco, index) => (
                                <View key={index} style={styles.cardDia}>
                                    
                                    <Text style={styles.tituloDiaCard}>{bloco.tituloDia}</Text>
                                    
                                    {bloco.atividades.map((atividade, idx) => (
                                        <Text key={idx} style={styles.textoViagem}>
                                            {atividade}
                                        </Text>
                                    ))}

                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.mapaContainer}>
                        <MapContainer 
                            center={posicao} 
                            zoom={13} 
                            scrollWheelZoom={false} 
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={posicao}>
                                <Popup>
                                    Seu destino!
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </View>

                </View>
                
            </View>
        );
    }
}

export default TripScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        flexDirection: 'column'
    },

    header: {
        height: 60,
        backgroundColor: '#D79A5B',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
    },

    logo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },

    sairButton: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 12,
    },
    
    headerViagem: {
        height: 60,
        backgroundColor: '#7B68EE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
    },

    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    containerRoteiro: {
        flex: 1,
        flexDirection: 'row',
    },
    
    caixaTexto: {
        backgroundColor: '#FFFFFF',
        padding: 30,    
        flex: 1,
        width: '50%',
        height: '100%'
    },
    
    tituloDetalhes: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 5,
    },

    cardDia: {
        backgroundColor: '#F4F4F9', 
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },

    tituloDiaCard: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7B68EE', 
        marginBottom: 12,
    },
    
    textoViagem: {
        fontSize: 15,
        color: '#4A4A4A',
        lineHeight: 24,
        marginBottom: 8, 
    },

    mapaContainer: {
        width: '50%',
        height: '100%', 
    },
});