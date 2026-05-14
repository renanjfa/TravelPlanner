import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import HomeDrawer from '../navigation/HomeDrawer';

const Stack = createNativeStackNavigator();

export default function LoginStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="LandPage" component={LandingScreen}/>

        <Stack.Screen name="Login" component={LoginScreen}/>

        <Stack.Screen name="Cadastro" component={RegisterScreen}/>

        <Stack.Screen name="HomeDrawer" component={HomeDrawer}/>

    </Stack.Navigator>
  );
}