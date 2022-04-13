import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import Deliveries from './components/Deliveries.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import warehouse from './assets/warehouse.png';


const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Leverans": "bus"
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={warehouse} style={{ width: "auto"}}/>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'darkorange',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Lager" component={Home} />
          <Tab.Screen name="Plock" component={Pick} />
          <Tab.Screen name="Leverans" component={Deliveries} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});