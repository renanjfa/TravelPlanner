import { Component } from "react";
import { Image, StyleSheet, Text, View } from 'react-native';



class UserCard extends Component {

    render() {
        return(
            <View style={styles.profileCard}>

                <Image
                source={require('../assets/arrasca.webp')}
                style={styles.avatar}
                />

                <View>
                    <Text>Renan Jusan</Text>
                    <Text style={styles.travelPlannerUserText}>Travel Planner User</Text>
                </View>

            </View>
        );
    }

}
export default UserCard;

const styles = StyleSheet.create({

    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',

        padding: 15,

        borderWidth: 1,
        borderColor: '#EAEAEA',

        borderRadius: 90,

        marginBottom: 40,
    },

    avatar: {
        width: 55,
        height: 55,

        borderRadius: 999,

        marginRight: 12,
    },

    travelPlannerUserText: {
        fontSize: 10,
        color: '#ae9898'
    }
});