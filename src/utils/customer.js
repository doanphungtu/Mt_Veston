export const getSearchName = ({data, searchKey}) => {
  const result = [];
  try {
    const searchTextLowerCase = (searchKey || '').toLowerCase();
    data.map((item, i) => {
      if (item?.fullname?.toLowerCase().includes(searchTextLowerCase)) {
        result.push(item);
      }
    });
  } catch (e) {
    console.log(e);
  }
  return result;
};

export const getSearchPhonenumber = ({data, searchKey}) => {
  const result = [];
  try {
    const searchTextLowerCase = (searchKey || '').toLowerCase();
    data.map((item, i) => {
      if (item?.phonenumber?.toLowerCase().includes(searchTextLowerCase)) {
        result.push(item);
      }
    });
  } catch (e) {
    console.log(e);
  }
  return result;
};
