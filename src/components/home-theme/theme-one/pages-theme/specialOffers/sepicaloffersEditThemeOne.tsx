import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import ImageCropper from "../../../../imageCropper/imageCropper";
import { ApiServiceContext } from "../../../../../core/Api/api.service";
import Editor from "react-simple-wysiwyg";
import { CardImg } from "react-bootstrap";

const SpecialOffersEditThemeOne = () => {
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const { fetchCroppedImage, save_cms_data } = useContext(ApiServiceContext);
  const [editData, setEditData] = useState<any>();
  const [cropImageHeight, setCropImageHeight] = useState("");
  const [cropImageWidth, setCropImageWidth] = useState("");
  const [selectedCropImage, setSelectedCropImage] = useState("");
  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [imagedata, setImagedata] = useState<any>("" || undefined);
  const [imagefrom, setimageFrom] = useState<any>("");

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
    console.log("editData", editData);
  }, [editData]);

  const saveJsonData = () => {
    save_cms_data(editData);
    console.log("editData", editData);
  };

  const handleChange = (e: any, index?: any) => {
    const { value, name, type, checked } = e.target;

    let updatedCollection: any = [...editData.theme_1.specialoffers.heading_1];
    let updatedCollections: any = [...editData.theme_1.specialoffers.heading_2];

    if (index != undefined) {
      updatedCollection = [...editData.theme_1.specialoffers.heading_1];
      updatedCollection[index] = {
        ...updatedCollection[index],
        [name]: value,
      };
      updatedCollections = [...editData.theme_1.specialoffers.heading_2];
      updatedCollections[index] = {
        ...updatedCollections[index],
        [name]: value,
      };
    }

    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        specialoffers: {
          ...prevJsonData.theme_1.specialoffers,
          [name]: value,
          heading_1: updatedCollection,
          heading_2: updatedCollections,

          note1: {
            ...prevJsonData.theme_1.specialoffers.note1,
            is_enable:
              type === "checkbox" && name === "note1_is_enable"
                ? !prevJsonData.theme_1.specialoffers.note1.is_enable
                : prevJsonData.theme_1.specialoffers.note1.is_enable,
            text:
              name === "note1_text"
                ? value
                : prevJsonData.theme_1.specialoffers.note1.text,
          },
        },
      },
    }));
  };

  const addCollection = () => {
    let updatedCollection: any = [...editData.theme_1.specialoffers.heading_1];

    let newCard = {
      id: activeTab + 2,
      list_one: "",
    };
    updatedCollection.splice(activeTab + 1, 0, newCard);
    setActiveTab(activeTab + 1);
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        specialoffers: {
          ...prevJsonData.theme_1.specialoffers,
          heading_1: updatedCollection,
        },
      },
    }));
  };

  const removeCollection = (index: any) => {
    let updatedCollection: any = [...editData.theme_1.specialoffers.heading_1];
    updatedCollection.splice(index, 1);
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        specialoffers: {
          ...prevJsonData.theme_1.specialoffers,
          heading_1: updatedCollection,
        },
      },
    }));
  };

  const addCollections = () => {
    let updatedCollections: any = [...editData.theme_1.specialoffers.heading_2];

    let newCards = {
      id: activeTab + 2,
      list_two: "",
    };
    updatedCollections.splice(activeTab + 1, 0, newCards);
    setActiveTab(activeTab + 1);
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        specialoffers: {
          ...prevJsonData.theme_1.specialoffers,
          heading_2: updatedCollections,
        },
      },
    }));
  };

  const removeCollections = (index: any) => {
    let updatedCollections: any = [...editData.theme_1.specialoffers.heading_2];
    updatedCollections.splice(index, 1);
    setActiveTab(activeTab - 1);
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        specialoffers: {
          ...prevJsonData.theme_1.specialoffers,
          heading_2: updatedCollections,
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

  const handleImageChangecardImg = (image: any) => {
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        specialoffers: {
          ...prevJsonData.theme_1.specialoffers,
          cardImg: image,
        },
      },
    }));
    setimageFrom("");
  };

  const handleImageChange = (image: string, index: any, from: any) => {
    if (from == "cardImage") {
      handleImageChangecardImg(image);
      return false;
    }
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        specialoffers: {
          ...prevJsonData.theme_1.specialoffers,
          banner: image,
        },
      },
    }));
    setimageFrom("");
  };

  const handleCroppedImage = async (image: any) => {
    setShowCropModal(false);
    setImagedata(image);
    const imageLink = await fetchCroppedImage(image);
    if (imageLink != false) {
      handleImageChange(imageLink, activeTab, imagefrom);
    }
  };

  // return (
  //     <>
  //     <Editor value={text} onChange={htmlonChange} />
  //     <div>{ text }</div>
  // </>
  //   );

  // HTML
  return (
    <>
      <div className="modal-dialog modal-lg modal-dialog-centered theme-edit-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Special Offers Theme Edit</h5>
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
                      value={editData?.theme_1?.specialoffers?.title}
                      onChange={handleChange}
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">
                      Sub Title<small>(max 1200 char)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="sub_title"
                      value={editData?.theme_1?.specialoffers?.sub_title}
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
                      Paragraph<small>(max 1200 char)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="paragraph"
                      value={editData?.theme_1?.specialoffers?.paragraph}
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
                      Sub Title Ttwo<small>(max 1200 char)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="sub_title_two"
                      value={editData?.theme_1?.specialoffers?.sub_title_two}
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
                      Heading<small>(max 120 char)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="heading"
                      value={editData?.theme_1?.specialoffers?.heading}
                      onChange={handleChange}
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>
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
                    {editData?.theme_1?.specialoffers?.heading_1.map(
                      (card: any, index: any) => (
                        <SwiperSlide key={index}>
                          <li key={index} className="nav-item nav-option">
                            <a
                              className={`nav-link ${
                                activeTab === index ? "active" : ""
                              }`}
                              onClick={() => setActiveTab(index)}
                            >
                              List {index + 1}
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
                  {editData?.theme_1?.specialoffers?.heading_1.map(
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
                              Points to add<small>(max 120 char)</small>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="list_one"
                              value={item.list_one}
                              onChange={(e) => handleChange(e, index)}
                              maxLength={120}
                            />
                          </div>
                          {/* <div className="mb-3">
                        <label className="form-label">Description<small>(max 1200 char)</small></label>
                        <input
                          type="text"
                          className="form-control"
                          name="zone_paragraph"
                          value={item.zone_paragraph}
                          onChange={(e) => handleChange(e, index)}
                          maxLength={1200}
                        />
                      </div> */}
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
                    Add Card<i className="fas fa-plus-square ms-2"></i>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">
                      Heading Two<small>(max 120 char)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="heading_two"
                      value={editData?.theme_1?.specialoffers?.heading_two}
                      onChange={handleChange}
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>

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
                    {editData?.theme_1?.specialoffers?.heading_2.map(
                      (card: any, index: any) => (
                        <SwiperSlide key={index}>
                          <li key={index} className="nav-item nav-option">
                            <a
                              className={`nav-link ${
                                activeTab === index ? "active" : ""
                              }`}
                              onClick={() => setActiveTab(index)}
                            >
                              List {index + 1}
                            </a>
                            <a
                              className="tab-close"
                              onClick={() => {
                                removeCollections(index);
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
                  {editData?.theme_1?.specialoffers?.heading_2.map(
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
                              Points to add<small>(max 120 char)</small>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="list_two"
                              value={item.list_two}
                              onChange={(e) => handleChange(e, index)}
                              maxLength={120}
                            />
                          </div>
                          {/* <div className="mb-3">
        <label className="form-label">Description<small>(max 1200 char)</small></label>
        <input
          type="text"
          className="form-control"
          name="zone_paragraph"
          value={item.zone_paragraph}
          onChange={(e) => handleChange(e, index)}
          maxLength={1200}
        />
      </div> */}
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
                      addCollections();
                    }}
                    className="col text-center"
                  >
                    Add Card<i className="fas fa-plus-square ms-2"></i>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">
                      Heading 3<small>(max 1200 char)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="heading_three"
                      value={editData?.theme_1?.specialoffers?.heading_three}
                      onChange={handleChange}
                      maxLength={1200}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Card Image</label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="form-control"
                name="cardImg"
                onChange={(e) => {
                  setimageFrom("cardImage");
                  updateImageSection(e);
                }}
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
                            src={editData?.theme_1?.specialoffers?.cardImg}
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
                            <SwiperSlide>
                              <div
                                className="img-option"
                                onClick={handleImageChangecardImg}
                              >
                                {/* <img
                                      src={editData?.theme_1?.specialoffers?.cardImg}
                                      alt="Hero Image"
                                      className="img-fluid"
                                    /> */}
                              </div>
                            </SwiperSlide>
                          </Swiper>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Specialoffers Background Image
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="form-control"
                name="image"
                onChange={(e) => {
                  setimageFrom("background");
                  updateImageSection(e);
                }}
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
                            src={editData?.theme_1?.specialoffers?.banner}
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
                                    handleImageChange(
                                      icons,
                                      iconIndex,
                                      undefined
                                    )
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
                      Note <small>(max 120 char)</small>
                    </label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          name="note1_is_enable"
                          onClick={handleChange}
                          checked={
                            editData?.theme_1?.specialoffers?.note1?.is_enable
                          }
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="note1_text"
                        onChange={handleChange}
                        maxLength={120}
                        value={editData?.theme_1?.specialoffers?.note1?.text}
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

export default SpecialOffersEditThemeOne;
