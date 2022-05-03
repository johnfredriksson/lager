import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import authModel from "../models/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InvoicesList from "./InvoicesList.tsx";
import CreateInvoice from "./CreateInvoice.tsx";

export default function Invoices(props) {

    const Stack = createNativeStackNavigator();
    
    return (
            <Stack.Navigator initialRouteName="Invoices">
                <Stack.Screen name="Invoices">
                    {(screenProps) => <InvoicesList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} /> }
                </Stack.Screen>
                <Stack.Screen name="CreateInvoice" component={CreateInvoice}></Stack.Screen>
            </Stack.Navigator>
    );
}
