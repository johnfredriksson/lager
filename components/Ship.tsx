import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList.tsx';
import ShipOrder from './ShipOrder.tsx';

const Stack = createNativeStackNavigator();

export default function Pick() {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ShipList}/>
            <Stack.Screen name="Details" component={ShipOrder} />
        </Stack.Navigator>
    );
}