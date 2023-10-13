import React, { useContext, useEffect, useState } from "react";
import { ApiServiceContext } from "../../../../../core/Api/api.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ImageCropper from "../../../../imageCropper/imageCropper";
import { useSelector } from "react-redux";
const bg_banner = [
  "assets/img/about-image.jpg",
  "assets/img/page-banner.jpg",
  "assets/img/about-image.jpg",
  "assets/img/page-banner.jpg",
  "assets/img/about-image.jpg",
  "assets/img/page-banner.jpg",
];
const ContactUsEditThemeOne = () => {
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);

  const { fetchCroppedImage, save_cms_data } = useContext(ApiServiceContext);
  const [editData, setEditData] = useState<any>();
  const [cropImageHeight, setCropImageHeight] = useState("");
  const [cropImageWidth, setCropImageWidth] = useState("");
  const [selectedCropImage, setSelectedCropImage] = useState("");
  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [imagedata, setImagedata] = useState<any>("" || undefined);
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (e: any, index?: any) => {
    const { value, name, type, checked } = e.target;

    let updatedCollection: any = [
      ...editData.theme_1.contactUs.contact_section_one,
    ];
    if (index != undefined) {
      updatedCollection = [...editData.theme_1.contactUs.contact_section_one];
      updatedCollection[index] = {
        ...updatedCollection[index],
        [name]: value,
      };
    }

    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        contactUs: {
          ...prevJsonData.theme_1.contactUs,
          [name]: value,
          contact_section_one: updatedCollection,
        },
      },
    }));
  };
  const saveJsonData = () => {
    save_cms_data(editData);
    console.log("editData", editData);
  };
  const addCollection = () => {
    let updatedCollection: any = [
      ...editData.theme_1.contactUs.contact_section_one,
    ];

    let newCard = {
      id: activeTab + 2,
      contact_title: "",
      contact_value: "",
    };
    updatedCollection.splice(activeTab + 1, 0, newCard);
    setActiveTab(activeTab + 1);
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        contactUs: {
          ...prevJsonData.theme_1.contactUs,
          contact_section_one: updatedCollection,
        },
      },
    }));
  };

  const removeCollection = (index: any) => {
    let updatedCollection: any = [
      ...editData.theme_1.contactUs.contact_section_one,
    ];
    let removedval = updatedCollection.splice(index, 1);
    // console.log(index, "removeIndex", removedval);

    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        contactUs: {
          ...prevJsonData.theme_1.contactUs,
          contact_section_one: updatedCollection,
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
        ...prevJsonData.theme_1,
        contactUs: {
          ...prevJsonData.theme_1.contactUs,
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
  useEffect(() => {
    setEditData(jsonData);
  }, [jsonData]);

  useEffect(() => {
    if (editData != undefined) {
      setEditData(editData);
    }
    console.log("editData", editData);
  }, [editData]);

  return (
    <>
      <div>
        <div className="modal-dialog modal-lg modal-dialog-centered theme-edit-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Contact Us Theme Edit</h5>
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
                        value={editData?.theme_1?.contactUs?.title}
                        onChange={handleChange}
                        maxLength={120}
                      />
                    </div>
                  </div>
                </div>
                {/* <h5 className="modal-title">Zone Section</h5> */}
                <div className="edit-section">
                  <ul className="nav nav-tabs">
                    <Swiper
                      spaceBetween={15}
                      navigation={true}
                      modules={[Navigation]}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                      }}
                      className="homejson-slider"
                    >
                      {editData?.theme_1?.contactUs?.contact_section_one.map(
                        (card: any, index: any) => (
                          <SwiperSlide key={index}>
                            <li key={index} className="nav-item nav-option">
                              <a
                                className={`nav-link ${
                                  activeTab === index ? "active" : ""
                                }`}
                                style={{ cursor: "pointer" }}
                                onClick={() => setActiveTab(index)}
                              >
                                Contact_field {index + 1}
                              </a>
                              <a
                                className="tab-close"
                                onClick={() => {
                                  removeCollection(index);
                                }}
                              >
                                <i
                                  className="fas fa-times"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                          </SwiperSlide>
                        )
                      )}
                    </Swiper>
                  </ul>
                  <div className="tab-content">
                    {editData?.theme_1?.contactUs?.contact_section_one?.map(
                      (item: any, index: any) => (
                        <div
                          key={index}
                          className={`tab-pane fade ${
                            activeTab === index ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <div className="mb-3">
                              <label className="form-label">
                                Title<small>(max 120 char)</small>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="contact_title"
                                value={item.contact_title}
                                onChange={(e) => handleChange(e, index)}
                                maxLength={120}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Description<small>(max 50 char)</small>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="contact_value"
                                value={item.contact_value}
                                onChange={(e) => handleChange(e, index)}
                                maxLength={50}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="add-section">
                  <div className="row">
                    <div
                      onClick={() => {
                        addCollection();
                      }}
                      className="col text-center"
                    >
                      Add Card
                      <i
                        className="fas fa-plus-square ms-2"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">
                      Paragraph<small>(max 1200 char)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="paragraph"
                      value={editData?.theme_1?.contactUs?.paragraph}
                      onChange={handleChange}
                      maxLength={1200}
                    />
                  </div>
                </div>
              </div> */}
              </div>
              {/* <div className="edit-section">
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        Note 1<small>(max 120 char)</small>
                      </label>
                      <div className="input-group mb-3">
                        <div className="input-group-text">
                          <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            name="note1_is_enable"
                              onClick={handleChange}
                                checked={
                                    editData?.theme_1?.contactUs?.note1?.is_enable
                                }
                          />
                        </div>
                        <input
                        type="text"
                        className="form-control"
                        name="note1_text"
                        onChange={handleChange}
                        maxLength={120}
                        value={
                            editData?.theme_1?.contactUs?.note1?.text
                        }
                      />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="mb-3">
                <label className="form-label">
                  Contact Us Background Image
                </label>
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
                              src={editData?.theme_1?.contactUs?.banner}
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
                      <label className="form-label">
                        Title Two<small>(max 120 char)</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="title_two"
                        value={editData?.theme_1?.contactUs?.title_two}
                        onChange={handleChange}
                        maxLength={1200}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        Link<small className="text-danger">*</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="map_src"
                        value={editData?.theme_1?.contactUs?.map_src}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="edit-section">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">
                      Zone Paragraph<small>(max 1200 char)</small>
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="paragraph_two"
                        onChange={handleChange}
                        maxLength={1200}
                        value={
                            editData?.theme_1?.contactUs?.paragraph_two
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

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

export default ContactUsEditThemeOne;
