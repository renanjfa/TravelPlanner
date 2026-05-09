import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Component } from 'react';

import LandPage from './screens/LandingScreen';
import Login from './screens/LoginScreen';
import Cadastro from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

class LoginStack extends Component {

    render() {

        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
            
                <Stack.Screen
                    name="LandPage"
                    component={LandPage}
                />

                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="Cadastro"
                    component={Cadastro}
                />

            </Stack.Navigator>
        );

    }

}