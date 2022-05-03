import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button } from "react-native";
import config from "./../config/config.json";
import { Base, Typography } from '../styles';

export default function DeliveryList({ navigation }) {
    const [deliveries, setDeliveries] = useState([]);
    
    fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setDeliveries(result.data));
    let valid = false
    if (deliveries[0]) {
        valid = true
    }
    
    const listOfDeliveries = deliveries
    .map((delivery, index) => {
        return <View style={Base.deliveryCard} key={index}>
                <Text style={Base.highlighted}>Ordnr: {delivery.id}</Text>
                <Text style={Base.blueFont}>{delivery.product_name} // {delivery.amount}st</Text>
                <Text style={Base.comment}>{delivery.comment}</Text>
                <Text>{delivery.delivery_date}</Text>
            </View>

    });
    
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header4}>Inleveranser</Text>
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
            {valid == true ? listOfDeliveries: <Text style={Base.highlightedCentered}>Inga leveranser att visa</Text>}
        </ScrollView>
    );
}