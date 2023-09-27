import axios from "axios";
import { useContext } from "react";
import { ApiServiceContext } from "../../core/Api/api.service";
import { data } from "../../components/edit/data";

// import axios from "../../config";
import { toast } from "react-toastify";
export const SET_POSTALCODE_LIST = "SET_POSTALCODE_LIST";
export const CLEAR_POSTALCODE_LIST = "CLEAR_POSTALCODE_LIST";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const CLEAR_USER_DETAILS = "CLEAR_USER_DETAILS";
export const SET_HOMEJSON_List = "SET_HOMEJSON_List";
export const setUserdetails = (payload: any) => ({
  type: SET_USER_DETAILS,
  payload,
});
export const clearUserdetails = () => ({
  type: CLEAR_USER_DETAILS,
});
export const setHomeJsonList = (payload: any) => ({
  type: SET_HOMEJSON_List,
  payload,
});
export const getUserDetails = (payload: any) => (dispatch: any) => {
  if (payload) {
    const data = JSON.stringify(payload);
    localStorage.setItem("userDetails", data);
    dispatch(setUserdetails(payload));
  }
};
export const setPostalCodeList = (payload: any) => ({
  type: SET_POSTALCODE_LIST,
  payload,
});
export const saveThemeJsonData = (jsonData: any) => async (dispatch: any) => {
  dispatch(setHomeJsonList(jsonData));
};


export const fetchPostalCodes = (response: any) => async (dispatch: any) => {
  // const base_url = "https://api.bestatservices.com";
  try {
    if (response) {
      dispatch(setPostalCodeList(response.data.data));
      if (response.data.Response.response_code === "1") {
      } else {
        return false;
      }
    }
  } catch (error) {}
};




export const readNotification = (id: number) => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";

  const token = localStorage.getItem("token");

  try {
    // res.header('Access-Control-Allow-Methods', 'GET, POST');
    // const response = await axios({
    //   method: "post",
    //   url: `${base_url}/api/notification_mark_as_read`,
    //   headers: { "Accept": "application/json", 'Access-Control-Allow-Methods': 'GET, POST', 'Authorization': 'Bearer ' + token },
    // })
    // const response = await axios.post(`${base_url}/api/get_postal_codes`,{keyword:"Gu11"});
    // const result = await response.then(response => response);
    // if (response) {
    //   if (response.data.Response) {
    //     // dispatch(setNotificationList(response.data.Response))
    //   }
    // }
  } catch (error) {}
};

export const deleteProfile = () => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";

  const token = localStorage.getItem("token");

  try {
    // res.header('Access-Control-Allow-Methods', 'GET, POST');
    // const response = await axios({
    //   method: "post",
    //   url: `${base_url}/api/delete_user_profile`,
    //   headers: { "Accept": "application/json", 'Access-Control-Allow-Methods': 'GET, POST', 'Authorization': 'Bearer ' + token },
    // })
    // const response = await axios.post(`${base_url}/api/get_postal_codes`,{keyword:"Gu11"});
    // const result = await response.then(response => response);
    // if (response) {
    // if (response.data.Response) {
    // dispatch(setNotificationList(response.data.Response))
    // }
    // }
  } catch (error) {}
};
