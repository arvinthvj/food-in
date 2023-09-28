import axios from "axios";
export const SET_ADD_TO_CART = "SET_ADD_TO_CART";
export const CLEAR_ADD_TO_CART = "CLEAR_ADD_TO_CART";

export const setAddToCart = (payload: any) => ({
  type: SET_ADD_TO_CART,
  payload,
});

export const fetchAddToCart = (payload: any) => async (dispatch: any) => {
  localStorage.setItem("payload", JSON.stringify(payload));
  const base_url = "";
  // 'https://api.bestatrestaurant.com';

  try {
    const bodyFormData = new FormData();

    // res.header('Access-Control-Allow-Methods', 'GET, POST');
    // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6ImRhYTA3MzIzNWQ3ZGY4MDhhZmNmYWY4NzFkMDlmZmI2OTY5ZDllY2U4OTQ5Y2IwYTJjNGRhN2M1NjMwN2UxMjVjMWE1OWNkMmNlODNjMmNmIiwiaWF0IjoxNjcyODM2Njg1LCJuYmYiOjE2NzI4MzY2ODUsImV4cCI6MTcwNDM3MjY4NSwic3ViIjoiMiIsInNjb3BlcyI6W119.K-bNht00ReJZSEtW6iRSCzO2-Pw7brMuPwYgfnXr47jLY102-bO-Tk1zTaAHIvKKnoTPdnXxPTdxoy8Qs27WwIcuXE2alQp74kgEvqTPuaRTPt3PZCuRr0q1sqKZloE2mg3TYwCtc4gyiZo8VhwtlvngEZeBixzpRc9XMbP85veo-qIm3ypRCYjdf9f86ikR6TsxSAhURsL_ReayCokXBRMHzKq_IphbsAamoLup5V1mm-27QdEMT0weTtL-uN9C14nWL0d9y3XYf0NFtB0ug5unJtBMrEpwfp6cJDRN2WXgZGtqxlC8LwHWtTfK4rq4XeP9v1-qk79U2v_koxkRpIsqvUbkPechjP0mSnKz8uttKR4DLhS4Kpd1xRW6K3KlX4nIGi3GSZ0WTpG1oAN3mw7m-gd17vFZCtXTEYNNpEVvceiOy05rjpORALXyU3Gw7VnvwYzEZYH3q_oN2D0heQgblL1zAnMV9aeEAkn-YtYNxAzr-OmVJKQCa9qyuk3wPNdt6moUPUaIOnJbohzTxk0bExsjQEWomv_O71-SItZWm4O5Fd-LS43E2rRGjuMSXJIRljxGngom0fLYivkFhrybed39RJ3guifVBY_JVVY56p7KWfw6Okdu7NdsRUV0kIKc9IPIit7XXUXwImRGajQ3pc8ewe927MJeKFxRpZU"
    const response = await axios({
      method: "post",
      url: `${base_url}/api/add_to_cart`,
      data: payload,
      headers: {
        Accept: "application/json",
        //  "Authorization": "Bearer " + token,
        "Access-Control-Allow-Methods": "GET, POST",
      },
    });
    if (response) {
      // setPostalCodeList(response.data.data[0])
      dispatch(setAddToCart(response.data));
    }
  } catch (error) {}
};
