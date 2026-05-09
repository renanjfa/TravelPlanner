import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function LandingScreen() {
    return (
        <ImageBackground 
            source={require('../../assets/images/photo_background.png')} 
            style={styles.background}
            resizeMode="cover"
  // Esta linha abaixo força a imagem a se alinhar pela base
            imageStyle={{ justifyContent: 'flex-end', alignItems: 'center' }}
        >
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>TravelPlanner</Text>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.subtituloContainer}>
                        <Text style={styles.subtituloText}>CUSTOMIZE | PLAN | TRAVEL</Text>
                    </View>

                    <View style={styles.fraseContainer}>
                        <Text style={styles.fraseText}>A vida é uma jornada, não um destino.</Text>
                    </View>
                    <TouchableOpacity style={styles.entryButton}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        paddingHorizontal: '5%',
        flexDirection: 'column',
        paddingVertical: 50,
        justifyContent: 'space-between', // Joga o título para cima e o texto para baixo
    },
  
    textContainer: {
        width: '30%',
        //backgroundColor: 'red',
        //height: '65%',
        paddingBottom: 100,
        
    },

    title: {
        width: '50%',
        //height: '35%',
        //backgroundColor: 'green',
        alignItems: 'flex-start',
        marginTop: -15,
    },

    textTitle: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '700',
    },

    subtituloText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: 2, // Espaçamento entre letras para o estilo "Clean"
    },

    subtituloContainer: {
        marginBottom: 8,
    },

    fraseContainer: {
        marginBottom: 25,
    },

    fraseText: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: '700',
        lineHeight: 50, // Ajuste para a frase não ficar "apertada"
    },

    entryButton: {
        backgroundColor: '#bd752d', // Tom de marrom do seu Figma
        width: 160,
        height: 45,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    
    buttonText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
    }
});