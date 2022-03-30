import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  btnAdd: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#0A52A8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});

export default styles;
