import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import { useDispatch, useSelector } from "react-redux";
import { saveThemeJsonData } from "../../../../redux/Actions";
import { ApiServiceContext } from "../../../../core/Api/api.service";

const SectionThreeEditThemeOne = () => {
  const dispatch = useDispatch<any>();
  const { save_cms_data,fetchCroppedImage } = useContext(ApiServiceContext);
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const [editData, setEditData] = useState<any>();

  useEffect(() => {
    setEditData(jsonData);
  }, [jsonData]);
  useEffect(() => {
    if (editData != undefined) {
      setEditData(editData);
    }
  }, [editData]);

  const saveJsonData = () => {
    save_cms_data(editData);
  };

  const handleValueChange = (e: any) => {
    const { value, name, type, checked } = e.target;
    setEditData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1: {
        home: {
          ...prevJsonData.theme_1.home,
          section_3: {
            ...prevJsonData.theme_1.home.section_3,
            [name]: value,
          },
        },
      },
    }));
  };
  // HTML
  return (
    <>
      <div className="modal-dialog modal-lg modal-dialog-centered theme-edit-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Section Three Theme Edit</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-content modal-body">
            <div className="edit-section">
              <h4 className="edit-section-hdr">Title</h4>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={editData?.theme_1?.home?.section_3?.title}
                      onChange={handleValueChange}
                      maxLength={120}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <h4 className="edit-section-hdr">Paragraph</h4><small>(max 500 char)</small>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="paragraph"
                      value={editData?.theme_1?.home?.section_3?.paragraph}
                      onChange={handleValueChange}
                      maxLength={500}
                    />
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

export default SectionThreeEditThemeOne;
