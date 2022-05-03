import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from '../styles';
import { Picker } from '@react-native-picker/picker';
import stock from "../models/stock";
import Product from "../interfaces/product";
import DateTimePicker from '@react-native-community/datetimepicker';
import deliveryModel from '../models/delivery';
import { showMessage } from "react-native-flash-message";
import Delivery from '../interfaces/delivery';

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

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}


function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await stock.getStock());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {
        if (delivery.amount && delivery.delivery_date && delivery.product_id) {
            await deliveryModel.addDelivery(delivery);
            const updatedProduct = {
                ...currentProduct,
                stock: (currentProduct.stock || 0) + (delivery.amount || 0)

            };
            
            await stock.updateStock(updatedProduct);
            setProducts(await stock.getStock());
        
            navigation.navigate("List", { reload: true });
            showMessage({
                message: "Tillagd",
                description: "Inleverans registrerad",
                type: "success",
            });
        } else {
            showMessage({
                message: "Saknas",
                description: "Produkt-id, kvantitet eller datum saknas",
                type: "warning",
            });
        }
    }


    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header4 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.label }}>Datum för leverans</Text>
            <DateDropDown 
                delivery={delivery}
                setDelivery={setDelivery}
            />

            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery()
                }}
            />
        </ScrollView>
    );
};