import { createDrawerNavigator } from '@react-navigation/drawer';

import MyProfileScreen from './src/screens/MyProfileScreen';
import MyTripsScreen from './src/screens/MyTripsScreen';

const Drawer = createDrawerNavigator();

class HomeDrawer extends Component {

    render() {
        return(
            <Drawer.Navigator>

                <Drawer.Screen
                    name="Minhas Viagens"
                    component={MyProfileScreen}
                />

                <Drawer.Screen
                    name="Meu Perfil"
                    component={MyTripsScreen}
                />

            </Drawer.Navigator>


        );
    }

}

