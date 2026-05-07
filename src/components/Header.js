import { Component } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

class Header extends Component {

  render() {

    return (

      <View style={styles.header}>

        <Text style={styles.logo}>
          TravelPlanner
        </Text>

        <TouchableOpacity style={styles.userButton}>
          <Text>Renan Jusan</Text>
        </TouchableOpacity>

      </View>

    );
  }
}

export default Header;

const styles = StyleSheet.create({

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
  }

});