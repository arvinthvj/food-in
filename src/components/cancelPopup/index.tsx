import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "./../cancelPopup/cancelPopup.css";

const CancelPopup: React.FC<{ orderId: string; close: any }> = ({
  orderId,
  close,
}) => {
  const notify = (message: string) => toast(message);

  const handleClose = (e: any) => {
    e.preventDefault();
    close();
  };

  const base_url = "https://api.bestatrestaurant.com";

  function cancelOrder() {
    const token = localStorage.getItem("token");

    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data",
    };

    axios
      .post(
        `${base_url}/api/cancel_order`,
        { order_id: orderId },
        {
          headers: headers,
        }
      )
      .then((e) => {
        if (
          e.data.Response.response_code == "1" &&
          e.data.Response.response_message == "success"
        ) {
          notify(e.data.Response.response_message);
          window.location.reload();
          return true;
        } else {
          notify(e.data.Response.response_message);
          window.location.reload();
          // setGenError(e.data.Response.response_message);
          return false;
        }
      });
  }

  return (
    // <div id="cancelModal staticBackdrop" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true" tabIndex={-1} style={{display: "block",paddingRight:"17px"}}>
    <div>
      <div
        className="custom-modal-class modal in"
        id="app_download_success_popup"
        style={{ display: "block" }}
      >
        <div className="vertical-alignment-helper">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="cancel-modal-header">
                <h4 className="modal-title text-center">Confirmation needed</h4>
              </div>
              <div className="modal-body">
                <p>
                  This action can not be reverted. Please confirm to cancel this
                  order.
                </p>

                {/* <h3>Thank you for showing interest in our app. You will get the link via SMS soon.</h3>
                                <input type="submit" value="Close" data-bs-dismiss="modal" onClick={handleThankAppDownloadPopupClose} /> */}
                {/* <form id="quick-order-form" >
                                </form> */}

                <div className="modal-footer">
                  <a
                    className="btn btn-success me-1"
                    onClick={(e) => {
                      cancelOrder();
                    }}
                  >
                    Yes, Cancel it
                  </a>
                  <a
                    className="btn btn-danger ms-1"
                    data-bs-dismiss="modal"
                    onClick={(e) => {
                      handleClose(e);
                    }}
                  >
                    Close
                  </a>
                  {/* <button type="button" id="order_cancel_confirm" className="btn cancel-button" onClick={() => cancelOrder()}>Yes, Cancel it</button>
                                    <button type="button" className="btn close-button" data-bs-dismiss="modal" onClick={() => handleClose()}>Close</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade in"></div>
      {/* <div className="vertical-alignment-helper">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="cancel-modal-header">
                            <h4 className="modal-title">Confirmation needed</h4>
                            

                        </div>
                        <div className="cancel-modal-body">
                            <p>This action can not be reverted. Please confirm to cancel this order.</p>
                        </div>
                        <div className="cancel-modal-footer">
                            <button type="button" id="order_cancel_confirm" className="btn cancel-button" onClick={() => cancelOrder()}>Yes, Cancel it</button>
                            <button type="button" className="btn close-button" data-bs-dismiss="modal" onClick={() => handleClose()}>Close</button>
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export default CancelPopup;
