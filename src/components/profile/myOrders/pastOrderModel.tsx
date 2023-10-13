import React from "react";
import { Modal } from "react-bootstrap";
import { setRepeatOrderid } from "../../../redux/Actions/checkoutPageActions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
interface pastModelProps {
  showModal: any;
  handleClose: any;
}
const PastOrderModel: React.FC<pastModelProps> = ({
  showModal,
  handleClose,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      {" "}
      <Modal show={showModal.type} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <input type="file" onChange={onChange} /> */}
          Do you want to place this order, existing order will be cancel
        </Modal.Body>
        <Modal.Footer>
          <div className="pt-2 d-flex justify-content-between w-100">
            <button className="btn btn-primary" onClick={handleClose}>
              Cancel
            </button>
            <Link
              to="/productLists"
              className="btn btn-primary"
              onClick={() => {
                localStorage.removeItem("cartInformationData");
                dispatch(setRepeatOrderid(showModal?.data?.id));
              }}
            >
              PlaceOrder
            </Link>
          </div>
          <div
            className="pt-3 d-flex w-50"
            style={{ justifyContent: "center" }}
          ></div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PastOrderModel;
