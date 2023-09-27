import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Notification from "../../../notification";
import Profile from "../../../profile";
import { useDispatch, useSelector } from "react-redux/es/exports";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { ToastContainer } from "react-toastify";
import Pusher from "pusher-js";
import {
  mobilemenu,
  moreitems,
  quickorder,
  myprofile,
  logout,
  callicon,
} from "../../../../assets/img";
import { end_points } from "../../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../../core/Api/api.service";
import { getLocalValue } from "../../../../utility";
const getUser = () => {
  const token: any = localStorage.getItem("userDetails");
  return token ? JSON.parse(token) : "";
};

function getFavicon() {
  return document.getElementById("favicon");
}
function Header() {
  const { postData, getData } = useContext(ApiServiceContext);
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const [changePopup, setChangePopup] = useState(false);
  const [changePopupProfile, setChangePopupProfile] = useState(false);
  const [quickBookPopup, setQuickBookPopup] = useState(false);
  const [cartSummary, setCartSummary] = useState(false);
  const [userName, setUserName] = useState<any>("");
  const [userToken, setUserToken] = useState();

  const [cartValue, setCartValue] = useState<any>([]);
  const [pusherKey, setpusherKey] = useState<any>("");
  const state: any = useSelector<any>((state) => state);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { cartCount }: any = useSelector<any>((state) => state);
  const [notifyCount, setNotifyCount] = useState<any>([]);
  const [cartCounts, setCartCount] = useState<number>(0);
  const name = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "";
  //

  // useEffect(()=>{
  //   const cartInformationData = selectedCategories?.filter((item: any) => {
  //     return item?.sub_categories?.some(
  //       (subItem: any) => parseInt(subItem?.quantity) > 0
  //     );
  //   });
  //   setCartValue(cartInformationData);
  // },[selectedCategories])

  // useEffect(() => {
  //   if (state) {
  //     // const { data = { data: {} } } = state.userDetails;
  //     const data = JSON.parse(localStorage.getItem('userDetails')!);

  //     if (data) {
  //       const { user_info = {} } = data;
  //       const { name = "" } = user_info;
  //
  //       // const token = getToken();
  //       setUserToken(name);
  //       setUserName(name);
  //     }
  //   }
  // }, [state]);

  const selectedCategories: any = useSelector<any>((state) => state.orderInfo);
  const dispatch = useDispatch();
  const Url = window.location.host;
  const blogUrl = `https://blog.${Url}`;
  const activeUrl = window.location.pathname;
  const [settings, setSettings] = useState<any>({});

  const settingsData = async () => {
    const response = await getData(end_points.settingsApi.url);

    if (response) {
      const logo_path = response.data.data.data.info.logo;
      const style_fav = response.data.data.data.info.style_fav;
      const fav_icon = logo_path + "/" + style_fav;
      document.getElementById("favicon")?.setAttribute("href", fav_icon);
      setpusherKey(response.data.data.data.pusher_settings.pusher_key);
      if (response.status != 401) {
        setSettings(response.data.data.data);
        dispatch({ type: "SET_SETTINGS", payload: response.data.data.data });
      }
    }
  };
  useEffect(() => {
    // if (Object.keys(settings).length == 0) {
    // axios({
    //   method: "get",
    //   url: `${base_url}/api/settings`,
    //   headers: {
    //     Accept: "application/json",
    //     "Access-Control-Allow-Methods": "GET, POST",
    //   },
    // })
    //   .then((response) => {
    //     const logo_path = response.data.data.info.logo_path;
    //     const style_fav = response.data.data.info.style_fav;
    //     const fav_icon = logo_path + "/" + style_fav;
    //     document.getElementById("favicon")?.setAttribute("href", fav_icon);
    //     setpusherKey(response.data.data.WebmasterSettings.pusher_app_key);
    //     if (response.status != 401) {
    //       setSettings(response.data.data);
    //     }
    //   })
    //   .catch(function (error) {});
    settingsData();
    // no need
    // }
  }, []);

  useEffect(() => {
    if (state?.userDetails?.data) {
      const user_info = state?.userDetails.data?.user;
      const { name = "" } = user_info;
      // const token = getToken();
      setUserToken(name);
      setUserName(name);
    }

    const selectedMainCategory = selectedCategories?.filter((item: any) => {
      return item?.subcategories[0]?.products?.some(
        (subItem: any) => parseInt(subItem?.quantity) > 0
      );
    });

    let finalTotalPrice = 0;
    let itemsCount = 0;

    if (selectedMainCategory.length) {
      selectedMainCategory?.map((item: any) => {
        const subcategoryList = item?.subcategories[0]?.products?.filter(
          (subItem: any) => parseInt(subItem.quantity) > 0
        );
        itemsCount = itemsCount + subcategoryList?.length;
        subcategoryList?.map((subcategory: any) => {
          finalTotalPrice =
            finalTotalPrice +
            parseInt(subcategory?.quantity) *
              parseFloat(subcategory?.total_price);
        });
      });

      // cartInformationData?.map((item: any) => {
      //   const subcategoryList = item?.sub_categories?.filter(
      //     (subItem: any) => parseInt(subItem.quantity) > 0);
      // });
    }
    setCartCount(selectedCategories.length > 0 ? itemsCount : 0);
  }, [selectedCategories]);

  const navigate = useNavigate();
  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  useEffect(() => {
    // AOS.init();
    // AOS.refresh();
  }, []);

  const [sticky, setSticky] = useState("");

  // on render, set listener
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 100 ? "fixed" : "";
    setSticky(stickyClass);
  };

  const fixedheader = `header ${sticky}`;
  function addNotify() {
    setNotifyCount((prevState: any) => [...prevState, "1"]);
  }

  let oldNotify = "";

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      const userInfo = JSON.parse(localStorage.getItem("userDetails")!);

      const { data } = userInfo;

      if (data != null) {
        // const notifyLocalCount = localStorage.getItem('notifyCount');

        const interest = "1";

        if (interest[1] != undefined) {
          const intrst = interest[1];
          var pusher = new Pusher(pusherKey, {
            cluster: "eu",
          });

          var channel = pusher.subscribe(intrst);
          channel.bind("my-event", function (datas: any) {
            let event = datas.order;
            // alert(event.title);
            // toast.dismiss();

            // setNotifyCount(notifyCount);

            // var newArray = notifyCount.concat('1');

            //

            // const rand = Math.random();

            // setNotifyCount(notifyCount.concat(rand));
            // setNotifyCount((prevState: any) => ([...prevState, '1']))

            if (oldNotify != event.order_id) {
              addNotify();
              oldNotify = event.order_id;
            }

            // localStorage.setItem('notifyCount', `${parseInt(notifyLocalCount!) + 1}`);

            // setNotifyCount(notifyCount + 1);
            // toast(<div>{event.title}<br />{event.body}</div>, { autoClose: false });
          });
        }
      }

      if (data) {
        const user_info = data?.user;
        const { name = "" } = user_info;
        // const token = getToken();
        setUserToken(name);
        setUserName(name);
      }

      // setUserToken(token);
    }
    let handler = (event: { target: Node | null }) => {
      if (menuRef.current) {
        if (!menuRef.current.contains(event.target)) {
          setChangePopupProfile(false);
          setCartSummary(false);
        }
      }
    };
    document.addEventListener("mousedown", function name(params: any) {
      handler(params);
    });
    document.addEventListener("scroll", function name() {
      // AOS.init();
      // AOS.refresh();
    });
  }, []);

  const location = useLocation();

  useEffect(() => {
    sidebarClose();
    cartboxClose();
  }, [location]);

  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  var cartoverlay = document.getElementById("cd-shadow-layer");
  var cdcart = document.getElementById("cd-cart");

  const cartboxClose = () => {
    cdcart?.classList.remove("speed-in");
    cartoverlay?.classList.remove("is-visible");
  };
  const cartboxOpen = () => {
    cdcart?.classList.add("speed-in");
    cartoverlay?.classList.add("is-visible");
  };

  const sidebarClose = () => {
    sidebar?.classList.remove("active");
    overlay?.classList.remove("active");
  };
  const sidebarOpen = () => {
    sidebar?.classList.add("active");
    overlay?.classList.add("active");
  };

  function openQuickOrderPopup() {
    setQuickBookPopup(!quickBookPopup);
    localStorage.setItem("disableLoader", "yes");
  }
  function closeQuickOrderPopup() {
    setQuickBookPopup(false);
    localStorage.removeItem("disableLoader");
  }

  return (
    <div>
      {jsonData && (
        <style type="text/css">
          {` 
            :root {
              --primary-color: #${jsonData?.theme_1?.home?.header?.primary_color};
              --secondary-color: #${jsonData?.theme_1?.home?.header?.secondary_color};
              --nav-bg-color: #${jsonData?.theme_1?.home?.header?.nav?.nav_bg_color};
              --nav-color: #${jsonData?.theme_1?.home?.header?.nav?.menu_font_color};
              --nav-color-hover: #${jsonData?.theme_1?.home?.header?.nav?.menu_font_color_hover};
              --nav-color-active: #${jsonData?.theme_1?.home?.header?.nav?.menu_font_color_active};
          }
          .p-colorpicker-panel .p-colorpicker-color {
            background: transparent url("assets/img/pickerbg.png") no-repeat left top;
          }
          .p-colorpicker-panel .p-colorpicker-hue {
            background: transparent url("assets/img/pickerColors.png") no-repeat left top !important;
          }
          `}
        </style>
      )}
      <div className="header-top">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <div className="header-top-item">
                {jsonData?.theme_1?.home?.header?.social_links
                  ?.enable_social_link && (
                  <div className="header-top-right">
                    <ul>
                      <li>
                        <a
                          href={
                            jsonData?.theme_1?.home?.header?.social_links
                              ?.facebook
                          }
                          target="_blank"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={
                            jsonData?.theme_1?.home?.header?.social_links
                              ?.instagram
                          }
                          target="_blank"
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
                <div className="header-top-left">
                  <ul>
                    <li>
                      <i className="fas fa-map-marker-alt me-1"></i>
                      {jsonData?.theme_1?.home?.header?.location}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <div className="header-top-right">
                <ul>
                  <li>
                    {jsonData?.theme_1?.home?.header?.order_details?.order_text}
                    <span
                      className={`ms-1 badge
                    ${
                      jsonData?.theme_1?.home?.header?.order_details
                        ?.online_order
                        ? "bg-success"
                        : " bg-danger"
                    }
                   `}
                    >
                      {jsonData?.theme_1?.home?.header?.order_details
                        ?.online_order
                        ? "Open"
                        : "Close"}
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-truck"></i>{" "}
                    {
                      jsonData?.theme_1?.home?.header?.order_details
                        ?.delivery_text
                    }
                    <strong className="ms-1">
                      {
                        jsonData?.theme_1?.home?.header?.order_details
                          ?.delivery_time
                      }
                    </strong>
                  </li>
                  <li>
                    {
                      jsonData?.theme_1?.home?.header?.order_details
                        ?.collection_text
                    }
                    <strong className="ms-1">
                      {
                        jsonData?.theme_1?.home?.header?.order_details
                          ?.collection_time
                      }
                    </strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className={fixedheader}>
          <div className="container-fluid">
            <div className="row header-nav">
              <div className="col-md-12 col-sm-12" ref={menuRef}>
                <div className="header-row">
                  <div className="logo">
                    <span
                      id="sidebarCollapse"
                      className="d-block d-md-none"
                      onClick={sidebarOpen}
                    >
                      <img src={mobilemenu} className="img-fluid" />
                    </span>
                    <Link to="/">
                      <img
                        id="site_logo"
                        src={`${
                          Object.keys(settings).length > 0 && settings.info.logo
                        }${
                          Object.keys(settings).length > 0 &&
                          settings?.info?.style_logo_en
                            ? settings?.info?.style_logo_en
                            : ""
                        }`}
                        // src={`${Object.keys(settings).length > 0 && settings.info.style_logo_en}`}
                        alt=""
                      />
                    </Link>
                    <span className="mob-user hidden-md dropdown d-block d-md-none">
                      <img
                        src={moreitems}
                        className="img-fluid"
                        alt=""
                        data-bs-toggle="dropdown"
                      />
                      <ul
                        role="menu"
                        className="dropdown-menu"
                        aria-labelledby="drop1"
                      >
                        {/* <li onClick={() => setQuickBookPopup(!quickBookPopup)}>
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#quickordermodal"
                          >
                            <img src={quickorder} className="img-fluid" alt="" />
                            Quick Order
                          </a>
                        </li> */}
                        {!userToken && (
                          <li className="login">
                            <Link to="/login">
                              <img src={myprofile} className="img-fluid" alt="" />
                              Login
                            </Link>
                          </li>
                        )}
                        {userToken && (
                          <li className="dropdown menu-hover-dropdown">
                            <a
                              className="menuitem"
                              href="#"
                              onClick={(e) => handleLogout(e)}
                            >
                              <img src={logout} className="img-fluid" alt="" />
                              Log Out
                            </a>
                          </li>
                        )}
                      </ul>
                    </span>
                  </div>
                  <ul className="header-link float-end d-none d-md-flex mb-0">
                    <li className="menu-hover">
                      {activeUrl === "/" ? (
                        <NavLink className="nav-bar-link active" to="/">
                          Home
                        </NavLink>
                      ) : (
                        <NavLink className="nav-bar-link" to="/">
                          Home
                        </NavLink>
                      )}
                    </li>
                    <li className="menu-hover">
                      {activeUrl === "/aboutUs" ? (
                        <NavLink className="nav-bar-link active" to="/aboutUs">
                          About Us
                        </NavLink>
                      ) : (
                        <NavLink className="nav-bar-link" to="/aboutUs">
                          About Us
                        </NavLink>
                      )}
                    </li>
                    <li className="menu-hover">
                      {activeUrl === "/openingtimes" ? (
                        <NavLink
                          className="nav-bar-link active"
                          to="/openingtimes"
                        >
                          Opening Times
                        </NavLink>
                      ) : (
                        <NavLink className="nav-bar-link" to="/openingtimes">
                          Opening Times
                        </NavLink>
                      )}
                    </li>
                    <li className="menu-hover">
                      {activeUrl === "/deliveryinfo" ? (
                        <NavLink
                          className="nav-bar-link active"
                          to="/deliveryinfo"
                        >
                          Deliveries
                        </NavLink>
                      ) : (
                        <NavLink className="nav-bar-link" to="/deliveryinfo">
                          Deliveries
                        </NavLink>
                      )}
                    </li>
                    <li className="faq-menu menu-hover">
                      {activeUrl === "/specialoffers" ? (
                        <NavLink
                          className="nav-bar-link active"
                          to="/specialoffers"
                        >
                          Special Offers
                        </NavLink>
                      ) : (
                        <NavLink className="nav-bar-link" to="/specialoffers">
                          Special Offers
                        </NavLink>
                      )}
                    </li>
                    <li className="faq-menu menu-hover">
                      {activeUrl === "/contactus" ? (
                        <NavLink className="nav-bar-link active" to="/contactus">
                          Contact Us
                        </NavLink>
                      ) : (
                        <NavLink className="nav-bar-link" to="/contactus">
                          Contact Us
                        </NavLink>
                      )}
                    </li>
                    <li className="cart-list">
                      <Link
                        className="cart-blk cart-btn"
                        to={cartCounts > 0 ? "/productLists" : "#"}
                        id="toggle-cart"
                      >
                        <i
                          className="fa fa-shopping-cart align-middle"
                          aria-hidden="true"
                        ></i>
                        <span
                          id="cart_total_count"
                          className="count-blk badge rounded-pill badge-warning"
                        >
                          {cartCounts}
                        </span>
                      </Link>
                    </li>
                    {!userToken && (
                      <>
                        <li className="menu-hover">
                          <Link to="/login" className="login-m">
                            <i className="far fa-user"></i> Log in
                          </Link>
                        </li>
                      </>
                    )}
                    {userToken && (
                      <li className="dropdown menu-hover-dropdown login-link cart-list dropdown-notification">
                        <Link
                          to="#"
                          id="drop1"
                          data-bs-toggle="dropdown"
                          className="dropdown-toggle"
                        >
                          <i
                            className="fa fa-bell"
                            aria-hidden="true"
                            onClick={() => setChangePopup(!changePopup)}
                          ></i>
                          <span
                            id="notify_total_count"
                            className="count-blk badge rounded-pill badge-warning"
                          >
                            {notifyCount.length}
                          </span>
                        </Link>
                        <div className="dropdown-menu">
                          <Notification />
                        </div>
                      </li>
                    )}

                    {userToken && (
                      <li className="dropdown menu-hover-dropdown">
                        <Link
                          to="#"
                          id="drop1"
                          data-bs-toggle="dropdown"
                          className="dropdown-toggle"
                          role="button"
                          onClick={() =>
                            setChangePopupProfile(!changePopupProfile)
                          }
                        >
                          {`Hi ${name || userName}!`}
                          <b className="caret"></b>
                        </Link>
                        <div className="dropdown-menu">{<Profile />}</div>
                      </li>
                    )}
                    <li className="site-phone">
                      <div className="call-icon">
                        <img src={callicon} alt="" />
                      </div>
                      <div>
                        <div className="ph-title">Online Ordering Service</div>
                        <div className="ph-number">
                          {settings?.info?.customer_care_number}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </header>
      <nav
        id="sidebar"
        className="mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar"
        style={{ overflow: "visible" }}
      >
        <div
          id="mCSB_1"
          className="mCustomScrollBox mCS-minimal mCSB_vertical mCSB_outside"
          style={{ maxHeight: "480px" }}
        >
          <div
            id="mCSB_1_container"
            className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
            style={{ position: "relative", top: "0px", left: "0px" }}
            dir="ltr"
          >
            <div id="dismiss" onClick={sidebarClose}>
              <i className="fa fa-arrow-left"></i>
            </div>
            <div className="sidebar-header"></div>
            <ul className="list-unstyled components">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/areaCovered">Area Covered</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          id="mCSB_1_scrollbar_vertical"
          className="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal mCSB_scrollTools_vertical"
          style={{ display: "none" }}
        >
          <div className="mCSB_draggerContainer">
            <div
              id="mCSB_1_dragger_vertical"
              className="mCSB_dragger"
              style={{
                position: "absolute",
                minHeight: "0px",
                height: "0px",
                top: "0px",
                display: "block",
              }}
            >
              <div
                className="mCSB_dragger_bar"
                style={{ lineHeight: "0px" }}
              ></div>
            </div>
            <div className="mCSB_draggerRail"></div>
          </div>
        </div>
      </nav>
      <div id="overlay" onClick={sidebarClose}></div>
      <div
        className="modal fade"
        id="quickordermodal"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            {/* {quickBookPopup && ( */}
            {/* // <QuickOrderPopup close={closeQuickOrderPopup} /> */}
            {/* // <QuickOrderPopup close={() => setQuickBookPopup(false)} /> */}
            {/* )} */}
          </div>
        </div>
      </div>
      <div id="cd-shadow-layer" onClick={cartboxClose}></div>
      {/* {<CartSummary />} */}
    </div>
  );
}

export default Header;
