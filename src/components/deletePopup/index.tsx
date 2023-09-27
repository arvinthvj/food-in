import React from 'react'

const DeletePopup = () => {

//   const handleDeleteClose = () =>{
//     close();
//   }
    return (
        <div>
            <div id="deleteprofile" className="modal-body" data-backdrop="true" style={{ display: "block" }}>
                <div className="modal-dialog" id="animate">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmation</h5>
                        </div>
                        <div className="modal-body text-center p-lg">
                            <p>
                                Are you sure you want to delete?
                                <br />
                                <strong>[ </strong></p><h4><strong>Your Profile</strong></h4><strong> ]</strong>
                            <p></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success me-1" data-bs-dismiss="modal" >No</button>
                            <a href="#" className="btn btn-danger ms-1">Yes</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletePopup;