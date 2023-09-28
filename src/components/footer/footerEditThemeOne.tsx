import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { useDispatch, useSelector } from "react-redux";
import { ApiServiceContext } from "../../core/Api/api.service";
// import { fetchHomeJsonList, saveThemeJsonData } from "../../../redux/Actions";

function FooterEditThemeOne() {
  const dispatch = useDispatch<any>();
  const { save_cms_data } = useContext(ApiServiceContext);
  const [editData, setEditData] = useState<any>();
  const [savedData, setSavedData] = useState<any>(); // Store the original saved data
  const data: any = useSelector<any>((state) => state.homeJsonList);

  useEffect(() => {
    setEditData(data);
    setSavedData(data)
  }, [data]);

  const saveJsonDataToFile = () => {
    save_cms_data(editData);
  };

  useEffect(() => {
    if (editData != undefined) {
      setEditData(editData);
    }
  }, [editData]);

  const handleChange = (e: any, index?: any) => {
    const { value, name, type, checked } = e.target;

    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
      home: {
        ...prevJsonData.theme_1.home,
        footer: {
          ...prevJsonData.theme_1.home.footer,
          [name]: value,
          footer_section: {
            ...prevJsonData.theme_1.home.footer.footer_section,
            about_section: {
              ...prevJsonData.theme_1.home.footer.footer_section.about_section,
              is_enable:
                  type === "checkbox" && name === "about_is_enable"
                    ? !prevJsonData.theme_1.home.footer.footer_section.about_section.is_enable
                    : prevJsonData.theme_1.home.footer.footer_section.about_section.is_enable,
              text:
                name === "about_section"
                  ? value
                  : prevJsonData.theme_1.home.footer.footer_section.about_section.text,
            },
            callnow_for_Services_section: {
              ...prevJsonData.theme_1.home.footer.footer_section
                .callnow_for_Services_section,
              mbl_no: {
                ...prevJsonData.theme_1.home.footer.footer_section
                  .callnow_for_Services_section.mbl_no,
                label:
                  name === "mbl_no.label"
                    ? value
                    : prevJsonData.theme_1.home.footer.footer_section
                        .callnow_for_Services_section.mbl_no.label,
              },
              email: {
                ...prevJsonData.theme_1.home.footer.footer_section
                  .callnow_for_Services_section.email,
                label:
                  name === "email.label"
                    ? value
                    : prevJsonData.theme_1.home.footer.footer_section
                        .callnow_for_Services_section.email.label,
                value:
                  name === "email.value"
                    ? value
                    : prevJsonData.theme_1.home.footer.footer_section
                        .callnow_for_Services_section.email.value,
              },
              address: {
                ...prevJsonData.theme_1.home.footer.footer_section
                  .callnow_for_Services_section.address,
                text:
                  name === "address.text"
                    ? value
                    : prevJsonData.theme_1.home.footer.footer_section
                        .callnow_for_Services_section.address.text,
              },
            },
            social_media: {
              ...prevJsonData.theme_1.home.footer.footer_section.social_media,
              facebook: {
                is_enable:
                type === "checkbox" && name === "facebook_check"
                ? !prevJsonData.theme_1.home.footer.footer_section.social_media.facebook.is_enable
                : prevJsonData.theme_1.home.footer.footer_section.social_media.facebook.is_enable,
                facebook_link:
                name === "facebook"
                  ? value
                  : prevJsonData.theme_1.home.footer.footer_section.social_media.facebook.facebook_link,
              },
              instagram: {
                is_enable:
                type === "checkbox" && name === "instagram_check"
                ? !prevJsonData.theme_1.home.footer.footer_section.social_media.instagram.is_enable
                : prevJsonData.theme_1.home.footer.footer_section.social_media.instagram.is_enable,
                instagram_link:
                name === "instagram"
                  ? value
                  : prevJsonData.theme_1.home.footer.footer_section.social_media.instagram.instagram_link,
              },
              whatsapp: {
                is_enable:
                type === "checkbox" && name === "whatsapp_check"
                ? !prevJsonData.theme_1.home.footer.footer_section.social_media.whatsapp.is_enable
                : prevJsonData.theme_1.home.footer.footer_section.social_media.whatsapp.is_enable,
                whatsapp_link:
                name === "whatsapp"
                  ? value
                  : prevJsonData.theme_1.home.footer.footer_section.social_media.whatsapp.whatsapp_link,
              },
              linkedin: {
                is_enable:
                type === "checkbox" && name === "linkedin_check"
                ? !prevJsonData.theme_1.home.footer.footer_section.social_media.linkedin.is_enable
                : prevJsonData.theme_1.home.footer.footer_section.social_media.linkedin.is_enable,
                linkedin_link:
                name === "linkedin"
                  ? value
                  : prevJsonData.theme_1.home.footer.footer_section.social_media.linkedin.linkedin_link,
              },
              youtube: {
                is_enable:
                type === "checkbox" && name === "youtube_check"
                ? !prevJsonData.theme_1.home.footer.footer_section.social_media.youtube.is_enable
                : prevJsonData.theme_1.home.footer.footer_section.social_media.youtube.is_enable,
                youtube_link:
                name === "youtube"
                  ? value
                  : prevJsonData.theme_1.home.footer.footer_section.social_media.youtube.youtube_link,
              },
              twitter: {
                is_enable:
                type === "checkbox" && name === "twitter_check"
                ? !prevJsonData.theme_1.home.footer.footer_section.social_media.twitter.is_enable
                : prevJsonData.theme_1.home.footer.footer_section.social_media.twitter.is_enable,
                twitter_link:
                name === "twitter"
                  ? value
                  : prevJsonData.theme_1.home.footer.footer_section.social_media.twitter.twitter_link,
              },
            },
          },
        },
      },
    }
    }));
  };

  const handleClose=()=>{
  
      setEditData(savedData);
  }

  return (
    <>
      <div className="modal-dialog modal-lg modal-dialog-centered theme-edit-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Footer Theme Edit</h5>
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
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Footer Background</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="bg_color"
                        value={editData?.theme_1?.home?.footer?.bg_color}
                        onChange={handleChange}
                      />
                      <ColorPicker
                        name="bg_color"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        format="hex"
                        value={editData?.theme_1?.home?.footer?.bg_color}
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Section Header</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="section_heading_color"
                        value={editData?.theme_1?.home?.footer?.section_heading_color}
                        onChange={handleChange}
                      />
                      <ColorPicker
                        name="section_heading_color"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        format="hex"
                        value={editData?.theme_1?.home?.footer?.section_heading_color}
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Paragraph color</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="section_paragraph_color"
                        value={editData?.theme_1?.home?.footer?.section_paragraph_color}
                        onChange={handleChange}
                      />
                      <ColorPicker
                        name="section_paragraph_color"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        format="hex"
                        value={editData?.theme_1?.home?.footer?.section_paragraph_color}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">About Paragraph<small>(max 1200 char)</small></label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="about_section"
                        value={
                          editData?.theme_1?.home?.footer?.footer_section?.about_section
                            ?.text
                        }
                        onChange={handleChange}
                        maxLength={1200}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="mb-3">
                    <label className="form-label">&nbsp;</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="about_is_enable"
                        value="true"
                        onChange={handleChange}
                        checked={
                          editData?.theme_1?.home?.footer?.footer_section?.about_section
                            ?.is_enable
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <div className="row">
                <div className="col-auto">
                  <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mbl_no.label"
                      value={
                        editData?.theme_1?.home?.footer?.footer_section
                          ?.callnow_for_Services_section?.mbl_no?.label
                      }
                      onChange={handleChange}
                      maxLength={15}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                      {/* <input
                        type="text"
                        className="form-control"
                        name="email.label"
                        value={
                          editData?.theme_1?.home?.footer?.footer_section
                            ?.callnow_for_Services_section?.email?.label
                        }
                        onChange={handleChange}
                      /> */}
                      <input
                        type="text"
                        className="form-control"
                        name="email.value"
                        value={
                          editData?.theme_1?.home?.footer?.footer_section
                            ?.callnow_for_Services_section?.email?.value
                        }
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Address<small>(max 120 char)</small></label>
                    <input
                      type="text"
                      className="form-control"
                      name="address.text"
                      value={
                        editData?.theme_1?.home?.footer?.footer_section
                          ?.callnow_for_Services_section?.address?.text
                      }
                      onChange={handleChange}
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Facebook</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="facebook_check"
                          onClick={handleChange}
                            checked={
                              editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.facebook?.is_enable
                            }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="facebook"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.facebook?.facebook_link
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Instagram</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="instagram_check"
                          onClick={handleChange}
                            checked={
                              editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.instagram?.is_enable
                            }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="instagram"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.instagram?.instagram_link
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Whatsapp</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="whatsapp_check"
                          onClick={handleChange}
                            checked={
                              editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.whatsapp?.is_enable
                            }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="whatsapp"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.whatsapp?.whatsapp_link
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Linkedin</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="linkedin_check"
                          onClick={handleChange}
                            checked={
                              editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.linkedin?.is_enable
                            }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="linkedin"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.linkedin?.linkedin_link
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Youtube</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="youtube_check"
                          onClick={handleChange}
                            checked={
                              editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.youtube?.is_enable
                            }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="youtube"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.youtube?.youtube_link
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Twitter</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="twitter_check"
                          onClick={handleChange}
                            checked={
                              editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.twitter?.is_enable
                            }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="twitter"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.home?.footer?.footer_section
                            ?.social_media?.twitter?.twitter_link
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
                data-bs-dismiss="modal"
                className="btn primary-btn"
                onClick={() => {
                  saveJsonDataToFile();
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterEditThemeOne;
