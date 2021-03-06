import Auth from "../../interfaces/auth";
import { useState } from "react";
import AuthModel from "../../models/auth";
import AuthFields from "./AuthFields";
import { showMessage } from "react-native-flash-message";

export default function Register({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            // TBD
            const result = await AuthModel.register(auth.email, auth.password);

            if (result.type == "success") {
                navigation.navigate("Login");
                showMessage(result);
            } else {
                showMessage(result);
            }
        } else {
            showMessage({
                message: "Saknas",
                description: "E-post eller lösenord saknas",
                type: "warning",
            });
        }
    }
    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera"
            navigation={navigation}
        />
    );
};