import {firebase} from '@react-native-firebase/auth';
import {Platform} from 'react-native';

const AndroidID = '1:487494890874:android:38cd72b0b579528d4812c3';
const IosID = '1:487494890874:ios:97e2e493f55e4b284812c3';

const config = {
  databaseURL: 'https://minhtienveston-default-rtdb.firebaseio.com/',
  projectId: 'minhtienveston',
  appId: Platform.OS === 'android' ? AndroidID : IosID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
