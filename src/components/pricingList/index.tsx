import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./pricingList.css";

// import pricingList from './pricingList';
const base_url = "https://api.bestatrestaurant.com";

const priceListData = {
  data: {
    Response: {
      response_code: "",
      response_message: "",
    },
    data: {
      shop: {
        id: "1",
        owner: "",
        name: "Xcel Dry Cleaners",
        email: "xceldrycleaners@shop.com",
        order_closing_time: "",
      },
      minimum_order_amount: "20.00",
      vat_percentage: "20.00",
      daily_working_hours: "9",
      price_currency: "\u00a3",
      category: [
        {
          main_category_id: "1",
          main_category_name: "Men",
          selection: "f2faff",
          background: "0d8ada",
          andriod_banner_img: "",
          ios_banner_img: "",
          is_expandable: "0",
          sub_categories: [
            {
              sub_category_id: "1",
              sub_category_name: "Silk Shirt",
              process_time: "48",
              quantity: "0",
              andriod_sub_category_img: "",
              ios_sub_category_img: "",
              total_price: "5.00",
              options: [
                {
                  option_id: "1",
                  option_name: "Washed, ironed and hung",
                  option_description: "Washed, ironed and hung",
                  option_price: "5.00",
                  is_default: "1",
                },
                {
                  option_id: "2",
                  option_name: "Washed, ironed and folded",
                  option_description: "Washed, ironed and folded",
                  option_price: "5.00",
                  is_default: "0",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  rowcount: 0,
  active: "active",
};

function PricingList() {
  const [priceList, setPriceList] = useState<any | null>(priceListData);
  const [active, setActive] = useState(null);

  const settings: any = useSelector<any>((state) => state.settings);

  useEffect(() => {
    const headers = {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .get(`${base_url}/api/get_categories?group_id=1`, {
        headers: headers,
      })
      .then((e) => {
        setPriceList({ data: e.data });

        e.data.data.category
          .slice(0, 1)
          .map((category: any) => setActive(category.main_category_name));
      });
  }, []);

  const pricecol = (category: any, rowno: any, colno: any) => {
    let itemindex = rowno * 2 + colno;
    if (category.sub_categories[itemindex]) {
      return (
        <div className="col-md-6">
          <div id="accordion-2-2-2" role="tablist" aria-multiselectable="true">
            <div className="">
              <div className="" role="tab" id="headingOne-2-2-2 ">
                <h4 className="">
                  <span className="homeproduct">
                    {category.sub_categories[itemindex].sub_category_name}
                  </span>
                  <span
                    className="float-end homeprice"
                    data-bs-toggle="tooltip"
                    data-html="true"
                    title="Washed, ironed and hung : 5.00,Washed, ironed and folded : 5.00"
                  >
                    £{category.sub_categories[itemindex].total_price}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  const pricerow = (subcategory: any, subIndex: any) => {
    // alert("test")

    return (
      <div className="col-md-12">
        <div id="accordion-2-2-2" role="tablist" aria-multiselectable="true">
          <div className="">
            <div className="" role="tab" id="headingOne-2-2-2 ">
              <h4 className="">
                <span className="homeproduct">
                  {subcategory.sub_category_name}
                </span>
                <span
                  className="float-end homeprice"
                  data-bs-toggle="tooltip"
                  data-html="true"
                  title={subcategory.options
                    .filter((options: any) => {
                      return options.is_default == "1";
                    })
                    .map(
                      (item: any) =>
                        item.option_description + " : " + item.option_price
                    )}
                >
                  {settings?.WebmasterSettings?.currency}
                  {subcategory.total_price}
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
    //)
  };

  const popprice = (category: any, catindex: any) => {
    return category.sub_categories.map((subcategory: any, subIndex: any) =>
      pricerow(subcategory, subIndex)
    );
  };

  const handleClick = (event: any, category: any, catindex: any) => {
    setActive(category.main_category_name);
  };

  return (
    <div className="price-section aos-init" id="pricing" data-aos="zoom-in-up">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="section-title text-center aos-init"
              data-aos="fade-down"
            >
              <h1>Pricing &amp; List</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 center-block no-float">
            <div className="tab-content mt-10">
              <div id="laundry-price-section">
                <div className="price-list-items text-center">
                  {
                    <ul className="list-inline">
                      {priceList.data.data.category.map(
                        (category: any, catindex: any) => (
                          <li
                            id={"licategory" + catindex}
                            className={
                              active == category.main_category_name
                                ? `list-inline-item active`
                                : `list-inline-item`
                            }
                            onClick={(event) =>
                              handleClick(event, category, catindex)
                            }
                          >
                            <a
                              data-bs-toggle="tab"
                              href="#"
                              className="btn btn-lg btn-default "
                              onClick={(event) => event.preventDefault()}
                            >
                              {category.main_category_name}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  }
                </div>
                <div className="row price-list-contents">
                  <div className="col-md-12 mx-auto">
                    <div className="tab-content">
                      {priceList.data.data.category.map(
                        (category: any, catindex: any) => (
                          <div
                            id="price-main-categ-2-3"
                            className={
                              active == category.main_category_name
                                ? "tab-pane in price-list-details mt-4 active"
                                : "tab-pane fade in price-list-details mt-4"
                            }
                            style={{ columns: " 2 auto" }}
                          >
                            {popprice(category, catindex)}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingList;
