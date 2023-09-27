import axios from "axios";

export const SET_SHOP_HOME = "SET_SHOP_HOME";
export const SET_SHOPS_AREA = "SET_SHOPS_AREA";

export const setShopHome = (payload: any) => ({
  type: SET_SHOP_HOME,
  payload,
});
export const setShopsBasedonArea = (payload: any) => ({
  type: SET_SHOPS_AREA,
  payload,
});

export const fetchShopHomeData = () => async (dispatch: any) => {
  const base_url = "https://api.bestatservices.com";
  const currentShopId = localStorage.getItem("currentShopHome");
  try {
    const response = await axios({
      method: "get",
      url: `${base_url}/api/shop_home_page?shop_id=${currentShopId}`,
      headers: {
        Accept: "application/json",
      },
    });
    if (response) {
      dispatch(setShopHome(response.data.data));
    }
    return response;
  } catch (error) {}
};

export const fetchShopsBasedPincode =
  (area: any, currentCodeValue: any) => async (dispatch: any) => {
    const base_url = "https://api.bestatservices.com";
    try {
      const response = await axios({
        method: "get",
        url: `${base_url}/api/shops_by_district?area_and_code=${area}-${currentCodeValue}`,
        headers: {
          Accept: "application/json",
        },
      });
      if (response) {
        dispatch(setShopsBasedonArea(response.data.data.covered_postcodes));
      }
      return response;
    } catch (error) {}
  };
