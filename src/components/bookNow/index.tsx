import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchPostalCodes } from "../../redux/Actions";
// import { setLocalValue } from "../../../utility";
import { fetchGetShopByPinCode } from "../../redux/Actions/checkoutPageActions";
import { bannerImg, aboutimage } from "../../assets/img";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item, useGallery } from "react-photoswipe-gallery";
import { setLocalValue } from "../../utility";
import { end_points } from "../../core/end_points/end_points";
import { ApiServiceContext } from "../../core/Api/api.service";
import PreOrderModel from "../home-theme/theme-one/preOrderModel";

// import BookNow from './index';

// const postalCode = [
//     { content: "GU111BH" },
//     { content: "GU111KD" },
//     { content: "GU111MH" },
// ];

const BookNow: React.FC = () => {
  const [postalCodeList, setPostalCodeList] = useState([]);
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const [preOderShow, setPreOderShow] = useState<any>("");
  const dispatch = useDispatch<any>();
  const state: any = useSelector((state) => state);
  const { getData } = useContext(ApiServiceContext);

  // const selectedPostalcode: any = useSelector<any>(
  //   (state) => state.postalCodeList
  // );
  const navigate = useNavigate();
  // --------------------------------------------------------------------------------------------

  // =================================================================================
  // const base_url = "https://revamp.dreamguystech.com"

  // const fetchData = async () => {
  //     const base_url = "https://revamp.dreamguystech.com";
  //     try {
  //         const bodyFormData = new FormData();
  //         bodyFormData.append('keyword', 'Gu11');
  //         // res.header('Access-Control-Allow-Methods', 'GET, POST');
  //         const response = await axios({
  //             method: "post",
  //             url: `${base_url}/api/get_postal_codes`,
  //             data: bodyFormData,
  //             headers: { "Accept": "application/json", 'Access-Control-Allow-Methods': 'GET, POST' },
  //         })
  //         // const response = await axios.post(`${base_url}/api/get_postal_codes`,{keyword:"Gu11"});
  //         // const result = await response.then(response => response);

  //         if (response) {
  //             setPostalCodeList(response.data.data[0])
  //
  //         }
  //     } catch (error) {
  //
  //     }
  // }

  useEffect(() => {
    if (state) {
      setPostalCodeList(state.postalCodeList);
      // setLocalValue("postalCode",state.postalCodeList[0]?.postcode)
    }
  }, [state]);

  // useEffect(() => {
  //     console.log("redval", selectedPostalcode)
  // }, [selectedPostalcode])

  const handleChange = (e: any) => {
    const result = e.target.value.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    // setPostalCodeList(e.target.value);
    const { value } = e.target;
    const updateValue = value.replace(/\s/g, "");
    if (value.length > 0) {
      dispatch(fetchPostalCodes(updateValue));
    }
    setPostalCodeValue(updateValue);
  };
  const onSearch = (searchTerm: any) => {
    // setPostalCodeList(searchTerm);
    setPostalCodeValue(searchTerm);
    setLocalValue("postalCode", searchTerm);
    // dispatch(fetchPostalCodes(searchTerm));
  };
  const handleBooknow = async () => {
    debugger
    if(filteredOptions?.length && !filteredOptions.filter(e=>e.postcode == searchTerm).length){
      toast.error("Post code doesn't match! Please enter valid postcode.")
     return false
   }else{
    setErrorPostalCode("")
   }
    debugger
    if(errorPostalCode.length){
      toast.error(errorPostalCode);
      return false
  }
  const preOrderList = async () => {
    const isValid = state.postalCodeList.some(
      (item: any) => item.postcode === postalCodeValue.toUpperCase()
    );
    setLocalValue("postalCode", postalCodeValue);
    const results = await dispatch(
      fetchGetShopByPinCode(JSON.stringify(postalCodeValue))
    );
    if (!results) {
      navigate("/productLists");
      return;
    }
    if (isValid) {
      navigate("/productLists");
    } else {
      navigate("/areaNotCovered");
    }
  };

  return (
    <>
      <div
        className="home_single_search"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-8">
              <div className="banner-search-wrap text-center">
                {state?.settings && (
                  <>
                    <h1>
                      {/* &amp; */}
                      Welcome to <br/><span className="text-span">our</span>
                      <span className="text-span-2"> {state?.settings?.info?.name}.</span>
                    </h1>
                    <p>
                      {state?.settings?.info?.name}
                      is owned and managed by a close knit family team. We work
                      together as a team to present the most authentic, pure and
                      delicious South and North Indian food at competitive
                      prices.
                    </p>
                  </>
                )}
                <div className="postcodeform">
                  <i className="fas fa-location-arrow map-icon d-flex align-items-center" />
                  <input
                    type="text"
                    id="postcode-input"
                    value={postalCodeValue}
                    name="pincode"
                    placeholder="Enter your pincode"
                    className="ui-autocomplete-input"
                    onChange={handleChange}
                    autoComplete="off"
                  />

                  <button
                    disabled={postalCodeValue.length === 0}
                    onClick={handleBooknow}
                    className="btn hover-btn"
                    id="book_now_btn"
                    type="button"
                  >
                    Find Food
                  </button>
                  <div className="dropdown">
                    {postalCodeList
                      .filter((item: any) => {
                        const searchTerm = postalCodeValue.toLowerCase();
                        const mainValue = item.postcode.toLowerCase();

                        return (
                          searchTerm &&
                          mainValue.startsWith(searchTerm) &&
                          mainValue !== searchTerm
                        );
                      })
                      .slice(0, 10)
                      .map((item: any) => (
                        <div
                          onClick={() => onSearch(item.postcode)}
                          className="dropdown-row"
                          key={item.postcode}
                        >
                          <i className="fas fa-map-marker-alt"></i>
                          {item.postcode}
                        </div>
                      ))}
                  </div>
                  {/* <ul id="ui-id-1" tabIndex={0} className="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front" style={{ top: "477.688px", left: "104.5px", width: "461.266px", display: "none" }}>
                                        <li className="ui-menu-item">
                                            <div id="ui-id-4" tabIndex={-1} className="ui-menu-item-wrapper">GU111BH</div>
                                        </li>
                                    </ul> */}

                  {/* <form method="POST" action="https://revamp.dreamguystech.com/selection" accept-charset="UTF-8" id="postForm">
                                    <input name="_token" type="hidden" value="weQWHBzpwFRfH1sjw4hbF0vHiMbe3AsgTSQB2vnP" />
                                    <input name="postalCode" type="hidden" value="" /> */}
                  {/* <input className="btn btn-default hidden" type="submit" value="Submit" /> */}
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <div className="sub-heading">About Us</div>
            <h2>
              {state ? state?.settings?.info?.name : ""}
              <br />
              {state ? state?.settings?.info?.description : ""}
            </h2>
            <div className="section-line">
              <span></span>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="about-inner">
                <h4>
                  {state ? (
                    <>
                      {state?.settings?.info?.name}{" "}
                      {state?.settings?.info?.description}{" "}
                    </>
                  ) : (
                    ""
                  )}
                </h4>
                <div className="spacing-sm"></div>
                <p>
                  {state?.settings?.info?.name
                    ? state?.settings?.info?.name
                    : ""}{" "}
                  is owned and managed by a close knit family team. We work
                  together as a team to present the most authentic, pure and
                  delicious South and North Indian food at competitive prices.
                  We treat our customers like our family. Our service is
                  combined with an exceptional food quality, is our element. We
                  make sure when the customer sit for the meal, they feel light
                  and effortless and when they are done, they rise with the same
                  feeling of lightness and effortlessness.{" "}
                  {state?.settings?.info?.name} team work strongly to maintain
                  the highest quality and continuously improve in our service to
                  retain the fame and popularity.
                </p>
                <Link to="/contactus" className="btn learn-more">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="col-lg-5 about-img-resp">
              <div className="about-img-wrap">
                <img src={aboutimage} alt="About image" className="img-fluid" />
                <Link to="/aboutUs" className="about-video-btn">
                  <i className="fa fa-play"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="about-section">
        <div className="section-header">
          <div className="sub-heading">Photo Gallery</div>
          <h2>Authentic South and North Indian Cuisine</h2>
          <div className="section-line">
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="row box-space portfolios">
            <Gallery>
              <div className="homeimggrid">
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
                <Item
                  original="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  thumbnail="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src="https://shribheemas.dreamguystech.com/customer/img/gallery/img_1.jpg"
                    />
                  )}
                </Item>
              </div>
            </Gallery>
          </div>
        </div>
        <PreOrderModel
          preOderShow={preOderShow}
          cancel={() => {
            setPreOderShow(false);
          }}
          preOrderList={preOrderList}
        />
      </div>
    </>
  );
};

export default BookNow;
