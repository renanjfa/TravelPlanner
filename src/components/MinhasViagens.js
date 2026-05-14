import { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TripCard from './TripCard';

class MinhasViagens extends Component {

    render() {
        return(

            <View style={styles.mainContent}>
            
                {/* TÍTULO */}
                <Text style={styles.title}>Minhas Viagens</Text>
            
            
                {/* BOTÃO */}
                <TouchableOpacity style={styles.newTripButton} onPress={() => this.props.navigation.navigate('Forms')}>
                    <Text style={styles.newTripText}>+ Nova Viagem</Text>
                </TouchableOpacity>


                {/* LISTA DE VIAGENS */}
                <ScrollView>

                    <View style={styles.cardsContainer}>

                        <TripCard/>
                        <TripCard/>
                        <TripCard/>
                        <TripCard/>
                        <TripCard/>
                        <TripCard/>
                        <TripCard/>
                        <TripCard/>
                        <TripCard/>
                        <TripCard/>
                        

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



    
});