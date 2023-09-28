import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { useDispatch, useSelector } from "react-redux";
import { saveThemeJsonData } from "../../../../redux/Actions";
import { ApiServiceContext } from "../../../../core/Api/api.service";

const HeaderEditThemeOne = () => {
  const dispatch = useDispatch<any>();
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const [editData, setEditData] = useState<any>();
  const { save_cms_data } = useContext(ApiServiceContext);
  const [savedData, setSavedData] = useState<any>(); 


  useEffect(() => {
    setEditData(jsonData);
    setSavedData(jsonData)

  }, [jsonData]);
  useEffect(() => {
    if (editData != undefined) {
      setEditData(editData);
    }
  }, [editData]);
  const saveJsonData = () => {
    save_cms_data(editData);
  };
  const handleHeaderChange = (e: any) => {
    const { value, name, type, checked } = e.target;
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        home: {
          ...prevJsonData.theme_1.home,
          header: {
            ...prevJsonData.theme_1.home.header,
            [name]: value,
            social_links: {
              ...prevJsonData.theme_1.home.header.social_links,
              [name]: value,
            },
            order_details: {
              ...prevJsonData.theme_1.home.header.order_details,
              [name]: value,
              online_order:
                type === "checkbox" && name === "online_order"
                  ? !prevJsonData.theme_1.home.header.order_details.online_order
                  : prevJsonData.theme_1.home.header.order_details.online_order,
            },
            nav:{
              ...prevJsonData.theme_1.home.header.nav,
              [name]: value,
            }
          },
        },
      },
    }));
  };

  
  const handleClose=()=>{
    setEditData(savedData);

  }
  // HTML
  return (
    <>
      <div className="modal-dialog modal-lg modal-dialog-centered theme-edit-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Header Theme Edit</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-content modal-body">
            <div className="edit-section">
              <h4 className="edit-section-hdr">Social Links</h4>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Facebook</label>
                    <input
                      type="text"
                      className="form-control"
                      name="facebook"
                      value={
                        editData?.theme_1?.home?.header?.social_links?.facebook
                      }
                      onChange={handleHeaderChange}
                      maxLength={120}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      name="instagram"
                      value={
                        editData?.theme_1?.home?.header?.social_links?.instagram
                      }
                      onChange={handleHeaderChange}
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <h4 className="edit-section-hdr">Location</h4>
              <div className="row">
                <div className="col">
                  <label className="form-label">&nbsp;</label>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={editData?.theme_1?.home?.header?.location}
                      onChange={handleHeaderChange}
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <h4 className="edit-section-hdr">Order Details</h4>
              <div className="row">
                <div className="col">
                  <label className="form-label">Text</label>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="order_text"
                      value={
                        editData?.theme_1?.home?.header?.order_details
                          ?.order_text
                      }
                      onChange={handleHeaderChange}
                      maxLength={120}
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <div className="mb-3">
                    <label className="form-label">
                      {editData?.theme_1?.home?.header?.order_details
                        ?.online_order
                        ? "Close "
                        : "Open "}
                      Online Orders
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="online_order"
                        onClick={handleHeaderChange}
                        checked={
                          editData?.theme_1?.home?.header?.order_details
                            ?.online_order
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <h4 className="edit-section-hdr">Delivery Details</h4>
              <div className="row">
                <div className="col">
                  <label className="form-label">Text</label>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="delivery_text"
                      value={
                        editData?.theme_1?.home?.header?.order_details
                          ?.delivery_text
                      }
                      onChange={handleHeaderChange}
                      maxLength={120}
                    />
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Timimng</label>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="delivery_time"
                      value={
                        editData?.theme_1?.home?.header?.order_details
                          ?.delivery_time
                      }
                      onChange={handleHeaderChange}
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <h4 className="edit-section-hdr">Collection Details</h4>
              <div className="row">
                <div className="col">
                  <label className="form-label">Text</label>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="collection_text"
                      value={
                        editData?.theme_1?.home?.header?.order_details
                          ?.collection_text
                      }
                      onChange={handleHeaderChange}
                      maxLength={120}
                    />
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Timing</label>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="collection_time"
                      value={
                        editData?.theme_1?.home?.header?.order_details
                          ?.collection_time
                      }
                      onChange={handleHeaderChange}
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <h4 className="edit-section-hdr">Navigation Section </h4>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Nav Background</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="nav_bg_color"
                        value={
                          editData?.theme_1?.home?.header?.nav?.nav_bg_color
                        }
                        maxLength={120}
                      />
                      <ColorPicker
                        name="nav_bg_color"
                        format="hex"
                        onChange={handleHeaderChange}
                        value={
                          editData?.theme_1?.home?.header?.nav?.nav_bg_color
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Menu Color</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="menu_font_color"
                        value={
                          editData?.theme_1?.home?.header?.nav?.menu_font_color
                        }
                        maxLength={120}
                      />
                      <ColorPicker
                        name="menu_font_color"
                        format="hex"
                        onChange={handleHeaderChange}
                        value={
                          editData?.theme_1?.home?.header?.nav?.menu_font_color
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Menu hover</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="menu_font_color_hover"
                        value={
                          editData?.theme_1?.home?.header?.nav
                            ?.menu_font_color_hover
                        }
                        maxLength={120}
                      />
                      <ColorPicker
                        name="menu_font_color_hover"
                        format="hex"
                        onChange={handleHeaderChange}
                        value={
                          editData?.theme_1?.home?.header?.nav
                            ?.menu_font_color_hover
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Menu Active</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="menu_font_color_active"
                        value={
                          editData?.theme_1?.home?.header?.nav
                            ?.menu_font_color_active
                        }
                        maxLength={120}
                      />
                      <ColorPicker
                        name="menu_font_color_active"
                        format="hex"
                        onChange={handleHeaderChange}
                        value={
                          editData?.theme_1?.home?.header?.nav
                            ?.menu_font_color_active
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                onClick={saveJsonData}
                data-bs-dismiss="modal"
                className="btn primary-btn"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderEditThemeOne;
