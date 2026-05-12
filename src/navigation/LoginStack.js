import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Component } from 'react';

import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

class LoginStack extends Component {

    render() {

        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
            
                <Stack.Screen
                    name="LandPage"
                    component={LandingScreen}
                />

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />

                <Stack.Screen
                    name="Cadastro"
                    component={RegisterScreen}
                />

            </Stack.Navigator>
        );

    }

}