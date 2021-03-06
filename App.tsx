import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import { useState, useEffect } from 'react';
import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import Deliveries from './components/Deliveries.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import warehouse from './assets/warehouse.png';
import authModel from "./models/auth";
import Invoices from './components/Invoices.tsx';
import Auth from "./components/auth/Auth.tsx";
import Ship from "./components/Ship.tsx";
import FlashMessage from "react-native-flash-message";


const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Leverans": "bus"
};

const Tab = createBottomTabNavigator();



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn() );
  }, []);
  

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
          <Tab.Screen name="Lager">
              {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
              {() => <Pick setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Leverans">
            {() => <Deliveries setProducts={setProducts} />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
              {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen> :

            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
          <Tab.Screen name="Skicka" component={Ship} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});