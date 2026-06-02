import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FormsScreen from '../screens/FormsScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import TripScreen from '../screens/TripScreen';

const Stack = createNativeStackNavigator();

export default function MyTripsStack() {

    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="MyTrips"
                component={MyTripsScreen}
            />

            <Stack.Screen
                name="TripScreen"
                component={TripsScreen}
            />

            <Stack.Screen
                name="Forms"
                component={FormsScreen}
            />

        
        </Stack.Navigator>
    );
}