import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

//import viagemTeste from "../data/viagemTeste";

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
        viagem: null,
        loading: true,
        mensagemErro: '',
        diaSelecionado: 1
    }

    componentDidMount() {

        // this.setState({
        //     titulo: viagemTeste.nome_viagem,
        //     viagem: viagemTeste,
        //     loading: false
        // });

        const id = this.props.route?.params?.id;
        this.buscarDadosDaViagem(id);
    }
    
    buscarDadosDaViagem = async (id) => {
        this.setState({ mensagemErro: '' })

        try {
            const token = await AsyncStorage.getItem('@meu_app_token');

            if (!token) {
                this.setState({ loading: false, mensagemErro: 'Sessão não encontrada.' });
                return;
            }

            const resposta = await fetch(`http://localhost:8000/viagens/minhas-viagens/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
               }
            });

            const dados = await resposta.json();

             if (resposta.ok) {
                const dadosViagem = JSON.parse(dados.plano_detalhado)

                this.setState({
                    titulo: dadosViagem.nome_viagem,
                    viagem: dadosViagem,
                    loading: false
                });
            } else {
                this.setState({ loading: false, mensagemErro: 'Erro ao carregar roteiro.' });
            }

        } catch (erro) {
            console.error("Erro no GET da viagem:", erro);
            this.setState({ loading: false, mensagemErro: 'Falha na conexão com o servidor.' });
        }

    }

    navigationAction = () => {
        this.props.navigation.goBack();
    }
        
    render() {
        const { titulo, viagem, loading, mensagemErro } = this.state;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center', marginTop: 50 }}>Carregando roteiro...</Text>
                </View>
            );
        }

        const diaAtual = viagem?.dias.find(
            d => d.dia === this.state.diaSelecionado
        );

        const posicao = diaAtual
            ? [
                viagem.dias[0].atividades[0].coordenadas.latitude,
                viagem.dias[0].atividades[0].coordenadas.longitude
            ]
            : [41.9009, 12.4795];

            

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
                        {mensagemErro !== '' && (
                            <Text style={styles.errorText}>{mensagemErro}</Text>
                        )}

                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>

                            {viagem?.dias.map((dia, index) => (
                                <TouchableOpacity key={index} 
                                    style={[
                                        styles.cardDia,
                                        this.state.diaSelecionado === dia.dia && {
                                            borderColor: '#7B68EE',
                                            borderWidth: 3
                                        }
                                    ]} 
                                    onPress={() => this.setState({ diaSelecionado: dia.dia })}>

                                    <Text style={styles.tituloDiaCard}>
                                        Dia {dia.dia} - {dia.data}
                                    </Text>

                                    <Text style={styles.textoViagem}>
                                        {dia.resumo_do_dia}
                                    </Text>

                                    {dia.atividades.map((atividade, idx) => (
                                        <View key={idx} style={{ marginTop: 10 }}>

                                            <Text style={{ fontWeight: 'bold' }}>
                                                {atividade.periodo} - {atividade.titulo}
                                            </Text>

                                            <Text style={styles.textoViagem}>
                                                {atividade.descricao}
                                            </Text>

                                            <Text style={styles.textoViagem}>
                                                📍 {atividade.local}
                                            </Text>

                                            <Text style={styles.textoViagem}>
                                                💰 {atividade.custo_estimado}
                                            </Text>

                                        </View>
                                    ))}

                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.mapaContainer}>
                        <MapContainer
                            center={posicao}
                            zoom={12}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {diaAtual?.atividades.map((atividade, index) => (
                                <Marker
                                    key={index}
                                    position={[
                                        atividade.coordenadas.latitude,
                                        atividade.coordenadas.longitude
                                    ]}
                                >
                                    <Popup>
                                        <strong>{atividade.titulo}</strong>
                                        <br />
                                        {atividade.local}
                                    </Popup>
                                </Marker>
                            ))}

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

    errorText: {
        color: '#D32F2F',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',
    }
});