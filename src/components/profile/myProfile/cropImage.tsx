import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface ModalWithCropperProps {
  showModal: boolean;
  handleClose: () => void;
  setImage: any;
  image: any;
}

const ImageUpload: React.FC<ModalWithCropperProps> = ({
  showModal,
  handleClose,
  image,
  setImage,
}) => {
  //   const [image, setImage] = useState<string>(defaultSrc);
  const [cropData, setCropData] = useState<string>("#");
  const cropperRef = useRef<Cropper | null>(null);

  //   const onChange = (e: any) => {
  //     e.preventDefault();
  //     let files;
  //     if (e.dataTransfer) {
  //       files = e.dataTransfer.files;
  //     } else if (e.target) {
  //       files = e.target.files;
  //     }
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result as any);
  //     };
  //     reader.readAsDataURL(files[0]);
  //   };

  const handleUpload = () => {
    setImage(cropData);

    setTimeout(() => {
      handleClose();
    }, 100);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> Crop Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <input type="file" onChange={onChange} /> */}
        <div className="cropperImage">
          <Cropper
            src={image}
            ref={cropperRef}
            aspectRatio={1}
            preview=".img-preview"
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            checkOrientation={false}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="pt-5 d-flex justify-content-between w-100">
          <button className="btn btn-primary" onClick={getCropData}>
            Crop Image
          </button>
          <button
            className="btn btn-primary"
            disabled={cropData === "#"}
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        <div className="pt-5 d-flex w-50" style={{ justifyContent: "center" }}>
          {cropData && <img src={cropData} alt="cropped" />}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageUpload;
