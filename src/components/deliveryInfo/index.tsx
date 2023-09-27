import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { breadcrumbbg} from '../../assets/img';

function DeliveryInfo() {
  return (
    <>
      <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Delivery Information</h2>
                <ul>
                  <li>
                  <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Delivery Information</span>
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
<div className="col-md-6">
<div className="location mt20">
<h4>Delivery Information</h4>
<div>
<p>Our aim is to provide the fastest delivery service possible. Unfortunately things don't always go to plan and outside factors, such as weather or traffic conditions, occasionally prevent us from achieving this.</p>
<p>Delivery is only available to qualifying postcodes within a 5 mile radius of our premises which are at <strong>33 Woodford Avenue, Gants Hill, GU111BH</strong>.</p>
<p>All online customers whose postcodes lie within our delivery area are given the choice of "Home Delivery" or "Customer to Collect" when confirming their order in the checkout. Customers whose postcodes lie outside of our delivery area MUST COLLECT THEIR ORDER.</p>
<p>We aim to have home delivery orders delivered within 40min - 1hr of the customer placing an order (depending on distance, time of day and the size of the order) and we can have collection orders ready to collect within 30min.
</p>
<p>Please select the time you would like your order on the Order Confirmation page when you checkout. During busy periods times may vary, if there is a significant delay, where possible, we will contact you.</p>
<p>All orders below the minimum order value* must be collected.</p>
<p><small><strong>Note: </strong>Minimum order value includes discounts and excludes delivery.</small></p>
</div>
</div>
</div>

<div className="col-md-6">
<h4>Delivery Charges</h4>
<div>
<p>
<strong>Zone 1</strong> (up to 3 miles all postcodes) <br/>
subject to a minimum order value of £15.00: <br/>
Delivery is FREE</p>
<p>
<strong>Zone 2</strong> (up to 4 miles all postcodes) <br/>
subject to a minimum order value of £15.00: <br/>
Delivery is £2.00.
</p>
<p>
<strong>Zone 3</strong> (up to 5 miles all postcodes) <br/>
subject to a minimum order value of £15.00: <br/>
Delivery is £3.00.
</p>
<p>
We also deliver to a 5 mile radius of postcode DA6 8GB subject to a minimum order value of £15.00: <br/>
Delivery is £3.00.</p>
<p><strong>Note:</strong> Please note that orders for this area must be placed before 4.00pm for delivery between 7pm and 8pm the same evening.</p>
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

export default DeliveryInfo;
