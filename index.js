import "react-native-gesture-handler";
import { LogBox } from "react-native";

if (__DEV__) {
    import("./reactotron-config").then(() =>
        console.log("Reactotron Configured")
    );
}

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
