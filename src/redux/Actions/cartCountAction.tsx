import { CLEAR_ADD_TO_CART } from "./addCartAction";
import { CLEAR_SPLITPRICE_DETAILS } from "./splitPriceAction";

export const SET_CART_COUNT = "SET_CART_COUNT";
export const CLEAR_CART_COUNT = "CLEAR_CART_COUNT";

export const DELETE_CART_COUNT = "DELETE_CART_COUNT";

export const SET_ORDER_TYPE = "SET_ORDER_TYPE";
export const CLEAR_ORDER_TYPE = "CLEAR_ORDER_TYPE";



export const setCartCount = (payload: number) => ({
  type: SET_CART_COUNT,
  payload,
});
export const clearCartCount = () => ({
  type: CLEAR_CART_COUNT,
});

export const clearCart = () => ({
  type: CLEAR_ADD_TO_CART,
});

export const deleteCartCount = (payload:number) => ({
    type: DELETE_CART_COUNT,
    payload,
  });
  export const setOrderType = (payload: number) => ({
    type: SET_ORDER_TYPE,
    payload,
  });

  export const clearOrderType = () => ({
    type: CLEAR_ORDER_TYPE,
    
  });

  export const clearSplitPrice = () => ({
    type: CLEAR_SPLITPRICE_DETAILS,
    
  });