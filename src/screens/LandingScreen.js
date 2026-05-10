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
            source={require('../assets/photo_background.png')} 
            style={styles.background}
            resizeMode="cover"
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
        justifyContent: 'space-between', 
    },
  
    textContainer: {
        width: '30%',
        paddingBottom: 100,
        
    },

    title: {
        width: '50%',
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
        letterSpacing: 2,
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
        lineHeight: 50, 
    },

    entryButton: {
        backgroundColor: '#c97726', 
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