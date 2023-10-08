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
    const [activeTab, setActiveTab] = useState(0);
  
    const [text, setText] = useState<any>('');
  
    function htmlonChange(e:any) {
      setText(e.target.value);
      console.log("texttext",text)
    }
  
  //   useEffect(() => {
  //     var element:any = document.getElementById("myElement");
  //     var htmlContent = element.innerHTML;
  //     console.log("htmlContent",htmlContent);
  //   }, [text]);
  
    
  
  
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
    
    const handleChange = (e: any,index?: any) => {
      const { value, name, type, checked } = e.target;
  
    
  
      setEditData((prevJsonData: any) => ({
        ...prevJsonData,
        theme_1: {
          ...prevJsonData.theme_1,
            specialoffers: {
              ...prevJsonData.theme_1.specialoffers,
              [name]: value,
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
  
  
  
  
    const updateImageSection = async (e: any) => {
      const image = e.target.files[0];
      setCropImageHeight("200");
      setCropImageWidth("250");
      setSelectedCropImage(image);
      setShowCropModal(true);
    };
  
    const handleImageChangecardImg = () => {
      setEditData((prevJsonData: any) => ({
        ...prevJsonData,
        theme_1: {
            specialoffers: {
              ...prevJsonData.theme_1.specialoffers,
              cardImg: CardImg
            },
        },
      }));
    };
  
    const handleImageChange = (image: string, index: any) => {
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
    };
  
  
    const handleCroppedImage = async (image: any) => {
      setShowCropModal(false);
      setImagedata(image);
      const imageLink = await fetchCroppedImage(image);
      if (imageLink != false) {
        handleImageChange(imageLink, activeTab);
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
                        Paragraph Two<small>(max 1200 char)</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="paragraph_two"
                        value={editData?.theme_1?.specialoffers?.paragraph_two}
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
                        Paragraph Three<small>(max 1200 char)</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="paragraph_three"
                        value={editData?.theme_1?.specialoffers?.paragraph_three}
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
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        List One<small>(max 1200 char)</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="list_one"
                        value={editData?.theme_1?.specialoffers?.list_one}
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
                        List Two<small>(max 1200 char)</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="list_two"
                        value={editData?.theme_1?.specialoffers?.list_two}
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
                        Title Two<small>(max 120 char)</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="title_two"
                        value={editData?.theme_1?.specialoffers?.title_two}
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
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">
                        List Three<small>(max 1200 char)</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="list_two_one"
                        value={editData?.theme_1?.specialoffers?.list_two_one}
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
                        List Four<small>(max 1200 char)</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="list_two_two"
                        value={editData?.theme_1?.specialoffers?.list_two_two}
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
                <label className="form-label">specialoffers Background Image</label>
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
              <div className="mb-3">
                <label className="form-label">Card Image</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="form-control"
                  name="cardImg"
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
                                <SwiperSlide >
                                  <div
                                    className="img-option"
                                    onClick={handleImageChangecardImg
                                    }
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

              <div className="edit-section">
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Note <small>(max 120 char)</small></label>
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
                          value={
                              editData?.theme_1?.specialoffers?.note1?.text
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



export default SpecialOffersEditThemeOne;
