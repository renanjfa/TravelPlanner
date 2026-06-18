import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TripCard from './TripCard';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const MinhasViagens = () => {
    const navigation = useNavigation();

    const [mensagemErro, setMensagemErro] = useState('');
    const [viagens, setViagens] = useState([]);

    useFocusEffect(
        useCallback(() => {
            buscarViagens();
        }, [])
    );

    const buscarViagens = async () => {
        try {
            setMensagemErro('');
            
            const token = await AsyncStorage.getItem('@meu_app_token');
            
            if (!token) {
                setMensagemErro('Você precisa estar logado para ver suas viagens.');
                navigation.navigate('Login');
                return;
            }

            const resposta = await fetch('http://localhost:8000/viagens/minhas-viagens', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (resposta.ok) {
                const dados = await resposta.json();
                setViagens(dados);
            } else {
                setMensagemErro('Não foi possível carregar as viagens.');
            }
        } catch (error) {
            console.error(error);
            setMensagemErro('Verifique se o servidor FastAPI está rodando e a URL está correta.');
        }
    };

    return(
        <View style={styles.mainContent}>
        
            <Text style={styles.title}>Minhas Viagens</Text>
    
            <TouchableOpacity style={styles.newTripButton} onPress={() => navigation.navigate('Forms')}>
                <Text style={styles.newTripText}>+ Nova Viagem</Text>
            </TouchableOpacity>

            <ScrollView>
                <View style={styles.cardsContainer}>
                
                    {
                        viagens.length > 0 ? (
                            viagens.map((viagem) => (
                                <TouchableOpacity 
                                    key={viagem.id} 
                                    onPress={() => {
                                        navigation.navigate('TripScreen', { id: viagem.id });
                                    }}
                                >
                                    <TripCard key={viagem.id} viagem={viagem} />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={{ marginTop: 20 }}>Você ainda não tem planos de viagem criados.</Text>
                        )
                    }
                    {mensagemErro !== '' && (
                        <Text style={styles.errorText}>{mensagemErro}</Text>
                    )}
                </View>
            </ScrollView>

        </View>
    );
};

export default MinhasViagens;

const styles = StyleSheet.create({
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
    newTripButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#003B8E',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 25,
    },
    newTripText: {
        color: '#dfd813',
        fontWeight: 'bold'
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
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