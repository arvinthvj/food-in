import React, { useContext, useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";
import { Navigation } from "swiper";
import { breadcrumbbg} from '../../../assets/img';

const priceListData = {
  data: {
    Response: {
      response_code: "",
      response_message: "",
    },
    data: {},
  },
  rowcount: 0,
  active: "active",
};

function Pricing() {
  const { getData } = useContext(ApiServiceContext);
  const [priceList, setPriceList] = useState<any | null>(priceListData);
  const [elRefs, setElRefs] = React.useState([]);
  const [active, setActive] = useState(null);
  const settings: any = useSelector<any>((state) => state.settings);
  const categoriesList = async () => {
    const response = await getData(end_points.categoriesListApi.url);
    setPriceList({ data: response.data });

    response.data.data.category
      .slice(0, 1)
      .map((category: any) => setActive(category.main_category_name));
  };
  useEffect(() => {
    // const headers = {
    //   Accept: "application/json",
    // };

    // axios
    //   .get(`${base_url}/api/get_categories?group_id=1`, {
    //     headers: headers,
    //   })
    //   .then((e) => {
    //     setPriceList({ data: e.data });

    //     e.data.data.category
    //       .slice(0, 1)
    //       .map((category: any) => setActive(category.main_category_name));
    /*setElRefs((elRefs) =>e.data.data.category
    .map((_:any, i:any) => elRefs[i] ||  React.createRef())
*/
    // });
    categoriesList();
  }, []);

  /*  setElRefs((elRefs) =>e.data.data.category
    .map((_:any, i:any) => elRefs[i] ||  React.createRef()),
);*/

  const handleClick = (event: any, category: any, catindex: any) => {
    // your event handling logic
    setActive(category.main_category_name);
    /* let lilist= document.getElementsByClassName('panel-collapse collapse in');
   lilist[0].classList.remove('in')

   
   event.currentTarget.classList.add('active')
  let objid="collapse-"+catindex
   let lilists=document.getElementById(objid)
   //lilists.classList.add('in')
  
  if (!(lilists === null ))
  {

lilists.classList.add('in')
    //lilists[0].classList.add('in')

  }
   //lilists[0].classList.add('in')
  // elRefs[0].current.classList.add('in');
       // event.currentTarget.classList.add('active');
       */
  };

  return (
    <div>
      <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Pricing</h2>
              </div>
            </div>
            <div className="col-12">
              <div className="pick-up-terms">
                <p>
                  <i className="fa fa-check" aria-hidden="true"></i>FREE PICKUP
                  AND DELIVERY. MINIMUM ORDER £20.00
                </p>
                <p>
                  <i className="fa fa-check" aria-hidden="true"></i>Free
                  cancellation 1 hour before pickup time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="abt-section">
        <div className="about-us">
          {/* <!-- price section start--> */}
          <section className="price-section" id="pricing">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <Swiper
                    spaceBetween={15}
                    navigation={true}
                    modules={[Navigation]}
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 4,
                      },
                      1024: {
                        slidesPerView: 7,
                      },
                    }}
                  >
                    {
                      // Object.keys(priceList.data.data.category)?.length > 0 &&
                      priceList.data?.data?.category?.map(
                        (category: any, catindex: any) => (
                          <SwiperSlide>
                            <div className="category-container">
                              <a
                                role="button"
                                className={
                                  active == category.main_category_name
                                    ? "active-swiper"
                                    : ""
                                }
                                onClick={(event) =>
                                  handleClick(event, category, catindex)
                                }
                              >
                                <div className="order_list">
                                  <div className="user-img">
                                    <img
                                      src={category.web_banner_img}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </div>
                                  <div className="list-explore">
                                    <p> {category.main_category_name}</p>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </SwiperSlide>
                        )
                      )
                    }
                  </Swiper>
                  <div className="row">
                    <div className="col-md-12 list-collapse">
                      {
                        /* <!-- collapse and expand --> */
                        priceList.data?.data?.category?.map(
                          (category: any, catindex: any) => (
                            <div
                              className="collapse-container first-collapse"
                              data-id="dry_cleaning"
                              data-main={catindex}
                              data-collapse-name={"slide-" + catindex}
                            >
                              <div
                                id={"collapse-" + catindex}
                                data-uid={catindex}
                                className={
                                  active == category.main_category_name
                                    ? "panel-collapse collapse show"
                                    : "panel-collapse collapse"
                                }
                                role="tabpanel"
                                aria-labelledby={"heading-" + catindex}
                                aria-expanded="true"
                              >
                                <div
                                  className={
                                    active == category.main_category_name
                                      ? "panel-body collapse-body pricing-list-cloth"
                                      : "panel-body collapse-body pricing-list-cloth height-0"
                                  }
                                >
                                  <div className="price-box">
                                    <ul className="list-group">
                                      {category.sub_categories.map(
                                        (
                                          sub_category: any,
                                          subcatindex: any
                                        ) => (
                                          <li className="list-group-item">
                                            <div className="price-list">
                                              <div className="price-pro-title">
                                                {" "}
                                                {
                                                  sub_category.sub_category_name
                                                }{" "}
                                              </div>
                                              <div className="price-pro-cont">
                                                <span
                                                  className="pull-right homeprice"
                                                  data-bs-toggle="tooltip"
                                                  data-html="true"
                                                  title={sub_category.options
                                                    .filter((options: any) => {
                                                      return (
                                                        options.is_default ==
                                                        "1"
                                                      );
                                                    })
                                                    .map(
                                                      (item: any) =>
                                                        item.option_description +
                                                        " : " +
                                                        item.option_price
                                                    )}
                                                >
                                                  {
                                                    settings?.WebmasterSettings
                                                      ?.currency
                                                  }
                                                  {sub_category.total_price}
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- price section end --> */}
        </div>
      </section>
    </div>
  );
}

export default Pricing;
