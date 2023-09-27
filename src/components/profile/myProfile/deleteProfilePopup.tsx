import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";

const DeleteProfilePopup: React.FC<{ close: any }> = ({ close }) => {
  // const [deleteAddress, deleteMyAddress] = useState()
  const { postData } = useContext(ApiServiceContext);
  const notify = (message: string) => toast(message);

  const handleQuickBookClose = () => {
    close();
  };

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const handleProfileDelete = async () => {
    const response = await postData(end_points.deleteProfileApi.url);

    if (response.data.code == "200") {
      notify(response.data.message);
      window.location.reload();

      handleLogout();
      return true;
    }
  };

  return (
    <div>
      <div
        className="custom-modal-class modal in"
        id="app_download_success_popup"
        style={{ display: "block" }}
      >
        <div className="vertical-alignment-helper">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={handleQuickBookClose}
                ></button>
                <h3 className="text-center">Confirm Delete?</h3>

                {/* <h3>Thank you for showing interest in our app. You will get the link via SMS soon.</h3>
                                <input type="submit" value="Close" data-bs-dismiss="modal" onClick={handleThankAppDownloadPopupClose} /> */}
                <form id="quick-order-form">
                  <a
                    className="btn btn-success me-1"
                    data-bs-dismiss="modal"
                    onClick={handleQuickBookClose}
                  >
                    No
                  </a>
                  <a
                    className="btn btn-danger ms-1"
                    onClick={handleProfileDelete}
                  >
                    Yes
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfilePopup;
