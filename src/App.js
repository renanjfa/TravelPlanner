import { NavigationContainer } from '@react-navigation/native';
import { Component } from 'react';
import RootNavigator from './navigation/RootNavigator';


export default class App extends Component {

    render() {

        return (

            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>

        );

    }
    
}