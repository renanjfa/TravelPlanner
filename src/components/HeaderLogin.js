import { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class HeaderLogin extends Component {

  render() {
    return (

      <View style={styles.header}>

        <Text style={styles.logo}>
          TravelPlanner
        </Text>

      </View>

    );
  }
}
export default HeaderLogin;


const styles = StyleSheet.create({

  header: {
    height: 60,
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

  username: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },

  userButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',

    paddingHorizontal: 18,
    paddingVertical: 8,

    borderRadius: 12,
  }
});