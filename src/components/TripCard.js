import { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



class TripCard extends Component {

    render() {
        return(
            
            <TouchableOpacity style={styles.tripCard}>

                <Image
                source={require('../assets/arrasca.webp')}
                style={styles.tripImage}
                />

                <View style={styles.tripInfo}>

                    <Text style={styles.tripTitle}>Viagem 50 Anos Itália</Text>
                    <Text style={styles.tripDescription}>Viagem de comemoração...</Text>

                </View>

            </TouchableOpacity>

        );
    }

}
export default TripCard;

const styles = StyleSheet.create({

    /* CARD DA VIAGEM */
    tripCard: {
        width: 270,

        backgroundColor: '#FFFFFF',

        borderRadius: 12,

        overflow: 'hidden',

        marginBottom: 20,

        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,

        elevation: 3,
    },



    /* IMAGEM */
    tripImage: {
        width: '100%',
        height: 180,

        resizeMode: 'cover',
    },



    /* INFORMAÇÕES */
    tripInfo: {
        padding: 18,
    },

    tripTitle: {
        fontSize: 22,
        fontWeight: 'bold',

        color: '#222222',

        marginBottom: 12,
    },

    tripDescription: {
        fontSize: 16,
        lineHeight: 24,

        color: '#777777',
    },
});