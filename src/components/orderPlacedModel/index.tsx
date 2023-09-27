import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

interface OrderPlacedProps {
  orderPlacedbool: any;
  cancel: any;
  message: any;
}
const OrderPlacedModel: React.FC<OrderPlacedProps> = ({
  orderPlacedbool,
  cancel,
  message,
}) => {
  return (
    <>
      <Modal
        show={orderPlacedbool}
        onHide={cancel}
        centered
        className="modal custom-modal delete-modal continue-model fade multi-step show"
      >
        <div className="modal-content">
          <div className="modal-body">
            <div className="cardBox">
              <h3>Order Placed successfully</h3>
              <div className="pt-3">
                You have successfully placed your order. Your Order ID is{" "}
                {message?.order_reference}
              </div>
              <div className="d-flex gap-3 p-2 pt-5 justify-content-end">
                <Link
                  className="btn btn-primary"
                  to={`/orderView/${message?.order_id}`}
                >
                  view Order Summary
                </Link>
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
