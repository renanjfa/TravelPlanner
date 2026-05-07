import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class MyProfileScreen extends Component {

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.header}>TravelPlanner</Text>
            </View>
        );
    }
}

export default MyProfileScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#da742b",
        paddingTop: 20,
    },

    header: {
        color: "rgb(238, 236, 222)",
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    }
});