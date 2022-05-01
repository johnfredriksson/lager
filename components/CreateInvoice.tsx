import { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Platform } from "react-native";
import config from "./../config/config.json";
import { Base, Typography } from '../styles';
import ordersModel from "../models/orders";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import invoiceModel from "../models/invoices";
import { showMessage } from "react-native-flash-message";


function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setInvoice({
                            ...props.invoice,
                            invoice_date: date.toLocaleDateString("se-SV"),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

function OrderDropDown(props) {
    const [orders, setOrders] = useState([]);
    let ordersHash: any = {};

    useEffect(async () => {
        setOrders(await ordersModel.getOrders());
    }, []);

    const ordersList = orders
    .filter(order => order.status === "Packad")
    .map((order, index) => {
        ordersHash[order.id] = order;
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue});
                props.setCurrentOrder(ordersHash[itemValue]);
            }}>
            {ordersList}
        </Picker>
    );
}

export default function CreateInvoice({ navigation }) {
    const [invoice, setInvoice] = useState({});
    const [currentOrder, setCurrentOrder] = useState({});

    async function addInvoice() {
        let sum = 0;
        currentOrder.order_items.forEach(product => {
            sum += product.amount * product.price
        });
        const order = {
            id: currentOrder.id,
            name: currentOrder.name,
            sum: sum,
            due_date: invoice.invoice_date
        };
        ordersModel.updateOrderStatus(order, 600)
        invoiceModel.createInvoice(order);
        navigation.navigate("Invoices", {reload: true});

        showMessage({
            message: "Tillagd",
            description: "Faktura registrerad",
            type: "success",
        });
    };
    
    return (
        <ScrollView>
            <Text style={{ ...Typography.header4 }}>Ny faktura</Text>
            <Text style={{ ...Typography.label }}>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                setCurrentOrder={setCurrentOrder}
            />
            <Text style={{ ...Typography.label }}>Förfallodatum</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />
            <Button
                title="Skapa faktura"
                onPress={() => {
                    addInvoice()
                }}
            />
        </ScrollView>
    );
}