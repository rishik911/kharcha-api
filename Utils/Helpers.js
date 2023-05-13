export const convertToObject = (data) => {
  let newData = [];
  if (Array.isArray(data)) {
    data.forEach((item) => {
      newData.push(item.toObject());
    });
    return newData;
  } else {
    return data.toObject();
  }
};
export const isQuerryIdInvalid = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
   // throw new Error(constants.INVALI_ID);
  }
};
