import React, { useEffect, useState } from 'react';
import './../trackOrderPopup/trackOrder.css';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchTrackOrder } from '../../redux/Actions/trackOrderAction';
import { format } from 'date-fns'
import { fetchOrderDetails } from '../../redux/Actions/orderDetailsAction';
import { approved,pending,collected,verified,inprogress,completed,delivered } from '../../assets/img'

const TrackOrderPopup: React.FC<{ close: any, orderId: string }> = ({ close, orderId }) => {

    const [trackOrder, setTrackOrder] = useState<any>({})
    const [orderDetails, setOrderDetails] = useState<any>({});
    const dispatch = useDispatch<any>();
    const state: any = useSelector<any>(state => state);
    // 


    useEffect(() => {
        // if (state) {
        // setTrackOrder(state.trackOrder);
        // }
        // 
        setTrackOrder(state.trackOrder);
        if (state.orderDetails.data) {
            setOrderDetails(state.orderDetails.data.orders_details);
        }

    }, [state])

    useEffect(() => {
        // fetchData();
        // dispatch(fetchMyOrders(limit,page,sort,order_status))
        dispatch(fetchTrackOrder(orderId));
        dispatch(fetchOrderDetails(orderId));
    }, [])


    const handleOrderPopupClose = () => {
        close();
    }

    // const trackData: { [unit: string]: number } = trackOrder;

    return (
        <div className='track-order'>
            <div className="modal-backdrop fade show"></div>
            <div className='modal fade show d-block'>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable custom-modal-class">

                <div className="modal-content vprogress-content">
                    <div className="modal-header">
                        <span className='order-tag'>Order ID - {orderId}</span>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleOrderPopupClose}></button>
                    </div>

                    <div className="modal-body vprogress-body">
                        <div className="map-sec">
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.847607285167!2d77.01636881382488!3d11.050050057107285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857faa66abe95%3A0x3640ee49afb8f96d!2sDreamguys%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1622726872179!5m2!1sen!2sin" width="100%" height="250" loading="lazy"></iframe> */}
                            <iframe src={orderDetails.pickup_address && `https://www.google.com/maps?q=${orderDetails.pickup_address.text_address}&output=embed`} width="100%" height="250" loading="lazy"></iframe>
                        </div>
                        <div className="vprogress">
                            <div className={`circle ${trackOrder.current_status_id >= 1 ? 'done' : 'notdone'}`}>
                                <span className="label"></span>
                                <div className="progress-title">
                                    <p><img src={pending} />Pending</p>
                                    {trackOrder.status_details ? trackOrder.status_details.map((status: any) => { return status.id == 1 ? <span>{status.date != "" && format(new Date(status.date),'dd-MM-yyyy hh:mm:ss')}</span> : <span></span> }) : <span></span>}
                                </div>
                            </div>
                            <span className={`bar ${trackOrder.current_status_id >= 2 ? 'done' : 'notdone'}`}></span>
                            <div className={`circle ${trackOrder.current_status_id >= 2 ? 'done' : 'notdone'}`}>
                                <span className="label"></span>
                                <div className="progress-title">
                                    <p><img src={approved} /> Approved</p>
                                    {trackOrder.status_details ? trackOrder.status_details.map((status: any) => { return status.id == 2 ? <span>{status.date != "" && format(new Date(status.date),'dd-MM-yyyy hh:mm:ss')}</span> : <span></span> }) : <span></span>}
                                </div>
                            </div>
                            <span className={`bar ${trackOrder.current_status_id >= 3 ? 'done' : 'notdone'}`}></span>
                            <div className={`circle ${trackOrder.current_status_id >= 3 ? 'done' : 'notdone'}`}>
                                <span className="label"></span>
                                <div className="progress-title">
                                    <p><img src={collected} /> Collected</p>
                                    {trackOrder.status_details ? trackOrder.status_details.map((status: any) => { return status.id == 3 ? <span>{status.date != "" && format(new Date(status.date),'dd-MM-yyyy hh:mm:ss')}</span> : <span></span> }) : <span></span>}
                                </div>
                            </div>
                            <span className={`bar ${trackOrder.current_status_id >= 4 ? 'done' : 'notdone'}`}></span>
                            <div className={`circle ${trackOrder.current_status_id >= 4 ? 'done' : 'notdone'}`}>
                                <span className="label"></span>
                                <div className="progress-title">
                                    <p><img src={verified} /> Verified and Paid</p>
                                    {trackOrder.status_details ? trackOrder.status_details.map((status: any) => { return status.id == 4 ? <span>{status.date != "" && format(new Date(status.date),'dd-MM-yyyy hh:mm:ss')}</span> : <span></span> }) : <span></span>}
                                </div>
                            </div>
                            <span className={`bar ${trackOrder.current_status_id >= 5 ? 'done' : 'notdone'}`}></span>
                            <div className={`circle ${trackOrder.current_status_id >= 5 ? 'done' : 'notdone'}`}>
                                <span className="label"></span>
                                <div className="progress-title">
                                    <p><img src={inprogress} /> Inprogress</p>
                                    {trackOrder.status_details ? trackOrder.status_details.map((status: any) => { return status.id == 5 ? <span>{status.date != "" && format(new Date(status.date),'dd-MM-yyyy hh:mm:ss')}</span> : <span></span> }) : <span></span>}
                                </div>
                            </div>
                            <span className={`bar ${trackOrder.current_status_id >= 6 ? 'done' : 'notdone'}`}></span>
                            <div className={`circle ${trackOrder.current_status_id >= 6 ? 'done' : 'notdone'}`}>
                                <span className="label"></span>
                                <div className="progress-title">
                                    <p><img src={completed} /> Completed</p>
                                    {trackOrder.status_details ? trackOrder.status_details.map((status: any) => { return status.id == 6 ? <span>{status.date != "" && format(new Date(status.date),'dd-MM-yyyy hh:mm:ss')}</span> : <span></span> }) : <span></span>}
                                </div>
                            </div>
                            <span className={`bar ${trackOrder.current_status_id >= 7 ? 'done' : 'notdone'}`}></span>
                            <div className={`circle ${trackOrder.current_status_id >= 7 ? 'done' : 'notdone'}`}>
                                <span className="label"></span>
                                <div className="progress-title">
                                    <p><img src={delivered} /> Delivered</p>
                                    {trackOrder.status_details ? trackOrder.status_details.map((status: any) => { return status.id == 7 ? <span>{status.date != "" && format(new Date(status.date),'dd-MM-yyyy hh:mm:ss')}</span> : <span></span> }) : <span></span>}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer vprogress-footer">
                    </div>
                </div>
            </div>
            </div>
            {/* <div className='cancelModel' id='modal fade in'>
           < div className="modal-dialog">

                <div className="cancel-modal-content">
                    <div className="cancel-modal-header">
                       <h4 className="modal-title">Confirmation needed</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
                       
                    </div>
                    <div className="cancel-modal-body">
                        <p>This action can not be reverted. Please confirm to cancel this order.</p>
                    </div>
                    <div className="cancel-modal-footer">
                        <input type="hidden" id="order_id_to_cancel" value="83" />
                        <button type="button" id="order_cancel_confirm" className="btn cancel-button">Yes, Cancel it</button>
                        <button type="button" className="btn close-button" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        hello World */}

        </div>
    )
}

export default TrackOrderPopup;