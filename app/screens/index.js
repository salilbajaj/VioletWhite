import { Navigation } from 'react-native-navigation';

import Social from '../components/Social';
import Events from '../components/Events';
import Menu from '../components/Menu';
import Contact from '../components/Contact';
import Login from '../components/Login';
import EventDetails from '../components/EventDetails';
import Upload from '../components/Upload';


// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('AwesomeProject.Social', () => Social);
  Navigation.registerComponent('AwesomeProject.Events', () => Events);
  Navigation.registerComponent('AwesomeProject.Menu', () => Menu);
  Navigation.registerComponent('AwesomeProject.Contact', () => Contact);
  Navigation.registerComponent('AwesomeProject.Login', () => Login);
  Navigation.registerComponent('AwesomeProject.EventDetails', () => EventDetails);
Navigation.registerComponent('AwesomeProject.Upload', () => Upload);
  
}