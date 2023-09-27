export const SET_ALL_CATEGORIES = "SET_ALL_CATEGORIES";
export const CLEAR_ALL_CATEGORIES = "CLEAR_ALL_CATEGORIES";
export const USER_SELECT_CATEGORIES = "USER_SELECT_CATEGORIES";
export const CLEAR_SPLITPRICE_DETAILS = "CLEAR_SPLITPRICE_DETAILS";
export const CLEAR_ALL_ORDERINFO_CATEGORIES = "CLEAR_ALL_ORDERINFO_CATEGORIES";
// let getValue = "";
// let removeDuplicates = "";
export const setProductAllCategories = (payload: any) => ({
  type: SET_ALL_CATEGORIES,
  payload,
});

export const setUserProductCategories = (payload: any) => ({
  type: USER_SELECT_CATEGORIES,
  payload,
});

export const clearUserProductCategories = () => ({
  type: CLEAR_ALL_CATEGORIES,
});
export const clearUserOrderInfoCategories = () => ({
  type: CLEAR_ALL_ORDERINFO_CATEGORIES,
});
export const clearUserSplitPrice = () => ({
  type: CLEAR_SPLITPRICE_DETAILS,
});
