import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const TripCard = ({ viagem }) => {
    return (
        <TouchableOpacity style={styles.card}>
            <Image 
                source={{ uri: viagem.imagem_url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=300&auto=format&fit=crop' }} 
                style={styles.image} 
            />
            
            <View style={styles.cardContent}>
                
                <Text style={styles.title} numberOfLines={1}>
                    {viagem.nome_viagem || "Viagem sem nome"}
                </Text>

                <Text style={[styles.status, viagem.concluido ? styles.statusConcluido : styles.statusPendente]}>
                    {viagem.concluido ? "✓ Concluída" : "⏳ Pendente"}
                </Text>

                <Text style={styles.description} numberOfLines={2}>
                    {viagem.descricao || "Sem descrição informada."}
                </Text>

            </View>

        </TouchableOpacity>
    );
};

export default TripCard;

const styles = StyleSheet.create({
    card: {
        width: 160,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        
        // Sombras
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 100,
        backgroundColor: '#E0E0E0',
    },
    cardContent: {
        padding: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 2,
    },
    status: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    statusConcluido: {
        color: '#28a745', 
    },
    statusPendente: {
        color: '#d69e2e',
    },
    description: {
        fontSize: 12,
        color: '#666666',
        lineHeight: 16,
    }
});