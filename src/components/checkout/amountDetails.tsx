import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLocalValue } from "../../utility";

interface AmountDetailsProps {
  // Define your props here
  cartInformation: any;
  splitAmountDetails: any;
}

const AmountDetails: React.FC<AmountDetailsProps> = ({
  cartInformation,
  splitAmountDetails,
}) => {
  let settings: any = [];

  return (
    <>
      <div className="amt-payable">
        <div className="price-header text-center">
          <h2>Order Details</h2>
        </div>
        <div className="price-body table-responsive">
          <table className="order-table">
            <thead>
              <tr>
                <th className="item_quantity">Qty</th>
                <th className="item_name">Name</th>
                <th className="normal_total_item">
                  <span className="total_item_price">Price</span>
                </th>
              </tr>
            </thead>
            <tbody id="cart_body">
              {cartInformation?.map((item: any) => {
                return (
                  <>
                    {item?.subcategories[0].products
                      ?.filter((subItem: any) => parseInt(subItem.quantity) > 0)
                      ?.map((subCategory: any, index: any) => {
                        // console.log(subCategory, "subCategory");

                        return (
                          <tr>
                            <td className="item_quantity">
                              <input
                                min="1"
                                data-cart-index="prod_3_3"
                                type="number"
                                value={subCategory?.quantity}
                                id="item_quantity_prod_3_3"
                                className="edit_input cart_item_quantity"
                              />
                            </td>
                            <td className="item_name">
                              <strong>{item?.category_name}</strong>
                              <br />
                              {subCategory?.name}
                              {/* {subCategory?.options[0]?.name &&
                                            `(${subCategory?.options[0]?.name})`} */}
                              {subCategory?.options
                                ?.filter((val: any) => val?.is_default == "1")
                                .map((val: any) => {
                                  return <>({val?.name})</>;
                                })}
                              <p className="mb-2">
                                {subCategory?.add_on_groups[0]?.add_ons?.map(
                                  (val: any) => (
                                    <>
                                      {val?.check === true && (
                                        <small>{val?.name},</small>
                                      )}
                                    </>
                                  )
                                )}
                                {/* {subCategory?.extra?.map(
                                              (val: any) => (
                                                <small>{val?.name},</small>
                                              )
                                            )} */}
                              </p>
                              {subCategory?.instructionnote && (
                                <small>
                                  note:
                                  {subCategory?.instructionnote}
                                </small>
                              )}
                            </td>

                            <td className="normal_total_item">
                              {settings?.WebmasterSettings?.currency}
                              &nbsp;
                              {(
                                parseFloat(subCategory?.quantity) *
                                parseFloat(subCategory?.price)
                              ).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                  </>
                );
              })}
            </tbody>
          </table>
          <div className="cs-option-amt">
            <div className="cs-option-amt-list">
              {/* <div className="cs-option-amt-left">
                            Price ({selectedcategoryPriceList?.itemsCount}{" "}
                            items)
                          </div> */}
              Sub Total
              <div className="cs-option-amt-right">
                {/* {settings?.WebmasterSettings?.currency}{" "}
                            {selectedcategoryPriceList?.total_price_amount} */}
                {splitAmountDetails?.currency_symbol || "£"}{" "}
                {splitAmountDetails?.total_price || 0}
              </div>
            </div>
            <div className="cs-option-amt-list">
              <div className="cs-option-amt-left">
                {/* Amount without VAT */}
                Tax
                {`(${splitAmountDetails?.vat_tax_percentage || 0}%)`}
                (+)
              </div>

              <div className="cs-option-amt-right">
                {/* {settings?.WebmasterSettings?.currency}
                            {(
                              parseFloat(
                                selectedcategoryPriceList?.total_price_amount
                              ) -
                              parseFloat(selectedcategoryPriceList?.vat_amount)
                            ).toFixed(2)} */}
                {splitAmountDetails?.currency_symbol || "£"}{" "}
                {splitAmountDetails?.vat_tax_amt || 0}
              </div>
            </div>
            <div className="cs-option-amt-list">
              <div className="cs-option-amt-left">
                {/* Amount without VAT */}
                Offer
                {`(${
                  splitAmountDetails?.offer_percentage
                    ? splitAmountDetails?.offer_percentage
                    : 0
                })%`}{" "}
                (-)
              </div>

              <div className="cs-option-amt-right">
                {/* {settings?.WebmasterSettings?.currency}
                            {(
                              parseFloat(
                                selectedcategoryPriceList?.total_price_amount
                              ) -
                              parseFloat(selectedcategoryPriceList?.vat_amount)
                            ).toFixed(2)} */}
                {splitAmountDetails?.currency_symbol || "£"}{" "}
                {splitAmountDetails?.offer_amt
                  ? splitAmountDetails?.offer_amt
                  : 0}
              </div>
            </div>
            <div className="cs-option-amt-list">
              <div className="cs-option-amt-left">Delivery Fee (+)</div>
              <div className="cs-option-amt-right">
                {splitAmountDetails?.currency_symbol || "£"}{" "}
                {splitAmountDetails?.delivery_fee || 0}
              </div>
            </div>
            {/* <div className="cs-option-amt-list">
                          <div className="cs-option-amt-left">
                            VAT ({selectedcategoryPriceList?.vat_percentage}
                            %)
                          </div>
                          <div className="cs-option-amt-right">
                            {settings?.WebmasterSettings?.currency}{" "}
                            {selectedcategoryPriceList?.vat_amount}
                          </div>
                        </div> */}
            <div className="cs-option-amt-list cs-option-amt-listbg">
              <div className="cs-option-amt-left">
                {/* Amount Payable */}
                Total
              </div>

              <div className="cs-option-amt-right">
                {splitAmountDetails?.currency_symbol || "£"}{" "}
                {splitAmountDetails?.cart_final_total || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="price-details Ord-summary cart-summary">
        <h5>Offer</h5>
        {/* <li></li> */}
        <h6>SAVE 15% WHEN YOU ORDER ONLINE THROUGH THIS WEBSITE!</h6>

        <small>
          Excludes Canary Wharf Lunchbox, Bank Station Lunchbox & Liverpool
          Street Lunchbox. Cannot be used in conjunction with any other offer.
          Applies to online orders made through this website only. Discount is
          automatically applied to qualifying orders when you checkout. The
          management reserves the right to amend or withdraw this offer at any
          time without notice.
        </small>
      </div>
    </>
  );
};
export default AmountDetails;
