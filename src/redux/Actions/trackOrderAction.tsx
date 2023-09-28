import axios from "axios";

export const SET_TRACKORDER = "SET_TRACKORDER";
export const CLEAR_TRACKORDER = "CLEAR_TRACKORDER";

export const setTrackOrder = (payload: any) => ({
  type: SET_TRACKORDER,
  payload,
});

export const resetState = (payload?: any) => ({
  type: CLEAR_TRACKORDER,
  payload: "",
});

export const fetchTrackOrder = (value: string) => async (dispatch: any) => {
  const base_url = "https://api.bestatrestaurant.com";
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("order_id", value);
    // res.header('Access-Control-Allow-Methods', 'GET, POST');
    const token = localStorage.getItem("token");
    const response = await axios({
      method: "get",
      url: `${base_url}/api/track_order?order_id=${value}`,
      data: bodyFormData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    // const response = await axios.post(`${base_url}/api/get_postal_codes`,{keyword:"Gu11"});
    // const result = await response.then(response => response);

    if (response) {
      // setPostalCodeList(response.data.data[0])
      dispatch(setTrackOrder(response.data.data.orders_details.order_status));
    }
  } catch (error) {}
  // axios
  //   .post(apiBase + "/auth/logout/", null, tokenConfig(getState))
  //   .then(res => {
  //     dispatch({
  //       type: LOGOUT_SUCCESS
  //     });
  //   })
  //   .catch((err) => {
  //     dispatch(returnErrors(err.response.data, err.response.status));
  //   });
};
