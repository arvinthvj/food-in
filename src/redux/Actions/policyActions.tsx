import axios from "axios";

export const SET_PRIVACY_POLICY = "SET_PRIVACY_POLICY";
export const SET_ABOUT_US = "SET_ABOUT_US";
export const SET_TERMS_CONDITIONS = "SET_TERMS_CONDITIONS";
export const SET_COOKIE_POLICY = "SET_COOKIE_POLICY";
export const SET_FAQ = "SET_FAQ";
export const base_url = "https://api.bestatservices.com";

export const setPrivacyPolicy = (payload: any) => ({
  type: SET_PRIVACY_POLICY,
  payload,
});
export const setAboutUs = (payload: any) => ({
  type: SET_ABOUT_US,
  payload,
});
export const setTermsandCondition = (payload: any) => ({
  type: SET_TERMS_CONDITIONS,
  payload,
});
export const setCookiePolicy = (payload: any) => ({
  type: SET_COOKIE_POLICY,
  payload,
});

export const setFaq = (payload: any) => ({
  type: SET_FAQ,
  payload,
});

export const fetchPrivacyPolicyData = () => async (dispatch: any) => {
  try {
    const response = await axios({
      method: "get",
      url: `${base_url}/api/sitepage/Privacy`,
      headers: {
        Accept: "application/json",
      },
    });
    if (response) {
      dispatch(setPrivacyPolicy(response.data.data));
    }
    return response;
  } catch (error) {}
};

export const fetchAboutUsData = () => async (dispatch: any) => {
  try {
    const response = await axios({
      method: "get",
      url: `${base_url}/api/sitepage/About Us`,
      headers: {
        Accept: "application/json",
      },
    });
    if (response) {
      dispatch(setAboutUs(response.data.data));
    }
    return response;
  } catch (error) {}
};

export const fetchTermsandConditionData = () => async (dispatch: any) => {
  try {
    const response = await axios({
      method: "get",
      url: `${base_url}/api/sitepage/Terms & Conditions`,
      headers: {
        Accept: "application/json",
      },
    });
    if (response) {
      dispatch(setTermsandCondition(response.data.data));
    }
    return response;
  } catch (error) {}
};

export const fetchCookiePolicyData = () => async (dispatch: any) => {
  try {
    const response = await axios({
      method: "get",
      url: `${base_url}/api/sitepage/Cookie Policy`,
      headers: {
        Accept: "application/json",
      },
    });
    if (response) {
      dispatch(setCookiePolicy(response.data.data));
    }
    return response;
  } catch (error) {}
};

export const fetchFaqData = () => async (dispatch: any) => {
  try {
    const response = await axios({
      method: "get",
      url: `${base_url}/api/faqlist`,
      headers: {
        Accept: "application/json",
      },
    });
    if (response) {
      dispatch(setFaq(response.data.data));
    }
    return response;
  } catch (error) {}
};
