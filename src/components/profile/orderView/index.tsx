import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TrackOrderPopup from "../../trackOrderPopup";
import { breadcrumbbg } from "../../../assets/img";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";
import { Link } from "react-router-dom";
import { setRepeatOrderid } from "../../../redux/Actions/checkoutPageActions";
import moment from "moment";

const OrderView: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<any>([]);
  const [trackOrderPopup, setTrackOrderPoup] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const dispatch = useDispatch<any>();
  const state: any = useSelector<any>((state) => state.orderDetails);
  const settings: any = useSelector<any>((state) => state.settings);
  const { postData } = useContext(ApiServiceContext);
  const params = useParams<any>();
  const currency_symbol = settings?.info?.currency_symbol
    ? settings?.info?.currency_symbol
    : "£";
  const navigate = useNavigate();

  const fetchOrderDetails = async (orderId: any) => {
    let payload = { order_id: orderId };
    const response = await postData(end_points.orderDetailsApi.url, payload);
    setOrderDetails(response?.data?.data?.order);
  };
  // useEffect(() => {
  //   if (state) {
  //     const { order } = state;
  //     setOrderDetails(order);
  //     console.log("order", order);
  //   }
  // }, [state]);

  useEffect(() => {
    if (params.orderId) {
      const orderId = params.orderId;
      setOrderId(orderId);
      fetchOrderDetails(orderId);
    }
    // fetchData();
    // dispatch(fetchMyOrders(limit,page,sort,order_status))
  }, []);
  useEffect(() => {}, [orderDetails]);
  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  function totalCount(orderDetails: any): number {
    var count: number = 0;
    if (orderDetails.order_items) {
      orderDetails.order_items.map((orderItem: any) => {
        orderItem.items.map((items: any) => {
          count += JSON.parse(items.item_quantity);
        });
      });
    }

    return count;
  }

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
                <h2>Order View</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span> Order View</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-myorders">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-xl-3">
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
                      className="active"
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
            <div className="col-lg-7 col-xl-9">
              <div className="row align-items-center mb-4">
                <div className="col">
                  <h4>Order Summary </h4>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12">
                  <h5 className="mb-3">Ordered Details</h5>
                  <div className="row mb-2">
                    <div className="col-6">Order Reference:</div>
                    <div className="col-6">{orderDetails?.order_reference}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">Ordered On:</div>
                    <div className="col-6">
                      {moment().format("ddd, MMM D, YYYY h:mm A")}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">Order Status:</div>
                    <div className="col-6">
                      <span className="badge bg-success">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h5 className="mb-3">Ordered Items</h5>
                  <div className="row">
                    <div className="col-12">
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th>Sno.</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetails?.properties?.cart_checkout_data?.cart_items?.map(
                            (item: any, index: number) => {
                              return (
                                <>
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      {item?.product_title}{" "}
                                      <small>
                                        (
                                        {item?.option_selected?.name
                                          ? item?.option_selected?.name
                                          : "Full"}
                                        )
                                      </small>
                                      <br />
                                      <small>
                                        {item?.add_on_groups &&
                                          item?.add_on_groups[0]?.add_ons?.map(
                                            (val: any) => {
                                              let data = [];
                                              if (val?.check == "true") {
                                                data.push(`${val?.name},`);
                                              }
                                              return (
                                                <>
                                                  <strong>
                                                    {data?.join(", ")}
                                                    {/* Onion Raitha, Plain Curd,
                                                    Brinjal Curry */}
                                                  </strong>
                                                </>
                                              );
                                            }
                                          )}
                                        {item?.notes && (
                                          <div>
                                            Notes:
                                            <small>{item?.notes}</small>
                                          </div>
                                        )}
                                      </small>
                                    </td>
                                    <td>{item?.qty}</td>
                                    <td>
                                      {currency_symbol}
                                      {item?.total_item_price}
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                          )}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={2}></td>
                            <td>Sub Total</td>
                            <td>
                              {currency_symbol}
                              {
                                orderDetails?.properties?.cart_checkout_data
                                  ?.sub_total
                              }
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td>
                              Tax (
                              <span>
                                {
                                  orderDetails?.properties?.cart_checkout_data
                                    ?.tax_percentage
                                }
                                %)
                              </span>
                            </td>
                            <td>
                              {currency_symbol}
                              {
                                orderDetails?.properties?.cart_checkout_data
                                  ?.tax_amount
                              }
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td>
                              Offer (
                              <span>
                                {
                                  orderDetails?.properties?.cart_checkout_data
                                    ?.flat_offer_percentage
                                }
                                %)
                              </span>
                            </td>
                            <td>
                              {currency_symbol}
                              {
                                orderDetails?.properties?.cart_checkout_data
                                  ?.offer_applied_amount
                              }
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td>Delivery Fee</td>
                            <td>
                              {currency_symbol}
                              {
                                orderDetails?.properties?.cart_checkout_data
                                  ?.delivery_fee
                              }
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}></td>
                            <td>
                              <strong>Total</strong>
                            </td>
                            <td>
                              <strong>
                                {currency_symbol}
                                {
                                  orderDetails?.properties?.cart_checkout_data
                                    ?.final_total_after_offer
                                }
                              </strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="menu-cart order-btn text-center">
                    <Link
                      to="/productLists"
                      className="order-buttons-book d-inline-block"
                      onClick={() => {
                        dispatch(setRepeatOrderid(orderId));
                      }}
                    >
                      Reorder
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-myorders">
        <div className="container">
          <div className="row">
            <div className="col-md-12 orderview-id">
              <h1>Order ID - {orderDetails?.id}</h1>
              <span className="float-end d-none d-md-block">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/myOrders");
                  }}
                >
                  <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                  Back to my orders
                </a>
              </span>
            </div>
          </div>
          <div className="row">
            {/* <div className="col-md-8 col-sm-6">
              <div className="list-count">
                <div className="menswear-checkout p-3">
                  {orderDetails.order_items &&
                    orderDetails.order_items.map((orderItems: any) => (
                      <div className="orderlist-view">
                        <div className="menswear_header">
                          <span>
                            <img src={userimage} className="img-fluid" alt="" />
                          </span>
                          <span>
                            <h3>{orderItems.main_category}</h3>
                          </span>
                        </div>
                        {orderItems.items.map((item: any) => (
                          <div className="cloth-expand">
                            <div className="menswear-body">
                              <div className="order-total">
                                <div className="row">
                                  <div className="listcloth-lft col-md-7 col-xs-7">
                                    <h2>
                                      <img
                                        src={shirticon}
                                        className="img-fluid"
                                        alt=""
                                      />
                                      {item.sub_category}
                                    </h2>
                                    <span>{item.option_selected}</span>
                                  </div>
                                  <div className="col-md-5 col-xs-5 listcloth-rht vertical-align">
                                    <div className="ordered-items float-end">
                                      <span className="orderedd-item-qty">
                                        Qty : {item.item_quantity}
                                      </span>
                                      <span className="orderedd-item-price">
                                        {settings?.WebmasterSettings?.currency} {item.item_total_price}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                      </div>
                    ))}                  
                </div>
                <div className="menswear-checkout box">
                  <div className="ordertotal-count">
                    <div className="orders-total">
                      <span className="lft-ordertitle">Total Count</span>
                      <span className="rht-orderamt float-end">
                        {totalCount(orderDetails)}                        
                      </span>
                    </div>
                    <div className="orders-total">
                      <span className="lft-ordertitle">Payment Method</span>
                      <span className="rht-orderamt float-end">
                        Debit/Credit
                      </span>
                    </div>
                    <div className="orders-total">
                      <span className="lft-ordertitle">Pickup</span>
                      <span className="rht-orderamt float-end">
                        {Object.keys(orderDetails).length > 0 &&
                          format(
                            new Date(orderDetails.pickup_date),
                            "dd-MM-yyyy"
                          )}{" "}
                        ({orderDetails.pickup_time_slot})
                      </span>
                    </div>
                    <div className="orders-total">
                      <span className="lft-ordertitle">Delivery</span>
                      <span className="rht-orderamt float-end">
                        {Object.keys(orderDetails).length > 0 &&
                          format(
                            new Date(orderDetails.delivery_date),
                            "dd-MM-yyyy"
                          )}{" "}
                        ({orderDetails.delivery_time_slot})
                      </span>
                    </div>
                    <div className="orders-total">
                      <span className="lft-ordertitle">Amount</span>
                      <span className="rht-orderamt float-end">
                        {orderDetails.price_currency}{" "}
                        {orderDetails.price_before_discount}
                      </span>
                    </div>
                    <div className="orders-total">
                      <span className="lft-ordertitle">VAT</span>
                      <span className="rht-orderamt float-end">
                        ({orderDetails.vat_percentage}%){" "}
                        {orderDetails.price_currency} {orderDetails.vat_amount}
                      </span>
                    </div>
                    <div className="orders-total">
                      <span className="lft-ordertitle">Total Amount</span>
                      <span className="rht-orderamt float-end ordertotal-amt">
                        {orderDetails.price_currency} {orderDetails.total_amout}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div> */}
            {/* <div className="col-md-4 col-sm-6">
              <div className="ordertotal">
                <h2>
                  <img src={shippingaddress} className="img-fluid" alt="" />
                  Shipping Address
                </h2>
                <div className="orders-total">
                  {orderDetails.pickup_address && (
                    <p>{orderDetails.pickup_address.text_address}</p>
                  )}
                </div>
              </div>
              <div className="ordertotal">
                <h2>
                  <img src={Billingaddress} className="img-fluid" alt="" />{" "}
                  Billing Address
                </h2>
                <div className="orders-total">
                  {orderDetails.billing_address && (
                    <p>{orderDetails.billing_address.text_address}</p>
                  )}
                </div>
              </div>
              <div className="btn_thankyou_mob">
                <ul className="order-status">
                  <li className="order-pending float-start">
                    <img src={pending} className="img-fluid" alt="" />
                    {orderDetails.cancelled == "1"
                      ? "Cancelled"
                      : orderDetails.order_status &&
                        orderDetails.order_status.current_status}
                  </li>
                  {orderDetails.cancelled == "0" && (
                    <li className="float-end">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setTrackOrderPoup(!trackOrderPopup);
                        }}
                        className="order-track"
                        data-bs-toggle="modal"
                        data-bs-target="#8QT3BN"
                      >
                        <img src={trackorder2} className="img-fluid" alt="" />
                        Track Order
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {trackOrderPopup && (
        <TrackOrderPopup
          close={() => setTrackOrderPoup(false)}
          orderId={orderId}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default OrderView;
