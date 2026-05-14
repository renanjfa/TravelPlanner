import { createDrawerNavigator } from '@react-navigation/drawer';
import MyProfileScreen from '../screens/MyProfileScreen';
import MyTripsScreen from '../screens/MyTripsScreen';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
    return (
        <Drawer.Navigator>

                <Drawer.Screen
                    name="Meu Perfil"
                    component={MyProfileScreen}
                />
                <Drawer.Screen
                    name="Minhas Viagens"
                    component={MyTripsScreen}
                />

            </Drawer.Navigator>
  );
}

