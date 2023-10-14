import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Elements } from "@stripe/react-stripe-js";

import { ToastContainer, toast } from "react-toastify";

import AmountDetails from "./amountDetails";
import { Link } from "react-router-dom";
import ExistingCustomeLogin from "./existingCustomeLogin";
import { end_points } from "../../core/end_points/end_points";
import { ApiServiceContext } from "../../core/Api/api.service";
import CardDetails from "../newCard/CardDetails";
import { loadStripe } from "@stripe/stripe-js";
import { getLocalValue, setLocalValue } from "../../utility";
import AddAddressModel from "./addAddressModel";
import OrderPlacedModel from "../orderPlacedModel";
import {
  clearUserOrderInfoCategories,
  clearUserProductCategories,
  clearUserSplitPrice,
} from "../../redux/Actions/productCategoriesAction";
import { setOrderInformation } from "../../redux/Actions/splitPriceAction";

import { acceptablepayment } from "../../assets/img";
import { CLEAR_ORDER_DETAILS } from "../../redux/Actions/orderDetailsAction";
import { SpinnerContext } from "../../shared/shared.module";
import { getUserDetails } from "../../redux/Actions";
const schema = yup.object().shape({
  register_name: yup.string().required("Name is required"),
  register_email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  register_mobile: yup
    .string()
    .required("Mobile is required")
    .test("is-ten-digits", "Mobile number must be 10 digits", (value) => {
      if (value && value.length === 10) {
        return true;
      }
      return false;
    }),
  register_password: yup.string().required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  ),
  register_address: yup.string().required("Address is required"),
  register_address2: yup.string(),
  register_city: yup.string().required("City is required"),
  register_zip: yup.string().required("ZIP code is required"),
  // pre_order_date: yup.object().required("Pre-order date is required"),
  // pre_order_time_slot: yup.object().required("order slot is required"),
  deliveryType: yup.string().required("Please select a delivery type"),
  paymentType: yup.string().required("Please select a payment type"),
  // cardHolderName: yup.string().when("paymentType", {
  //   is: (paymentType: string) => paymentType === "credit",
  //   then: yup
  //     .string()
  //     .required("Card Holder Name is required for credit payment"),
  //   otherwise: yup.string(),
  // }),
  cardHolderName: yup.string().optional(),
  // required("Name on card is required"),
});
const ExistingUserschema = yup.object().shape({
  // register_name: yup.string().required("Name is required"),
  // register_email: yup
  //   .string()
  //   .email("Invalid email")
  //   .required("Email is required"),
  // register_mobile: yup.string().required("Mobile is required"),
  // register_password: yup.string().required("Password is required"),
  // register_address: yup.string().required("Address is required"),
  // register_address2: yup.string(),
  // register_city: yup.string().required("City is required"),
  // register_zip: yup.string().required("ZIP code is required"),
  // pre_order_date: yup.object().required("Pre-order date is required"),
  // pre_order_time_slot: yup.object().required("order slot is required"),
  deliveryType: yup.string().required("Please select a delivery type"),
  paymentType: yup.string().required("Please select a payment type"),
  // cardHolderName: yup.string().when("paymentType", {
  //   is: (paymentType: string) => paymentType === "credit",
  //   then: yup
  //     .string()
  //     .required("Card Holder Name is required for credit payment"),
  //   otherwise: yup.string(),
  // }),
  cardHolderName: yup.string().optional(),
  // required("Name on card is required"),
});

const CheckOut = () => {
  const { postData, getData } = useContext(ApiServiceContext);
  const shopId = localStorage.getItem("shop_id");
  const { showLoader, hideLoader } = useContext(SpinnerContext);

  // const notify = (message: string) => toast(message);

  // --------------------new_dev-----------------------------------------------------
  // order placed
  const [orderPlacedbool, setOrderPlacedbool] = useState<boolean>(false);
  const [orderPlacedRes, setOrderPlacedRes] = useState<any>([]);
  const [isGuestUser , setIsGuestUser] = useState<any>(false);
  const [existinglogin, setExistinglogin] = useState<boolean>(false);
  const [newAddress, setNewAddress] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [timeSlot, setTimeSlot] = useState<any>({});
  const [pretimeSlot, setPreTimeSlot] = useState<any>([]);

  const [loading, setLoading] = useState<any>("");
  const [payDetails, setPayDetails] = useState<any>("");
  const [paymentSubmitted, setPaymentSubmitted] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<any>({
    response: {},
    success: false,
  });
  const logged_user: any = getLocalValue("logged_user", false);
  const [userAddress, setUserAddress] = useState("");
  const stripePromise =
    payDetails &&
    loadStripe(
      payDetails?.payment_methods?.stripe_key
        ? payDetails?.payment_methods?.stripe_key
        : payDetails?.payment_key
        ? payDetails.payment_key
        : ""
    );
  let postalCode: any = getLocalValue("postalCode", "");
  const preOrderStatus: any = getLocalValue("preOrderStatus", "");
  // ------------------------------------------------------------------------------

  const [pickupAdress, setPickupAdress] = useState<any>([]);

  // ----------------------------
  const cartInformationorderList: any = useSelector<any>(
    (state) => state?.orderInfo
  );

  let splitAmount = getLocalValue("splitPrice", {});

  const [splitAmountDetails, setSplitAmountDetails] = useState<any>([]);
  const selectedcategoryPriceList: any = useSelector<any>(
    (state) => state.splitPriceDetails
  );
  const splitAmountDetail: any = useSelector<any>(
    (state) => state?.splitPriceDetails
  );
  const settings: any = useSelector<any>(
    (state) => state?.settings?.payment_settings
  );

  const orderNote: any = useSelector<any>((state) => state?.ordernote);
  const userDetails: any = getLocalValue("userDetails", []);
  const isToken: any = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const ValidToken =
    isToken !== "" && isToken !== undefined && isToken !== null;

  // --------------------------------

  const [cartInformation, setCartInformation] = useState([]);

  const menuRef = React.useRef<HTMLDivElement>(null);
  const paySubmitRef = useRef<HTMLButtonElement>(null);
  const payConfirmationSubmitRef = useRef<HTMLButtonElement>(null);
  const myAddresref = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch<any>();

  const initialValues = {
    register_name: userDetails?.data?.user?.name
      ? userDetails?.data?.user?.name
      : "",
    register_email: userDetails?.data?.user?.email
      ? userDetails?.data?.user?.email
      : "",
    register_mobile: userDetails?.data?.user?.mobile_number
      ? userDetails?.data?.user?.mobile_number
      : "",
    register_password: "",
    register_address: "",
    register_address2: "",
    register_city: "",
    pre_order_date: {
      value: moment(timeSlot?.date).format("YYYY-MM-DD"),
      label: moment(timeSlot?.date).format("ddd, DD MMM YYYY"),
    },
    // moment(timeSlot?.date).format("YYYY-MM-DD"),
    register_zip: postalCode,
    // register_zip: "",
    // Replace with your logic
    pre_order_time_slot: pretimeSlot?.value
      ? { label: pretimeSlot?.label, value: pretimeSlot?.value }
      : pretimeSlot, // Set an initial value for the time slot
    deliveryType: "deliver", // Set an initial value for delivery type
    paymentType: "credit", // Set an initial value for payment type
    cardHolderName: "", // Set an initial value for card holder name
    // ... Initialize other fields with their respective default values
  };

  const {
    control: mainControl,
    handleSubmit: mainHandleSubmit,
    getValues,
    setValue,
    watch,
    trigger,
    setError,

    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(ValidToken ? ExistingUserschema : schema),
    defaultValues: initialValues,
  });
  const [paymentType, setPaymentType] = useState<boolean>(
    // false
    getValues("paymentType") === "credit" ? true : false
  );

  useEffect(() => {}, [getValues()]);
  const timeSlotOption =
    timeSlot?.time_slots && timeSlot?.time_slots?.length > 0
      ? timeSlot?.time_slots?.map((val: any) => {
          return {
            value: val,
            label: val,
          };
        })
      : [];
  const cardItem = useMemo(() => {
    if (cartInformation?.length > 0) {
      return cartInformation.map((val: any) => {
        const value = val?.subcategories[0]?.products
          ?.filter((subItem: any) => parseInt(subItem?.quantity) > 0)
          .map((val: any) => {
            const { id, price, quantity, name, instructionnote, ...items } =
              val;
            const dataval = {
              ...items,
              product_id: id,
              qty: quantity,
              total_item_price: price,
              notes: instructionnote ? instructionnote : "",
              product_name: name,
            };
            const option_selected = dataval.options.filter(
              (val: any) => val.is_default === "1"
            );
            const finalvalue = {
              ...dataval,
              option_selected: option_selected[0],
            };
            return finalvalue;
          });
        return value;
      });
    }
    return [];
  }, [cartInformation]);
  useEffect(() => {}, [cartInformationorderList]);

  useEffect(() => {
    if (cartInformation.length > 0) {
      if (Object.keys(splitAmountDetail).length > 0) {
        setSplitAmountDetails(splitAmountDetail);
      } else {
        setSplitAmountDetails(splitAmount);
      }
    }
  }, [splitAmountDetail, cartInformation]);
  // -----------------------clear the data----------
  const clearOrders = () => {
    localStorage.removeItem("cartInformationData");
    localStorage.removeItem("splitPrice");
    dispatch(clearUserProductCategories);
    dispatch(clearUserSplitPrice);
  };
  console.log(
    paymentSuccess,
    paymentSuccess?.response?.length,
    "paymentSuccess"
  );
  const onSubmit = async (data: any) => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      if (selectedItem == null && data?.register_address == ""  && data?.deliveryType != "pickup") {
        if (addressList?.length > 0) {
          toast.error("please select the delivery address!");
          myAddresref?.current?.focus();
          return;
        } else {
          // console.log(
          //   selectedItem == null && data?.register_address == "",
          //   "gh"
          // );

          setLoading(false);
          toast.error("please enter the delivery address!");
          setNewAddress(true);

          return;
        }
      }
      if (data && paymentType && data.paymentType === "credit") {
        if (data.paymentType === "credit" && !data.cardHolderName) {
          setError("cardHolderName", {
            type: "manual",
            message: "Card Holder Name is required for credit payment",
          });
          // console.log(!data.cardHolderName, "!data.cardHolderName");

          return;
        } else if (paymentType && !paymentSuccess.success) {
          if (!paymentSubmitted) {
            paySubmitRef.current?.click(); //second click
            showLoader();
            console.count("clickedpayment");
            setPaymentSubmitted(true);
          }
        }
      }
      if (paymentType && paymentSuccess.success === false) {
        setPaymentSubmitted(false);
        console.log("paymentFailed");

        return;
      } else {
        // if (data && paymentType && paymentSuccess.success === true) {
        //   payConfirmationSubmitRef?.current?.click();
        //   console.log("finally clicked");

        //   return;
        // }
        showLoader();
        setLoading(true);
        let accountDetailsAddress = {
          address_id: selectedItem?.id,
          address_type: "2",
          register_address: selectedItem?.full_address,
          register_address2: selectedItem?.full_address2 || "",
          register_city: selectedItem?.address_values?.city,
          // register_email: selectedItem.address_values,
          register_mobile: selectedItem?.address_values?.phone_number,
          // register_name: selectedItem.address_values,
          // register_password: selectedItem.address_values,
          register_zip: selectedItem?.address_values?.postal_code,
          user_id: userDetails?.data?.user?.id,
          user_type: "2",
        };
        let newAccountDetail = {
          address_id: "1",
          address_type: "1", //order as guest --1 && logged user--2
          register_address: data.register_address,
          register_address2: data.register_address2,
          register_city: data.register_city,
          register_email: data.register_email,
          register_mobile: data.register_mobile,
          register_name: data.register_name,
          register_password: data.register_password,
          register_zip: data.register_zip,
          user_id: userDetails?.data?.user?.id || "",
          user_type: "1", //order as guest && logged user--2
        };
        let checkAndUpdateValuesIfDelTypePickup = (obj :Object)=>{
          if(data?.deliveryType != "pickup"){
            return obj
          }
          let delTypeValuesOnPickupToEmpty = {
            address_id : 1,
            register_address: "",
            register_address2: "",
            register_city: "",
            register_email: "",
            register_mobile: "",
            register_name: "",
            register_password: "",
            register_zip: "",
          };
          return {...obj, ...delTypeValuesOnPickupToEmpty}
        }
        const flattenedCartItems = [].concat(...cardItem);
        let payload = {
          account_detail:
            !logged_user && data?.register_name
              ? checkAndUpdateValuesIfDelTypePickup(newAccountDetail)
              : checkAndUpdateValuesIfDelTypePickup(accountDetailsAddress),
          cart_checkout_data: {
            cart_items: flattenedCartItems,

            delivery_fee: splitAmountDetails?.delivery_fee,
            final_total: splitAmountDetails?.order_total,
            final_total_after_offer:
              splitAmountDetails?.order_total_offer_applied,
            flat_offer_percentage: splitAmountDetails?.offer_percentage,
            offer_applied_amount: splitAmountDetails?.offer_amt,
            offer_applied_id: 1,
            // add dynmic
            order_notes: orderNote,
            sub_total: splitAmountDetails?.total_price,
            tax_amount: splitAmountDetails?.vat_tax_amt,
            tax_percentage: splitAmountDetails?.vat_tax_percentage,
          },
          delivery_type: data.deliveryType,
          order_postal_code: postalCode,
          shop_id: shopId,
          payment_type: {
            card_stripe_token: paymentSuccess?.response?.paymentMethod?.id
              ? paymentSuccess?.response?.paymentMethod?.id
              : "",
            payment_type: data.paymentType,
          },
          pre_order: {
            date: data.pre_order_date.value || "",
            status: preOrderStatus == "1" ? preOrderStatus : "0",
            // preorder "0"--normal order "1"-- preOrder
            time_slot: data.pre_order_time_slot.value || "",
          },
        };
        // let payloadstring = JSON.stringify(payload);
        const response = await postData(end_points.submitOrderApi.url, payload);
        if (response.data.code === "200") {
          setLoading(false);
          hideLoader();
          dispatch(getUserDetails(response.data));
          // setLoginResult(response.data);
          if(!localStorage.getItem("token")){
            setIsGuestUser(true)
            localStorage.setItem("token", response.data.data.token);
          }
          
          toast.success(response.data.message);
          setOrderPlacedbool(true);
          setOrderPlacedRes(response.data.data);
          setPaymentSubmitted(false);
          // navigate("/productLists")
          dispatch(clearUserOrderInfoCategories);
          dispatch({ type: CLEAR_ORDER_DETAILS });
          clearOrders();
        } else {
          console.log(response, "response");

          toast.error(
            response?.response?.data.message ||
              response?.data?.error?.internal_message
          );
          setLoading(false);
          hideLoader();
        }
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.data?.error?.internal_message);
      hideLoader();
    } finally {
      console.count("dataSubmit");

      setLoading(false);
    }
  };
  // ----------------------NEW DEVELOPMENT------------------------------//

  const handleItemClick = (item: any) => {
    // Set the selected item when an item is clicked
    setSelectedItem(item);
  };
  const addressDataList = async () => {
    const response = await getData(end_points.addressApi.url);
    let list = response?.data?.data?.user_addresses;
    setAddressList(list);
    if (list) {
      list?.map((val: any) => {
        if (val?.is_primary == "1") {
          setSelectedItem(val);
        }
      });
    }
  };
  const timeDataList = async () => {
    const response = await getData(end_points.timeSlotApi.url);

    if (response) {
      const Slots = response?.data?.data?.pre_order_date_time[0]
        ? response?.data?.data?.pre_order_date_time[0]
        : response?.data?.data?.pre_order_date_time;
      const timeSlotOption =
        Slots?.time_slots && Slots?.time_slots?.length > 0
          ? Slots?.time_slots?.map((val: any) => {
              return {
                value: val,
                label: val,
              };
            })
          : [];

      setTimeSlot(Slots);
      if (timeSlotOption?.length > 0) {
        setPreTimeSlot(timeSlotOption[0]);
        setValue("pre_order_time_slot", timeSlotOption[0]);
      }
    }
  };
  const paymentDetails = async () => {
    const response = await getData(end_points.paymentDetailsApi.url);
    if (response.data) {
      setPayDetails(response.data.data);
    }
  };
  useEffect(() => {
    // console.log(logged_user, "logged_user", settings);

    if (!logged_user && !ValidToken && settings) {
      settings && setPayDetails(settings);
    }
    if (logged_user && ValidToken) {
      paymentDetails();
      addressDataList();
    }
  }, [logged_user, ValidToken, settings]);
  useEffect(() => {
    timeDataList();
  }, []);
  // need clarification
  const useAddressDetails = async (id: any) => {
    const response = await getData(end_points.addressApi.url, { user_id: id });
    response && setUserAddress(response.data.data);
  };
  useEffect(() => {
    if (userDetails?.data && userAddress === "") {
      let id = userDetails?.data?.user?.id;
      useAddressDetails(id);
    }
  }, []);
  useEffect(() => {}, [timeSlot]);
  useEffect(() => {}, [selectedItem]);
  //============================================================================//

  const saveAddress: any = useSelector<any>((state) => state?.saveAddress.data);

  useEffect(() => {
    setPickupAdress([...pickupAdress, saveAddress]);
  }, [saveAddress]);

  useEffect(() => {
    // dispatch(fetchAddressByPincode());
  }, [cartInformation]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(cartInformationorderList, "cartInformationorderList");
    console.count("cartInformationorderList");

    let dataval = getLocalValue("cartInformationData", [])
      ? getLocalValue("cartInformationData", [])
      : [];
    if (cartInformationorderList?.length > 0) {
      const cartInformationData = cartInformationorderList?.filter(
        (item: any) => {
          return item?.subcategories[0]?.products?.some(
            (subItem: any) => parseInt(subItem?.quantity) > 0
          );
        }
      );

      if (cartInformationData?.length > 0) {
        setLocalValue("cartInformationData", cartInformationData);
      }
      setCartInformation(cartInformationData);

      if (!localStorage.getItem("completeorderlogin")) {
      }
    } else {
      if (dataval?.length > 0) {
        setCartInformation(dataval);
        dispatch(setOrderInformation(dataval));
      }
      //  else if (
      //   cartInformationorderList?.length == 0 &&
      //   dataval?.length == 0
      // ) {
      //   navigate("/productLists");
      // }
    }
  }, [cartInformationorderList]);
  useEffect(() => {
    let data = getLocalValue("cartInformationData", []);
    if (data?.length <= 0) {
      navigate("/productLists");
    }
  }, []);
  useEffect(() => {
    // console.log(getValues(), "getValues");
  }, [getValues()]);

  return (
    <div>
      <div className="section-checkout">
        <div className="container">
          <div className="row row-eq-height list-checkout">
            <div className="col-md-8" id="paymentsteps">
              <div className="product-items checkout-details pl-1">
                {!logged_user && (
                  <div className="checkout-wrap">
                    <div className="exist-customer">
                      Existing Customer?{" "}
                      <Link
                        to="#"
                        // id="existing_login"
                        onClick={() => {
                          setExistinglogin(!existinglogin);
                        }}
                      >
                        Click here to login
                      </Link>
                    </div>
                    {existinglogin && <ExistingCustomeLogin props={"props"} />}
                  </div>
                )}
                <form onSubmit={mainHandleSubmit(onSubmit)}>
                  {/* <PersonalInfo props={"props"} /> */}
                  {logged_user ? (
                    <>
                      <div className="cl-md-8">
                        <div className="d-flex justify-content-between">
                          <h4>Address Details</h4>
                          <button
                            className="btn btn-primary"
                            onClick={(e) => {
                              e && e.preventDefault();
                              setNewAddress(true);
                            }}
                          >
                            Add New
                          </button>
                        </div>
                        <div
                          className="mainAddress"
                          tabIndex={0}
                          ref={myAddresref}
                        >
                          {addressList?.map((val: any, index: any) => {
                            return (
                              <>
                                <div
                                  className={`perCardAddress ${
                                    selectedItem?.id === val?.id
                                      ? "selectedAddress"
                                      : ""
                                  }`}
                                  key={index}
                                  onClick={() => handleItemClick(val)}
                                >
                                  <h5>{val?.title}</h5>
                                  <div> {val?.full_address}</div>
                                  <span>{val?.phone_number}</span>
                                </div>
                              </>
                            );
                          })}
                        </div>
                        {newAddress && (
                          <AddAddressModel
                            newAddress={newAddress}
                            cancel={() => {
                              setNewAddress(false);
                            }}
                            addressDataList={addressDataList}
                          />
                        )}
                      </div>
                      <hr />
                    </>
                  ) : (
                    <>
                      <h3 className="widget-title">Order as guest</h3>
                      <div className="billing-address">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label>Name</label>
                            <Controller
                              name="register_name"
                              control={mainControl}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  className="form-control"
                                  {...field}
                                />
                              )}
                            />
                            {errors?.register_name?.message && (
                              <small className="text-danger">
                                {errors?.register_name?.message}
                              </small>
                            )}
                          </div>

                          <div className="col-md-6 mb-3">
                            <label>Email</label>
                            <Controller
                              name="register_email"
                              control={mainControl}
                              render={({ field }) => (
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="john@example.com"
                                  {...field}
                                />
                              )}
                            />
                            {errors?.register_email && (
                              <small className="text-danger">
                                {errors?.register_email?.message}
                              </small>
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label>Mobile</label>
                            <Controller
                              name="register_mobile"
                              control={mainControl}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="07911 123456"
                                  {...field}
                                />
                              )}
                            />
                            {errors.register_mobile && (
                              <small className="text-danger">
                                {errors.register_mobile.message}
                              </small>
                            )}
                          </div>
                          {/* Password */}
                          <div className="col-md-6 mb-3">
                            <label>Password</label>
                            <Controller
                              name="register_password"
                              control={mainControl}
                              render={({ field }) => (
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="******"
                                  {...field}
                                />
                              )}
                            />
                            {errors.register_password && (
                              <small className="text-danger">
                                {errors.register_password.message}
                              </small>
                            )}
                          </div>
                          {/* Address */}
                          <div className="col-md-6 mb-3">
                            <label>Address</label>
                            <Controller
                              name="register_address"
                              control={mainControl}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="1234 Main St"
                                  {...field}
                                />
                              )}
                            />
                            {errors.register_address && (
                              <small className="text-danger">
                                {errors.register_address.message}
                              </small>
                            )}
                          </div>
                          {/* Address 2 */}
                          <div className="col-md-6 mb-3">
                            <label>
                              Address 2{" "}
                              <span className="text-muted">(Optional)</span>
                            </label>
                            <Controller
                              name="register_address2"
                              control={mainControl}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Apartment or suite"
                                  {...field}
                                />
                              )}
                            />
                          </div>
                          {/* City */}
                          <div className="col-md-6 mb-3">
                            <label>City</label>
                            <Controller
                              name="register_city"
                              control={mainControl}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Gants Hill"
                                  {...field}
                                />
                              )}
                            />
                            {errors.register_city && (
                              <small className="text-danger">
                                {errors.register_city.message}
                              </small>
                            )}
                          </div>
                          {/* Zip */}
                          <div className="col-md-6 mb-3">
                            <label>Zip</label>
                            <Controller
                              name="register_zip"
                              control={mainControl}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  readOnly
                                  className="form-control"
                                  placeholder={postalCode}
                                  {...field}
                                />
                              )}
                            />
                            {errors.register_zip && (
                              <small className="text-danger">
                                {errors.register_zip.message}
                              </small>
                            )}
                          </div>
                        </div>

                        <hr className="mb-4" />
                      </div>
                    </>
                  )}
                  {preOrderStatus != "1" && (
                    <>
                      {" "}
                      <h3 className="widget-title ">
                        Order Date &amp; Time Slot
                      </h3>
                      <p className="">
                        <small>Next available day and time slots</small>
                      </p>
                      <div className="delivery-type mb-3 ">
                        <div className="row">
                          <div className="col-6 form-group">
                            <Controller
                              name="pre_order_date"
                              control={mainControl}
                              defaultValue={{
                                value: moment(timeSlot?.date).format(
                                  "YYYY-MM-DD"
                                ),
                                label: moment(timeSlot?.date).format(
                                  "ddd, DD MMM YYYY"
                                ),
                              }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={[
                                    {
                                      value: moment(timeSlot?.date).format(
                                        "YYYY-MM-DD"
                                      ),
                                      label: moment(timeSlot?.date).format(
                                        "ddd, DD MMM YYYY"
                                      ),
                                    },
                                  ]}
                                />
                              )}
                            />
                            {errors.pre_order_date && (
                              <small className="text-danger">
                                {errors?.pre_order_date?.message}
                              </small>
                            )}
                          </div>
                          <div className="col-6 form-group">
                            {timeSlotOption?.length > 0 ? (
                              <Controller
                                name="pre_order_time_slot"
                                control={mainControl}
                                render={({ field }) => (
                                  <Select
                                    isDisabled={
                                      timeSlotOption?.length <= 0 ? true : false
                                    }
                                    {...field}
                                    value={pretimeSlot}
                                    onChange={(selectedOption) => {
                                      field.onChange(() => {
                                        setPreTimeSlot(selectedOption);

                                        setValue(
                                          "pre_order_time_slot",
                                          selectedOption
                                        );
                                      });
                                    }}
                                    placeholder="Please select the slot"
                                    options={
                                      timeSlotOption ? timeSlotOption : []
                                    }
                                    defaultValue={
                                      pretimeSlot && pretimeSlot?.label
                                        ? {
                                            label: pretimeSlot?.label,
                                            value: pretimeSlot?.value,
                                          }
                                        : null
                                    }
                                  />
                                )}
                              />
                            ) : (
                              <Controller
                                name="pre_order_time_slot"
                                control={mainControl}
                                defaultValue={
                                  timeSlotOption ? timeSlotOption[0] : {}
                                }
                                render={({ field }) => (
                                  <Select
                                    isDisabled={
                                      timeSlotOption?.length <= 0 ? true : false
                                    }
                                    {...field}
                                    placeholder="Please select the slot"
                                    options={
                                      timeSlotOption ? timeSlotOption : []
                                    }
                                  />
                                )}
                              />
                            )}
                            {errors?.pre_order_time_slot && (
                              <small className="text-danger">
                                {errors?.pre_order_time_slot?.message &&
                                  "Please select the slot"}
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <h3 className="widget-title">Pickup / Collection Details</h3>
                  <div className="delivery-type">
                    <div className="d-block">
                      <div className="custom-control custom-radio">
                        <Controller
                          name="deliveryType"
                          control={mainControl}
                          render={({ field }) => (
                            <input
                              {...field}
                              value="deliver"
                              id="deliver"
                              defaultChecked={
                                getValues("deliveryType") === "deliver"
                                  ? true
                                  : false
                              }
                              type="radio"
                              className="custom-control-input delivery-type"
                            />
                          )}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="deliver"
                        >
                          Deliver to my address
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <Controller
                          name="deliveryType"
                          control={mainControl}
                          render={({ field }) => (
                            <input
                              {...field}
                              value="pickup"
                              id="pickup"
                              defaultChecked={
                                getValues("deliveryType") === "pickup"
                                  ? true
                                  : false
                              }
                              type="radio"
                              className="custom-control-input delivery-type"
                            />
                          )}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="pickup"
                        >
                          Take away (self pickup)
                        </label>
                      </div>
                      {errors.deliveryType && (
                        <p className="text-danger">
                          {errors?.deliveryType?.message}
                        </p>
                      )}
                    </div>

                    <hr className="mb-4" />
                  </div>
                  <h3 className="widget-title">Payment Details</h3>
                  <div className="payment-options">
                    <div className="d-block">
                      <div className="custom-control custom-radio">
                        <Controller
                          name="paymentType"
                          control={mainControl}
                          render={({ field }) => (
                            <input
                              {...field}
                              value="credit"
                              id="credit"
                              onClick={() => {
                                field.onChange("credit");
                                setPaymentType(true);
                              }}
                              defaultChecked={
                                getValues("paymentType") === "credit"
                                  ? true
                                  : false
                              }
                              type="radio"
                              className="custom-control-input payment-type"
                            />
                          )}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="credit"
                        >
                          Credit/Debit card
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <Controller
                          name="paymentType"
                          control={mainControl}
                          render={({ field }) => (
                            <input
                              {...field}
                              value="cod"
                              onClick={() => {
                                field.onChange("cod");
                                setPaymentType(false);
                              }}
                              defaultChecked={
                                getValues("paymentType") === "cod"
                                  ? true
                                  : false
                              }
                              id="cod"
                              type="radio"
                              className="custom-control-input payment-type"
                            />
                          )}
                        />
                        <label className="custom-control-label" htmlFor="cod">
                          Pay On Pickup / Delivery
                        </label>
                      </div>
                      {errors?.paymentType && (
                        <p className="text-danger">
                          {errors?.paymentType?.message}
                        </p>
                      )}
                    </div>
                    {paymentType && (
                      <div id="credit-card-section" className="row mt-3">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="card-holder-name">
                              Name on card
                            </label>
                            <Controller
                              name="cardHolderName"
                              control={mainControl}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className="form-control"
                                  id="card-holder-name"
                                  placeholder="John Doe"
                                />
                              )}
                            />
                            {errors.cardHolderName && (
                              <p className="text-danger">
                                {errors.cardHolderName.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Credit/Debit card </label>

                            {payDetails && (
                              <Elements stripe={stripePromise}>
                                <CardDetails
                                  paySubmitRef={paySubmitRef}
                                  setPaymentSuccess={setPaymentSuccess}
                                  payConfirmationSubmitRef={
                                    payConfirmationSubmitRef
                                  }
                                />
                              </Elements>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="text-danger" id="payment_error"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="submit-order mt-3">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="hidden"
                          name="pre_order_status"
                          id="pre_order_status"
                          value="1"
                        />
                        <button
                          className="btn btn-primary btn-lg btn-block"
                          type="submit"
                          disabled={loading}
                          ref={payConfirmationSubmitRef}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                    <div className="acc-payments mt-3 text-center">
                      <div className="alert alert-info">
                        <p>
                          We are using strong SSL ciphers and we won't save any
                          critical card information. Payments are powered by
                          PCI-certified{" "}
                          <strong>
                            <a
                              target="_blank"
                              href="https://stripe.com/docs/security/stripe"
                            >
                              Stripe Payment Gateway
                            </a>
                          </strong>
                          . If you have any questions, or encounter any issues,
                          please <a href="#">let us know.</a>
                        </p>
                      </div>
                      <img
                        src={acceptablepayment}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-4 payment-option">
              <div className="summary-payment">
                <AmountDetails
                  cartInformation={cartInformation}
                  splitAmountDetails={splitAmountDetails}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {orderPlacedbool && (
        <OrderPlacedModel
          orderPlacedbool={orderPlacedbool}
          message={orderPlacedRes}
          guestUser ={isGuestUser}
          cancel={() => {
            setOrderPlacedbool(false);
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default CheckOut;
