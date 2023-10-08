import React, { useState } from "react";
import {
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
// import Home from "../components/pages/feature/Home";
import Home from "../pages/feature/Home";
import AreaCovered from "../pages/feature/areaCovered";
import FAQ from "../pages/feature/faq";
import Pricing from "../pages/feature/pricing";

// import Header from "../components/header/header";
import Header from "../components/home-theme/theme-one/header/headerThemeOne";

import Footer from "../components/footer";
import MyProfile from "./../components/profile/myProfile/myProfile";
import MyAddress from "../components/profile/myAddress/myAddress";
import MyOrders from "../components/profile/myOrders";
import OrderView from "../components/profile/orderView";
import ProductLists from "../components/productLists";
import ForgotPassword from "../pages/authentication/forgotPassword";
import ResetPassword from "../pages/authentication/resetPassword";
import AllNotifications from "../components/notification/allNotifications";
import EditProfile from "../components/profile/myProfile/editProfile";
import NewAddress from "../components/profile/myAddress/newAddress";
import EditAddress from "../components/profile/myAddress/editAddress";
import PrivacyPolicy from "../components/privacyPolicy";
// import CookiePolicy from "../components/cookiePolicy";
import ReferFriend from "../components/profile/referFriend";
import ShopHome from "../components/shopHome";
import { useEffect } from "react";
import PrivateRoute from "./privaterouter";
// import * as PusherPushNotifications from "@pusher/push-notifications-web";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import ScrollToTop from "../components/scrolltoTop/index";
import SignUp from "../components/signUp";
// import Corporate from "../components/pages/feature/corporate";
// import DeliveryInfo from "../components/deliveryInfo";
// import SpecialOffers from "../components/specialOffers";
// import ContactUs from "../components/contactUs";
import Login from "../pages/authentication/login";
import Corporate from "../pages/feature/corporate";
import CheckOut from "../components/checkout";
import ContactUs from "../components/contactUs";
import AllergyAdvise from "../components/allergyAdvise";
import AreaNotCovered from "../components/areaNotCovered";
import ThankYou from "../components/thankYou";
import TermsAndConditions from "../components/termsAndConditions";
import CookiePolicy from "../components/cookiePolicy";
import ChangePassword from "../components/profile/myProfile/changePassword";
import EditHomeTheme from "../components/edit/edit";
import EditAboutus from "../components/edit/aboutus";
import AboutUs from "../components/home-theme/theme-one/pages-theme/aboutUs/aboutus";
import OpeningTimes from "../components/home-theme/theme-one/pages-theme/openingtimes/openingtimes";
import EditOpeningTimes from "../components/edit/openingtimes";
import DeliveryInfo from "../components/home-theme/theme-one/pages-theme/deliveries/deliveries";
import Editdeliveries from "../components/edit/deliveries";
import Editspecialoffers from "../components/edit/specialoffer";
import SpecialOffers from "../components/home-theme/theme-one/pages-theme/specialOffers/specialoffers";

const userData = { name: "John", token: "test" };

function Basicrouter() {
  const isToken: any = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const ValidToken =
    isToken !== "" && isToken !== undefined && isToken !== null;

  const navigate = useNavigate();
  const location = useLocation();
  let url = location.pathname;
  let splitURL = url.toString().split("/");
  // window.navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {});

  useEffect(() => {
    localStorage.setItem("logged_user", JSON.stringify(ValidToken));
  }, [ValidToken]);

  // useEffect(()=>{
  //   const userInfo = JSON.parse(localStorage.getItem('userDetails')!);
  //   if(userInfo){
  //     navigate('/myProfile');
  //   }else{
  //     navigate('/login');
  //   }
  // })
  return (
    <>
      <ScrollToTop>
        {splitURL[1] !== "shopHome" && splitURL[1] !== "edit-home" && (
          <Header />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-home" element={<EditHomeTheme />} />
          <Route path="/edit-aboutus" element={<EditAboutus />} />
          <Route path="/edit-openingtimes" element={<EditOpeningTimes />} />
          <Route path="/edit-deliveryinfo" element={<Editdeliveries />} />
          <Route path="/edit-specialoffers" element={<Editspecialoffers />} />

          <Route path="/pricing" element={<Pricing />} />
          <Route path="/areaCovered" element={<AreaCovered />} />
          <Route path="/notifications" element={<AllNotifications />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route
            path="/myProfile"
            element={
              <PrivateRoute>
                {" "}
                <MyProfile />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/editProfile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/myAddress"
            element={
              <PrivateRoute>
                <MyAddress />
              </PrivateRoute>
            }
          />

          <Route
            path="/newAddress"
            element={
              <PrivateRoute>
                <NewAddress />
              </PrivateRoute>
            }
          />
          <Route
            path="/editAddress/:address"
            element={
              <PrivateRoute>
                <EditAddress />
              </PrivateRoute>
            }
          />
          {/* <Route path="/dry-cleaners/:location" element={<RushMoor />} /> */}
          <Route
            path="/myOrders"
            element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/orderView/:orderId"
            element={
              <PrivateRoute>
                <OrderView />
              </PrivateRoute>
            }
          />
          <Route
            // /:orderId
            path="/changePassword"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          <Route path="/aboutUs" element={<AboutUs />} />
          {/* <Route path="/reviews" element={<Reviews />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login/:tokenref" element={<Login />} />
          <Route path="/productLists" element={<ProductLists />} />
          <Route path="/checkOut" element={<CheckOut />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/areaNotCovered" element={<AreaNotCovered />} />
          {/* <Route path="/guestLogin" element={<GuestLogin />} /> */}
          {/* /:token */}
          <Route path="/resetPassword?/:token" element={<ResetPassword />} />
          <Route path="/thankYou" element={<ThankYou />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/cookiePolicy" element={<CookiePolicy />} />
          <Route path="/referFriend" element={<ReferFriend />} />
          {/* <Route path="/shopHome/:finalResult" element={<ShopHome />} /> */}
          <Route path="/openingtimes" element={<OpeningTimes />} />
          <Route path="/deliveryinfo" element={<DeliveryInfo />} />
          <Route path="/specialoffers" element={<SpecialOffers />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/allergyadvise" element={<AllergyAdvise />} />
        </Routes>
        {splitURL[1] !== "shopHome" && splitURL[1] !== "edit-home" && (
          <Footer />
        )}
      </ScrollToTop>
    </>
  );
}

export default Basicrouter;
