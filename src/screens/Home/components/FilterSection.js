import React, {useMemo} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, HStack, Icon, Pressable, Text, VStack} from 'native-base';

import {setFilterByAction} from '~/store/customerSlice';
import useDateFormat from '~/hooks/useDateFormat';

const FilterTag = props => {
  const {tagLabel, onPress, endIcon} = props;
  return (
    <Pressable onPress={onPress}>
      <HStack alignItems="center" background="white" style={styles.filterTag}>
        <Icon as={Ionicons} name="close" color="grey.500" size={scale(14)} mr="1" />
        <Text fontSize={scale(12)} color="grey.500">
          {tagLabel}
        </Text>
        {endIcon}
      </HStack>
    </Pressable>
  );
};

const FilterSection = props => {
  const dispatch = useDispatch();
  const {filterByName, filterByPhonenumber, filterStartDate, filterEndDate} = useSelector(
    state => state.customer.filter,
  );
  const {format} = useDateFormat();

  const tags = useMemo(() => {
    const results = [];

    if (filterEndDate || filterStartDate) {
      const startDate = format(filterStartDate);
      const endDate = format(filterEndDate);
      if (filterEndDate && filterStartDate) {
        results.push({
          tagLabel: `${startDate} ~ ${endDate}`,
          onPress: function () {
            dispatch(
              setFilterByAction({
                filterStartDate: null,
                filterEndDate: null,
              }),
            );
          },
        });
      } else {
        let tagLabel = '';

        if (filterEndDate) {
          tagLabel = 'Đến ngày' + ' ' + endDate;
        } else {
          tagLabel = 'Từ ngày:' + ' ' + startDate;
        }
        results.push({
          tagLabel: tagLabel,
          onPress: function () {
            dispatch(
              setFilterByAction({
                filterStartDate: null,
                filterEndDate: null,
              }),
            );
          },
        });
      }
    }

    if (filterByName.length) {
      results.push({
        tagLabel: 'Tên:' + ' "' + filterByName + '"',
        onPress: function () {
          dispatch(
            setFilterByAction({
              filterByName: '',
            }),
          );
        },
      });
    }

    if (filterByPhonenumber.length) {
      results.push({
        tagLabel: 'Sđt:' + ' "' + filterByPhonenumber + '"',
        onPress: function () {
          dispatch(
            setFilterByAction({
              filterByPhonenumber: '',
            }),
          );
        },
      });
    }

    return results;
  }, [filterByName, filterByPhonenumber, filterStartDate, filterEndDate]);

  function clearFilter() {
    dispatch(
      setFilterByAction({
        filterEndDate: null,
        filterStartDate: null,
        filterByName: '',
        filterByPhonenumber: '',
      }),
    );
  }

  return (
    <VStack alignItems="center" mb={scale(12)}>
      <Button
        onPress={clearFilter}
        marginBottom={scale(5)}
        style={styles.clearFilterBtn}
        _text={{
          style: styles.clearFilterBtnText,
          color: 'grey.600',
          fontWeight: '500',
        }}
        p="1.5"
        backgroundColor="white">
        {'Bỏ lọc'}
      </Button>
      <HStack justifyContent="flex-start" alignItems="center" flexWrap="wrap">
        {tags.map((tag, tagIndex) => (
          <FilterTag key={`index-${tagIndex}-${tag.tagLabel}`} {...tag} />
        ))}
      </HStack>
    </VStack>
  );
};

const styles = ScaledSheet.create({
  filterTag: {
    marginTop: '10@s',
    marginRight: '11@s',
    paddingHorizontal: '8@s',
    borderRadius: '14@s',
    height: '25@s',
  },
  clearFilterBtn: {
    borderRadius: '20@s',
  },
  clearFilterBtnText: {
    fontSize: '12@s',
    lineHeight: '20@s',
    marginHorizontal: '15@s',
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: '18@s',
    marginLeft: '5@s',
  },
});

export default FilterSection;
