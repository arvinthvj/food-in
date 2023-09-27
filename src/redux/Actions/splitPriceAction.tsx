export const SET_SPLITPRICE_DETAILS = "SET_SPLITPRICE_DETAILS";
export const CLEAR_SPLITPRICE_DETAILS = "CLEAR_SPLITPRICE_DETAILS";
export const ORDER_INFO_DATA = "ORDER_INFO_DATA";
export const ORDER_INFO_NOTE = "ORDER_INFO_NOTE";

export const setSplitPriceDetails = (payload: any) => ({
  type: SET_SPLITPRICE_DETAILS,
  payload,
});
export const setOrderInformation = (payload: any) => ({
  type: ORDER_INFO_DATA,
  payload,
});
export const setOrderuserNotes = (payload: any) => ({
  type: ORDER_INFO_NOTE,
  payload,
});
