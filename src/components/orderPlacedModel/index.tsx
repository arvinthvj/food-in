import React from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

interface OrderPlacedProps {
  orderPlacedbool: any;
  cancel: any;
  message: any;
  guestUser: any
}
const OrderPlacedModel: React.FC<OrderPlacedProps> = ({
  orderPlacedbool,
  cancel,
  message,
  guestUser
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal
        show={orderPlacedbool}
        onHide={cancel}
        centered
        backdrop="static"
        keyboard={false}
        className="modal custom-modal delete-modal continue-model fade multi-step show"
      >
        <div className="modal-content">
          <div className="modal-body">
            <div className="cardBox">
              <h3>Order placed successfully</h3>
              <div className="pt-3">
                You have successfully placed your order. Your Order ID is{" "}
                {message?.order_reference}
              </div>
              <div className="d-flex gap-3 p-1 pt-2 justify-content-end">
                <div
                  className="btn btn-primary"
                 onClick={()=>{
                  debugger
                  if(guestUser){
                    localStorage.setItem('guestUserInitialLoadToOrdersPage',`/orderView/${message?.order_id}`)
                    window.location.reload();
                    
                  }else{
                    navigate(`/orderView/${message?.order_id}`)
                  }
                 }}
                >
                  view Order Summary
                </div>
                <Link to="/" className="btn btn-primary" onClick={cancel}>
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default OrderPlacedModel;
