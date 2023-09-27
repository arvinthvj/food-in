import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Forgotpwd } from "../../../assets/img";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState("");
  const [loginResult, setLoginResult] = useState<any | null>({});
  const [genError, setGenError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = (e: any) => {
    setEmailValue(e.target.value);
    setSuccess(false);
    setGenError("");
  };
  const { postData } = useContext(ApiServiceContext);
  const handleSubmit = (event: any) => {
    event.preventDefault();

    postData(end_points.forgetPasswordApi.url, { email: emailValue })
      .then((e: any) => {
        setLoginResult({ result: e.data });

        if (e.data.code == "200") {
          // window.location.href=`${client_base_url}/`
          setGenError("Password Rest Link send to your mail ID");
          setSuccess(true);
        } else {
          setGenError(e.data.message);
          event.preventDefault();
          setSuccess(false);
          toast.error("Entered email id is not registered!");
          return false;
        }
      })
      .catch(function (error: any) {
      });
  };

  return (
    <div className="section-signin">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-centered">
            <div className="signin">
              <div className="signin-header forgot-pwd">
                <img src={Forgotpwd} className="img-fluid" alt="" />
                <h1>Forgot password?</h1>
              </div>
              <div className="signin-conent">
                <form
                  className="form-signin"
                  name="reset"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label>
                      Your Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={emailValue}
                      className="form-control signin-form"
                      required
                      onChange={handleChange}
                    />
                    <input
                      type="hidden"
                      name="_token"
                      value="UVC2hXCgh7rSyJaKMnteV7KQxyvCX8pIqQU0tmqQ"
                    />
                  </div>
                  <div className="form-group p-fd-inst">
                    <p>
                      We will send you the instructions on how to change your
                      password to this email.
                    </p>

                    <div className="name_error">{genError}</div>
                  </div>
                  <div className="form-group text-center">
                    <input type="hidden" value=" " name="redirect_to" />
                    <button
                      disabled={success}
                      type="submit"
                      className="btn btn-primary account-btn"
                    >
                      Send Password Reset Link
                    </button>
                  </div>
                </form>
              </div>
              <div className="text-center register-link">
                <span>
                  <a href="/login">
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>
                    Back to Login
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
