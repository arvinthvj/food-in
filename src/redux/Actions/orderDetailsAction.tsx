import { toast } from "react-toastify";
import axios from "axios";

export const SET_ORDER_DETAILS = "SET_ORDER_DETAILS";
export const CLEAR_ORDER_DETAILS = "CLEAR_ORDER_DETAILS";

export const setOrderDetails = (payload: any) => ({
  type: SET_ORDER_DETAILS,
  payload,
});
export const fetchOrderDetails = (value: string) => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";
  const notify = (message: string) => toast(message);
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("order_id", value);
    // res.header('Access-Control-Allow-Methods', 'GET, POST');
    const token = localStorage.getItem("token");
    const response = await axios({
      method: "get",
      url: `${base_url}/api/fetch_order_details?order_id=${value}`,
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
      if (response.data.Response.response_code === "-1") {
        notify(response.data.Response.response_message);
        return;
      }
      dispatch(setOrderDetails(response.data));
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
