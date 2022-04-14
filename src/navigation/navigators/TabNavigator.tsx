import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { HomeScreen, FavoritesScreen } from "@screens/index";
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "@constants/index";
import ROUTES from "../routes";

const Tab = createBottomTabNavigator();
const SharedStackWrapper = createSharedElementStackNavigator();

const SharedHomeScreen = () => {
    return (
        <SharedStackWrapper.Navigator screenOptions={{ headerShown: false }}>
            <SharedStackWrapper.Screen
                name={ROUTES.HOME}
                component={HomeScreen}
            />
        </SharedStackWrapper.Navigator>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={ROUTES.HOME_WRAPPER}
            screenOptions={{
                tabBarActiveTintColor: COLORS.ACTIVE,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name={ROUTES.HOME_WRAPPER}
                component={SharedHomeScreen}
                options={{
                    title: "Artwork",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="grid" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={ROUTES.FAVORITES}
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="star" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
