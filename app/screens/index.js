import { Navigation } from "react-native-navigation";

import Social from "../components/Social";
import Events from "../components/Events";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import Login from "../components/Login";
import EventDetails from "../components/EventDetails";
import ThankYou from "../components/ThankYou";
import Upload from "../components/Upload";
import Comments from "../components/Comments";

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent("GoVioletWhite.Social", () => Social);
  Navigation.registerComponent("GoVioletWhite.Events", () => Events);
  Navigation.registerComponent("GoVioletWhite.Menu", () => Menu);
  Navigation.registerComponent("GoVioletWhite.Contact", () => Contact);
  Navigation.registerComponent("GoVioletWhite.Login", () => Login);
  Navigation.registerComponent(
    "GoVioletWhite.EventDetails",
    () => EventDetails
  );
  Navigation.registerComponent("GoVioletWhite.ThankYou", () => ThankYou);
  Navigation.registerComponent("GoVioletWhite.Upload", () => Upload);
  Navigation.registerComponent("GoVioletWhite.Comments", () => Comments);
}
