import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class RatedNavScreen extends Component {

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Your Rated Movies</Text>
            </View>
        );
    }
}

export default RatedNavScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
        paddingTop: 20,
    },

    header: {
        color: "#837718ff",
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    }
});