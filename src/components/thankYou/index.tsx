import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { thankyoutick,backtohome,trackorder3 } from '../../assets/img'
import { clearCart, clearCartCount, clearSplitPrice } from '../../redux/Actions/cartCountAction';
import { clearUserProductCategories } from '../../redux/Actions/productCategoriesAction';

const ThankYou = () => {

    const [cartInformation, setCartInformation] = useState([]);
    const state: any = useSelector<any>((state) => state);
    const dispatch = useDispatch<any>();

    const selectedcategoryPriceList: any = useSelector<any>(
        (state) => state.splitPriceDetails
      );

      const orderNumber: any = useSelector<any>(
        (state) => state?.submitOrder?.data?.order_details?.order_id
      );

      const settings: any = useSelector<any>(
        (state) => state.settings
      );

      useEffect(() => {
        localStorage.removeItem('cartInformationData');
        dispatch(clearCartCount());
        dispatch(clearCart());
        dispatch(clearUserProductCategories());
        // dispatch(clearSplitPrice());
      }, [])


      

      const navigate= useNavigate();
    return (

        <div className="section-thankyou">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-7">
                        <div className="thankyou-left">
                            <div className="thankyou-header">
                                <img src={thankyoutick} className="img-fluid" alt="" />
                                <h1>Thank You</h1>
                                <p>Your order has been placed successfully. Check your email for further queries</p>
                            </div>
                            <div className="order-id">
                                <p>ORDER NO : {orderNumber}</p>
                            </div>
                            <div className="thankyou-footer">
                                <span>Once your order is verified we will process the payment from your saved card.</span>
                                <div className="btns_thankyou d-none d-md-block text-center mt-4">
                                   
                                        <button type="button" className="backto-home hover-btn float-start" onClick={()=> navigate("/")}><img src={backtohome} className="img-fluid" alt="" />Back to Home</button>
                                    
                                  
                                        <button type="button" className="backto-home hover-btn float-end" onClick={()=>navigate(`/orderView/${orderNumber}`)}><img src={trackorder3} className="img-fluid" alt="" />Track My Order</button>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-5">
                        <div className="thankyou-right">
                            <div className="ordersum_header">
                                <h2>Order Summary</h2>
                            </div>
                            {/* <div className="ordersum-list">
                                <div className="ordersum-mens">
                                    
                                    <div className="sumlist">
                                        <span>Silk Shirt <small>( Washed, ironed and hung )</small></span>
                                        <span className="sum-qty">1</span>
                                    </div>
                                </div>
                            </div> */}

<div className="price-body">
                    {cartInformation?.map((item: any) => {
                      return (
                        <>
                          <div className="option-price">
                            <div className="main-cat-blk mb-10 id_men_title">
                              <div className="row vertical-align">
                                <div className="col-xs-12">
                                  <span className="summary-title">
                                    <h4>{item?.main_category_name}</h4>
                                  </span>
                                </div>
                              </div>
                            </div>
                            {item?.sub_categories
                              ?.filter(
                                (subItem: any) => parseInt(subItem.quantity) > 0
                              )
                              ?.map((subCategory: any) => {
                                return (
                                  <div className="option-body my-20 id_men">
                                    <div className="row">
                                      <div className="col-6">
                                        <span className="option-title">
                                          {subCategory?.sub_category_name}{" "}
                                        </span>
                                        <span className="option-total">
                                          ({subCategory?.quantity})
                                        </span>
                                      </div>
                                      <div className="col-6">
                                        <div className="listcloth-rht float-end">
                                          <h4>
                                            <i
                                              className="fa fa-gbp"
                                              aria-hidden="true"
                                            ></i>
                                            &nbsp;
                                            {parseInt(subCategory?.quantity) *
                                              parseInt(
                                                subCategory?.total_price
                                              )}
                                          </h4>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </>
                      );
                    })}
                    <div>
                      <span className="option-title">
                        Amount
                        <span className="total-quantity">
                          {/* ({selectedcategoryPriceList?.itemsCount} items) */}
                        </span>
                      </span>
                      <span className="option-total float-end total-price">
                        {settings?.WebmasterSettings?.currency}{selectedcategoryPriceList?.total_price_amount}
                      </span>
                    </div>
                    <div>
                      <span className="option-title">Amount without VAT</span>
                      <span className="option-total float-end price-without-deductions">
                      {settings?.WebmasterSettings?.currency} {(parseFloat(
                          selectedcategoryPriceList?.total_price_amount
                        ) - parseFloat(selectedcategoryPriceList?.vat_amount)).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="option-title">
                        VAT{" "}
                        <span className="vat-percentage">
                          ({selectedcategoryPriceList?.vat_percentage}%)
                        </span>
                      </span>
                      <span className="option-total float-end vat-price">
                        {settings?.WebmasterSettings?.currency}{selectedcategoryPriceList?.vat_amount}
                      </span>
                    </div>
                    {selectedcategoryPriceList.offer_amount > 0 &&
                    selectedcategoryPriceList.offer_percentage > "0" &&
                      <div className="cs-option-amt-list">
                        <div className="cs-option-amt-left">Offer{" "}({selectedcategoryPriceList?.offer_percentage}%)</div>
                        <div className="cs-option-amt-right">(-){settings?.WebmasterSettings?.currency} {selectedcategoryPriceList?.offer_amount}</div>
                      </div>
                      }
                      {selectedcategoryPriceList.offer_percentage === "0" &&
                      selectedcategoryPriceList.offer_amount > 0 &&
                      <div className="cs-option-amt-list">
                        <div className="cs-option-amt-left">Referral Offer</div>
                        <div className="cs-option-amt-right">(-){settings?.WebmasterSettings?.currency} {selectedcategoryPriceList?.offer_amount}</div>
                      </div>
                      }
                    <div className="payable-price">
                      <span className="option-title">Amount Payable</span>
                      <span className="option-total total-amt">
                        {settings?.WebmasterSettings?.currency}{selectedcategoryPriceList?.final_payable_amount}
                      </span>
                      <div className="text-end">
                        <small>Tax included</small>
                      </div>
                    </div>
                  </div>
                        </div>
                        {/* <div className="ordersum-footer">
                            <div className="sumlist">
                                <span>Total Count</span>
                                <span className="sum-qty">1</span>
                            </div>
                            <div className="sumlist amt-payable">
                                <span>Amount Payable</span>
                                <span className="sum-qty">£35.00</span>
                            </div>
                        </div> */}
                    </div>
                    {/* <div className="btn_thankyou_mob d-block d-md-none">
                        <a href="#">
                            
                        </a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#7AWDIA">
                            
                        </a>
                    </div> */}
                </div>
            </div>
            {/* <div id="7AWDIA" className="modal fade" role="dialog">
                <div className="modal-dialog vporgress-modaldialog">

                    <div className="modal-content vprogress-content">
                        <div className="modal-header">
                            Order ID - 7AWDIA
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body vprogress-body">
                            <div className="vprogress">
                                <div className="circle current-status">
                                    <span className="label"></span>
                                    <div className="progress-title">
                                        
                                        <span>Monday 09-01-2023, 01:26</span>
                                    </div>
                                </div>
                                <span className="bar notdone"></span>
                                <div className="circle   notdone">
                                    <span className="label"></span>
                                    <div className="progress-title">
                                        
                                        <span></span>
                                    </div>
                                </div>
                                <span className="bar notdone"></span>
                                <div className="circle   notdone">
                                    <span className="label"></span>
                                    <div className="progress-title">
                                        
                                        <span>Expected by Monday 09-01-2023 (5PM - 6PM)</span>
                                    </div>
                                </div>
                                <span className="bar notdone"></span>
                                <div className="circle   notdone">
                                    <span className="label"></span>
                                    <div className="progress-title">
                                        
                                        <span></span>
                                    </div>
                                </div>
                                <span className="bar notdone"></span>
                                <div className="circle   notdone">
                                    <span className="label"></span>
                                    <div className="progress-title">
                                        
                                        <span></span>
                                    </div>
                                </div>
                                <span className="bar notdone"></span>
                                <div className="circle   notdone">
                                    <span className="label"></span>
                                    <div className="progress-title">
                                        
                                        <span></span>
                                    </div>
                                </div>
                                <span className="bar notdone"></span>
                                <div className="circle notdone">
                                    <span className="label"></span>
                                    <div className="progress-title">
                                        
                                        <span>Expected by Tuesday 10-01-2023 (11AM - 12AM)</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer vprogress-footer">
                        </div>
                    </div>
                </div>
            </div> */}
        </div>

    )
}

export default ThankYou;