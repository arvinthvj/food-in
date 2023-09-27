import React, { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const ImageCropper = (props: any) => {
  const closeAddModal = useRef<any>("");
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    unit: "px",
  });
  const [cropImage, setCropImage] = useState<any>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<any>(null);
  const imageRef = useRef(null);

  const convertToBase64 = (img: any) => {
    if (img instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (res: any) => {
        setCropImage(res.target.result);
      };
    }
  };

  const getCroppedImg = (image: any, crop: any, fileName: any) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      resolve(canvas.toDataURL());
    });
  };

  const makeClientCrop = async (crop: any) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(
        imageRef.current,
        crop,
        "profileImage.jpeg"
      );
      props.src && setCroppedImageUrl(croppedImage);
    }
  };
  const closeCropModal = () => {
    setCroppedImageUrl(null);
    setCropImage(null);
    setCrop({ x: 0, y: 0, width: 0, height: 0, unit: "px" });
    props.close()
  };

  const handleCroppedOutput = () => {
    props.handleCrop(croppedImageUrl);
    closeCropModal();
  };

  useEffect(() => {
    convertToBase64(props.src);
  }, [props]);
  useEffect(() => {
    makeClientCrop(crop);
  }, [crop]);

  // HTML
  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crop Image</h5>
            <button
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeAddModal}
              onClick={closeCropModal}
            >
            </button>
          </div>
          <div className="modal-body">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              <ReactCrop
                crop={crop}
                style={{
                  width: "400px",
                  height: "300px",
                  overflow:"auto"
                }}
                maxHeight={props.height}
                maxWidth={props.width}
                onChange={(c) => setCrop(c)}
              >
                <img src={cropImage} ref={imageRef} alt="Img" style={{position: "absolute",top: "0",pointerEvents: "none"}} />
              </ReactCrop>
            </div>
            <div className="d-flex mt-2 justify-content-center">
              {croppedImageUrl && (
                <img
                  alt="Crop"
                  style={{ maxWidth: "100%" }}
                  src={croppedImageUrl}
                />
              )}
            </div>
            <div className="buttons d-flex justify-content-start align-items-center">
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn gradient-btn"
                disabled={croppedImageUrl == null}
                onClick={handleCroppedOutput}
              >
                Confirm
              </button>
              <button
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeCropModal}
                className="btn btn-dull"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    // onClick={props.handleDelete}
  );
};

export default ImageCropper;
