import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { breadcrumbbg,acceptablepayment} from '../../assets/img';

function SpecialOffers() {
  return (
    <>
      <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
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
<h4>SAVE 15% WHEN YOU ORDER ONLINE THROUGH THIS WEBSITE!</h4>
<div className="offersText">
<p>Excludes Canary Wharf Lunchbox, Bank Station Lunchbox &amp; Liverpool Street Lunchbox.</p>
<p>Cannot be used in conjunction with any other offer. Applies to online orders made through this website only. Discount is automatically applied to qualifying orders when you checkout.</p>
<p>The management reserves the right to amend or withdraw this offer at any time without notice.</p>
</div>
</fieldset>
</div>
</div>

<div className="col-md-6 sploffers-gridright">
<p className="mb-3"><strong>Ways To Pay</strong></p>
<div id="cards">
<h4>Collection Orders:</h4>
<ul className="mt-3">
<li>Pay on collection by cash or credit / debit card.</li>
<li>Pay online by credit / debit card.</li>
</ul>
<h4>Delivery Orders:</h4>
<ul className="mt-3">
<li>Pay our driver by cash only.</li>
<li>Pay online by credit / debit card.</li>
</ul>
<h4 className="mb-3">Pay securely online through</h4>
<div className="mb-3">
<img src={acceptablepayment} />
</div>
<div className="mt-3">
<p><strong>Please note:</strong> <br/> We do not accept cheques.</p>
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
