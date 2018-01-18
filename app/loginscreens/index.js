import { Navigation } from "react-native-navigation";

import Login from "../components/Login";

// register all screens of the app (including internal ones)
export function registerLoginScreens() {
  Navigation.registerComponent("GoVioletWhite.Login", () => Login);
}
