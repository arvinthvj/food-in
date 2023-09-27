import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Forgotpwd } from "../../../assets/img";
import { toast, ToastContainer } from "react-toastify";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";

const ResetPassword: React.FC = () => {
  const { postData } = useContext(ApiServiceContext);
  const [emailValue, setEmailValue] = useState("");
  const [updatePwdResult, setUpdatePwdResult] = useState<any | null>({});
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const params = queryParams.get("token");

  const [pwdValue, setPwdValue] = useState("");
  const [confirmPwdValue, setConfirmPwdValue] = useState("");
  const [genError, setGenError] = useState("");
  const handleEmailChange = (e: any) => {
    setEmailValue(e.target.value);
  };

  const handlePwdChange = (e: any) => {
    setPwdValue(e.target.value);
  };

  const handleConfirmPwdChange = (e: any) => {
    setConfirmPwdValue(e.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (pwdValue == confirmPwdValue) {
      postData(end_points.resetPasswordApi.url, {
        email: emailValue,
        new_password: pwdValue,
        confirm_password: confirmPwdValue,
        token: params,
      }).then((e: any) => {
        setUpdatePwdResult({ result: e.data });
        if (e.data.code == "200") {
          // window.location.href=`${client_base_url}/`
          setTimeout(() => {
            toast("Password Changed successfully");
          }, 2000);
          navigate("/login");
        } else {
          setGenError(e.data.message);
          event.preventDefault();
          return false;
        }
      });
    } else {
      toast("Confirm Password not matching with New Password");
    }
  };

  return (
    <div className="section-signin">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-centered">
            <div className="signin" style={{ height: "37rem" }}>
              <div className="signin-header forgot-pwd">
                <img src={Forgotpwd} className="img-fluid" alt="" />
                <h1>Reset Password</h1>
              </div>
              <div className="signin-conent">
                <form className="form-signin" onSubmit={handleSubmit}>
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
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      New Password <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={pwdValue}
                      className="form-control"
                      required
                      onChange={handlePwdChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Confirm Password <span className="required">*</span>
                    </label>
                    <input
                      type="password"
                      name="password_confirmation"
                      value={confirmPwdValue}
                      className="form-control"
                      onChange={handleConfirmPwdChange}
                      required
                    />
                  </div>

                  <div className="text-danger mb-8">{genError}</div>
                  <br />
                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className="btn btn-primary account-btn"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
