import { toast } from "react-toastify";
import axios from "axios";

export const SET_MYORDER_LIST = "SET_MYORDER_LIST";
export const CLEAR_MYORDER_LIST = "CLEAR_MYORDER_LIST";

export const setMyOrderList = (payload: any) => ({
  type: SET_MYORDER_LIST,
  payload,
});
export const fetchMyOrders =
  (limit: number, page: number, sort: number, order_status: string) =>
  async (dispatch: any) => {
    const base_url = "https://api.bestatrestaurant.com";
    const notify = (message: string) => toast(message);

    try {
      const bodyFormData = new FormData();
      // bodyFormData.append('limit', limit);
      // // formData.getAll('limit')
      // bodyFormData.append('page', page);
      // bodyFormData.append('sort', sort);
      // bodyFormData.append('order_status', order_status);

      // res.header('Access-Control-Allow-Methods', 'GET, POST');
      // const res = JSON.parse(localStorage.getItem("userInfo") || "");
      // const token = res.data.Response.token;
      //
      const token = localStorage.getItem("token");

      const response = await axios({
        method: "get",
        url: `${base_url}/api/fetch_my_orders?limit=${limit}&page=${page}&sort=${sort}&order_status=${order_status}`,
        data: bodyFormData,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Methods": "GET, POST",
        },
      });
      if (response) {
        // setPostalCodeList(response.data.data[0])
        if (response.data.Response.response_code === "-1") {
          // notify(response.data.Response.response_message)
          return;
        }
        dispatch(setMyOrderList(response.data));
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
