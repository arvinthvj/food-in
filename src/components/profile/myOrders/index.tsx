import React, { useContext, useEffect, useState } from "react";
import CancelPopup from "../../cancelPopup";
import TrackOrderPopup from "../../trackOrderPopup";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchOrderDetails } from "../../../redux/Actions/myOrderAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";
import {
  pending,
  trackorder,
  vieworder,
  myorderimg,
  breadcrumbbg,
  dishimg1,
} from "../../../assets/img";
import { ApiServiceContext } from "../../../core/Api/api.service";
import { end_points } from "../../../core/end_points/end_points";
import { Link } from "react-router-dom";
import { setRepeatOrderid } from "../../../redux/Actions/checkoutPageActions";
import PastOrderModel from "./pastOrderModel";

function MyOrders() {
  const notify = (message: string) => toast(message);

  const [cancelPopup, setCancelPopup] = useState(false);
  const [trackOrderPopup, setTrackOrderPoup] = useState(false);
  const [myOrderList, setMyOrderList] = useState<any>([]);
  const [orderId, setOrderId] = useState("");
  const [confirmPastModel, setConfirmPastModel] = useState<any>({
    type: "",
    data: "",
  });
  const [pagination, setPagination] = useState<any>({
    itemsPerPage: 10,
    currentPage: 1,
    totalCount: 0,
    pages: [],
  });
  const [next, setNext] = useState<any>([]);
  const { postData, getData } = useContext(ApiServiceContext);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);

  const dispatch = useDispatch<any>();
  // const myOrders: any = useSelector<any>((state) => state?.orderInfo);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("myOrders", myOrders);
  // }, [myOrders]);

  const fetchOrderDetails = async (
    limit: any,
    page: any,
    sort: any,
    status: any
  ) => {
    const notify = (message: string) => toast(message);
    try {
      const response = await getData(
        `${end_points?.myOrdersApi?.url}?limit=${limit}&page=${page}&sort=${sort}&order_status=${status}`
      );

      if (response?.data?.code === "200") {
        setMyOrderList(response?.data?.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchOrderDetails(
      pagination.itemsPerPage,
      pagination.currentPage,
      0,
      "all"
    );
  }, []);
  // const data = [];
  // const totalPages = Math.ceil(data.length / itemsPerPage);
  const convertToPages = (data: number) => {
    const totalPages = Math.ceil(data / pagination.itemsPerPage);
    let pagesArr = [];
    for (let i = 0; i < totalPages; i++) {
      pagesArr.push(i + 1);
    }
    return pagesArr;
  };

  useEffect(() => {
    if (myOrderList) {
      const { orders_list } = myOrderList;
      const totalCount = orders_list?.length;
      setPagination({
        ...pagination,
        totalCount,
        pages: convertToPages(totalCount),
      });
      // setMyOrderList(orders_list);
    }
  }, [myOrderList]);

  useEffect(() => {
    // fetchData();
    // dispatch(fetchOrderDetails(limit,page,sort,order_status))
    // dispatch(
    //   fetchOrderDetails(pagination.itemsPerPage, pagination.currentPage, 0, "all")
    // );
    // dispatch(
    //   fetchOrderDetails(10 ,3, 0, "all")
    // );
  }, [pagination]);

  const handleViewOrder = (order_id: string) => {
    navigate(`/orderView/${order_id}`);
  };

  function setTrackOrder(order_id: string) {
    setOrderId(order_id);
    setTrackOrderPoup(!trackOrderPopup);
  }

  const handlePagination = (page: number, type?: string) => {
    if (page) {
      setPagination({
        ...pagination,
        currentPage: page,
      });
      fetchOrderDetails(pagination.itemsPerPage, page, 0, "all");
    }
    switch (type) {
      case "first":
        setPagination({
          ...pagination,
          currentPage: 1,
        });
        fetchOrderDetails(pagination.itemsPerPage, 1, 0, "all");
        break;
      case "last":
        setPagination({
          ...pagination,
          currentPage: pagination.pages[pagination.pages.length - 1],
        });

        fetchOrderDetails(
          pagination.itemsPerPage,
          pagination.pages[pagination.pages.length - 1],
          0,
          "all"
        );

        break;
      case "prev":
        setPagination({
          ...pagination,
          currentPage: pagination.currentPage - 1,
        });

        fetchOrderDetails(
          pagination.itemsPerPage,
          pagination.currentPage - 1,
          0,
          "all"
        );

        break;
      case "next":
        setPagination({
          ...pagination,
          currentPage: pagination.currentPage + 1,
        });

        fetchOrderDetails(
          pagination.itemsPerPage,
          pagination.currentPage + 1,
          0,
          "all"
        );

        break;
      default:
        break;
    }
  };
  const handleNext = () => {
    setNext(pagination.currentPage + 1);
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  function setCancelOrder(order_id: string) {
    setOrderId(order_id);
    setCancelPopup(!cancelPopup);
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
                <h2>My Orders</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span> My Orders </span>
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
                      <i className="fas fa-power-off"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-7 col-xl-9">
              {myOrderList &&
                myOrderList?.orders_list?.map((item: any, index: any) => {
                  return (
                    <>
                      <div className="order-history" key={index}>
                        <div className="order-item">
                          <div className="order-items">
                            <div className="menu-images">
                              <img src={dishimg1} alt="" />
                            </div>
                            <div className="menu-description">
                              <div className="order-header">
                                <h3>#{item?.id}</h3>
                                <span>
                                  {" "}
                                  Order Status:{" "}
                                  <span className="badge bg-success">
                                    {item?.order_status?.current_status}
                                  </span>{" "}
                                </span>
                              </div>
                              <div>
                                Ordered On{" "}
                                {format(
                                  new Date(item?.created_at),
                                  "dd-MM-yyyy"
                                )}
                              </div>
                              <div>
                                <strong>{item?.product_string}</strong>
                              </div>
                              <p className="mb-0">
                                Total amount{" "}
                                <strong>£ {item?.total_price}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="order-footer">
                          <div className="menu-tags">
                            <a
                              onClick={() => {
                                handleViewOrder(item?.id);
                              }}
                              className="order-det-btn"
                            >
                              View Details
                            </a>
                          </div>
                          <div className="menu-cart order-btn">
                            <Link
                              to="#"
                              className="order-buttons-book"
                              onClick={() => {
                                setConfirmPastModel({
                                  type: true,
                                  data: item,
                                });
                              }}
                            >
                              Reorder
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="my-orders d-none">
                        <div className="order-status">
                          <ul>
                            <li className="order-pending">
                              <img src={pending} className="img-fluid" alt="" />
                              {/* {item?.cancelled == '1' ? 'Cancelled' : item?.order_status?.current_status} */}
                            </li>
                            {/* {item.cancelled == '0' && */}
                            <li
                              data-order-id="83"
                              className="text-danger cancel-order"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              onClick={() => setCancelOrder(item?.order_id)}
                            >
                              <a
                                className="text-danger"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <i className="fa fa-times"></i> Cancel{" "}
                              </a>
                            </li>
                            {/* }
                          {item?.cancelled == '0' && */}
                            <li
                              className="track-order"
                              onClick={(e) =>
                                setTrackOrder(item?.order_status_id)
                              }
                            >
                              <a
                                href="#"
                                className="order-track"
                                data-bs-toggle="modal"
                                data-bs-target="#8QT3BN"
                              >
                                <img
                                  src={trackorder}
                                  className="img-fluid"
                                  alt=""
                                />
                                Track Order
                              </a>
                            </li>
                            {/* }  */}
                            <li
                              className="order-approved"
                              onClick={() => {
                                handleViewOrder(item?.id);
                              }}
                            >
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <img
                                  src={vieworder}
                                  className="img-fluid"
                                  alt=""
                                />{" "}
                                View Order
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  );
                })}
              {myOrderList?.length === 0 && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="res-not-found text-center">
                      <div className="res-not-icon">
                        <i className="fas fa-search"></i>
                      </div>
                      <h1>No Order Found</h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {myOrderList?.length !== 0 && (
            <div className="row d-none">
              <div className="col-md-12 pagination_myorder">
                <nav className="myorder-pagination">
                  <ul className="pagination">
                    <li
                      className="page-item "
                      onClick={() => handlePagination(0, "first")}
                    >
                      <a href="#" className="page-link">
                        First
                      </a>
                    </li>
                    <li
                      className="disabled"
                      onClick={() => handlePagination(0, "prev")}
                    >
                      <span>«</span>
                    </li>
                    {pagination.pages &&
                      pagination.pages.map((page: number, idx: number) => (
                        <li
                          onClick={() => handlePagination(page)}
                          className={`${
                            page === pagination.currentPage ? "active" : ""
                          }`}
                        >
                          <span>{page} </span>
                        </li>
                      ))}
                    <li onClick={() => handlePagination(0, "next")}>
                      <span>»</span>
                    </li>
                    <li
                      className="page-item "
                      onClick={() => handlePagination(0, "last")}
                    >
                      <a href="#" className="page-link">
                        Last
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
      {confirmPastModel.type && (
        <PastOrderModel
          showModal={confirmPastModel}
          handleClose={() => {
            setConfirmPastModel({ type: false, data: "" });
          }}
        />
      )}
      {cancelPopup && (
        <CancelPopup orderId={orderId} close={() => setCancelPopup(false)} />
      )}
      {trackOrderPopup && (
        <TrackOrderPopup
          close={() => setTrackOrderPoup(false)}
          orderId={orderId}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default MyOrders;
