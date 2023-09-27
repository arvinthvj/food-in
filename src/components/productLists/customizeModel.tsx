import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
type CustomizeModelProps = {
  visible: any; // Replace 'any' with the appropriate type for 'visible'
  cancel: any; // Replace 'any' with the appropriate type for 'cancel'
  onAddOrder: any;
  customizeData: any;
  handleOptionChange: any;
  setExtraDish: any;
  extraDish: any;
};
const CustomizeModel: React.FC<CustomizeModelProps> = ({
  visible,
  cancel,
  onAddOrder,
  customizeData,
  handleOptionChange,
  setExtraDish,
  extraDish,
}) => {
  const [optionIndex, setOptionIndex] = useState({ index: -1, id: "" });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [instructionValue, setInstructionValue] = useState("");
  // const [custCheckbox, setCustCheckbox] = useState<number>(0);
  //  const [checked, setChecked] = useState<number>(0);

  // const [extraDishChecked, setExtraDishChecked] = useState<Array<boolean>>(
  //   new Array(customizeData?.detail?.add_on_groups?.length).fill(false)
  // );

  const [extraDishChecked, setExtraDishChecked] = useState(
    customizeData?.detail?.add_on_groups?.map(() => true) || []
  );
  // const [extraDishChecked, setExtraDishChecked] = useState(
  //   extraDish?.map((e:any) => e.value==true? e.price: 0) || []
  // );

 
  const extrafun = (e: any, price: any, index: number, check:boolean) => {
    let id = e?.target?.value?.toString();
    let val: any = {
      id: id,
      value: e?.target?.checked,
      check:check,
      name: e?.target?.name,
      price: price,
    };
    //let newval = [...extraDish];


    setExtraDish((prev: any) => {
  
      let updatedExtraDish = [...prev];
       //  console.log(updatedExtraDish, "updatedExtraDish")


      let itemIndex = updatedExtraDish.findIndex((item) => item.id === id);
  
      if (itemIndex === -1) {
        updatedExtraDish.push(val);
      } else {
        updatedExtraDish[itemIndex] = val;
      }
      return updatedExtraDish;

    });

    // setExtraDishChecked((prevChecked:any) => {
    //   const newChecked = [...prevChecked];
    //   newChecked[index] = e.target.checked;
    //   return newChecked;
    // });
    const newCheckedState = [...extraDishChecked];
    newCheckedState[index] = e.target.checked;
    setExtraDishChecked(newCheckedState);
    updateTotalPriceAndCheckboxes(); 
  };


  useEffect(() => {
    customizeData &&
      setOptionIndex({
        ...optionIndex,
        index: customizeData?.detail?.options?.findIndex((d: any) => {
          return d?.is_default == "1";
        }),
      });
      
  
    customizeData?.detail?.instructionnote &&
      setInstructionValue(customizeData.detail.instructionnote);
    return () => {
      setInstructionValue(""); // Cleanup when component unmounts
    };
    
  }, [customizeData]);
  useEffect(() => {
  }, [optionIndex]);

  useEffect(() => {
    if (optionIndex?.index == -1) {
      return;
    }
    // handleOptionChange(
    //   optionIndex?.id,
    //   customizeData?.main_id,
    //   customizeData?.detail?.id,
    //   extraDish
    // );
  }, [extraDish, optionIndex]);

  const updateTotalPriceAndCheckboxes=()=>{
    // Calculate the totalPrice based on your logic
   let extraDished=customizeData?.detail?.add_on_groups[0]?.add_ons;

  //   let optionPrice = customizeData?.detail?.options[optionIndex.index]?.price;
     let filterDished = extraDished?.filter((item: any) => (item?.check===true))
        let priced = filterDished?.map((item: any) => item.price);

      const customizePriced = priced ? priced.reduce(
          (acc: number, currentValue: any) => acc + parseFloat(currentValue),
          0 
        ): 0
      

     let filterDisheds = extraDish?.filter((item: any) => (item?.value===false))

         let priceds = filterDisheds?.map((item: any) => item.price);

      const customizePriceds = priceds ? priceds.reduce(
          (acc: number, currentValue: any) => acc - parseFloat(currentValue),
          0): 0
  
      
     let optionPrice = customizeData?.detail?.options[optionIndex.index]?.price;

    let filterDish = extraDish?.filter((item: any) => item.value === true);

    let prices = filterDish?.map((item: any) => item.price);

    const customizePrice = prices? prices?.reduce(
      (acc: number, currentValue: any) => acc + parseFloat(currentValue),
      0
    ): 0


if(customizePrice===0){
  const totalPriceValues=parseInt((optionPrice));
setTotalPrice(totalPriceValues);
}

    const totalPriceValues =
    (( parseFloat(customizePriced.toFixed(2))+
  parseInt(optionPrice)+  parseFloat(customizePriceds.toFixed(2)))+ (parseFloat(customizePrice.toFixed(2))));
   const totalPriceValue=parseFloat((totalPriceValues).toFixed(2));
     
    setTotalPrice(totalPriceValue);

        }



  
  useEffect(()=>{
    updateTotalPriceAndCheckboxes()

  },[customizeData, optionIndex.index, extraDish])

  
  useEffect(()=>{
    updateTotalPriceAndCheckboxes()

  },[extraDish])
//console.log(555555,filteredItems);

  return (
    <Modal
      show={visible}
      onHide={cancel}
      centered
      className="modal custom-modal delete-modal continue-model fade multi-step show"
    >
      <div className="modal-content">
        <div className="modal-body">
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="customize-title"><span>Customize Your</span><br/>
              {customizeData?.detail?.name}
              </h4>
            </div>
            <div>
              <h4>
                £ {totalPrice  }
              </h4>
            </div>
          </div>
          <h6>Options:</h6>
          {customizeData?.detail?.options?.map((val: any, index: any) => {
            return (
              <div className="form-check">
                <label className="form-check-label">
                <input
                  id={index}
                  type="radio"
                  checked={optionIndex.index === index ? true : false}
                  value={val?.id}
                  onChange={(e: any) => {
                    setOptionIndex({ id: val?.id, index: index });
                    handleOptionChange(
                      val?.id,
                      customizeData?.main_id,
                      customizeData?.detail?.id,
                      extraDish
                    );
                  }}
                  className="form-check-input custom_prod_options custom_prod_options_1"
                />
                {val?.name}
                </label>
              </div>
            );
          })}

     

          {customizeData?.detail?.add_on_groups.map((val: any, index: any) => {
            return (
              <>
                {index == 0 && (
                  <div>
                    <h5>{val?.name}</h5>
                    {val?.add_ons?.map((a: any, Innerindex: any) => {
                      return (
                        <div>
                          <input
                            type="checkbox"
                            value={a?.id}
                            // checked={a?.checked === true ? true : false}
                            name={a?.name}
                            id={a?.id + '_' + Innerindex} // Use a unique ID here

                       //   defaultChecked={extraDishChecked[index]} // Set the checked state based on extraDishChecked

                         defaultChecked={a?.check === true ? true : false}
                            onChange={(e: any) => {
                              
                              extrafun(e, a?.price, index, a?.check);
                            }}
                          />
                          <span>
                            {a?.name}(£ {a?.price})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })}

          {/* <h4>Cooking Instructions:</h4>
            <input
              style={{ width: "100%", height: "7vh" }}
              placeholder="If you have any special cooking or preparation instructions, Please mention here"
            /> */}
          <div className="form-group">
            <h6>Cooking Instructions:</h6>
            <textarea
              className="form-control no-resize"
              id="textareaInput"
              value={instructionValue}
              onChange={(e: any) => setInstructionValue(e.target.value)}
              rows={2}
              placeholder={`If you have any special cooking or preparation instructions,
Please mention here`}
            ></textarea>
          </div>
          <div className="remove-btns continue-btn d-flex justify-content-between">
            <button className="btn btn-primary" onClick={cancel}>
              Cancel
            </button>
            <span>
              QTY: <span>1</span> <button
                className="btn btn-primary"
                onClick={() => {
                  onAddOrder(
                    customizeData?.id,
                    customizeData?.main_id,
                    "customize",
                    extraDish,
                    instructionValue
                  );
                  setTimeout(() => {
                    cancel();
                  }, 100);
                }}
              >
                +
              </button>
            </span>
          </div>
        </div>
      </div>
    </Modal>
    // </div>
  );
};

export default CustomizeModel;
