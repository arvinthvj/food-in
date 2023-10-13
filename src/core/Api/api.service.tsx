import React, { createContext, useContext } from "react";
import { AxiosContext } from "../interceptor/interceptor";
import { useDispatch } from "react-redux";
import { saveThemeJsonData } from "../../redux/Actions";
import { data } from "../../components/edit/data";
export const ApiServiceContext = createContext<any>({});

const ApiServiceProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const { axiosInstance } = useContext(AxiosContext);
  const dispatch: any = useDispatch();

  const postData = (url: string, data: any) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
          return error;
        });
    });
  };

  const getData = (url: string) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const patchData = (url: string) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .patch(url)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const putData = (url: string, data: any) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(url, data)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  const deleteData = (url: string, data: any) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .destroy(url, data)
        .then((res: any) => {
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const save_cms_data = async (jsonData: any) => {
    let data = JSON.stringify(jsonData);
    console.log("savedata", data);
    const response = await postData("json_store", { cms_json: data });
    if (response) {
      dispatch(saveThemeJsonData(jsonData));
      get_cms_data();
    }
  };
  const fetchCroppedImage = async (data: any) => {
    const response: any = await postData("image_compress", { img: data });
    if (response) {
      return response.data.data.image;
    } else return false;
  };
  const validateThemEditToken = async (token: any) => {
    const response: any = await postData("validate_token", { token: token });
    if (response) {
      if (response.data.code === "200") {
        return true;
      } else {
        return false;
      }
    }
  };
  const get_cms_data = async () => {
    const response: any = await getData("json_view");
    if (response) {
      dispatch(saveThemeJsonData(JSON.parse(response.data.data.data)));
      console.log("get_cms_data",JSON.parse(response.data.data.data))
    }
  };

  return (
    <ApiServiceContext.Provider
      value={{
        getData,
        postData,
        patchData,
        putData,
        deleteData,
        save_cms_data,
        get_cms_data,
        fetchCroppedImage,
        validateThemEditToken,
      }}
    >
      {props.children}
    </ApiServiceContext.Provider>
  );
};

export default ApiServiceProvider;
