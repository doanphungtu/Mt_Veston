import {firebase} from '@react-native-firebase/auth';
import {Platform} from 'react-native';

const AndroidID = '1:273108821272:android:907d2ce3c3bef6ff2d2a6d';
const IosID = '1:273108821272:ios:7f5518776d2a1ee42d2a6d';

const config = {
  databaseURL: 'https://minhtienveston-default-rtdb.firebaseio.com/',
  projectId: 'minhtienveston',
  appId: Platform.OS === 'android' ? AndroidID : IosID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
