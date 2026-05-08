import { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class MinhasViagens extends Component {

    render() {
        return(

            <View style={styles.mainContent}>
            
                {/* TÍTULO */}
                <Text style={styles.title}>Minhas Viagens</Text>
            
            
                    {/* BOTÃO */}
                    <TouchableOpacity style={styles.newTripButton}>
                        <Text style={styles.newTripText}>+ Nova Viagem</Text>
                    </TouchableOpacity>



                    {/* LISTA DE VIAGENS */}
                    <ScrollView>

                        <View style={styles.cardsContainer}>

                        {/* CARD */}
                        <TouchableOpacity style={styles.tripCard}>

                            <Image
                            source={require('../assets/arrasca.webp')}
                            style={styles.tripImage}
                            />

                            <View style={styles.tripInfo}>

                            <Text style={styles.tripTitle}>
                                Viagem 50 Anos Itália
                            </Text>

                            <Text style={styles.tripDescription}>
                                Viagem de comemoração...
                            </Text>

                            </View>

                        </TouchableOpacity>



                        {/* CARD */}
                        <TouchableOpacity style={styles.tripCard}>

                            <Image
                            source={require('../assets/arrasca.webp')}
                            style={styles.tripImage}
                            />

                            <View style={styles.tripInfo}>

                            <Text style={styles.tripTitle}>
                                Férias no Rio
                            </Text>

                            <Text style={styles.tripDescription}>
                                Viagem muito gostosa...
                            </Text>

                            </View>

                        </TouchableOpacity>



                        {/* CARD */}
                        <TouchableOpacity style={styles.tripCard}>

                            <Image
                            source={require('../assets/arrasca.webp')}
                            style={styles.tripImage}
                            />

                            <View style={styles.tripInfo}>

                            <Text style={styles.tripTitle}>
                                Viagem a Paris
                            </Text>

                            <Text style={styles.tripDescription}>
                                Viagem pela europa...
                            </Text>

                            </View>

                        </TouchableOpacity>

                        </View>

                    </ScrollView>

            </View>

        );
    }
}
export default MinhasViagens;

const styles = StyleSheet.create({
    /* CONTEÚDO PRINCIPAL */
    mainContent: {
        flex: 1,

        paddingTop: 40,
        paddingHorizontal: 35,
    },



    /* TÍTULO */
    title: {
        fontSize: 42,
        fontWeight: 'bold',

        color: '#000000',

        marginBottom: 18,
    },



    /* BOTÃO NOVA VIAGEM */
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



    /* LISTA DE CARDS */
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        gap: 20,
    },



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