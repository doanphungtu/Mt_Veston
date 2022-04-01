import {firebase} from '@react-native-firebase/auth';
import {Platform} from 'react-native';

const AndroidID = '1:273108821272:android:907d2ce3c3bef6ff2d2a6d';
const IosID = '1:487494890874:ios:97e2e493f55e4b284812c3';

const config = {
  databaseURL: 'https://minhtienveston-default-rtdb.firebaseio.com/',
  projectId: 'minhtienveston',
  appId: Platform.OS === 'android' ? AndroidID : IosID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
