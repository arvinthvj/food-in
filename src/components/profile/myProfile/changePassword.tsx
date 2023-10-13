import React, { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { breadcrumbbg } from "../../../assets/img";
import { Controller, useForm } from "react-hook-form";
import { end_points } from "../../../core/end_points/end_points";
import { toast } from "react-toastify";
import { ApiServiceContext } from "../../../core/Api/api.service";

const schemaChangepassword = yup
  .object({
    currentpassword: yup
      .string()
      .required("Please enter the password!")
      .min(6)
      .max(16)
      .trim(),
    newpassword: yup
      .string()
      .required("Please enter the password!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .min(6)
      .max(16)
      .trim(),
    confirmpassword: yup
      .string()
      .required("Please enter the password!")
      .min(6)
      .max(16)
      .trim(),
  })
  .required();
const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const { postData } = useContext(ApiServiceContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaChangepassword),
  });
  const handleLogout = (e: any = "") => {
    e && e.preventDefault();
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  const [show, setShow] = useState<any>({ CUPW: "", NPW: "", COPW: "" });
  const textChange = (dd: any) => {
    if (dd === "CUPW") {
      setShow({ ...show, CUPW: show.CUPW === true ? false : true });
    }
    if (dd === "NPW") {
      setShow({ ...show, NPW: show.NPW === true ? false : true });
    }
    if (dd === "COPW") {
      setShow({ ...show, COPW: show.COPW === true ? false : true });
    }
  };
  const onSubmit = async (data: any) => {
    // console.log(data, "chagngedata");
    if (data?.newpassword == data?.confirmpassword) {
      try {
        let payLoad = {
          old_password: data?.currentpassword,
          new_password: data?.confirmpassword,
        };
        // console.log(payLoad, 'payload')
        const response = await postData(
          end_points.updateChangedPasswordApi.url,
          payLoad
        );
        if (response.data.code == "200") {
          toast.success(response.data.message);
          setTimeout(() => {
            handleLogout();
          }, 1500);
        }

        // console.log(res)
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("ConfirmPassword must be match with Newpassword!");
    }
  };
  return (
    <>
      <div
        className="breadcrumpset"
        style={{ backgroundImage: `url(${breadcrumbbg})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Manage Address</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Manage Address</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-myprofile">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="sidebar-nav">
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myProfile");
                      }}
                    >
                      <i className="fas fa-user-circle"></i>
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myOrders");
                      }}
                    >
                      <i className="fas fa-tag"></i>My Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myAddress");
                      }}
                    >
                      <i className="fas fa-map-marker-alt"></i>My Address
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/changePassword");
                      }}
                      className="active"
                    >
                      <i className="fas fa-lock"></i>Change Password
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        handleLogout(e);
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="page-inner-header mb-4">
                    <h5 className="mb-1">Change password</h5>
                    <p className="text-muted mb-0">
                      Keep password safe and how ever you can change it anytime.
                    </p>
                  </div>
                  <form
                    id="change_password_form"
                    className="settings-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="from-group">
                          <label>
                            Current Password{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="currentpassword"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <input
                                  value={value}
                                  type={show?.CUPW ? "text" : "password"}
                                  placeholder="Enter Password"
                                  className="form-control"
                                  onChange={onChange}
                                />
                                <span
                                  className={
                                    show?.CUPW
                                      ? "eye-danger text-password"
                                      : "text-password"
                                  }
                                  onClick={() => {
                                    textChange("CUPW");
                                  }}
                                >
                                  <i
                                    className={
                                      show?.CUPW
                                        ? "far fa-eye"
                                        : "fa fa-eye-slash"
                                    }
                                    aria-hidden={show?.CUPW ? "false" : "true"}
                                  ></i>
                                </span>
                                {errors.currentpassword?.message ? (
                                  <label style={{ color: "red" }}>
                                    {errors.currentpassword?.message}
                                  </label>
                                ) : null}
                              </>
                            )}
                          />
                        </div>
                        <div className="from-group">
                          <label>
                            New Password <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="newpassword"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <input
                                  value={value}
                                  type={show?.NPW ? "text" : "password"}
                                  placeholder="Enter Password"
                                  className="form-control"
                                  onChange={onChange}
                                />
                                <span
                                  className={
                                    show?.NPW
                                      ? "eye-danger text-password"
                                      : "text-password"
                                  }
                                  onClick={() => {
                                    textChange("NPW");
                                  }}
                                >
                                  <i
                                    className={
                                      show?.NPW
                                        ? "far fa-eye"
                                        : "fa fa-eye-slash"
                                    }
                                    aria-hidden={show?.NPW ? "false" : "true"}
                                  ></i>
                                </span>
                                {errors?.newpassword?.message ? (
                                  <label style={{ color: "red" }}>
                                    {errors?.newpassword?.message}
                                  </label>
                                ) : null}
                              </>
                            )}
                          />
                        </div>
                        <div className="from-group mb-0">
                          <label>
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="confirmpassword"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <input
                                  value={value}
                                  type={show?.COPW ? "text" : "password"}
                                  placeholder="Enter Password"
                                  className="form-control"
                                  onChange={onChange}
                                />
                                <span
                                  className={
                                    show?.COPW
                                      ? "eye-danger text-password"
                                      : "text-password"
                                  }
                                  onClick={() => {
                                    textChange("COPW");
                                  }}
                                >
                                  <i
                                    className={
                                      show?.COPW
                                        ? "far fa-eye"
                                        : "fa fa-eye-slash"
                                    }
                                    aria-hidden={show?.COPW ? "false" : "true"}
                                  ></i>
                                </span>
                                {errors.confirmpassword?.message ? (
                                  <label style={{ color: "red" }}>
                                    {errors.confirmpassword?.message}
                                  </label>
                                ) : null}
                              </>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Update password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
