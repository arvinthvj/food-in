import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import ImageCropper from "../../../../imageCropper/imageCropper";
import { ApiServiceContext } from "../../../../../core/Api/api.service";
import Editor from 'react-simple-wysiwyg';

const AllergyadviseEditThemeOne = () => {
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const { fetchCroppedImage, save_cms_data } = useContext(ApiServiceContext);
  const [editData, setEditData] = useState<any>();
  const [cropImageHeight, setCropImageHeight] = useState("");
  const [cropImageWidth, setCropImageWidth] = useState("");
  const [selectedCropImage, setSelectedCropImage] = useState("");
  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [cropImageHeightTwo, setCropImageHeightTwo] = useState("");
  const [cropImageWidthTwo, setCropImageWidthTwo] = useState("");
  const [selectedCropImageTwo, setSelectedCropImageTwo] = useState("");
  const [showCropModalTwo, setShowCropModalTwo] = useState<boolean>(false);
  const [imagedata, setImagedata] = useState<any>("" || undefined);
  const [activeTab, setActiveTab] = useState(0);

//   useEffect(() => {
//     var element:any = document.getElementById("myElement");
//     var htmlContent = element.innerHTML;
//     console.log("htmlContent",htmlContent);
//   }, [text]);

  


  const banner = [
    "assets/img/about-image.jpg",
    "assets/img/page-banner.jpg",
    "assets/img/about-image.jpg",
    "assets/img/page-banner.jpg",
    "assets/img/about-image.jpg",
    "assets/img/page-banner.jpg",
  ];

  const icons = [
    "assets/img/allergy/milk.png",
    "assets/img/allergy/eggs.png",
    "assets/img/allergy/gluten.png",
    "assets/img/allergy/soya.png",
    "assets/img/allergy/peanuts.png",
    "assets/img/allergy/nuts.png",
    "assets/img/allergy/lupin.png",
    "assets/img/allergy/celery.png",
    "assets/img/allergy/mustard.png",
    "assets/img/allergy/fish.png",
    "assets/img/allergy/shellfish.png",
    "assets/img/allergy/molluscs.png",
    "assets/img/allergy/so2.png",
    "assets/img/allergy/sesame.png"
  ]

  

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
  
  const handleChange = (e: any,index?: any) => {
    const { value, name, type, checked } = e.target;
    let updatedCollection: any = [
      ...editData?.theme_1?.allergyadvise?.card_section?.collection,
    ];
    if (index != undefined) {
      updatedCollection = [
        ...editData?.theme_1?.allergyadvise?.card_section?.collection,
      ];
      updatedCollection[index] = {
        ...updatedCollection[index],
        [name]: value,
      };
    }
    setEditData((prevJsonData: any) => ({
        ...prevJsonData,
        theme_1: {
          ...prevJsonData.theme_1,
          allergyadvise:{
              ...prevJsonData.theme_1.allergyadvise,
              [name]: value,
              card_section: {
                  collection: updatedCollection,
              }
          }
        },
      }));

  };

  const addCollection = () => {
    let updatedCollection: any = [
      ...editData?.theme_1?.allergyadvise?.card_section?.collection,
    ];

    let newCard = {
      icon: "assets/img/allergy/milk.png",
      collection_paragraph: "",
    };
    updatedCollection.splice(activeTab + 1, 0, newCard);
    setActiveTab(activeTab + 1);
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        ...prevJsonData.theme_1,
        allergyadvise:{
            ...prevJsonData.theme_1.allergyadvise,
            card_section: {
                collection: updatedCollection,
            }
        }
      },
    }));
  };

  const removeCollection = (index: any) => {
    let updatedCollection: any = [
      ...editData?.theme_1?.allergyadvise?.card_section?.collection,
    ];
    updatedCollection.splice(index, 1);
    setActiveTab(activeTab - 1);
    setEditData((prevJsonData: any) => ({
        ...prevJsonData,
        theme_1: {
          ...prevJsonData.theme_1,
          allergyadvise:{
              ...prevJsonData.theme_1.allergyadvise,
              card_section: {
                  collection: updatedCollection,
              }
          }
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

  const updateImageSectionTwo = async (e: any) => {
    const image = e.target.files[0];
    setCropImageHeightTwo("150");
    setCropImageWidthTwo("150");
    setSelectedCropImageTwo(image);
    setShowCropModalTwo(true);
  };


  const handleImageChange = (image: string, index: any) => {
    setEditData((prevJsonData: any) => ({
        ...prevJsonData,
        theme_1: {
          ...prevJsonData.theme_1,
          allergyadvise: {
            ...prevJsonData.theme_1.allergyadvise,
              banner: image,
          },
        },
      }));
  };

  const handleImageChangeTwo = (image: string, index: any) => {
    const updatedCollection = [
        ...editData?.theme_1?.allergyadvise?.card_section?.collection,
      ];
      updatedCollection[index] = {
        ...updatedCollection[index],
        icon: image,
      };
  
      setEditData((prevJsonData: any) => ({
        ...prevJsonData,
        theme_1: {
          ...prevJsonData.theme_1,
          allergyadvise:{
              ...prevJsonData.theme_1.allergyadvise,
              card_section: {
                  collection: updatedCollection,
              }
          }
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

  const handleCroppedImageTwo = async (image: any) => {
    setShowCropModalTwo(false);
    setImagedata(image);
    const imageLink = await fetchCroppedImage(image);
    if (imageLink != false) {
      handleImageChangeTwo(imageLink, activeTab);
    }
  };

 

  // HTML
  return (
    <>
      <div className="modal-dialog modal-lg modal-dialog-centered theme-edit-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Allergy Advise Theme Edit</h5>
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
                      value={editData?.theme_1?.allergyadvise?.title}
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
                      value={editData?.theme_1?.allergyadvise?.paragraph}
                      onChange={handleChange}
                      maxLength={1200}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Delivery Background Image</label>
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
                            src={editData?.theme_1?.allergyadvise?.banner}
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
                      </div>
                    </div>
                  </div>
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
                  {editData?.theme_1?.allergyadvise?.card_section?.collection.map(
                    (card: any, index: any) => (
                      <SwiperSlide key={index}>
                        <li key={index} className="nav-item nav-option">
                          <a
                            className={`nav-link ${
                              activeTab === index ? "active" : ""
                            }`}
                            onClick={() => setActiveTab(index)}
                          >
                            Card Section {index + 1}
                          </a>
                          <a
                            className="tab-close"
                            onClick={() => {
                              removeCollection(index);
                            }}
                          >
                            <i className="fas fa-times" aria-hidden="true"></i>
                          </a>
                        </li>
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              </ul>
              <div className="tab-content">
                {editData?.theme_1?.allergyadvise?.card_section?.collection.map(
                  (card: any, index: any) => (
                    <div
                      key={index}
                      className={`tab-pane fade ${
                        activeTab === index ? "show active" : ""
                      }`}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="img-bg active">
                            <img
                              src={card.icon}
                              alt={`Card Icon ${index + 1}`}
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
                                {icons.map((icons, iconIndex) => (
                                  <SwiperSlide key={iconIndex}>
                                    <div
                                      className="img-option"
                                      onClick={() =>
                                        handleImageChangeTwo(icons, index)
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
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          name="collection_paragraph"
                          value={card.collection_paragraph}
                          onChange={(e) => handleChange(e, index)}
                          maxLength={1200}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Upload Image</label>
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          className="form-control"
                          name="image"
                          onChange={updateImageSectionTwo}
                        />
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
      {showCropModalTwo ? (
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
              src={selectedCropImageTwo}
              height={cropImageHeightTwo}
              width={cropImageWidthTwo}
              handleCrop={handleCroppedImageTwo}
              close={() => {
                setShowCropModalTwo(false);
              }}
            />
          </div>
        </>
      ) : null}
    </>
  );



};

export default AllergyadviseEditThemeOne;
