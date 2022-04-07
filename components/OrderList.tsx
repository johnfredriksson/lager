import { useState } from 'react';
import { View, Text, Button } from "react-native";
import config from "./../config/config.json";
import { Base, Typography } from '../styles';

export default function OrderList({ navigation }) {
    const [allOrders, setAllOrders] = useState([]);
    
    fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setAllOrders(result.data));


    

    const listOfOrders = allOrders
    .filter(order => order.status === "Ny")
    .map((order, index) => {
        return <Button
        title={order.name}
        key={index}
        onPress={() => {
            navigation.navigate('Details', {
                order: order
            });
        }}
        />
    });
    
    return (
        <View>
            <Text style={Base.header4}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}