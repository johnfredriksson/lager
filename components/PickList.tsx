import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import { Base, Typography } from "../styles/index.js";

export default function PickList({ route, navigation }) {
    const { order } = route.params;

    async function pick() {
        order.order_items.map((item) => {
            orderModel.pickOrder(item);
        })
        orderModel.updateOrderStatus(order, 200)
        navigation.push("List", { reload: true });
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });
    let valid = true

    order.order_items.map((item) => {
        if (item.amount > item.stock) {
            valid = false
        }
    })

    return (
        <View>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}


            {valid == true ? <Button title="Plocka order" onPress={pick} />: <Text style={Typography.header4}>Otillräckligt lagersaldo</Text>}
 
        </View>
    )
};