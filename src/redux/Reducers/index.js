import {
  CLEAR_POSTALCODE_LIST,
  CLEAR_USER_DETAILS,
  SET_POSTALCODE_LIST,
  SET_USER_DETAILS,
  SET_HOMEJSON_List,
} from "../Actions";
import { CLEAR_MYORDER_LIST, SET_MYORDER_LIST } from "../Actions/myOrderAction";
import { SET_TRACKORDER, CLEAR_TRACKORDER } from "../Actions/trackOrderAction";
import {
  SET_ORDER_DETAILS,
  CLEAR_ORDER_DETAILS,
} from "../Actions/orderDetailsAction";
import {
  SET_ALL_CATEGORIES,
  CLEAR_ALL_CATEGORIES,
  USER_SELECT_CATEGORIES,
  CLEAR_ALL_ORDERINFO_CATEGORIES,
} from "../Actions/productCategoriesAction";
import { CLEAR_ADD_TO_CART, SET_ADD_TO_CART } from "../Actions/addCartAction";
import {
  SET_SPLITPRICE_DETAILS,
  CLEAR_SPLITPRICE_DETAILS,
  ORDER_INFO_DATA,
  ORDER_INFO_NOTE,
} from "../Actions/splitPriceAction";
import {
  SET_PRIVACY_POLICY,
  SET_ABOUT_US,
  SET_TERMS_CONDITIONS,
  SET_COOKIE_POLICY,
  SET_FAQ,
} from "../Actions/policyActions";
import { SET_SHOP_HOME, SET_SHOPS_AREA } from "../Actions/shopHomeAction";
import {
  SET_PICKUP_ADRESS,
  CLEAR_PICKUP_ADRESS,
  SET_PICKUP_DATES,
  CLEAR_PICKUP_DATES,
  SET_PICKUP_TIME_DELIVERY_DATE,
  CLEAR_PICKUP_TIME_DELIVERY_DATE,
  SET_DELIVERY_TIMES,
  CLEAR_DELIVERY_TIMES,
  SET_GET_SHOP_BY_PINCODE,
  CLEAR_GET_SHOP_BY_PINCODE,
  SET_PAYMENT_METHODS,
  CLEAR_PAYMENT_METHODS,
  SET_OFFER_LIST,
  CLEAR_OFFER_LIST,
  SET_SAVE_ADDRESS,
  CLEAR_SAVE_ADDRESS,
  SET_UPDATE_ADDRESS,
  CLEAR_UPDATE_ADDRESS,
  SET_CREATE_SETUP_INTENT,
  CLEAR_CREATE_SETUP_INTENT,
  SET_SUBMIT_ORDER,
  CLEAR_SUBMIT_ORDER,
  SET_LIST_SAVED_CARDS,
  SET_SELECTED_PICKUP_TIMES_SLOT,
  SET_SELECTED_DELIVERY_DATE,
  SET_SELECTED_DELIVERY_TIME,
  CLEAR_LIST_SAVED_CARDS,
  SET_ADDRESS_BY_PINCODE,
  CLEAR_ADDRESS_BY_PINCODE,
  SET_GENARATE_ORDER_LINK,
  CLEAR_GENARATE_ORDER_LINK,
  SET_COMPLETE_ORDER,
  SET_REFERRAL,
  SET_REPEAT_ORDER_ID,
  CLEAR_REPEAT_ORDER_ID,
} from "../Actions/checkoutPageActions";
import {
  CLEAR_CART_COUNT,
  SET_CART_COUNT,
  DELETE_CART_COUNT,
  SET_ORDER_TYPE,
  CLEAR_ORDER_TYPE,
} from "../Actions/cartCountAction";
import { SET_SETTINGS } from "../../components/footer/index";
import { data } from "../../components/edit/data";
// import { setPostalCodeSuggestions, clearPostalCodeSuggestions } from '../Actions/suggestionActions';

const initialState = {
  postalCodeList: [],
  // setPostalCodeSuggestions:[],
  
  // myOrderList: [],
  // trackOrder: [],
  // orderDetails: [],

  // addToCart: [],
  // pickupAdress: {},
  // pickupDates: [],
  // pickupTimesDeliveryDates: [],
  // deliveryTimeSlots: [],
  getShopByPinCode: [],
  // paymentMethods: {},
  // offersList: [],

  // createSetUpIntent: [],
  // ListSavedCards: [],
  // addressByPincode: [],
  // genarateOrderLink: [],
  // deliveryDate: [],
  // ---------------------------
  repeatOrderId: "",
  saveAddress: [],
  updateAddress: [],
  cartCount: 0,
  splitPriceDetails: [],
  orderType: 0,
  submitOrder: [],

  ProductAllCategories: [],
  userDetails: {},
  userSelectedCategories: [],
  orderInfo: [],
  ordernote: "",
  settings: {},
  homeJsonList: data,
};

function RootsReducer(state = initialState, { type, payload }) {
  switch (type) {
    // --------------new dev ref-----------------------------------
    case CLEAR_POSTALCODE_LIST:
      return {
        ...state,
        setPostalCodeSuggestions: [],
      };
    case SET_REPEAT_ORDER_ID:
      return { ...state, repeatOrderId: payload };
    case CLEAR_REPEAT_ORDER_ID:
      return { ...state, repeatOrderId: "" };
    case ORDER_INFO_DATA:
      return { ...state, orderInfo: payload };
    case SET_HOMEJSON_List:
      return { ...state, homeJsonList: payload };
    case ORDER_INFO_NOTE:
      return { ...state, ordernote: payload };
    // --------------------------------------------------
    case SET_POSTALCODE_LIST:
      return { ...state, postalCodeList: payload };
    case CLEAR_POSTALCODE_LIST:
      return initialState;
    case SET_CART_COUNT:
      return { ...state, cartCount: payload };
    case SET_ORDER_TYPE:
      return { ...state, orderType: payload };
    case CLEAR_ORDER_TYPE:
      return { ...state, orderType: 0 };
    case CLEAR_CART_COUNT:
      return { ...state, cartCount: 0 };

    case DELETE_CART_COUNT:
      return { ...state, cartCount: state.cartCount - 1 };

    // case SET_MYORDER_LIST:
    //   return { ...state, myOrderList: payload };
    // case CLEAR_MYORDER_LIST:
    //   return initialState;
    // case SET_TRACKORDER:
    //   return { ...state, trackOrder: payload };
    // case CLEAR_TRACKORDER:
    //   return initialState;
    // case SET_ORDER_DETAILS:
    //   return { ...state, orderDetails: payload };
    case CLEAR_ORDER_DETAILS:
      return initialState;
    case SET_ALL_CATEGORIES:
      return { ...state, ProductAllCategories: payload };
    case CLEAR_ALL_CATEGORIES:
      return {
        ...state,
        ProductAllCategories: [],

        ordernote: "",
      };
    case CLEAR_ALL_ORDERINFO_CATEGORIES:
      return {
        ...state,
        orderInfo: [],
      };
    case SET_USER_DETAILS:
      return { ...state, userDetails: payload };
    case CLEAR_USER_DETAILS:
      return { ...state, userDetails: {} };
    case USER_SELECT_CATEGORIES:
      return { ...state, userSelectedCategories: payload };
    case SET_ADD_TO_CART:
      return { ...state, addToCart: payload };
    case CLEAR_ADD_TO_CART:
      return { ...state, userSelectedCategories: [] };
    case SET_SPLITPRICE_DETAILS: {
      // const {
      //   data: { minimum_order_amount, vat_percentage },
      // } = state?.getShopByPinCode;
      // if (parseInt(payload?.total_price_amount) > minimum_order_amount) {
      //   return { ...state, splitPriceDetails: payload };
      // }
      // const price_without_vat_amount = (
      //   minimum_order_amount /
      //   (1 + vat_percentage / 100)
      // ).toFixed(2);
      // const vat_amount = (
      //   minimum_order_amount - price_without_vat_amount
      // ).toFixed(2);
      // const splitPriceDetails = {
      //   total_price_amount: minimum_order_amount,
      //   offer_percentage: "0",
      //   offer_amount: "0.00",
      //   actual_price: price_without_vat_amount,
      //   vat_percentage,
      //   vat_amount,
      //   final_payable_amount: minimum_order_amount,
      //   itemsCount: 0,
      // };
      return { ...state, splitPriceDetails: payload };
    }
    case CLEAR_SPLITPRICE_DETAILS:
      return { ...state, splitPriceDetails: {} };
    // case SET_PICKUP_ADRESS:
    //   return { ...state, pickupAdress: payload };
    // case CLEAR_PICKUP_ADRESS:
    //   return initialState;

    // case SET_PICKUP_DATES:
    //   return { ...state, pickupDates: payload };
    // case CLEAR_PICKUP_DATES:
    //   return initialState;

    // case SET_PICKUP_TIME_DELIVERY_DATE:
    //   return { ...state, pickupTimesDeliveryDates: payload };
    // case CLEAR_PICKUP_TIME_DELIVERY_DATE:
    //   return initialState;

    // case SET_DELIVERY_TIMES:
    //   return { ...state, deliveryTimeSlots: payload };
    // case CLEAR_DELIVERY_TIMES:
    //   return initialState;

    case SET_GET_SHOP_BY_PINCODE: {
      // const {
      //   data: { minimum_order_amount, vat_percentage },
      // } = payload;
      // const vat_amount = (minimum_order_amount / 100) * minimum_order_amount;
      // const splitPriceDetails = {
      //   total_price_amount: minimum_order_amount,
      //   offer_percentage: "0",
      //   offer_amount: "0.00",
      //   actual_price: minimum_order_amount - vat_amount,
      //   vat_percentage,
      //   vat_amount,
      //   final_payable_amount: minimum_order_amount,
      //   itemsCount: 0,
      // };

      return { ...state, getShopByPinCode: payload };
    }
    case CLEAR_GET_SHOP_BY_PINCODE:
      return initialState;
    // case SET_PAYMENT_METHODS:
    //   return { ...state, paymentMethods: payload };
    // case CLEAR_PAYMENT_METHODS:
    //   return initialState;

    // case SET_OFFER_LIST:
    //   return { ...state, offersList: payload };
    // case CLEAR_OFFER_LIST:
    //   return initialState;
    case SET_SAVE_ADDRESS:
      return { ...state, saveAddress: payload };
    case CLEAR_SAVE_ADDRESS:
      return initialState;

    case SET_UPDATE_ADDRESS:
      return { ...state, updateAddress: payload };
    case CLEAR_UPDATE_ADDRESS:
      return initialState;

    // case SET_CREATE_SETUP_INTENT:
    //   return { ...state, createSetUpIntent: payload };
    // case CLEAR_CREATE_SETUP_INTENT:
    //   return initialState;

    // case SET_SUBMIT_ORDER:
    //   return { ...state, submitOrder: payload };
    // case CLEAR_SUBMIT_ORDER:
    //   return initialState;

    // case SET_LIST_SAVED_CARDS:
    //   return { ...state, ListSavedCards: payload };
    // case SET_SELECTED_PICKUP_TIMES_SLOT:
    //   return { ...state, selectedPickupTime: payload };
    // case SET_SELECTED_DELIVERY_DATE:
    //   return { ...state, selectedDeliveryDate: payload };
    // case SET_SELECTED_DELIVERY_TIME:
    //   return { ...state, selectedDeliveryTime: payload };
    // case CLEAR_LIST_SAVED_CARDS:
    //   return initialState;

    case SET_ADDRESS_BY_PINCODE:
      return { ...state, addressByPincode: payload };
    case CLEAR_ADDRESS_BY_PINCODE:
      return initialState;

    // case SET_GENARATE_ORDER_LINK:
    //   return { ...state, genarateOrderLink: payload };
    // case SET_COMPLETE_ORDER:
    //   return { ...state, completeOrderData: payload };
    // case SET_REFERRAL:
    //   return { ...state, referralData: payload };
    // case CLEAR_GENARATE_ORDER_LINK:
    //   return initialState;
    case SET_PRIVACY_POLICY:
      return { ...state, privacyPolicy: payload };
    case SET_ABOUT_US:
      return { ...state, aboutUs: payload };
    case SET_TERMS_CONDITIONS:
      return { ...state, termsConditions: payload };
    case SET_COOKIE_POLICY:
      return { ...state, cookiePolicy: payload };
    case SET_FAQ:
      return { ...state, faq: payload };
    case SET_SHOP_HOME:
      return { ...state, shopHome: payload };
    case SET_SHOPS_AREA:
      return { ...state, shopsArea: payload };
    case SET_SETTINGS:
      return { ...state, settings: payload };

    default:
      return state;
  }
}

export default RootsReducer;
