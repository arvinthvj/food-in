import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ApiServiceContext } from "../../core/Api/api.service";
import { end_points } from "../../core/end_points/end_points";
import { toast } from "react-toastify";
import { setLocalValue } from "../../utility";
import { reload } from "firebase/auth";
interface ExistingCustomeLoginProps {
  props: any;
}
interface FormData {
  email: string;
  password: string;
}
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
const ExistingCustomeLogin: React.FC<ExistingCustomeLoginProps> = ({
  props,
}) => {
  const { postData } = useContext(ApiServiceContext);
  const { control, handleSubmit, getValues, formState } = useForm<any>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const onSubmitExistingLogin = async (data: any) => {
    const response = await postData(end_points.login.url, data);
    // console.log(
    //   typeof response.data.data.token,
    //   "typeof response.data.data.token"
    // );

    let isToken = await (response.data.data.token &&
    typeof response?.data?.data?.token == "string"
      ? response?.data?.data?.token
      : response?.data?.data?.token);
    if (
      response?.data?.code == "200" &&
      isToken !== "" &&
      isToken !== undefined &&
      isToken !== null
    ) {
      toast.success(response?.data?.message);
      localStorage.setItem("token", isToken);
      setLocalValue("userDetails", response?.data);
      // console.log(response, "response");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      toast.error(response?.data?.message);
    }
    // console.log(data, "exit");
  };
  return (
    <>
      <div
        className="info-widget mb-4"
        // id="existing_login_form"
      >
        <h3 className="card-title">Login</h3>
        <form onSubmit={handleSubmit(onSubmitExistingLogin)}>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="form-group card-label">
                <label>Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="form-control manual_login"
                      type="email"
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group card-label">
                <label>Password</label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="form-control manual_login"
                      type="password"
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <button id="login_btn" className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
        <hr className="mb-4" />
      </div>
      {/* <div className="info-widget mb-4" id="existing_login_form">
        <h3 className="card-title">Login</h3>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label">
              <label>Email</label>
              <input
                className="form-control manual_login"
                type="email"
                id="email"
                name="email"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group card-label">
              <label>Password</label>
              <input
                className="form-control manual_login"
                type="password"
                id="password"
                name="password"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <button id="login_btn" className="btn btn-primary">
              Login
            </button>
            <span className="text-danger pl-2" id="login_error_msg"></span>
          </div>
        </div>
        <hr className="mb-4" />
      </div> */}
    </>
  );
};
export default ExistingCustomeLogin;
