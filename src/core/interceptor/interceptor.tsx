import React, { createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";
import { SpinnerContext } from "../../shared/shared.module";
import { end_points } from "../end_points/end_points";

export const AxiosContext = createContext<any>({});

const AxiosProvider = (props: { children: any }) => {
  const axiosInstance: AxiosInstance = axios.create();
  {
    // ' https://bestatrestaurant.com'
    // 'https://demo1.bestatrestaurant.com'
    // '  https://demo2.bestatrestaurant.com
    // 'deploy urls
    //base urls
    // demo1 - api.demo1.bestatrestaurant.com
    // demo2 - api.demo2
  }
  const { showLoader, hideLoader } = useContext(SpinnerContext);
  const hideLoadersApi: Array<string> = [
    end_points.priceSplitListApi.url,
    end_points.locationfetchAPi.url,
  ];
  axiosInstance.interceptors.request.use(
    (config: any) => {
      const validUrl = config?.url?.split("?")[0]; //config?.url

      if (!hideLoadersApi.includes(validUrl)) {
        showLoader();
      }
      const token = localStorage.getItem("token");
      // config.baseURL = `https://api.bestatrestaurant.com/api/`;
      let host = window.location.hostname;
      let origin = "https://bestatrestaurant.com";
      let domain = "com";
      let companyName = "";
      // "demo2";
      if (host !== "localhost") {
        origin = window.location.origin;
        let client = origin.split("/");
        client = client[client.length - 1].split(".");
        companyName = client[0];
        if (client.length === 3) {
          domain = `${client[client.length - 2]}.${client[client.length - 1]}`;
        } else if (client.length > 3) {
          domain = `${client[client.length - 3]}.${client[client.length - 2]}.${
            client[client.length - 1]
          }`;
        } else {
          domain = client[client.length - 1];
        }
      }
      if (host === "localhost") {
        config.baseURL = `https://api.bestatrestaurant.${domain}/api/`;
        // `https://api.${companyName}.bestatrestaurant.${domain}`;
      } else {
        config.baseURL = `https://api.${companyName}.${domain}/api/`;
      }
      config.headers = {
        ...config.headers,
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, POST",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        // encode data and send as form data using content type
      };

      return config;
    },
    (error: any) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    async (response: any) => {
      hideLoader();
      // await handleResponseStatus(response);
      return response;
    },
    async (error: any) => {
      hideLoader();
      // await handleResponseStatus(error.response);
      return Promise.reject(error);
    }
  );
  const handleResponseStatus = async (response: any) => {
    switch (response.status) {
      case 200:
        break;
      case 422:
        // showError(response.data.message);
        break;
      case 500:
        // showError("Internal server error");
        // showServerError("Internal server error");
        break;
      case 404:
        // showError("API Request not found");
        break;
      case 401:
        // showError("Unauthorized");
        // localStorage.removeItem("token");
        // setTimeout(() => {
        //   window.location.href = "/login";
        // }, 1000);
        break;
      default:
        // showError("Error type not found");

        break;
    }
  };
  return (
    <AxiosContext.Provider value={{ axiosInstance }}>
      {props.children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
