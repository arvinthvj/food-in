import React, { useContext, useEffect, useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
// import { fetchHomeJsonList, saveThemeJsonData } from "../../../redux/Actions";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { ApiServiceContext } from "../../../../core/Api/api.service";
import { toast } from "react-toastify";

function SectionThemeOneEditor() {
  const [editedHeaderData, setHeaderJsonData] = useState<any>();
  const [savedData, setSavedData] = useState<any>(); 

  const dispatch = useDispatch<any>();
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const { fetchCroppedImage, save_cms_data } = useContext(ApiServiceContext);

  const handleHeaderChange = (e: any, val?: any) => {
    const { value, name } = e.target;
    let sectiondata: any = [...editedHeaderData?.theme_1?.home.sections];
    if (val !== undefined) {
      sectiondata = editedHeaderData?.theme_1?.home.sections.map((v: any) => {
        if (v._id === val._id) {
          return {
            ...v,
            is_section_enable: !v.is_section_enable,
          };
        } else {
          return v;
        }
      });
    }
    setHeaderJsonData((prevJsonData: any) => ({
      ...prevJsonData,
      theme_1:{
        home: {
          ...prevJsonData.theme_1.home,
          sections: sectiondata,
          header: {
            ...prevJsonData.theme_1.home.header,
            [name]: value,
            nav: {
              ...prevJsonData.theme_1.home.header.nav,
            },
            btn_group: {
              ...prevJsonData.theme_1.home.header.btn_group,
            },
          },
        },
      }
     
    }));
  };
  //!editedHeaderData?.theme_1?.home?.header?.secondary_color.length && !editedHeaderData?.theme_1?.home?.header?.primary_color.length 
//  && !editedHeaderData?.theme_1?.home?.section_1?.is_section_enable &&

  const saveHeaderJsonDataToFile = () => {
    let sectionsArray= editedHeaderData?.theme_1?.home?.sections
    if(sectionsArray && sectionsArray.filter((e:any)=> !e.is_section_enable).length == sectionsArray.length){
      toast.error("Please Select the any of the sections ")
      
    }else{
      save_cms_data(editedHeaderData);

    }
    
  };

  useEffect(() => {
    if (editedHeaderData != undefined) {
      setHeaderJsonData(editedHeaderData);
    }
  }, [editedHeaderData]);

  useEffect(() => {
    setHeaderJsonData(jsonData);
    setSavedData(jsonData)

  }, [jsonData]);

  const handleClose =()=>{
    setHeaderJsonData(savedData);
    
  }

  return (
    <>
      <div className="modal-dialog modal-lg modal-dialog-centered theme-edit-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Section Theme Edit</h5>
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
              <h4 className="edit-section-hdr">Theme Color</h4>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Primary Color</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="primary_color"
                        value={editedHeaderData?.theme_1?.home?.header?.primary_color}
                        onChange={handleHeaderChange}
                        maxLength={120}
                      />
                      <ColorPicker
                        name="primary_color"
                        onChange={(e) => {
                          handleHeaderChange(e);
                        }}
                        format="hex"
                        value={editedHeaderData?.theme_1?.home?.header?.primary_color}
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Secondary Color</label>
                    <div className="input-group color-change">
                      <input
                        type="text"
                        className="form-control"
                        name="secondary_color"
                        value={editedHeaderData?.theme_1?.home?.header?.secondary_color}
                        onChange={handleHeaderChange}
                        maxLength={120}
                      />
                      <ColorPicker
                        name="secondary_color"
                        onChange={(e) => {
                          handleHeaderChange(e);
                        }}
                        format="hex"
                        value={editedHeaderData?.theme_1?.home?.header?.secondary_color}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <h4 className="edit-section-hdr">Sections</h4>
              <div className="row">
                <div className="col">
                  <ul className="section-list">
                    {Array.isArray(editedHeaderData?.theme_1?.home?.sections) &&
                      editedHeaderData?.theme_1?.home?.sections.map(
                        (section: any, index: any) => (
                          <li key={index}>
                            <div className="section-show">
                              <span className="sectioninput">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="is_section_enable"
                                  id={section._id}
                                  onClick={(e) =>
                                    handleHeaderChange(e, section)
                                  }
                                  checked={section.is_section_enable}
                                />
                              </span>
                              <img src={section.icon} alt="" />
                            </div>
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-3 mt-1">
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn save-btn"
                onClick={() => {
                  saveHeaderJsonDataToFile();
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

export default SectionThemeOneEditor;
