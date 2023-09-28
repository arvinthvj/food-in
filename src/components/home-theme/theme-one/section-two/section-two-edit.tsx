import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import ImageCropper from "../../../imageCropper/imageCropper";
import { ApiServiceContext } from "../../../../core/Api/api.service";

const SectionTwoEditThemeOne = () => {
  const dispatch = useDispatch<any>();
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const { fetchCroppedImage, save_cms_data } = useContext(ApiServiceContext);
  const [editData, setEditData] = useState<any>();
  const [cropImageHeight, setCropImageHeight] = useState("");
  const [cropImageWidth, setCropImageWidth] = useState("");
  const [selectedCropImage, setSelectedCropImage] = useState("");
  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [imagedata, setImagedata] = useState<any>("" || undefined);
  const [activeTab, setActiveTab] = useState(0);
  const [savedData, setSavedData] = useState<any>(); 

  const banner = [
    "assets/img/about-image.jpg",
    "assets/img/page-banner.jpg",
    "assets/img/about-image.jpg",
    "assets/img/page-banner.jpg",
    "assets/img/about-image.jpg",
    "assets/img/page-banner.jpg",
    "assets/img/about-image.jpg",
    "assets/img/page-banner.jpg",
  ];

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
  
  const handleChange = (e: any) => {
    const { value, name, type, checked } = e.target;
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        home: {
          ...prevJsonData.theme_1.home,
          section_2: {
            ...prevJsonData.theme_1.home.section_2,
            [name]: value,
            input_section: {
                ...prevJsonData.theme_1.home.section_2.input_section,
                [name]: value,
              },
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

  const handleImageChange = (image: string, index: any) => {
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        home: {
          ...prevJsonData.theme_1.home,
          section_2: {
            ...prevJsonData.theme_1.home.section_2,
            banner: image,
          },
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

  const handleClose =()=>{
    setEditData(savedData);
    
  }

  // HTML
  return (
    <>
      <div className="modal-dialog modal-lg modal-dialog-centered theme-edit-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Section Two Theme Edit</h5>
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
                    <label className="form-label">
                      Title<small>(max 120 char)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={editData?.theme_1?.home?.section_2?.title}
                      onChange={handleChange}
                      maxLength={120}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Sub heading top<small>(max 120 char)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="sub_heading_top"
                      value={
                        editData?.theme_1?.home?.section_2?.sub_heading_top
                      }
                      onChange={handleChange}
                      maxLength={120}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Paragraph<small>(max 1200 char)</small></label>
                    <input
                      type="text"
                      className="form-control"
                      name="paragraph"
                      value={editData?.theme_1?.home?.section_2?.paragraph}
                      onChange={handleChange}
                      maxLength={1200}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Input Background</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="bg_color"
                        value={
                          editData?.theme_1?.home?.section_2?.input_section
                            ?.bg_color
                        }
                        maxLength={120}
                      />
                      <ColorPicker
                        name="bg_color"
                        format="hex"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.home?.section_2?.input_section
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
                          editData?.theme_1?.home?.section_2?.input_section
                            ?.btn_color
                        }
                        maxLength={120}
                      />
                      <ColorPicker
                        name="btn_color"
                        format="hex"
                        onChange={handleChange}
                        value={
                          editData?.theme_1?.home?.section_2?.input_section
                            ?.btn_color
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Button text</label>
                    <input
                      type="text"
                      className="form-control"
                      name="btn_text"
                      value={
                        editData?.theme_1?.home?.section_2?.input_section
                          ?.btn_text
                      }
                      onChange={handleChange}
                      maxLength={120}
                    />
                  </div>
                </div>
                </div>
              </div>
            <div className="mb-3">
              <label className="form-label">Upload Image</label>
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
                            src={editData?.theme_1?.home?.section_2?.banner}
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
                            {banner.map((icons, iconIndex) => (
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

export default SectionTwoEditThemeOne;
