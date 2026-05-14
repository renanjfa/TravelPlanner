import { createDrawerNavigator } from '@react-navigation/drawer';
import MyProfileScreen from '../screens/MyProfileScreen';
import MyTripsStack from './ViagemStack';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>

                <Drawer.Screen
                    name="Minhas Viagens"
                    component={MyTripsStack}
                />
                <Drawer.Screen
                    name="Meu Perfil"
                    component={MyProfileScreen}
                />

        </Drawer.Navigator>
  );
}

