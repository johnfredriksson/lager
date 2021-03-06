import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../styles/index";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import getCoordinates from "../models/nominatim";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Button } from "react-native-paper";
import ordersModel from "../models/orders";
import { showMessage } from "react-native-flash-message";


export default function ShipOrder({ route, navigation }) {
    const {order} = route.params;

    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
    
            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    async function shipIt() {
        await ordersModel.updateOrderStatus(order, 400);
        navigation.navigate("List");
        showMessage({
            message: "Skickad",
            description: "Ordern är nu registrerad som skickad",
            type: "success",
        });
    }

    return (
        <View style={Base.container}>
            <Text style={Typography.header2}>Skicka order</Text>
            <Text style={Typography.label}>ordernr: {order.id}</Text>
            <Text style={Typography.label}>{order.name}</Text>
            <Text style={Typography.label}>{order.address}, {order.city}</Text>
            <Text style={Typography.label}>{order.zip}</Text>
            <Text style={Typography.label}>{order.country}</Text>
            <Text style={Typography.label}>Status: {order.status}</Text>
            <Button
                title="Skicka"
                onPress={() => {
                    shipIt();
                }}
            >Skicka
            </Button>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    // initialRegion={{
                    //     latitude: 56.1612,
                    //     longitude: 15.5869,
                    //     latitudeDelta: 0.1,
                    //     longitudeDelta: 0.1,
                    // }}
                    >
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});