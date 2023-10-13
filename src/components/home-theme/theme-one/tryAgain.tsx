import React from "react";
import { Modal } from "react-bootstrap";
interface TryAgainModelProps {
  tryAgainShow: any;
  cancel: any;
}
const TryAgainModal: React.FC<TryAgainModelProps> = ({
  tryAgainShow,
  cancel
}) => {
  return (
    <>
      <Modal
        show={tryAgainShow}
        // onHide={cancel}
        centered
        className="modal custom-modal delete-modal continue-model fade multi-step show"
      >
        <div className="modal-content p-2">
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <div className="modal-body"></div>
          <div className="order-info-cont text-center">
            <h4 className="text-success mb-4">Your postal code is not a valid one</h4>
            <h6 className="mb-4">
              Please try again later
            </h6>
            <div className="d-flex justify-content-center gap-3 pr-1 mb-2">
              {/* <button className="btn btn-primary" onClick={preOrderList}>
                Pre-Order
              </button> */}
              <button
                className="btn btn-primary"
                onClick={() => {
                  cancel();
                }}
              >
                Try again
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </Modal>
    </>
  );
};
export default TryAgainModal;