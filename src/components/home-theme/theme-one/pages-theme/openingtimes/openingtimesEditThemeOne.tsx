import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import ImageCropper from "../../../../imageCropper/imageCropper";
import { ApiServiceContext } from "../../../../../core/Api/api.service";

const OpeningTimesEditThemeOne = () => {
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const { fetchCroppedImage, save_cms_data } = useContext(ApiServiceContext);
  const [editData, setEditData] = useState<any>();
  const [cropImageHeight, setCropImageHeight] = useState("");
  const [cropImageWidth, setCropImageWidth] = useState("");
  const [selectedCropImage, setSelectedCropImage] = useState("");
  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [imagedata, setImagedata] = useState<any>("" || undefined);
  const [activeTab, setActiveTab] = useState(0);

  const bg_banner = [
    "assets/img/about-image.jpg",
    "assets/img/page-banner.jpg",
    "assets/img/about-image.jpg",
    "assets/img/page-banner.jpg",
    "assets/img/about-image.jpg",
    "assets/img/page-banner.jpg",
  ];

  useEffect(() => {
    setEditData(jsonData);
  }, [jsonData]);

  useEffect(() => {
    if (editData != undefined) {
      setEditData(editData);
    }
    console.log("editData",editData)
  }, [editData]);

  const saveJsonData = () => {
    save_cms_data(editData);
    console.log("editData",editData)
  };
  
  const handleChange = (e: any) => {
    const { value, name, type, checked } = e.target;
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
          openingtimes: {
            ...prevJsonData.theme_1.openingtimes,
            [name]: value,
            input_section: {
                ...prevJsonData.theme_1.openingtimes.input_section,
                [name]: value,
              },
              days: {
                ...prevJsonData.theme_1.openingtimes.days,
                [name]: value,
              },
              note1: {
                ...prevJsonData.theme_1.openingtimes.note1,
                is_enable:
                type === "checkbox" && name === "note1_is_enable"
                ? !prevJsonData.theme_1.openingtimes.note1.is_enable
                : prevJsonData.theme_1.openingtimes.note1.is_enable,
                text:
                name === "note1_text"
                  ? value
                  : prevJsonData.theme_1.openingtimes.note1.text,
              },
              note2: {
                ...prevJsonData.theme_1.openingtimes.note2,
                is_enable:
                type === "checkbox" && name === "note2_is_enable"
                ? !prevJsonData.theme_1.openingtimes.note2.is_enable
                : prevJsonData.theme_1.openingtimes.note2.is_enable,
                text:
                name === "note2_text"
                  ? value
                  : prevJsonData.theme_1.openingtimes.note2.text,
              },
              onlineorder: {
                ...prevJsonData.theme_1.openingtimes.onlineorder,
                is_enable:
                type === "checkbox" && name === "onlineorder_is_enable"
                ? !prevJsonData.theme_1.openingtimes.onlineorder.is_enable
                : prevJsonData.theme_1.openingtimes.onlineorder.is_enable,
                text:
                name === "onlineorder_heading"
                  ? value
                  : prevJsonData.theme_1.openingtimes.onlineorder.heading,
              },
              onlineordertime: {
                ...prevJsonData.theme_1.openingtimes.onlineordertime,
                is_enable:
                type === "checkbox" && name === "onlinetime_is_enable"
                ? !prevJsonData.theme_1.openingtimes.onlineordertime.is_enable
                : prevJsonData.theme_1.openingtimes.onlineordertime.is_enable,
                text:
                name === "onlinetime_heading"
                  ? value
                  : prevJsonData.theme_1.openingtimes.onlineordertime.heading,
              },
          },
      },
    }));
  };

  const updateImageSection = async (e: any) => {
    const image = e.target.files[0];
    setCropImageHeight("200");
    setCropImageWidth("250");
    setSelectedCropImage(image);
    setShowCropModal(true);
  };

//   const handleImageChange = (image: string, index: any) => {
//     setEditData((prevJsonData: any) => ({
//       ...prevJsonData,
//       theme_1: {
//           openingtimes: {
//             ...prevJsonData.theme_1.openingtimes,
//             banner: image,
//           },
//       },
//     }));
//   };

  const handleImageChange = (image: string, index: any) => {
    setEditData((prevJsonData: any) => ({
        ...prevJsonData,
        theme_1: {
          ...prevJsonData.theme_1,
          openingtimes: {
            ...prevJsonData.theme_1.openingtimes,
              banner: image,
          },
        },
      }));
  };


  const handleCroppedImage = async (image: any) => {
    setShowCropModal(false);
    setImagedata(image);
    const imageLink = await fetchCroppedImage(image);
    if (imageLink != false) {
      handleImageChange(imageLink, activeTab);
    }
  };

  // HTML
  return (
    <>
      <div className="modal-dialog modal-lg modal-dialog-centered theme-edit-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">OpeningTimes Theme Edit</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-content modal-body">
            <div className="edit-section">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">
                      Title<small>(max 120 char)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={editData?.theme_1?.openingtimes?.title}
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
                    <label className="form-label">Monday</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="monday"
                        onChange={handleChange}
                        value={
                            editData?.theme_1?.openingtimes?.days?.monday
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Tuesday</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="tuesday"
                        onChange={handleChange}
                        value={
                            editData?.theme_1?.openingtimes?.days?.tuesday
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Wednesday</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="wednesday"
                        onChange={handleChange}
                        value={
                            editData?.theme_1?.openingtimes?.days?.wednesday
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Thursday</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="thursday"
                        onChange={handleChange}
                        value={
                            editData?.theme_1?.openingtimes?.days?.thursday
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Friday</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="friday"
                        onChange={handleChange}
                        value={
                            editData?.theme_1?.openingtimes?.days?.friday
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Saturday</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="saturday"
                        onChange={handleChange}
                        value={
                            editData?.theme_1?.openingtimes?.days?.saturday
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Sunday</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="sunday"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.openingtimes?.days?.sunday
                        }
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
                    <label className="form-label">Note 1</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="note1_is_enable"
                          onClick={handleChange}
                            checked={
                                editData?.theme_1?.openingtimes?.note1?.is_enable
                            }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="note1_text"
                        onChange={handleChange}
                        value={
                            editData?.theme_1?.openingtimes?.note1?.text
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">OpeningTimes Background Image</label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="form-control"
                name="image"
                onChange={updateImageSection}
              />
            </div>
            <div className="edit-section">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="img-bg active">
                          <img
                            src={editData?.theme_1?.openingtimes?.banner}
                            alt={`Card Icon`}
                          />
                        </div>
                        <div className="img-options w-100">
                          <Swiper
                            spaceBetween={15}
                            navigation={true}
                            modules={[Navigation]}
                            breakpoints={{
                              640: {
                                slidesPerView: 1,
                              },
                              768: {
                                slidesPerView: 4,
                              },
                              1024: {
                                slidesPerView: 6,
                              },
                            }}
                            className="homejson-slider"
                          >
                            {bg_banner.map((icons, iconIndex) => (
                              <SwiperSlide key={iconIndex}>
                                <div
                                  className="img-option"
                                  onClick={() =>
                                    handleImageChange(icons, iconIndex)
                                  }
                                >
                                  <img
                                    src={icons}
                                    alt="Hero Image"
                                    className="img-fluid"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                        {/* </>
                                  )
                                )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Online Order Text</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="onlineorder_is_enable"
                          onClick={handleChange}
                            checked={
                                editData?.theme_1?.openingtimes?.onlineorder?.is_enable
                            }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="onlineorder_heading"
                        onChange={handleChange}
                        value={
                            editData?.theme_1?.openingtimes?.onlineorder?.heading
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Online Order Timings</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="onlinetime_is_enable"
                          onClick={handleChange}
                            checked={
                                editData?.theme_1?.openingtimes?.onlineordertime?.is_enable
                            }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="onlinetime_timing"
                        onChange={handleChange}
                        value={
                            editData?.theme_1?.openingtimes?.onlineordertime?.timing
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Button Background</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="bg_color"
                        value={
                          editData?.theme_1?.openingtimes?.input_section
                            ?.bg_color
                        }
                        maxLength={120}
                      />
                      <ColorPicker
                        name="bg_color"
                        format="hex"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.openingtimes?.input_section
                            ?.bg_color
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Button text color</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="btn_color"
                        value={
                          editData?.theme_1?.openingtimes?.input_section
                            ?.btn_color
                        }
                        maxLength={120}
                      />
                      <ColorPicker
                        name="btn_color"
                        format="hex"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.openingtimes?.input_section
                            ?.btn_color
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Button hover color</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="btn_hover"
                        value={
                          editData?.theme_1?.openingtimes?.input_section
                            ?.btn_hover
                        }
                        maxLength={120}
                      />
                      <ColorPicker
                        name="btn_hover"
                        format="hex"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.openingtimes?.input_section
                            ?.btn_hover
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Button text</label>
                    <input
                      type="text"
                      className="form-control"
                      name="btn_text"
                      value={
                        editData?.theme_1?.openingtimes?.input_section
                          ?.btn_text
                      }
                      onChange={handleChange}
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>
              <div className="edit-section">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Note 2</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="note2_is_enable"
                          onClick={handleChange}
                            checked={
                                editData?.theme_1?.openingtimes?.note2?.is_enable
                            }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="note2_text"
                        onChange={handleChange}
                        value={
                            editData?.theme_1?.openingtimes?.note2?.text
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 mt-1">
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
{showCropModal ? (
        <>
          <div
            className="modal modal-sm-crop fade show onboarding-modal settings cropModal"
            id="crop-modal"
            tabIndex={-1}
            aria-labelledby="crop-modal"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            <ImageCropper
              src={selectedCropImage}
              height={cropImageHeight}
              width={cropImageWidth}
              handleCrop={handleCroppedImage}
              close={() => {
                setShowCropModal(false);
              }}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default OpeningTimesEditThemeOne;
