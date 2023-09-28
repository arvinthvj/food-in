import React, { useContext, useEffect, useState } from "react";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";
import { setUserdetails } from "../../../redux/Actions";
import { useDispatch } from "react-redux";
import HomeThemeOne from "../../../components/home-theme/theme-one";

const Home = () => {
  const { getData, get_cms_data } = useContext(ApiServiceContext);
  // 'https://api.bestatrestaurant.com';
  const dispatch = useDispatch();
  const [getOffer, setGetOffer] = useState<any>();
  const [offerMessage, setOfferMessage] = useState<any>();
  const offerList = async () => {
    const response = await getData(end_points.listOfferDetatilsApi.url);
    if (response) {
      setGetOffer({ result: response.data.data.offer_details });
      setOfferMessage(response.data.Response.response_message);
    }
  };
  let userDetails =
    localStorage.getItem("userDetails") &&
    JSON.parse(localStorage.getItem("userDetails"));
  useEffect(() => {
    userDetails && dispatch(setUserdetails(userDetails));
  }, [userDetails]);

  useEffect(() => {
    // const headers = {
    //   Accept: "application/json",
    // };
    // axios
    //   .get(`${base_url}/api/list_offer_details`, {
    //     headers: headers,
    //   })
    //   .then((e) => {
    //     setGetOffer({ result: e.data.data.offer_details });
    //     setOfferMessage(e.data.Response.response_message);
    //   });
    // offerList();
    // no need now
  }, []);

  useEffect(() => {
    get_cms_data();
  }, []);

  return (
    <div>
      <HomeThemeOne />
      {/* <WeWork />
      <Ourservices/>          */}
      {/* <BestOfferImage /> */}
      {/* <PricingList /> */}
      {/* {getOffer?.result?.length > 0 &&
      offerMessage !== "no offers available right now" &&
      <Offer />
      }    */}
      {/* <OrderOnline />
      <AboutBestAtLaundry />
      <LaundryService /> */}
      {/* <GoogleReviews /> */}
      {/* <DownloadApp /> */}
      {/* <AreaNotCovered /> */}
    </div>
  );
};

export default Home;
