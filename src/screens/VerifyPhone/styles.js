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
    marginVertical: 30,
    width: '90%',
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1.5,
    borderColor: 'darkgrey',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'grey1',
    borderRadius: 5,
  },
});

export default styles;
