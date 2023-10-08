import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { breadcrumbbg } from "../../../../../assets/img";
import { ApiServiceContext } from "../../../../../core/Api/api.service";

function SpecialOffers() {
  const { get_cms_data, validateThemEditToken } = useContext(ApiServiceContext);
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);

  useEffect(() => {
    get_cms_data();
  }, []);

  return (
    <>
      <div
        className="breadcrumpset"
        style={{
          backgroundImage: `url(${jsonData?.theme_1?.specialoffers?.banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Special Offers</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Special Offers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section">
<div className="container">
<div className="row justify-content-center">
<div className="col-md-10">
<div className="row">
<div className="col-md-6 sploffers-grid">
<h2>Special Offers</h2>
<div className="spl-content">
<fieldset>
<h4>{jsonData?.theme_1?.specialoffers?.title}</h4>
<div className="offersText">
<p>{jsonData?.theme_1?.specialoffers?.paragraph}</p>
<p>{jsonData?.theme_1?.specialoffers?.paragraph_two}</p>
<p>{jsonData?.theme_1?.specialoffers?.paragraph_three}</p>
</div>
</fieldset>
</div>
</div>

<div className="col-md-6 sploffers-gridright">
<p className="mb-3"><strong>{jsonData?.theme_1?.specialoffers?.title_two}</strong></p>
<div id="cards">
<h4>{jsonData?.theme_1?.specialoffers?.heading}</h4>
<ul className="mt-3">
<li>{jsonData?.theme_1?.specialoffers?.list_one}</li>
<li>{jsonData?.theme_1?.specialoffers?.list_two}</li>
</ul>
<h4>{jsonData?.theme_1?.specialoffers?.heading_two}</h4>
<ul className="mt-3">
<li>{jsonData?.theme_1?.specialoffers?.list_two_one}</li>
<li>{jsonData?.theme_1?.specialoffers?.list_two_two}</li>
</ul>
<h4 className="mb-3">{jsonData?.theme_1?.specialoffers?.heading_three}</h4>
<div className="mb-3">
<img src={jsonData?.theme_1?.specialoffers?.cardImg} />
</div>
<div className="mt-3">
{jsonData?.theme_1?.specialoffers?.note1.is_enable && (
                      <p>
                        <strong>Please Note:</strong>{" "}
                        {jsonData?.theme_1?.specialoffers?.note1?.text}
                      </p>
                    )}
</div>
</div>
</div>
</div>

</div>
</div>
</div>
</div>
    </>
  );
}

export default SpecialOffers;
