import Reactotron from "reactotron-react-native";
import { NativeModules } from "react-native";

const host = NativeModules.SourceCode.scriptURL.split("://")[1].split(":")[0];
const reactotron = Reactotron.configure({ host }).useReactNative().connect();

export default reactotron;
