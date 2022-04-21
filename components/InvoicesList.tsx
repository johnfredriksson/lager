import { useEffect, useState } from 'react';
import { View, Text, Button } from "react-native";
import config from "./../config/config.json";
import { Base, Typography } from '../styles';
import invoiceModel from "../models/invoices";
import { DataTable } from 'react-native-paper';
import authModel from "../models/auth";
import ordersModel from "../models/orders";



function InvoicesListProcess(props) {

    const listOfInvoices = props.allInvoices.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell>sek {invoice.total_price};-</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <View>
            {listOfInvoices}
        </View>
    );
}

export default function InvoicesList({navigation, route}) {
    const { reload } = route.params || false;

    const [allInvoices, setAllInvoices] = useState([]);

    useEffect(async () => {
        setAllInvoices(await invoiceModel.getInvoices() );
    }, []);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }
    return (
        <View>
            <Text style={Typography.header4}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title>Belopp</DataTable.Title>
                    <DataTable.Title>Förfallodatum</DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <InvoicesListProcess
                allInvoices={allInvoices}
            />
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate("CreateInvoice");
                }}
            />
            <Button 
                title="Logga ut"
                onPress={() => {
                    authModel.logout();
                    navigation.navigate("Lager", {reload: true});
                }}
            />
        </View>
    );
}