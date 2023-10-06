import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  clearUserProductCategories,
  setProductAllCategories,
} from "../../redux/Actions/productCategoriesAction";
import { Link, useNavigate } from "react-router-dom";
import { setGetShopByPinCode } from "../../redux/Actions/checkoutPageActions";
import {
  setOrderInformation,
  setOrderuserNotes,
  setSplitPriceDetails,
} from "../../redux/Actions/splitPriceAction";
import {
  clearCart,
  clearCartCount,
  clearSplitPrice,
  deleteCartCount,
  setCartCount,
  setOrderType,
} from "../../redux/Actions/cartCountAction";
import { bannerImg, vegicon, chilli2, dishimg1 } from "../../assets/img";
import { toast, ToastContainer } from "react-toastify";
import { end_points } from "../../core/end_points/end_points";
import { ApiServiceContext } from "../../core/Api/api.service";
import CustomizeModel from "./customizeModel";
import { getLocalValue, removeDuplicates, setLocalValue } from "../../utility";
const ProductLists = () => {
  const { postData } = useContext(ApiServiceContext);
  const [close, setClose] = useState(false);
  const [productCategories, setProductCategories] = useState<any>([]);

  const dispatch = useDispatch<any>();

  const [initialdata, setInitialData] = useState("");
  const [show, setshow] = useState<boolean>(false);
  const [customizeData, setCustomizeData] = useState<any>("");
  const { cartCount }: any = useSelector<any>((state) => state);

  const settings: any = useSelector<any>((state) => state.settings);
  const repeatOrderId: any = useSelector<any>((state) => state.repeatOrderId);

  const selectedcategoryPriceList: any = useSelector<any>(
    (state) => state.splitPriceDetails
  );
  const allProductList: any = useSelector<any>(
    (state) => state.ProductAllCategories
  );
  // --------------------------------------------------------------------------------------
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [cartInformation, setCartInformation] = useState([]);
  const [extraDish, setExtraDish] = useState<any>([]);
  const [userInfoNote, setUserInfoNote] = useState<any>("");
  const [repeatOrderStatus, setRepeatOrderStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  const minimum_order_amount: any = useSelector<any>((state) =>
    state?.getShopByPinCode?.shop?.minimum_order_amount
      ? state?.getShopByPinCode?.shop?.minimum_order_amount
      : "15"
  );
  const splitAmountDetails: any = useSelector<any>(
    (state) => state?.splitPriceDetails
  );
  const cartFinalTotal = splitAmountDetails?.cart_final_total
    ? splitAmountDetails?.cart_final_total
    : 0;
  // -----------------------Repeat order ---=-==-=-==-=-=--=-=-=--=-=-=-=-=
  const repeatOrderData = async (id: any = "100") => {
    let payload = { order_id: id };
    const response = await postData(end_points.repeatOrderApi.url, payload);
    if (response.data.code == "200") {
      setRepeatOrderStatus(true);
      // setRepeatOrderList(
      const order: any =
        response?.data?.data?.order?.properties?.cart_checkout_data?.cart_items;
      // );

      // category id need to want
      if (order && order?.length > 0) {
        for (let i = 0; i < order.length; i++) {
          const val = order[i];
          console.log(val, "orrvderval");

          setExtraDish(
            val?.add_on_groups?.length > 0
              ? val?.add_on_groups[0]?.add_ons?.length > 0
                ? val?.add_on_groups[0]?.add_ons
                : val?.add_ons
              : []
          );
          setTimeout(() => {
            onAddToCartItemHandler(
              val?.product_id,
              val?.category_id,
              "REORDER",
              val?.add_on_groups?.length > 0
                ? val?.add_on_groups
                : val?.add_ons,
              val?.notes,
              val?.qty,
              val
            );
          }, i * 100);
        }
      }
      // setProductCategories((prev: any) => {
      //   console.log(prev, "prev");
      //   let product = prev?.filter((val: any) => val.id == order.id);
      //   console.log(product, "product");
      // });
    }
  };
  useEffect(() => {
    // repeatOrderData("100");
    console.log(
      parseInt(cartFinalTotal) < parseInt(minimum_order_amount),
      "valued",
      parseInt(cartFinalTotal),
      parseInt(minimum_order_amount)
    );
  }, [cartFinalTotal]);
  // ----------------------------------------------------------------------------
  let CardInfoList = getLocalValue("cartInformationData", []);

  const TaxandCalculations = async (finalTotalPrice: any, itemsCount: any) => {
    let load = {
      postal_code: getLocalValue("postalCode") && getLocalValue("postalCode"),
      total_price: finalTotalPrice,
    };
    const response = await postData(end_points.priceSplitListApi.url, load);
    console.log(response, "response");

    if (response) {
      if (response?.data?.code == -1) {
        toast.error(response?.data?.data?.error?.internal_message);
      }
      dispatch(
        setSplitPriceDetails({
          ...response?.data?.data?.price_split,
          itemsCount: itemsCount,
        })
      );
      setLocalValue("splitPrice", response?.data?.data?.price_split);
    }
  };

  useEffect(() => {
    if (cartInformation.length >= 0) {
      let finalTotalPrice = 0;
      let itemsCount = 0;

      cartInformation?.map((item: any) => {
        const subcategoryList = item?.subcategories[0]?.products?.filter(
          (subItem: any) => parseInt(subItem.quantity) > 0
        );
        itemsCount = itemsCount + subcategoryList?.length;

        // subCategory?.add_on_groups[0]?. add_ons?.map((item: any) => {
        //   const subcategoryList = item?.subcategories[0].products?.filter(
        //     (subItem: any) => parseInt(subItem.quantity) > 0
        //   );

        subcategoryList?.map((subcategory: any) => {
          console.log(
            subcategory?.add_on_groups?.length,
            " subcategory?.add_on_groups?.length"
          );

          let customPrice =
            subcategory?.add_on_groups?.length > 0
              ? subcategory?.add_on_groups[0]?.add_ons?.filter(
                  (r: any) => r?.check == true || r?.check == "true"
                )
              : 0;

          let customPriceTotal = customPrice
            ? customPrice?.reduce(
                (acc: number, addon: any) => acc + parseFloat(addon?.price),
                0
              )
            : 0;

          //   const totalCustomPrice= (parseInt(subcategory?.quantity) *parseFloat(customPriceTotal) + )
          //  console.log(parseFloat(totalCustomPrice.toFixed(2)), "totalcustomPrice")

          finalTotalPrice =
            finalTotalPrice +
            parseInt(subcategory?.quantity) * parseFloat(subcategory?.price) +
            parseInt(subcategory?.quantity) * parseFloat(customPriceTotal);
          // console.log(
          //   finalTotalPrice,
          //   "finalTotalPrice",
          //   finalTotalPrice,
          //   parseInt(subcategory?.quantity),
          //   parseFloat(subcategory?.price),
          //   parseFloat(customPriceTotal),
          //   customPrice
          // );
        });
      });
      setTimeout(() => {
        TaxandCalculations(finalTotalPrice, itemsCount);
      }, 300);
    }
  }, [cartInformation]);

  const handleContinue = (e: any) => {
    e.preventDefault();
    dispatch(setOrderInformation(cartInformation));
    dispatch(setOrderuserNotes(userInfoNote));

    const userinfo = JSON.parse(localStorage.getItem("userDetails")!);

    // if (userinfo) {
    navigate("/checkout");
    // } else {
    //   localStorage.setItem("isCheckout", "1");
    //   navigate("/login");
    // }
  };

  const handleQuickOrder = () => {
    const userinfo = JSON.parse(localStorage.getItem("userDetails")!);
    if (userinfo) {
      dispatch(setOrderType(1));
      localStorage.removeItem("cartInformationData");
      localStorage.removeItem("splitPrice");

      dispatch(clearCartCount());
      dispatch(clearCart());
      dispatch(clearUserProductCategories());
      // dispatch(clearSplitPrice());
      navigate("/checkout");
    } else {
      localStorage.removeItem("cartInformationData");
      localStorage.removeItem("splitPrice");

      dispatch(clearCartCount());
      dispatch(clearCart());
      dispatch(clearUserProductCategories());
      // dispatch(clearSplitPrice());
      navigate("/guestLogin");
    }
  };

  const menuList = async () => {
    // if (allProductList?.length <= 0) {
    const response = await postData(end_points.menuListApi.url, {
      shop_id: 1,
    });
    // ----------------------
    setInitialData(response.data.data.menu_list);

    if (CardInfoList?.length && response?.data) {
      const cartCount: number = CardInfoList.filter(
        (category: any) => category && category.subcategories
      )
        .map((category: any) =>
          category.subcategories
            .filter((subcategory: any) => subcategory && subcategory.products)
            .map((subcategory: any) =>
              subcategory.products
                .map((product: any) => (product ? Number(product.quantity) : 0))
                .reduce((a: any, b: any) => a + b, 0)
            )
            .reduce((a: any, b: any) => a + b, 0)
        )
        .reduce((a: any, b: any) => a + b, 0);

      dispatch(setCartCount(cartCount));

      CardInfoList = [...CardInfoList, ...response.data.data?.menu_list];

      // Remove duplicates based on the "category_id" property
      const uniqueCardInfoList = removeDuplicates(CardInfoList, "category_id");

      // Update the quantity count for each product
      uniqueCardInfoList.forEach((category: any) => {
        category.subcategories.forEach((subcategory: any) => {
          subcategory.products.forEach((product: any) => {
            const matchingCartItem = CardInfoList.find(
              (item: any) =>
                item.category_id === category.category_id &&
                item.subcategory_id === subcategory.subcategory_id &&
                item.product_id === product.id
            );

            if (matchingCartItem) {
              product.quantity = String(
                Number(product.quantity) + Number(matchingCartItem.quantity)
              );
            }
          });
        });
      });

      response.data.data.menu_list = uniqueCardInfoList;

      // -----------------------------------
      response &&
        dispatch(setProductAllCategories(response.data.data.menu_list));
    } else {
      dispatch(setProductAllCategories(response.data.data.menu_list));
    }

    setProductCategories(response.data.data.menu_list);
  };
  useEffect(() => {}, [allProductList]);
  useEffect(() => {
    menuList();
  }, []);
  // useEffect(() => {
  // }, [CardInfoList]);
  const getShopDetails = async (postcode: any) => {
    let payload = { postalCode: postcode };
    const response = await postData(end_points?.checkPostalCodeOfferApi?.url, {
      payload,
    });

    if (response?.data?.code === "200") {
      let data = response?.data?.data;
      response && dispatch(setGetShopByPinCode(data));
      localStorage.setItem("shop_id", response?.data?.data?.shop?.id);
    }
  };
  useEffect(() => {
    toast.dismiss();
    const postalCode = localStorage.getItem("postalCode");

    if (postalCode == "undefined" || postalCode == null || !postalCode) {
      toast.warning("Enter postal code in Book Now Section");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    getShopDetails(postalCode);
  }, []);

  const onCategoryClickHandler = (selectedCategoryId: any) => {
    setSelectedCategoryIndex(
      productCategories?.findIndex(
        (obj: any) => obj?.category_id === selectedCategoryId
      )
    );
  };

  const onAddToCartItemHandler = (
    selectedSubCategoryId: any = "0",
    selectedMainCategoryId: any = "0",
    type: any = "",
    extra: any = [],
    instructionValue: any = "",
    count: any = 0,
    reorderDetails: any = []
  ) => {
    console.count("click");
    console.log(type, productCategories, extra, "click");

    setProductCategories((prev: any) => {
      const mainData = prev?.length > 0 ? [...prev] : productCategories;
      const selectedCategoryItem: any = mainData?.find(
        (item: any) => item?.category_id == selectedMainCategoryId
      );

      const getSubCategory =
        selectedCategoryItem?.subcategories[0]?.products?.find(
          (item: any) => item?.id == selectedSubCategoryId
        );
      console.log(getSubCategory, "getSubCategory");

      const quantity = getSubCategory?.quantity ? getSubCategory?.quantity : 0;
      let updatedQuantity = parseInt(quantity ? quantity : "0");
      if (type === "customize") {
        if (updatedQuantity == 0) {
          updatedQuantity = updatedQuantity + 1;
          dispatch(setCartCount(cartCount + 1));
        } else {
          updatedQuantity = updatedQuantity;
          dispatch(setCartCount(cartCount));
        }
      } else if (type === "REORDER") {
        updatedQuantity = count;
        dispatch(setCartCount(cartCount));
      } else if (type === "delete") {
        updatedQuantity = 0;
        dispatch(deleteCartCount(1));
      } else if (type === "clear") {
        updatedQuantity = 0;
        dispatch(deleteCartCount(0));
        dispatch(setCartCount(0));
      } else if (type === "minus") {
        updatedQuantity = updatedQuantity > 0 ? updatedQuantity - 1 : 0;
        dispatch(deleteCartCount(1));
      } else {
        updatedQuantity = updatedQuantity + 1;
        dispatch(setCartCount(cartCount + 1));
      }

      const add_on_groups_data =
        getSubCategory?.add_on_groups?.length > 0
          ? getSubCategory?.add_on_groups[0]?.add_ons?.length > 0
            ? getSubCategory?.add_on_groups[0]?.add_ons?.map((val: any) => {
                let Vid = val.id;
                let updatedVal = val;
                extra?.map((v: any) => {
                  if (v?.id == Vid) {
                    updatedVal = {
                      ...val,
                      check: v?.value,
                    };
                  }
                  return v;
                });

                return updatedVal;
              })
            : []
          : [];
      //-------------------------- future usecode
      // const totalReorderPrice = (optionPrice: any, data: any) => {
      //   let tot: any = optionPrice;
      //   let mainData = extra?.add_ons?.length > 0 ? extra : data;
      //   mainData?.map((val: any) => {
      //     console.log(
      //       "validTotal",
      //       val,
      //       extra?.length > 0,
      //       val?.check == true || val?.check == "true"
      //     );
      //     if (val?.check == true || val?.check == "true") {
      //       tot = parseFloat(tot) + parseFloat(val?.price);
      //     }
      //     return tot;
      //   });
      //   let validTotal = parseFloat(tot).toFixed(2);
      //   console.log(validTotal, "validTotal");

      //   return validTotal;
      // };
      const updatedSubCategory = {
        ...getSubCategory,
        quantity: updatedQuantity ? updatedQuantity?.toString() : "0",
        instructionnote: instructionValue
          ? instructionValue
          : getSubCategory?.instructionnote,
        add_on_groups:
          type === "REORDER"
            ? extra
            : [
                {
                  ...getSubCategory?.add_on_groups[0],
                  add_ons:
                    type === "REORDER"
                      ? reorderDetails?.add_on_groups[0]?.add_ons
                        ? reorderDetails?.add_on_groups[0]?.add_ons
                        : []
                      : add_on_groups_data,
                },
              ],
        options:
          type === "REORDER"
            ? reorderDetails?.options
            : getSubCategory?.options,
        price:
          type === "REORDER"
            ? reorderDetails?.total_item_price
            : // totalReorderPrice(
              //     reorderDetails?.total_item_price,
              //     reorderDetails?.add_on_groups[0]?.add_ons
              //   )
              getSubCategory?.price,
      };

      const updatedSubCategoriesList =
        selectedCategoryItem?.subcategories[0]?.products?.map((item: any) => {
          if (item.id == selectedSubCategoryId) {
            return updatedSubCategory;
          }
          return item;
        });
      console.log(updatedSubCategoriesList, "updatedSubCategoriesList");
      console.count("updatedSubCategoriesList");

      const updatedCategory = {
        ...selectedCategoryItem,
        subcategories: [
          {
            ...selectedCategoryItem?.subcategories[0],
            products: updatedSubCategoriesList,
          },
        ],
      };

      // console.log(prev, "prev", type === "REORDER" && prev?.length > 0);

      let data =
        type === "REORDER" && prev?.length > 0 ? mainData : productCategories;
      let final = data?.map((item: any) => {
        if (
          item?.category_id ==
          (typeof selectedMainCategoryId == "string"
            ? selectedMainCategoryId
            : selectedMainCategoryId
            ? selectedMainCategoryId?.toString()
            : "0")
        ) {
          // console.log(updatedCategory, "updatedCategory");

          return updatedCategory;
        }
        return item;
      });
      return final;
    });

    setExtraDish([]);
  };

  const cancelOrders = () => {
    setCartInformation([]);
    localStorage.removeItem("cartInformationData");
    localStorage.removeItem("splitPrice");
    // if (repeatOrderId == "") {
    setTimeout(() => {
      setProductCategories(initialdata);
    }, 1000);
    // }
    // menuList();
  };

  // ----------------------------------handle chnage option-
  const handleOptionChange = (
    id: any,
    selectedMainCategoryId: any,
    selectedSubCategoryId: any,
    extra: any
  ) => {
    let selectedOption = id;

    const selectedCategoryItem: any = productCategories?.find(
      (item: any) => item.category_id === selectedMainCategoryId.toString()
    );

    const getSubCategory =
      selectedCategoryItem?.subcategories[0].products?.find(
        (item: any) => item.id === selectedSubCategoryId
      );
    let selectedOptionPrice = getSubCategory?.price
      ? getSubCategory?.price
      : "0";

    const totalPrice = (price: any) => {
      let priced = parseFloat(price);

      extra.map((val: any) => {
        if (val?.value) {
          priced = priced + parseFloat(val.price);
        }
      });

      return priced?.toFixed(2);
    };
    const getOption = getSubCategory?.options?.map((option: any) => {
      if (selectedOption) {
        if (option.id == selectedOption) {
          //  totalPrice(option.price);
          selectedOptionPrice = option.price;
          return { ...option, is_default: "1", price: selectedOptionPrice };
        } else {
          return { ...option, is_default: "0" };
        }
      } else {
        return { ...option };
      }
    });

    //

    let option = getOption;
    // let updatedQuantity = parseInt(quantity);

    const updatedSubCategory = {
      ...getSubCategory,
      options: option,
      price: selectedOptionPrice,
    };

    //

    const updatedSubCategoriesList =
      selectedCategoryItem?.subcategories[0]?.products?.map((item: any) => {
        if (item.id === selectedSubCategoryId) {
          return updatedSubCategory;
        }
        return item;
      });

    const updatedCategory = {
      ...selectedCategoryItem,
      subcategories: [
        {
          ...selectedCategoryItem.subcategories[0],
          products: updatedSubCategoriesList,
        },
      ],
    };

    const updatedCategoriesList = productCategories?.map((item: any) => {
      if (item.category_id === selectedMainCategoryId.toString()) {
        return updatedCategory;
      }
      return item;
    });

    updatedCategoriesList && setProductCategories(updatedCategoriesList);
  };
  // useeeffect categories-----

  useEffect(() => {
    // console.log(productCategories, "productCategories");
    // console.count("productCategories");
    if (productCategories?.length > 0) {
      const cartInformationData = productCategories?.filter((item: any) => {
        return item?.subcategories[0].products?.some(
          (subItem: any) => parseInt(subItem?.quantity) > 0
        );
      });

      setCartInformation(cartInformationData);

      if (cartInformationData?.length > 0) {
        setTimeout(() => {
          setLocalValue("cartInformationData", cartInformationData);
        }, 2000);
      }
      if (repeatOrderId != "" && !repeatOrderStatus) {
        // dispatch(clearCart());
        // dispatch(clearSplitPrice());
        // cancelOrders();
        // dispatch(clearCartCount());
        setTimeout(() => {
          repeatOrderData(repeatOrderId);
        }, 1000);

        // localStorage.removeItem("cartInformationData");
      }
    }
  }, [productCategories]);

  return (
    <div>
      <section
        className="menu-section"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            {settings?.info?.name ? (
              <div className="menu-heading col-lg-7">
                <h2>
                  {settings && settings?.info?.name
                    ? settings?.info?.name
                    : "" + " " + settings?.info?.description
                    ? settings?.info?.description
                    : ""}
                </h2>
                {settings?.info?.description ? (
                  <p className="res-sub-title">
                    <span>
                      {settings?.info?.description}
                      <span> - </span>
                    </span>
                    <span>Sandwich</span>
                  </p>
                ) : (
                  <></>
                )}
                <p className="opening-info">
                  <span
                    className={`badge ${
                      settings?.info?.online_order_status == "1"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {" "}
                    {settings?.info?.online_order_status == "1"
                      ? "Open"
                      : "closed"}{" "}
                  </span>{" "}
                  :{" "}
                  {settings?.info?.online_order_status != "1"
                    ? "You can pre-order for tomorrow."
                    : "You can order now."}
                </p>
              </div>
            ) : (
              <></>
            )}
            <div className="col-lg-5">
              {settings?.info ? (
                <div className="menu-info">
                  <ul>
                    <li className="menu-button">
                      <i className="far fa-credit-card menu-icon"></i>{" "}
                      {settings ? settings?.info?.currency_symbol : "£"}
                      {settings ? settings?.info?.cost_for_two : "150.00"} for
                      two people (approx.)
                    </li>
                    <li className="menu-button">
                      <i className="fas fa-biking menu-icon"></i>{" "}
                      {settings?.info?.minimum_delivery_time
                        ? settings?.info?.minimum_delivery_time
                        : "40"}{" "}
                      -{" "}
                      {settings?.info?.maximum_delivery_time
                        ? settings?.info?.maximum_delivery_time
                        : "60"}{" "}
                      mins Estimated Delivery
                    </li>
                    <li className="menu-button">
                      <i className="far fa-clock menu-icon"></i>{" "}
                      {settings?.info?.minimum_delivery_time
                        ? settings?.info?.minimum_delivery_time
                        : "40"}{" "}
                      Estimated Collection
                    </li>
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="section-orderlist first-background">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 leftsidebar">
              <div className="category-sec">
                <h3 className="res-title">Menu</h3>
                {productCategories &&
                  productCategories?.map((item: any) => {
                    return (
                      <div
                        onClick={() => {
                          onCategoryClickHandler(item?.category_id);
                        }}
                        className={
                          productCategories[selectedCategoryIndex]
                            ?.category_id == item?.category_id
                            ? "category-container active-swiper"
                            : "category-container"
                        }
                      >
                        {item?.category_name}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-sm-12 col-lg-7">
              <div className={`rest-card ${close ? "d-none" : ""}`}>
                <div className="alert allergy-info alert-dismissible">
                  <h6>Allergy Advice!</h6>
                  <div className="alergy-info-body">
                    <p>
                      Some of the items on our menu will contain one or more
                      allergens. If you have an allergy, please visit our{" "}
                      <Link to="/allergyadvise" className="alert-link">
                        Allergy Advice Page
                      </Link>{" "}
                      for further information or speak to our staff about your
                      requirements by calling <strong>1800534324242</strong>
                    </p>
                    <div className="d-block text-right">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm "
                        data-dismiss="alert"
                        onClick={() => setClose(!close)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-12 mb-5">
                  <div className="product-list">
                    {productCategories?.length > 0 &&
                      productCategories[
                        selectedCategoryIndex
                      ]?.subcategories[0]?.products?.map((item: any) => {
                        // console.log(item, "subcategory");

                        return (
                          <div className="menu-list">
                            <div className="food-img">
                              <img
                                src={item?.images[0]}
                                title={item?.name}
                                className="img-fluid"
                              />
                            </div>
                            <div className="food-details">
                              <div className="food-title">
                                <h6 className="mb-2">{item?.name}</h6>
                              </div>
                              <div className="food-desc">
                                <span>{item?.description}</span>
                              </div>
                              <div className="food-delivery">
                                <ul className="post-meta">
                                  <li>
                                    <img src={vegicon} />
                                    &nbsp;
                                  </li>
                                  <li>
                                    {item?.spice_level == 2 ? (
                                      <>
                                        <img src={chilli2} />
                                        <img src={chilli2} />
                                      </>
                                    ) : (
                                      <img src={chilli2} />
                                    )}
                                  </li>
                                  <li>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="feather feather-check-square"
                                    >
                                      <polyline points="9 11 12 14 22 4"></polyline>
                                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                    </svg>
                                    {/* Regular */}
                                    {item?.options.map((val: any) => {
                                      return <>{val?.name}</>;
                                    })}
                                  </li>
                                  <li className="gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="feather feather-edit"
                                    >
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        if (!show) {
                                          setshow(true);
                                          setCustomizeData({
                                            detail: item,
                                            id: item.id,
                                            main_id:
                                              productCategories[
                                                selectedCategoryIndex
                                              ].category_id,
                                            type: "add",
                                          });
                                        }
                                      }}
                                    >
                                      Customise
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="ord-btn">
                              <div className="food-price">
                                <h6>
                                  £
                                  {parseInt(item?.spice_level) === 0
                                    ? parseFloat(item?.price)
                                    : parseFloat(item?.price)}
                                </h6>
                              </div>

                              <div className="qty-option">
                                {item?.quantity && item?.quantity > 0 ? (
                                  <button
                                    type="button"
                                    className="btn add_to_cart_btn"
                                    data-type="minus"
                                    data-field=""
                                    disabled={item.spice_level === "0"}
                                    onClick={() =>
                                      onAddToCartItemHandler(
                                        item?.id,
                                        productCategories[selectedCategoryIndex]
                                          .category_id,
                                        "minus",
                                        extraDish,
                                        ""
                                      )
                                    }
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                ) : (
                                  <></>
                                )}
                                <input
                                  placeholder=""
                                  className="edit_input"
                                  id="quantity_1_1_1"
                                  name="quantity_1_1_1"
                                  type="text"
                                  value={item?.quantity ? item?.quantity : 0}
                                />
                                <button
                                  type="button"
                                  className="btn add_to_cart_btn"
                                  data-type="plus"
                                  data-field=""
                                  onClick={() => {
                                    onAddToCartItemHandler(
                                      item.id,
                                      productCategories[selectedCategoryIndex]
                                        .category_id,
                                      "add",
                                      extraDish,
                                      ""
                                    );
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </div>

                            <div className="btn-group w-100 select-btn d-none">
                              <select
                                className="catselect"
                                onChange={(e) => {
                                  handleOptionChange(
                                    e,
                                    productCategories[selectedCategoryIndex]
                                      .category_id,
                                    item.id,
                                    ""
                                  );
                                }}
                              >
                                {item.options.map((subItem: any) => {
                                  return (
                                    <option
                                      value={subItem.id}
                                      selected={
                                        subItem.is_default == "1" ? true : false
                                      }
                                    >
                                      {subItem?.option_description}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-3">
              <div className="theiaStickySidebar">
                <div className="pl-style">
                  <div className="skiptoquickorder text-center d-none">
                    <div className="quick-order-btn mb-15">
                      <button className="btn btn-lg" onClick={handleQuickOrder}>
                        Skip to <strong>Quick Order</strong>
                      </button>
                    </div>
                    <p className="mb-0 text-muted">
                      <i className="fa fa-info-circle"></i> We'll collect your
                      bag and bill you after
                    </p>
                  </div>
                  <div className="price-details Ord-summary cart-summary">
                    <div className="price-header text-center">
                      <h2>Your Order</h2>
                    </div>
                    <div className="price-body table-responsive">
                      <table className="order-table">
                        <thead>
                          <tr>
                            <th className="item_quantity">Qty</th>
                            <th className="item_name">Name</th>
                            <th className="item_action"></th>
                            <th className="normal_total_item">
                              <span className="total_item_price">Price</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody id="cart_body">
                          {cartInformation?.map((item: any) => {
                            return (
                              <>
                                {item?.subcategories[0].products
                                  ?.filter(
                                    (subItem: any) =>
                                      parseInt(subItem.quantity) > 0
                                  )
                                  ?.map((subCategory: any, index: any) => {
                                    return (
                                      <tr>
                                        <td className="item_quantity">
                                          {subCategory?.quantity}
                                          {/* <input
                                            min="1"
                                            data-cart-index="prod_3_3"
                                            type="text"
                                            value={subCategory?.quantity}
                                            id="item_quantity_prod_3_3"
                                            className="edit_input cart_item_quantity"
                                          /> */}
                                        </td>
                                        <td className="item_name">
                                          <strong>{item?.category_name}</strong>
                                          <br />
                                          {subCategory?.name}
                                          {/* {subCategory?.options[0]?.name &&
                                            `(${subCategory?.options[0]?.name})`} */}
                                          {subCategory?.options
                                            ?.filter(
                                              (val: any) =>
                                                val?.is_default == "1"
                                            )
                                            .map((val: any) => {
                                              return <>({val?.name})</>;
                                            })}
                                          <p className="mb-2">
                                            {subCategory?.add_on_groups[0]?.add_ons?.map(
                                              (val: any) => (
                                                <>
                                                  {(val?.check == true ||
                                                    val?.check == "true") && (
                                                    <small>{val?.name},</small>
                                                  )}
                                                </>
                                              )
                                            )}
                                            {/* {subCategory?.extra?.map(
                                              (val: any) => (
                                                <small>{val?.name},</small>
                                              )
                                            )} */}
                                          </p>
                                          {subCategory?.instructionnote && (
                                            <small>
                                              note:
                                              {subCategory?.instructionnote}
                                            </small>
                                          )}
                                        </td>
                                        <td className="item_action">
                                          <div className="order-action text-right">
                                            <a
                                              data-cart-index-id="prod_3_3"
                                              href="javascript:void(0);"
                                              className="delete_item delete_cart_item"
                                              data-toggle="modal"
                                              data-target="#DialogBasic"
                                            >
                                              <i
                                                className="far fa-trash-alt"
                                                onClick={() => {
                                                  onAddToCartItemHandler(
                                                    subCategory.id,
                                                    item?.category_id,
                                                    "delete",
                                                    extraDish,
                                                    ""
                                                  );
                                                }}
                                              ></i>
                                            </a>
                                          </div>
                                        </td>
                                        <td className="normal_total_item">
                                          {
                                            settings?.WebmasterSettings
                                              ?.currency
                                          }
                                          &nbsp;
                                          {(
                                            parseFloat(subCategory?.quantity) *
                                              parseFloat(subCategory?.price) +
                                            parseFloat(
                                              subCategory?.add_on_groups
                                                ?.length > 0
                                                ? subCategory?.add_on_groups[0]?.add_ons
                                                    ?.filter(
                                                      (addon: any) =>
                                                        addon?.check == true ||
                                                        addon?.check == "true"
                                                    )
                                                    ?.reduce(
                                                      (
                                                        acc: number,
                                                        addon: any
                                                      ) =>
                                                        acc +
                                                        parseFloat(
                                                          addon?.price
                                                        ),
                                                      0
                                                    )
                                                : 0
                                            ) *
                                              parseFloat(subCategory?.quantity)
                                          ).toFixed(2)}
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className="cs-option-amt">
                        <div className="cs-option-amt-list">
                          {/* <div className="cs-option-amt-left">
                            Price ({selectedcategoryPriceList?.itemsCount}{" "}
                            items)
                          </div> */}
                          Sub Total
                          <div className="cs-option-amt-right">
                            {/* {settings?.WebmasterSettings?.currency}{" "}
                            {selectedcategoryPriceList?.total_price_amount} */}
                            {splitAmountDetails?.currency_symbol}{" "}
                            {splitAmountDetails?.total_price}
                          </div>
                        </div>
                        <div className="cs-option-amt-list">
                          <div className="cs-option-amt-left">
                            {/* Amount without VAT */}
                            Tax <br />
                            {`(${
                              splitAmountDetails?.vat_tax_percentage || 0
                            }%)`}{" "}
                            <br />
                            (+)
                          </div>

                          <div className="cs-option-amt-right">
                            {/* {settings?.WebmasterSettings?.currency}
                            {(
                              parseFloat(
                                selectedcategoryPriceList?.total_price_amount
                              ) -
                              parseFloat(selectedcategoryPriceList?.vat_amount)
                            ).toFixed(2)} */}
                            {splitAmountDetails?.currency_symbol}{" "}
                            {splitAmountDetails?.vat_tax_amt}
                          </div>
                        </div>
                        <div className="cs-option-amt-list">
                          <div className="cs-option-amt-left">
                            Offer <br />
                            {`(${
                              splitAmountDetails?.offer_percentage || 0
                            }%)`}{" "}
                            <br />
                            (-)
                          </div>

                          <div className="cs-option-amt-right">
                            {/* {settings?.WebmasterSettings?.currency}
                            {(
                              parseFloat(
                                selectedcategoryPriceList?.total_price_amount
                              ) -
                              parseFloat(selectedcategoryPriceList?.vat_amount)
                            ).toFixed(2)} */}
                            {splitAmountDetails?.currency_symbol}{" "}
                            {splitAmountDetails?.offer_amt}
                          </div>
                        </div>
                        <div className="cs-option-amt-list">
                          <div className="cs-option-amt-left">
                            Delivery <br /> Fee (+)
                          </div>
                          <div className="cs-option-amt-right">
                            {splitAmountDetails?.currency_symbol}{" "}
                            {splitAmountDetails?.delivery_fee}
                          </div>
                        </div>
                        {/* <div className="cs-option-amt-list">
                          <div className="cs-option-amt-left">
                            VAT ({selectedcategoryPriceList?.vat_percentage}
                            %)
                          </div>
                          <div className="cs-option-amt-right">
                            {settings?.WebmasterSettings?.currency}{" "}
                            {selectedcategoryPriceList?.vat_amount}
                          </div>
                        </div> */}
                        <div className="cs-option-amt-list cs-option-amt-listbg">
                          <div className="cs-option-amt-left">
                            {/* Amount Payable */}
                            Total
                          </div>
                          <button
                            className="btn btn-trans"
                            type="button"
                            onClick={() => {
                              if (cartInformation?.length > 0) {
                                dispatch(clearCart());
                                dispatch(clearSplitPrice());
                                cancelOrders();
                                dispatch(clearCartCount());
                                // dispatch(clearUserProductCategories());
                              }
                            }}
                          >
                            clear cart
                          </button>
                          <div className="cs-option-amt-right">
                            {/* {settings?.WebmasterSettings?.currency}{" "}
                            {selectedcategoryPriceList?.final_payable_amount} */}
                            {splitAmountDetails?.currency_symbol}{" "}
                            {cartFinalTotal}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="notes">
                      <input
                        id="overall_order_notes"
                        type="text"
                        name="orderNote"
                        className="form-control"
                        value={userInfoNote}
                        placeholder="Order instructions, delivery notes if any"
                        onChange={(e: any) => {
                          setUserInfoNote(e.target.value);
                        }}
                      />
                    </div>
                    <div className="price-footer">
                      <button
                        type="submit"
                        id="submit-btn"
                        className={`continue-btn ${
                          parseInt(cartFinalTotal) <
                          parseInt(minimum_order_amount)
                            ? "hover-btn"
                            : ""
                        } center-block`}
                        // disabled={selectedcategoryPriceList?.itemsCount === 0}
                        disabled={
                          parseInt(cartFinalTotal) <
                          parseInt(minimum_order_amount)
                            ? true
                            : false
                        }
                        onClick={
                          parseInt(cartFinalTotal) <
                          parseInt(minimum_order_amount)
                            ? () => {}
                            : handleContinue
                        }
                      >
                        Checkout{" "}
                        <span className="option-total total-amt">
                          {splitAmountDetails?.currency_symbol} {cartFinalTotal}
                        </span>
                      </button>
                    </div>
                    <div className="text-center price-footer-notes">
                      <small>
                        <b>Note:</b> Minimum order amount is{" "}
                        {splitAmountDetails?.currency_symbol}
                        {minimum_order_amount ? minimum_order_amount : ""}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {show && (
        <CustomizeModel
          visible={show}
          customizeData={customizeData}
          cancel={() => setshow(false)}
          onAddOrder={onAddToCartItemHandler}
          handleOptionChange={handleOptionChange}
          setExtraDish={setExtraDish}
          extraDish={extraDish}
        />
      )}
    </div>
  );
};

export default ProductLists;
