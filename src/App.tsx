import React from "react";
import { StatusBar } from "react-native";
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@state/store/configureStore";
import { NavigationContainer } from "@react-navigation/native";
import { HomeNavigator } from "@navigation/index";
import RNBootSplash from "react-native-bootsplash";

const App = () => {
    const onReady = () => {
        RNBootSplash.hide({ fade: true });
    };

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                    <NavigationContainer onReady={onReady}>
                        <StatusBar
                            backgroundColor="transparent"
                            barStyle="dark-content"
                            translucent
                        />
                        <HomeNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
