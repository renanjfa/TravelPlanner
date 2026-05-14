import { Component } from 'react';
import { StyleSheet, View } from 'react-native';


import Header from '../components/Header';
import MenuUser from '../components/MenuUser';
import ProfileInfo from '../components/ProfileInfo';
import UserCard from '../components/UserCard';


class MyProfileScreen extends Component {

    navigationAction = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (

            <View style={styles.container}>

                <Header navigation={this.props.navigation} navigationAction={this.navigationAction}/>

                {/* CONTEÚDO */}
                <View style={styles.content}>

                    {/* SIDEBAR */}
                    <View style={styles.sidebar}>
                        <UserCard/>
                        <MenuUser navigation={this.props.navigation}/>
                    </View>

                    {/* Profile Information */}
                    <ProfileInfo/>

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
    
});