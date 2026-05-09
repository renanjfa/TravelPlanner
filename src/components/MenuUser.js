import { MaterialIcons } from '@expo/vector-icons';
import { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


class MenuUser extends Component {

    render() {
        return(

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

        );
    }
}
export default MenuUser;

const styles = StyleSheet.create({

    menu: {
        gap: 18,
        marginLeft: 20,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
    },
}); 