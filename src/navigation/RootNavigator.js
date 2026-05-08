import { Component } from 'react';
import HomeDrawer from './HomeDrawer';
import LoginStack from './LoginStack';


class RootNavigator extends Component {

    usuarioLogado = true;

    render() {
        return (

            this.usuarioLogado ? <HomeDrawer /> : <LoginStack />

        );
    }

}