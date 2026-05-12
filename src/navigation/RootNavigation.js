import { NavigationContainer } from '@react-navigation/native';

import HomeDrawer from './HomeDrawer';
import LoginStack from './LoginStack';

export default function RootNavigation() {

    const usuarioLogado = false;

    return (

        <NavigationContainer>

            {
                usuarioLogado
                ? <HomeDrawer />
                : <LoginStack />
            }

        </NavigationContainer>
    );
}