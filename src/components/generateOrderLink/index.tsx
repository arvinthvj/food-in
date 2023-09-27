import { stat } from "fs";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';
import { fetchGenarateOrderLink } from './../../redux/Actions/checkoutPageActions/index';

const GenerateOrderLink: React.FC<{ close: any }> = ({ close }) => {

    const [cartInformation, setCartInformation] = useState<any>([])
const dispatch = useDispatch<any>();
const popupRef = useRef<any>(null);
    const handleClose = () =>{
        close();
    }
    const selectedCategories: any = useSelector<any>(
        (state) => state.userSelectedCategories
      );

useEffect(()=>{
    const cartInformationData = selectedCategories?.filter((item: any) => {
        return item?.sub_categories?.some(
          (subItem: any) => parseInt(subItem?.quantity) > 0
        );
      });
  
      setCartInformation(cartInformationData);
},[selectedCategories])



useEffect(()=>{
    dispatch(fetchGenarateOrderLink())
},[])
    const orderLink: any = useSelector<any>(
        (state) => state?.genarateOrderLink?.urlTo
      );

      useEffect(() => {
        function handleClickOutside(event:any) {
          if (!popupRef.current.contains(event.target))  {
            close();
            
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

  return (
    <div className="swal-overlay swal-overlay--show-modal" ref={popupRef}>
    
    {cartInformation !== "" ? ( <div className="swal-modal" role="dialog" aria-modal="true">
    <div className="swal-icon swal-icon--success">
      <span className="swal-icon--success__line swal-icon--success__line--long"></span>
      <span className="swal-icon--success__line swal-icon--success__line--tip"></span>

      <div className="swal-icon--success__ring"></div>
      <div className="swal-icon--success__hide-corners"></div>
    </div>
    <div className="swal-title">
      Order link has been created successfully.
    </div>
    <div className="swal-text">
      {orderLink}
    </div>
    <div className="swal-footer" onClick={handleClose}>
      <div className="swal-button-container" >
        <button className="swal-button swal-button--confirm" >OK</button>
      </div>
    </div>
  </div>
) : <div>
    cart is emty
    </div>}

</div>
     
  );
};

export default GenerateOrderLink;
