import { MaterialIcons } from '@expo/vector-icons';
import { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import Header from '../components/Header';


class MyProfileScreen extends Component {

    render() {

        return (
            <View style={styles.container}>

                {/* HEADER */}
                <Header/>



                {/* CONTEÚDO */}
                <View style={styles.content}>

                    {/* SIDEBAR */}
                    <View style={styles.sidebar}>

                    {/* CARD USUÁRIO */}
                    <View style={styles.profileCard}>

                        {/* <Image
                        // source={require('../assets/user.png')}
                        style={styles.avatar}
                        /> */}

                        <View>
                        <Text>Renan Jusan</Text>
                        <Text>Travel Planner User</Text>
                        </View>

                    </View>



                    {/* MENU */}
                    <View style={styles.menu}>

                        <TouchableOpacity style={styles.menuItem}>
                        <MaterialIcons name="person" size={24} color="black" />
                        <Text>Meu Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                        <MaterialIcons name="flight" size={24} color="black" />
                        <Text>Minhas Viagens</Text>
                        </TouchableOpacity>

                    </View>

                    </View>



                    {/* ÁREA PRINCIPAL */}
                    <View style={styles.mainContent}>

                    {/* TÍTULO */}
                    <Text style={styles.title}>
                        Minhas Viagens
                    </Text>



                    {/* BOTÃO */}
                    <TouchableOpacity style={styles.newTripButton}>
                        <Text>+ Nova Viagem</Text>
                    </TouchableOpacity>



                    {/* LISTA DE VIAGENS */}
                    <ScrollView>

                        <View style={styles.cardsContainer}>

                        {/* CARD */}
                        <TouchableOpacity style={styles.tripCard}>

                            {/* <Image
                            // source={require('../assets/italia.jpg')}
                            style={styles.tripImage}
                            /> */}

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

                            {/* <Image
                            // source={require('../assets/rio.jpg')}
                            style={styles.tripImage}
                            /> */}

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

                            {/* <Image
                            // source={require('../assets/paris.jpg')}
                            style={styles.tripImage}
                            /> */}

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

                </View>

            </View>
        );
    }
}

export default MyProfileScreen;


const styles = StyleSheet.create({
        /* CONTAINER PRINCIPAL */
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'column',
    },



    /* HEADER */
    header: {
        height: 80,
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

    userButton: {
        borderWidth: 2,
        borderColor: '#FFFFFF',

        paddingHorizontal: 18,
        paddingVertical: 8,

        borderRadius: 12,
    },



    /* CONTEÚDO */
    content: {
        flex: 1,
        flexDirection: 'row',
    },



    /* SIDEBAR */
    sidebar: {
        width: 250,
        backgroundColor: '#FFFFFF',

        paddingTop: 30,
        paddingHorizontal: 20,

        borderRightWidth: 1,
        borderRightColor: '#E0E0E0',
    },



    /* CARD PERFIL */
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',

        padding: 15,

        borderWidth: 1,
        borderColor: '#EAEAEA',

        borderRadius: 20,

        marginBottom: 40,
    },

    avatar: {
        width: 55,
        height: 55,

        borderRadius: 999,

        marginRight: 12,
    },



    /* MENU */
    menu: {
        gap: 18,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',

        gap: 12,

        paddingVertical: 10,
    },



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

        paddingHorizontal: 18,
        paddingVertical: 10,

        borderRadius: 8,

        marginBottom: 25,
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