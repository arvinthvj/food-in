import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DeleteProfilePopup from "../myProfile/deleteProfilePopup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { breadcrumbbg } from "../../../assets/img";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";

const validationSchema = yup.object().shape({
  label: yup.string().required("Label is required"),
  address_line_1: yup.string().required("Address Line 1 is required"),
  address_line_2: yup.string().required("Address Line 2 is required"),
  city: yup.string().required("Town/City is required"),
  pincode: yup.string().required("Pincode is required"),
  mobile_number: yup.string().required("Mobile Number is required"),
  // .matches(/^(?:(?:(?:00\s?|\+)1\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/, 'Invalid mobile number'),
});

function EditAddress() {
  const notify = (message: string) => toast(message);

  const params = useParams<any>();

  const [profile, setProfile] = useState<any>({});
  const [deleteChange, setDeleteChange] = useState(false);
  const state: any = useSelector((state) => state);
  const [postalCodeList, setPostalCodeList] = useState([]);

  const rand = Math.random();

  const base_url = "https://api.bestatservices.com";
  // const base_url = "http://www.bestatlaundry.test";

  const token = localStorage.getItem("token");
  const { postData } = useContext(ApiServiceContext);
  const navigate = useNavigate();
  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const address: any = params?.address && JSON.parse(params?.address);
  useEffect(() => {
    const payload = {
      edit_address_id: address,
    };
    axios({
      method: "post",
      url: `${base_url}/api/profile/my_addresses/edit`,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Methods": "GET, POST",
        Authorization: "Bearer " + token,
      },
      data: payload,
    })
      .then((response) => {
        if (response.status !== 401) {
          setProfile(response.data.data.address);
        }
      })
      .catch(function (error) {
        // Handle error
      });

    if (state) {
      setPostalCodeList(state.postalCodeList);
    }
  }, [state]);

  const handleAddressSubmit = async (data: any) => {
    const payload = {
      edit_address_id: address,
      edit_address_title: data.label,
      edit_address_mobile: data.mobile_number,
      edit_address: data.address_line_1,
      edit_address2: data.address_line_2,
      edit_city: data.city,
      edit_zip: data.pincode,
    };

    try {
      const response = await postData(end_points.editAddressApi.url, payload);
      if (response.data.code == "200") {
        notify(response.data.message);
        navigate("/myAddress");
      } else {
        notify(response.data.response_message);
      }
    } catch (error) {
      console.error("Error updating address:", error);
      notify("An error occurred while updating the address.");
    }
  };
  const profileData: { [unit: string]: number } = profile;

  useEffect(() => {
    if (profile) {
      setValue("label", profile?.address_values?.title);
      setValue("address_line_1", profile?.address_values?.line_1);
      setValue("address_line_2", profile?.address_values?.line_2);
      setValue("city", profile?.address_values?.city);
      setValue("pincode", profile?.address_values?.postal_code);
      setValue("mobile_number", profile?.address_values?.phone_number);
    }
  }, [profile]);

  return (
    <div>
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
                    <span> Manage Address</span>
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
                      <i className="fas fa-layer-group"></i>
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
                      className="active"
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
                      <i className="fas fa-power-off"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile-details-right">
                <div className="row manageaddress">
                  <div className="col-md-6">
                    <h5>Edit New Address</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="edit-personal-info">
                      <form
                        method="POST"
                        accept-charset="UTF-8"
                        onSubmit={handleSubmit(handleAddressSubmit)}
                      >
                        <div className="row">
                          <div className="col-md-6 form-group profile-form">
                            <label className="form-label" htmlFor="label">
                              Title<span className="text-danger">*</span>
                            </label>
                            <Controller
                              name="label"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  placeholder="Home / Office / Others"
                                  className="form-control"
                                />
                              )}
                            />
                            <p className="text-danger">
                              {errors.label?.message}
                            </p>
                          </div>
                          <div className="col-md-6 form-group profile-form">
                            <label
                              className="form-label"
                              htmlFor="mobile_number"
                            >
                              Mobile Number
                              <span className="text-danger">*</span>
                            </label>
                            <div className="input-mob-no">
                              <Controller
                                name="mobile_number"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    placeholder="Ex:- 07123456789"
                                    className="form-control"
                                  />
                                )}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.mobile_number?.message}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group profile-form ">
                            <label
                              className="form-label"
                              htmlFor="address_line_1"
                            >
                              Address<span className="text-danger">*</span>
                            </label>
                            <Controller
                              name="address_line_1"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  placeholder="Address Line1"
                                  className="form-control"
                                />
                              )}
                            />
                            <p className="text-danger">
                              {errors.address_line_1?.message}
                            </p>
                          </div>

                          <div className="col-md-6 form-group profile-form">
                            <label
                              className="form-label"
                              htmlFor="address_line_2"
                            >
                              Address2 (Optional)
                              <span className="text-danger">*</span>
                            </label>
                            <Controller
                              name="address_line_2"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  placeholder="Address Line2"
                                  className="form-control"
                                />
                              )}
                            />
                            <p className="text-danger">
                              {errors.address_line_2?.message}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group profile-form">
                            <label className="form-label" htmlFor="city">
                              Town/City<span className="text-danger">*</span>
                            </label>
                            <Controller
                              name="city"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  placeholder="Town/City"
                                  className="form-control"
                                />
                              )}
                            />
                            <p className="text-danger">
                              {errors.city?.message}
                            </p>
                          </div>
                          <div className="col-md-6 form-group profile-form ">
                            <label className="form-label" htmlFor="pincode">
                              Zipcode<span className="text-danger">*</span>
                            </label>
                            <Controller
                              name="pincode"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  placeholder="Pincode"
                                  className="form-control ui-autocomplete-input"
                                  autoComplete="off"
                                />
                              )}
                            />
                            <p className="text-danger">
                              {errors.pincode?.message}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 profile-edit-btn">
                            <button
                              type="submit"
                              className="backto-home hover-btn"
                            >
                              Save
                            </button>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate("/myAddress");
                              }}
                              className="btn cancel-btn hover-btn"
                            >
                              Cancel
                            </a>
                          </div>
                        </div>
                        <input required name="postal_code_id" type="hidden" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {deleteChange && (
        <DeleteProfilePopup close={() => setDeleteChange(false)} />
      )}
      <ToastContainer />
    </div>
  );
}

export default EditAddress;
