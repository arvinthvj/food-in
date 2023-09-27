import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../policyActions";
export const SET_PICKUP_ADRESS = "SET_PICKUP_ADRESS";
export const CLEAR_PICKUP_ADRESS = "CLEAR_PICKUP_ADRESS";
export const SET_PICKUP_DATES = "SET_PICKUP_DATES";
export const CLEAR_PICKUP_DATES = "CLEAR_PICKUP_DATESS";
export const SET_PICKUP_TIME_DELIVERY_DATE = "SET_PICKUP_TIME_DELIVERY_DATE";
export const CLEAR_PICKUP_TIME_DELIVERY_DATE =
  "CLEAR_PICKUP_TIME_DELIVERY_DATE";
export const SET_DELIVERY_TIMES = "SET_DELIVERY_TIMES";
export const SET_SELECTED_PICKUP_TIMES_SLOT = "SET_SELECTED_PICKUP_TIMES_SLOT";
export const SET_SELECTED_DELIVERY_DATE = "SET_SELECTED_DELIVERY_DATE";
export const SET_SELECTED_DELIVERY_TIME = "SET_SELECTED_DELIVERY_TIME";
export const CLEAR_DELIVERY_TIMES = "CLEAR_DELIVERY_TIMES";
export const SET_GET_SHOP_BY_PINCODE = "SET_GET_SHOP_BY_PINCODE";
export const CLEAR_GET_SHOP_BY_PINCODE = "CLEAR_GET_SHOP_BY_PINCODE";
export const SET_PAYMENT_METHODS = "SET_PAYMENT_METHODS";
export const CLEAR_PAYMENT_METHODS = "CLEAR_PAYMENT_METHODS";
export const SET_OFFER_LIST = "SET_OFFER_LIST";
export const CLEAR_OFFER_LIST = "CLEAR_OFFER_LIST";
export const SET_SAVE_ADDRESS = "SET_SAVE_ADDRESS";
export const CLEAR_SAVE_ADDRESS = "CLEAR_SAVE_ADDRESS";
export const SET_UPDATE_ADDRESS = "SET_UPDATE_ADDRESS";
export const CLEAR_UPDATE_ADDRESS = "CLEAR_UPDATE_ADDRESS";
export const SET_LIST_SAVED_CARDS = "SET_LIST_SAVED_CARDS";
export const CLEAR_LIST_SAVED_CARDS = "CLEAR_LIST_SAVED_CARDS";
export const SET_CREATE_SETUP_INTENT = "SET_CREATE_SETUP_INTENT";
export const CLEAR_CREATE_SETUP_INTENT = "CLEAR_CREATE_SETUP_INTENT";
export const SET_SUBMIT_ORDER = "SET_SUBMIT_ORDER";
export const CLEAR_SUBMIT_ORDER = "CLEAR_SUBMIT_ORDER";
export const SET_INTENT_SECRET = "SET_INTENT_SECRET";

export const SET_ADDRESS_BY_PINCODE = "SET_ADDRESS_BY_PINCODE";
export const CLEAR_ADDRESS_BY_PINCODE = "CLEAR_ADDRESS_BY_PINCODE";

export const SET_GENARATE_ORDER_LINK = "SET_GENARATE_ORDER_LINK";
export const CLEAR_GENARATE_ORDER_LINK = "CLEAR_GENARATE_ORDER_LINK";
export const SET_COMPLETE_ORDER = "SET_COMPLETE_ORDER";
export const SET_REFERRAL = "SET_REFERRAL";
export const SET_SPLITPRICE_DETAILS = "SET_SPLITPRICE_DETAILS";
export const SET_REPEAT_ORDER_ID = "SET_REPEAT_ORDER_ID";
export const CLEAR_REPEAT_ORDER_ID = "CLEAR_REPEAT_ORDER_ID";

// ----------------------------
export const setRepeatOrderid = (payload: any) => ({
  type: SET_REPEAT_ORDER_ID,
  payload,
});
export const clearRepeatOrderid = (payload: any) => ({
  type: CLEAR_REPEAT_ORDER_ID,
  payload,
});

// export const base_url = "s";
export const setGenarateOrderLink = (payload: any) => ({
  type: SET_GENARATE_ORDER_LINK,
  payload,
});

export const setAddressByPincode = (payload: any) => ({
  type: SET_ADDRESS_BY_PINCODE,
  payload,
});

export const setPickupAdress = (payload: any) => ({
  type: SET_PICKUP_ADRESS,
  payload,
});

export const setPickupDates = (payload: any) => ({
  type: SET_PICKUP_DATES,
  payload,
});

export const setPickupTimesDeliveryDates = (payload: any) => ({
  type: SET_PICKUP_TIME_DELIVERY_DATE,
  payload,
});

export const setDeliveryTimeSlots = (payload: any) => ({
  type: SET_DELIVERY_TIMES,
  payload,
});

export const setSelectedPickupTimeSlot = (payload: any) => ({
  type: SET_SELECTED_PICKUP_TIMES_SLOT,
  payload,
});

export const setSelectedDeliveryDate = (payload: any) => ({
  type: SET_SELECTED_DELIVERY_DATE,
  payload,
});
export const setCompleteOrder = (payload: any) => ({
  type: SET_COMPLETE_ORDER,
  payload,
});
export const setReferral = (payload: any) => ({
  type: SET_REFERRAL,
  payload,
});

export const setSelectedDeliveryTimeSlot = (payload: any) => ({
  type: SET_SELECTED_DELIVERY_TIME,
  payload,
});

export const setGetShopByPinCode = (payload: any) => ({
  type: SET_GET_SHOP_BY_PINCODE,
  payload,
});

export const setPaymentMethods = (payload: any) => ({
  type: SET_PAYMENT_METHODS,
  payload,
});

export const setOfferList = (payload: any) => ({
  type: SET_OFFER_LIST,
  payload,
});

export const setSaveAddress = (payload: any) => ({
  type: SET_SAVE_ADDRESS,
  payload,
});

export const setUpdateAddress = (payload: any) => ({
  type: SET_UPDATE_ADDRESS,
  payload,
});

export const setCreateSetUpIntent = (payload: any) => ({
  type: SET_CREATE_SETUP_INTENT,
  payload,
});

export const setSubmitOrder = (payload: any) => ({
  type: SET_SUBMIT_ORDER,
  payload,
});

export const setIntentSecret = (payload: any) => ({
  type: SET_INTENT_SECRET,
  payload,
});

export const setListSavedCards = (payload: any) => ({
  type: SET_LIST_SAVED_CARDS,
  payload,
});

export const setSplitPriceDetails = (payload: any) => ({
  type: SET_SPLITPRICE_DETAILS,
  payload,
});

export const fetchGenarateOrderLink = () => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";

  try {
    const token = localStorage.getItem("token");
    const payloadOrderLink = localStorage.getItem("payload");
    const cartInformationData = localStorage.getItem("cartInformationData");
    const parsepayloadOrderLink = JSON.parse(payloadOrderLink!);
    parsepayloadOrderLink.cartInformationData = cartInformationData;
    const response = await axios({
      method: "post",
      url: `${base_url}/api/generate_order_link`,
      data: parsepayloadOrderLink,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    if (response) {
      dispatch(setGenarateOrderLink(response.data));
    }
  } catch (error) {}
};

export const fetchAddressByPincode = () => async (dispatch: any) => {
  // const base_url =
  //  'https://api.bestatservices.com';

  try {
    // const bodyFormData = new FormData();
    // bodyFormData.append('limit', limit);

    const token = localStorage.getItem("token");
    const postalCode = JSON.parse(localStorage.getItem("postalCode") || "");
    const response = await axios({
      method: "get",
      url: `${base_url}/api/get_postal_codes?${postalCode}`,
      // data: bodyFormData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    if (response.data.Response.response_code !== "-1") {
      // setPostalCodeList(response.data.data[0])
      dispatch(setAddressByPincode(response.data));
    } else {
      toast("No Address details found for selected postal code");
    }
  } catch (error) {}
};

export const fetchPickupAdress = () => async (dispatch: any) => {
  // const base_url = 'https://api.bestatservices.com';

  try {
    // const bodyFormData = new FormData();
    // bodyFormData.append('limit', limit);

    const token = localStorage.getItem("token");

    const response = await axios({
      method: "get",
      url: `${base_url}/api/user_addresses`,
      // data: bodyFormData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    if (response) {
      // setPostalCodeList(response.data.data[0])
      dispatch(setPickupAdress(response.data.data));
    }
  } catch (error) {}
};

export const fetchPickupDates = () => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";
  try {
    // const bodyFormData = new FormData();
    // bodyFormData.append('limit', limit);

    const token = localStorage.getItem("token");
    const shopId = localStorage.getItem("shop_id");
    const response = await axios({
      method: "get",
      url: `${base_url}/api/get_pickup_dates?shop_id=${shopId}`,
      // data: bodyFormData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    if (response) {
      // setPostalCodeList(response.data.data[0])
      dispatch(setPickupDates(response.data));
      var yearFormat = new Date().getFullYear();
      var monthFormat = new Date().getMonth() + 1;
      var dateFormat = new Date().getDate();
      var currentDateFormat = yearFormat + "-" + monthFormat + "-" + dateFormat;
      dispatch(fetchPickupTimeSlotsDeliveryDates(currentDateFormat));
    }
  } catch (error) {}
};

export const fetchPickupTimeSlotsDeliveryDates =
  (selectedPickupDate?: any) => async (dispatch: any) => {
    const base_url = "https://api.bestatservices.com";
    try {
      // const bodyFormData = new FormData();
      // bodyFormData.append('limit', limit);

      const token = localStorage.getItem("token");
      const shopId = localStorage.getItem("shop_id");
      const response = await axios({
        method: "get",
        url: `${base_url}/api/get_pickup_timeslots_delivery_dates?order_type=1&shop_id=${shopId}&total_processing_hours=48&pickup_date=${selectedPickupDate}`,
        // data: bodyFormData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Methods": "GET, POST",
        },
      });
      if (response) {
        // setPostalCodeList(response.data.data[0])
        dispatch(setPickupTimesDeliveryDates(response.data));
        const pickupTimeSlotObj = {
          id: response.data.data.pickup_timeslots[0].id,
          is_selected: response.data.data.pickup_timeslots[0].is_selected,
          timeslot: response.data.data.pickup_timeslots[0].timeslot,
        };
        dispatch(setSelectedPickupTimeSlot(pickupTimeSlotObj));
        const pickUpTime = response.data.data.pickup_timeslots[0].id;
        const deliveryDate = response.data.data.delivery_dates[0].date;
        dispatch(fetchDeliveryTimeSlots(pickUpTime, deliveryDate));
      }
    } catch (error) {}
  };

export const fetchDeliveryTimeSlots =
  (pickUpTime?: string, deliveryDate?: string) => async (dispatch: any) => {
    const base_url = "https://api.bestatservices.com";

    try {
      // const bodyFormData = new FormData();
      // bodyFormData.append('limit', limit);

      const token = localStorage.getItem("token");
      const shopId = localStorage.getItem("shop_id");
      const response = await axios({
        method: "get",
        url: `${base_url}/api/get_delivery_timeslots?shop_id=${shopId}&pickup_timeslot_id=${pickUpTime}&delivery_date=${deliveryDate}`,
        // data: bodyFormData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Methods": "GET, POST",
        },
      });
      if (response) {
        // setPostalCodeList(response.data.data[0])
        dispatch(setDeliveryTimeSlots(response.data));
      }
    } catch (error) {}
  };

export const fetchGetShopByPinCode =
  (response: any) => async (dispatch: any) => {
    // let postalCode = JSON.parse(data);
    try {
      if (response) {
        if (response.data.Response.response_code === "-1") {
          return false;
        }
        // setPostalCodeList(response.data.data[0])
        dispatch(setGetShopByPinCode(response.data));
        localStorage.setItem("shop_id", response.data.data.shop.id);
        return response.data;
      }
    } catch (error) {
      return false;
    }
  };

export const fetchPaymentMethods = () => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `${base_url}/api/payment_methods`,
      // data: bodyFormData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    if (response) {
      // setPostalCodeList(response.data.data[0])
      dispatch(setPaymentMethods(response.data));
    }
  } catch (error) {}
};

export const fetchOfferDetailsList = () => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";
  const token = localStorage.getItem("token");
  const shop_id = localStorage.getItem("shop_id");
  let totalCartPrice = JSON.parse(localStorage.getItem("payload") || "");
  try {
    const response = await axios({
      method: "get",
      url: `${base_url}/api/get_offers_list?shop_id=${shop_id}&total_amount=${totalCartPrice.total_price}`,
      // data: bodyFormData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    if (response) {
      // setPostalCodeList(response.data.data[0])
      dispatch(setOfferList(response.data));
    }
  } catch (error) {}
};

export const fetchSaveAddress = (payloadData: any) => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "post",
      url: `${base_url}/api/save_address`,
      data: payloadData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    if (response.data.Response.response_code !== "-1") {
      localStorage.setItem("savedAddress", JSON.stringify(response.data));
      // setPostalCodeList(response.data.data[0])
      dispatch(setSaveAddress(response.data));
      return true;
    } else {
      toast("Selected address already exist");
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const fetchUpdateAddress =
  (payloadUpdateData: any) => async (dispatch: any) => {
    const base_url = "https://api.bestatservices.com";
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "post",
        url: `${base_url}/api/update_address`,
        data: payloadUpdateData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Methods": "GET, POST",
        },
      });
      if (response) {
        // setPostalCodeList(response.data.data[0])
        dispatch(setUpdateAddress(response.data));
      }
    } catch (error) {}
  };

export const fetchCreateSetUpIntent =
  (cardStatus: any) => async (dispatch: any) => {
    const base_url = "https://api.bestatservices.com";
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "post",
        url: `${base_url}/api/create_setup_intent?card_id=${cardStatus}`,
        // data: payloadData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Methods": "GET, POST",
        },
      });
      if (response) {
        // setPostalCodeList(response.data.data[0])
        dispatch(setCreateSetUpIntent(response.data));
        localStorage.setItem(
          "setup_intent_secret",
          response.data.data.intent_client_secret
        );
        localStorage.setItem(
          "payment_method",
          response.data.data.payment_method
        );
      }
    } catch (error) {}
  };

export const fetchSubmitOrder =
  (payloadSubmitData: any) => async (dispatch: any) => {
    const base_url = "https://api.bestatservices.com";
    const token = localStorage.getItem("token");
    const notify = (message: string) => toast(message);
    try {
      const response = await axios({
        method: "post",
        url: `${base_url}/api/submit_order`,
        data: payloadSubmitData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET, POST",
        },
      });
      if (response) {
        if (response.data.Response.response_code === "-1") {
          if (
            response.data.Response.response_message ===
            "parameter missing - pickup_time_slot_id"
          ) {
            toast("Pickup/Delivery time is required");
            return;
          } else if (
            response.data.Response.response_message ===
            "order not created - invalid stripe token given"
          ) {
            toast("Payment Method is required");
            return;
          } else if (
            response.data.Response.response_message ===
            "parameter missing - pickup_address"
          ) {
            toast("PickUp Address is required");
            return;
          } else if (
            response.data.Response.response_message ===
            "order not created - non stripe generic error"
          ) {
            toast("Entered Card details already used and saved");
            return;
          }
        }
        localStorage.setItem(
          "submitOrderResponses",
          JSON.stringify(response.data)
        );
        // setPostalCodeList(response.data.data[0])
        dispatch(setSubmitOrder(response.data));
      }
    } catch (error) {}
  };

export const fetchListSavedCards = () => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";
  const token = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `${base_url}/api/list_saved_cards`,
      // data: payloadSubmitData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,

        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    if (response) {
      // setPostalCodeList(response.data.data[0])
      dispatch(setListSavedCards(response.data));
      return response.data.data;
    }
  } catch (error) {}
};

export const fetchPickupDelivery =
  (order_type: any, shop_id: any) => async (dispatch: any) => {
    let token = localStorage.getItem("token");
    const base_url = "https://api.bestatservices.com";
    //  const order_type = payload.order_type
    //  const shop_id = payload.shop_id
    //  const total_processing_hours = payload.process_time_1_1_1
    var yearFormat = new Date().getFullYear();
    var monthFormat = new Date().getMonth() + 1;
    var dateFormat = new Date().getDate();
    var currentDateFormat = yearFormat + "-" + monthFormat + "-" + dateFormat;
    try {
      const bodyFormData = new FormData();

      const response = await axios({
        method: "get",
        url: `${base_url}/api/get_pickup_and_delivery_time?order_type=${order_type}&shop_id=${shop_id}&total_processing_hours=48&pickup_date=${currentDateFormat}`,
        //  data: payload,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response) {
        const selectedDeliveryDate =
          response.data.data.pickup_timeslots_delivery_dates.delivery_dates[0]
            .date;
        const pickup_timeslots =
          response.data.data.pickup_timeslots_delivery_dates
            .pickup_timeslots[0];
        const delivery_timeslots =
          response.data.data.delivery_timeslots.delivery_timeslots[0];
        // localStorage.setItem("selectedDeliveryDate",selectedDeliveryDate)
        // localStorage.setItem("pickup_timeslots",JSON.stringify(pickup_timeslots))
        // localStorage.setItem("delivery_timeslots",JSON.stringify(delivery_timeslots))
        dispatch(setSelectedDeliveryTimeSlot(delivery_timeslots));
        dispatch(setSelectedDeliveryDate(selectedDeliveryDate));
        dispatch(setSelectedPickupTimeSlot(pickup_timeslots));

        // dispatch(setAddress([
        //     {
        //       startDate,
        //       selectedPickupTimeSlot: { ...pickup_timeslots },
        //       selectedDeliveryDate,
        //       selectedDeliveryTimeSlot: { ...delivery_timeslots },
        //     },
        //   ]));
      }
      return response;
    } catch (error) {}
  };

export const fetchCompleteOrderData =
  (completeOrderId: any) => async (dispatch: any) => {
    let token = localStorage.getItem("token");
    const base_url = "https://api.bestatservices.com";
    try {
      const response = await axios({
        method: "get",
        url: `${base_url}/api/complete_order?order_ref=${completeOrderId.order_id}`,
        //  data: payload,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response) {
        if (Object.keys(response.data.data).length === 0) {
          return false;
        }
        let orderDetails = response.data.data;
        dispatch(setCompleteOrder(orderDetails));
      }
      return response;
    } catch (error) {}
  };

export const fetchReferralData = () => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";
  const token = localStorage.getItem("token");
  let totalCartPrice = JSON.parse(localStorage.getItem("payload") || "");
  try {
    const response = await axios({
      method: "get",
      url: `${base_url}/api/get_price_split_details_referral?total_price_amount=${totalCartPrice.total_price}`,
      // data: payloadData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    if (response) {
      dispatch(setReferral(response.data));
      dispatch(
        setSplitPriceDetails({
          ...response.data?.data,
          itemsCount: totalCartPrice?.itemsCount,
        })
      );
    }
  } catch (error) {}
};
