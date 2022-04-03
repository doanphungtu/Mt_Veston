import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  btnNext: {
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A52A8',
    alignSelf: 'center',
    marginVertical: 20,
    width: '90%',
  },
  btnDate: {
    height: 40,
    width: '90%',
    justifyContent: 'center',
  },
});

export default styles;
