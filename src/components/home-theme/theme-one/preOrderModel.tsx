import React from "react";
import { Modal } from "react-bootstrap";
interface PreOrderModelProps {
  preOderShow: any;
  cancel: any;
  preOrderList: any;
}
const PreOrderModel: React.FC<PreOrderModelProps> = ({
  preOderShow,
  cancel,
  preOrderList,
}) => {
  return (
    <>
      <Modal
        show={preOderShow}
        // onHide={cancel}
        centered
        className="modal custom-modal delete-modal continue-model fade multi-step show"
      >
        <div className="modal-content p-2">
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <div className="modal-body"></div>
          <div className="order-info-cont text-center">
            <h4 className="text-success mb-4">Online order is closed.</h4>
            <h6 className="mb-4">
              Sorry! Online order is closed now. You can pre-order for later!
            </h6>
            <div className="d-flex justify-content-center gap-3 pr-1 mb-2">
              <button className="btn btn-primary" onClick={preOrderList}>
                Pre-Order
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  cancel();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </Modal>
    </>
  );
};
export default PreOrderModel;
