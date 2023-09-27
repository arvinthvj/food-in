import React, { useContext } from "react";
import { toast } from "react-toastify";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";

const DeleteAddressPopup: React.FC<{ close: any; id: Number }> = ({
  close,
  id,
}) => {
  const notify = (message: string) => toast(message);
  const { postData } = useContext(ApiServiceContext);
  const handleQuickBookClose = () => {
    close();
  };

  const handleAddressDelete = async () => {
    const payload = {
      delete_address_id: id,
    };

    const response = await postData(end_points.deleteAddressApi.url, payload);
    if (response.data.code == "200") {
      notify(response.data.message);
      window.location.reload();
      return true;
    } else {
      notify(response.data.message);
      return false;
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
                <h3 className="text-center">Are you want delete address?</h3>
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
                    onClick={handleAddressDelete}
                  >
                    Yes
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="modal-dialog" id="quickordermodal">
                <div className="vertical-alignment-helper">
                    <div className="modal-dialog modal-md modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleQuickBookClose}></button>
                                <h3 className="text-center">Confirm Delete?</h3>
                                <form id="quick-order-form" >
                                    <a className="btn dark-white p-x-md" data-bs-dismiss="modal" onClick={handleQuickBookClose} >No</a>
                                    <a className="btn danger p-x-md" onClick={handleAddressDelete}>Yes</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export default DeleteAddressPopup;
