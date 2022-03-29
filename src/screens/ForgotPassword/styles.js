import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  btnBack: {
    position: 'absolute',
    top: 20,
    left: 20,
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
  input: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default styles;
