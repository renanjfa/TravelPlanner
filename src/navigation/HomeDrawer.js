import { createDrawerNavigator } from '@react-navigation/drawer';

import ViagemStack from './ViagemStack';
import Perfil from './src/screens/MyProfileScreen';
import MinhasViagens from './src/screens/MyTripsScreen';

const Drawer = createDrawerNavigator();

class HomeDrawer extends Component {

    render() {
        return(
            <Drawer.Navigator>

                <Drawer.Screen
                    name="Minhas Viagens"
                    component={MinhasViagens}
                />

                <Drawer.Screen
                    name="Perfil"
                    component={Perfil}
                />

                <Drawer.Screen
                    name="Viagem"
                    component={ViagemStack}
                    options={{
                    drawerItemStyle: {
                        display: 'none'
                    }
                    }}
                />

            </Drawer.Navigator>


        );
    }

}

