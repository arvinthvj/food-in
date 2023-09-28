import React, { useEffect, useState, useContext } from "react";
// import axios from "../../config";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { toast, ToastContainer } from "react-toastify";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { fbicon, gicon, topimage } from "../../../assets/img";
import { auth, provider } from "../../../config/firebase";
import { getUserDetails, setUserdetails } from "../../../redux/Actions";
import { ApiServiceContext } from "../../../core/Api/api.service";
import { end_points } from "../../../core/end_points/end_points";
import { passwordRegex } from "../../../utility";

// const base_url = process?.env?.REACT_APP_BACKEND_URL;
// const client_base_url = process?.env?.REACT_APP_BASE_URL;

const loginResultData = {
  result: {
    Response: {
      response_code: "",
      response_message: "",
      token: "",
    },
    data: {
      user_info: {
        id: "",
        name: "",
        email: "",
        mobile: "",
        notification_interest_list: [],
        android_profile_img: "",
        ios_profile_img: "",
      },
    },
  },
};

function Login() {
  const { postData } = useContext(ApiServiceContext);
  const notify = (message: string) => toast(message);

  const [emailValue, setEmailValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");
  const [genError, setGenError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [genRegError, setGenRegError] = useState("");
  const [loginResult, setLoginResult] = useState<any | null>(loginResultData);
  const [regNameValue, setRegNameValue] = useState("");
  const [regMobileValue, setRegMobileValue] = useState("");
  const [regPwdValue, setRegPwdValue] = useState("");
  const [regEmailValue, setRegEmailValue] = useState();
  const [regRefToken, setRegRefToken] = useState("");
  const [isIhaveActive, setIsIhaveActive] = useState(
    "d-inline no-float active"
  );
  const [signinFormClass, setSigninFormClass] = useState("active in");
  const [isNewUser, setIsNewUser] = useState("d-inline no-float");
  const [newUserFormClass, setNewUserFormClass] = useState("tab-pane fade");
  const [loginPasswordType, setLoginPasswordType] = useState("password");
  const [registerPasswordType, setRegisterPasswordType] = useState("password");

  const [userTypeValue, setUserTypeValue] = useState("Login");

  const params = useParams<any>();

  const initialValues = {
    email: "",
    password: "",
    name: "",
    mobile_number: "",
    terms_and_condition_accept: false,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [isChecked, setIsChecked] = useState(true);
  const [keepSigned, setkeepSigned] = useState(false);

  const [regError, setRegError] = useState(false);

  const NAME_REGEX = new RegExp(/^[a-zA-Z ]+$/);
  const PHONE_REGEX = new RegExp(
    // /^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/
    /^\+?[1-9]\d{1,14}$/
  );
  const US_PHONE_REGEX = new RegExp(
    /^(?:(?:(?:00\s?|\+)1\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/
  );
  const EMAIL_REGEX = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const settings: any = useSelector<any>((state) => state.settings);

  const keepSignedChange = (data: any) => {
    if (data === "checked") {
      if (isChecked === true) {
        setkeepSigned(true);
      }
      setIsChecked(!isChecked);
      if (isChecked === false && localStorage.getItem("remember_token")) {
        localStorage.removeItem("remember_token");
      }
    }
  };

  // const [loginResult, setLoginResult] = useState<any>();
  const handleChange = (e: any) => {
    setEmailValue(e.target.value);
  };
  const handlePwdChange = (e: any) => {
    setPwdValue(e.target.value);
  };

  const handleRegNameChange = (e: any) => {
    // setRegNameValue(e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  // const handleRegMobileChange = (e: any) => {
  //   setRegMobileValue(e.target.value);
  // }
  // const handleRegPwdChange = (e: any) => {
  //   setRegPwdValue(e.target.value);
  // }
  // const handleRegEmailChange = (e: any) => {
  //   setRegEmailValue(e.target.value);
  // }

  const handleuserTypeChange = (e: any) => {
    alert(e.target.value);
    // e.target.value="I have account"
    //setUserTypeValue(e.target.value);
  };
  useEffect(() => {
    let url = window.location.pathname;
    let remeber_token = localStorage.getItem("remember_token");
    if (url === "/login" && localStorage.getItem("remember_token")) {
      let remeber_token = localStorage.getItem("remember_token");
      handleKeepSigned(remeber_token);
    }
    if (url === "/signUp") {
      toggleClass("register");
    } else {
      toggleClass("signin");
    }
    if (params.tokenref) {
      setRegRefToken(params.tokenref);
      setIsIhaveActive("d-inline no-float");
      setSigninFormClass("tab-pane fade");
      setIsNewUser("d-inline no-float active");
      setNewUserFormClass("active in");
      setUserTypeValue("Register");
    }
  }, []);

  const handleKeepSigned = async (remember_token: any) => {
    try {
      let payload = { remember_token: remember_token };
      const response = await postData(end_points.login.url, payload);

      if (response) {
        if (response.data.Response.response_code === "-1") {
          toast(response.data.Response.response_message);
          // notify(response.data.Response.response_message)
          return;
        }
        // setPostalCodeList(response.data.data[0])
        dispatch(getUserDetails(response.data));
        // setLoginResult(response.data);
        localStorage.setItem("token", response.data.Response.token);
        if (response.data.Response.remember_token) {
          localStorage.setItem(
            "remember_token",
            response.data.Response.remember_token
          );
        }
        const isFromCheckout = localStorage.getItem("isCheckout");
        const isCompleteOrder = localStorage.getItem("isCompleteOrder");
        const order_id = localStorage.getItem("order_id");

        if (order_type === 1) {
          window.location.href = `/checkout`;
          return;
        }
        if (isFromCheckout) {
          navigate("/checkout");
        } else {
          if (isCompleteOrder) {
            navigate(`/checkout?order_id=${order_id}`);
            localStorage.removeItem("isCompleteOrder");
          } else {
            navigate("/");
            window.location.reload();
          }
        }
      }
    } catch (error) {}
  };

  const handleSubmit = async (event?: any) => {
    event.preventDefault();
    setIsSubmit(true);

    try {
      // const response: any = await axios.post(
      //   `${base_url}/api/login`,
      //   { email: emailValue, password: pwdValue, remember: keepSigned },
      //   { headers: headers }
      // );
      let payload = {
        email: emailValue,
        password: pwdValue,
        remember: keepSigned,
      };
      const response = await postData(end_points.login.url, payload);

      // const result = await response.then(response => response);
      if (response) {
        if (response.data.code === "-1") {
          toast(response.data.message);
          // notify(response.data.Response.response_message)
          return;
        }
        // setPostalCodeList(response.data.data[0])
        dispatch(getUserDetails(response.data));
        // setLoginResult(response.data);
        localStorage.setItem("token", response.data.data.token);
        if (response.data.data.token) {
          localStorage.setItem("remember_token", response.data.data.token);
        }
        const isFromCheckout = localStorage.getItem("isCheckout");
        const isCompleteOrder = localStorage.getItem("isCompleteOrder");
        const order_id = localStorage.getItem("order_id");

        if (order_type === 1) {
          window.location.href = `/checkout`;
          return;
        }
        if (isFromCheckout) {
          navigate("/checkout");
        } else {
          if (isCompleteOrder) {
            navigate(`/checkout?order_id=${order_id}`);
            localStorage.removeItem("isCompleteOrder");
          } else {
            navigate("/");
            window.location.reload();
          }
        }
      }
    } catch (error) {}

    // axios.post(`${base_url}/api/user_login`, { email: emailValue, password: pwdValue }, {
    //   headers: headers

    // }).then(e => {
    //   // setLoginResult({ result: e.data })

    //   if (e.data.Response.response_code == "1" && e.data.Response.response_message == "successfully logged in") {

    //     window.location.href = `${client_base_url}/`
    //     return false;
    //   }
    //   else {

    //     setGenError(e.data.Response.response_message);
    //     event.preventDefault();

    //     return false;
    //   }

    // })
    // event.preventDefault()
  };

  // useEffect(()=>{
  //   if (formErrors.name !== '' || formErrors.email !== '' || formErrors.mobile_number !== '' || formErrors.password !== '' || formErrors.terms_and_condition_accept !== '') {
  //     setRegError(true);
  //   }else{
  //     setRegError(false);
  //   }
  // })

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors, isSubmit]);

  const validate = (values: any) => {
    const errors = {
      email: "",
      password: "",
      name: "",
      mobile_number: "",
      terms_and_condition_accept: "",
    };
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!EMAIL_REGEX.test(values.email)) {
      errors.email = "Email ID format is invalid!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (values.password) {
      if (!passwordRegex.test(values.password)) {
        errors.password =
          "Strong password is required!(It contains one upperCase,one LowerCase,one Number,one Special Charcter,minimum 6 character)";
      }
    }
    if (!values.name) {
      errors.name = "Name is required!";
    } else if (!NAME_REGEX.test(values.name)) {
      errors.name = "Name is not valid";
    }
    if (values.name.length > 50) {
      errors.name = "Name should be less than 50 characters!";
    }
    if (!values.mobile_number) {
      errors.mobile_number = "Mobile number is required!";
    } else if (!PHONE_REGEX.test(values.mobile_number)) {
      errors.mobile_number = "Mobile number format is invalid!";
    }

    if (!values.terms_and_condition_accept === true) {
      errors.terms_and_condition_accept =
        "Please accept the terms and conditions!";
    }
    return errors;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const socialLogin = { is_social_login: "yes" };
      var event = Object.assign(result, socialLogin);
      socialLoginSubmit(event);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Google Sign-In Error:", error);
    }
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const socialLogin = { is_social_login: "yes" };
    var event = Object.assign(result, socialLogin);
    socialLoginSubmit(event);
  };

  const socialLoginSubmit = async (event: any) => {
    const userEmail = event.user.email;
    const userName = event.user.displayName;
    const userUid = event.user.uid;
    const is_social_login = event.is_social_login;

    // const base_url = 'https://api.bestatrestaurant.com';
    // const headers = {
    //   Accept: "application/json",
    // };
    try {
      let payload = {
        email: userEmail,
        userName: userName,
        userUid: userUid,
        is_social_login: is_social_login,
      };
      const response = await postData(end_points.login.url, payload);

      if (response) {
        if (response.data === "-1") {
          console.error("Login API error:", response);

          toast(response.data.message);
          // notify(response.data.Response.response_message)
          return;
        }
        // setPostalCodeList(response.data.data[0])
        dispatch(getUserDetails(response.data));
        // setLoginResult(response.data);
        localStorage.setItem("token", response.data.data.token);
        if (response.data.data.token) {
          localStorage.setItem("remember_token", response.data.data.token);
        }
        const isFromCheckout = localStorage.getItem("isCheckout");
        if (isFromCheckout) {
          navigate("/checkout");
        } else {
          navigate("/");
          window.location.reload();
        }
      }
    } catch (error) {}
  };

  const order_type: any = useSelector<any>((state) => state?.orderType);

  const handleRegistrationSubmit = async (event: any) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    let validateValue = validate(formValues);
    let details = Object.values(validateValue).map((val) => {
      return val == "" ? true : false;
    });
    let valid = details.every((val) => val === true);
    // console.log(validateValue, details, valid, "passwordValidation");

    if (!valid) {
      return;
    }
    if (regError) {
      return;
    }
    if (!EMAIL_REGEX.test(formValues.email)) {
      return false;
    }
    if (!NAME_REGEX.test(formValues.name)) {
      return false;
    }
    if (formValues.name.length > 50) {
      return false;
    }
    if (formValues.password.length === 0) {
      return false;
    }
    if (formValues.terms_and_condition_accept === false) {
      return false;
    }
    if (!PHONE_REGEX.test(formValues.mobile_number)) {
      return false;
    }
    setIsSubmit(true);

    let payload = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      mobile_number: formValues.mobile_number,
      tokenref: regRefToken,
    };
    const e = await postData(end_points.register.url, payload);

    if (e.data.code == "-1") {
      toast(e.data.message);
      // notify(response.data.Response.response_message)
      return;
    }
    setLoginResult({ result: e.data });

    if (e.data.code === "200" && e.data.message == "Registered Successfully!") {
      toast(e.data.message);

      dispatch(getUserDetails(e.data));
      // setLoginResult(response.data);
      localStorage.setItem("token", e.data.data.token);
      const isFromCheckout = localStorage.getItem("isCheckout");
      if (isFromCheckout) {
        window.location.href = `/checkout`;
      } else {
        window.location.href = `/`;
      }
      // window.location.href = `${client_base_url}/`
      return false;
    } else {
      setGenRegError(e.data.message);
      event.preventDefault();
      return false;
    }
    event.preventDefault();
  };

  const toggleClass = (e: any) => {
    //e.preventDefault()
    if (e === "signin") {
      setIsNewUser("d-inline no-float");
      setNewUserFormClass("tab-pane fade");
      setIsIhaveActive("d-inline no-float active");
      setSigninFormClass("active in");
      setUserTypeValue("Login");
      //isIhaveActive="d-inline no-float active";
      //alert(isIhaveActive)
    } else if (e === "register") {
      // alert("register")
      setIsIhaveActive("d-inline no-float");
      setSigninFormClass("tab-pane fade");
      setIsNewUser("d-inline no-float active");
      setNewUserFormClass("active in");
      setUserTypeValue("Register");
    }
  };

  // const fetchData = async () => {
  //       const base_url = "https://revamp.dreamguystech.com";
  //       try {
  //           const response :any = await axios.post(`${base_url}/api/user_login`,{ email: "john@dreamguystech.com", password: "john" },{headers:headers});
  //           // const result = await response.then(response => response);

  //           if (response) {
  //               // setPostalCodeList(response.data.data[0])
  //               setEmailValue(response.data)
  //
  //               localStorage.setItem("token",response.Response.token)
  //           }
  //       } catch (error) {
  //
  //       }
  //   }

  //   useEffect(()=>{
  //     // fetchData();
  //   },[])

  //  if(e.currentTarget.dataset.type=="signin")
  //  {

  //   setIsNewUser("d-inline no-float")
  //   setNewUserFormClass("tab-pane fade")
  //   setIsIhaveActive("d-inline no-float active");
  //   setSigninFormClass('active in')
  //   setUserTypeValue("I have account");
  //   //isIhaveActive="d-inline no-float active";
  // //alert(isIhaveActive)

  //  }
  //  else if(e.currentTarget.dataset.type=="register")
  // // alert("register")
  // {
  //  setIsIhaveActive("d-inline no-float");
  //  setSigninFormClass('tab-pane fade')
  //  setIsNewUser("d-inline no-float active")
  //  setNewUserFormClass("active in")
  //  setUserTypeValue("New User");
  // }

  return (
    <div className="section-signin">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="my-5">
              <div className="login-wrapper">
                <div className="login-grid">
                  <ul className="login-nav" role="tablist">
                    <li>
                      <h3>{userTypeValue}</h3>
                    </li>
                    {/* 
                  <li className={isNewUser} id='NewUser'>
                    <a href="#new" role="tab" data-bs-toggle="tab" className="big" data-type="register" onClick={() => toggleClass("register")}>
                      <input type="radio" name="type" value="New User" checked={userTypeValue == "New User"} data-type="register" /><span data-type="register" onChange={handleuserTypeChange}>Sign up</span>
                    </a>
                  </li> */}
                  </ul>
                  <div className="tab-content">
                    <div className={newUserFormClass} id="new">
                      <div className="signin-conent-wrapper">
                        <form
                          className="form-signin"
                          // id="signup"
                          // role="form"
                          // method="POST"
                          onSubmit={handleRegistrationSubmit}
                        >
                          <div className="mandatory-message text-center">
                            <small>All the fields are mandatory</small>
                          </div>
                          <div className="form-group">
                            <label>Name </label>
                            <input
                              id="name"
                              type="text"
                              className="form-control signin-form"
                              name="name"
                              value={formValues.name}
                              onChange={handleRegNameChange}
                            />
                            <input
                              type="hidden"
                              name="_token"
                              value="FBbQwFf2DmbwnlueNvqwZjDULKy5w9DwqGPKwXYO"
                            />
                            <div className="name_error text-danger">
                              {formErrors.name}
                            </div>
                            <div className="name_error"></div>
                          </div>
                          <div className="form-group">
                            <label>Email </label>
                            <input
                              id="email"
                              type="email"
                              className="form-control signin-form valid"
                              name="email"
                              value={formValues.email}
                              aria-invalid="false"
                              onChange={handleRegNameChange}
                            />
                            <div className="name_error text-danger">
                              {formErrors.email}
                            </div>
                          </div>
                          <div className="form-group position-relative">
                            <label>Password </label>
                            <input
                              id="password"
                              type={registerPasswordType}
                              className="form-control signin-form error"
                              name="password"
                              value={formValues.password}
                              aria-invalid="true"
                              onChange={handleRegNameChange}
                            />
                            {/* <div className="password_error text-danger"><label id="password-error" className="error" >Password can't be less than 6</label></div> */}
                            <button
                              className="eye-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                setRegisterPasswordType(
                                  registerPasswordType == "text"
                                    ? "password"
                                    : "text"
                                );
                              }}
                            >
                              <i
                                className={
                                  registerPasswordType == "text"
                                    ? "far fa-eye"
                                    : "fas fa-eye-slash"
                                }
                              ></i>
                            </button>
                            <div className="name_error text-danger">
                              {formErrors.password}
                            </div>
                          </div>
                          <div className="form-group signup-mobno">
                            <label>Mobile </label>
                            <div>
                              <div className="input-mob-no">
                                <div className="input-group">
                                  {/* <span className="input-group-addon">
                                    {
                                      settings?.WebmasterSettings
                                        ?.mobile_notification_prefix
                                    }
                                  </span> */}
                                  <input
                                    id="mobile_number"
                                    className="form-control signin-form"
                                    name="mobile_number"
                                    value={formValues.mobile_number}
                                    onChange={handleRegNameChange}
                                  />
                                </div>
                                <input
                                  id="mobile"
                                  name="mobile_number"
                                  type="hidden"
                                  value=""
                                />
                              </div>
                              <div className="name_error text-danger">
                                {formErrors.mobile_number}
                              </div>
                            </div>
                          </div>
                          <div className="form-group checkbox">
                            <label>
                              <input
                                id="terms_and_condition_accept"
                                name="terms_and_condition_accept"
                                type="checkbox"
                                onChange={handleRegNameChange}
                              />{" "}
                              I have read and agree the
                              <NavLink
                                to={"/termsAndConditions"}
                                target="_blank"
                              >
                                {" "}
                                Terms & Conditions
                              </NavLink>
                            </label>
                            <div className="name_error text-danger">
                              {formErrors.terms_and_condition_accept}
                            </div>
                          </div>
                          <div className="name_error text-danger"></div>
                          <div className="form-group text-center mb-0">
                            <button
                              id="submit_btn"
                              type="submit"
                              className="btn account-btn"
                            >
                              Create a new account
                            </button>
                          </div>
                          <div className="text-center dont-have mt-3">
                            Already have an account?{" "}
                            <NavLink className="forgot-link mb-0" to={"/login"}>
                              Login
                            </NavLink>
                          </div>
                          <div className="form-group hidden d-none">
                            <label> </label>
                            <input
                              id="tokenref"
                              type="hidden"
                              className="form-control signin-form"
                              name="tokenref"
                              value={regRefToken}
                            />
                            <div className="tokenref_error"></div>
                          </div>
                        </form>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className={signinFormClass} id="user">
                      <form
                        // name="form"
                        className="form-signin"
                        // method="GET"
                        onSubmit={handleSubmit}
                      >
                        <div className="signin-conent-wrapper">
                          <div className="form-group">
                            <label>
                              Email <span className="required">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={emailValue}
                              className="form-control signin-form"
                              onChange={handleChange}
                            />
                            <input
                              type="hidden"
                              name="_token"
                              value="FBbQwFf2DmbwnlueNvqwZjDULKy5w9DwqGPKwXYO"
                            />
                          </div>
                          {/* <div className="name_error text-danger">{formErrors.email}</div> */}
                          <div className="form-group position-relative">
                            <label>
                              Password <span className="required">*</span>
                            </label>
                            <input
                              type={loginPasswordType}
                              name="password"
                              className="form-control signin-form"
                              value={pwdValue}
                              onChange={handlePwdChange}
                            />
                            <button
                              className="eye-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                setLoginPasswordType(
                                  loginPasswordType == "text"
                                    ? "password"
                                    : "text"
                                );
                              }}
                            >
                              <i
                                className={
                                  loginPasswordType == "text"
                                    ? "far fa-eye"
                                    : "fas fa-eye-slash"
                                }
                              ></i>
                            </button>
                          </div>
                          {/* <div className="name_error text-danger">{formErrors.password}</div> */}
                          <div className="form-group">
                            <label className="md-check">
                              <input
                                type="checkbox"
                                name="remember"
                                onChange={() => keepSignedChange("checked")}
                              />{" "}
                              <i className="primary"></i>{" "}
                              <span style={{ verticalAlign: "text-bottom" }}>
                                {" "}
                                Keep me signed in
                              </span>
                            </label>
                          </div>
                          <div className="name_error text-danger">
                            {genError}
                          </div>

                          <div className="form-group text-center">
                            <input
                              type="hidden"
                              name="_token"
                              value="FBbQwFf2DmbwnlueNvqwZjDULKy5w9DwqGPKwXYO"
                            />
                            <input type="hidden" value=" " name="redirect_to" />
                            <button
                              type="submit"
                              className="btn account-btn"
                              onClick={() => {
                                console.log("clicked");
                              }}
                            >
                              Sign in
                            </button>
                          </div>
                          <div className="form-group text-center">or</div>
                          <div className="social-login">
                            {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}
                            <button type="button" className="btn">
                              <img
                                className="img-fluid"
                                src={gicon}
                                alt=""
                                onClick={signInWithGoogle}
                              />
                            </button>
                            <button type="button" className="btn">
                              <img
                                className="img-fluid"
                                src={fbicon}
                                alt=""
                                onClick={signInWithFacebook}
                              />
                            </button>
                          </div>
                          <div className="text-center">
                            <a
                              href="/forgotPassword"
                              className="Forgot-password"
                            >
                              Forgot password?
                            </a>
                          </div>
                          <div className="text-center dont-have">
                            Don’t have an account?{" "}
                            <a href="/signUp">Register</a>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
