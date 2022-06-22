import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { TransitionPresets } from "@react-navigation/stack";
import { transitionInterpolation, sharedElementsConfig } from "../config";
import { DetailsScreen, BrowserScreen } from "@screens/index";
import TabNavigator from "./TabNavigator";
import ROUTES from "../routes";

const Stack = createSharedElementStackNavigator();

export const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={ROUTES.TAB_NAV}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name={ROUTES.TAB_NAV} component={TabNavigator} />
            <Stack.Screen
                name={ROUTES.DETAILS}
                component={DetailsScreen}
                options={{
                    gestureEnabled: false,
                    cardStyleInterpolator: transitionInterpolation,
                }}
                sharedElements={sharedElementsConfig}
            />
            <Stack.Screen
                name={ROUTES.BROWSER}
                component={BrowserScreen}
                options={{
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeNavigator;
